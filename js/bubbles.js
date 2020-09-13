(function () {

  const twoPi = 2 * Math.PI;
  const rand = Math.random;
  const randFloor = max => rand() * max | 0;
  const randSigned = max => rand() < 0.5 ? -rand() : rand();

  // The bubble animation class
  class AnimatedBubble {
    constructor (xMax, yMax, stepSize) {
      this.xMax = xMax
      this.yMax = yMax
      this.stepSize = stepSize
      this.r = randFloor(5) + 2
      this.x = randFloor(xMax)
      this.y = randFloor(yMax)
      this.angle = rand()
    }

    tick () {
      const { xMax, yMax, x, y, r } = this

      // move to next position
      this.angle = this.angle + randSigned() * 0.1
      const angleRad = this.angle * twoPi
      this.x = x + this.stepSize * Math.cos(angleRad)
      this.y = y + this.stepSize * Math.sin(angleRad)

      // check boundaries
      // the calculations using radius ensure that we don't see sudden
      // disappearances (cx, cy of the circle are in its center, so we
      // need to account for its remaining radius still on the canvas
      // when cx, cy go outside the bounds)
      if (this.x < -r) this.x = xMax + r;
      if (this.x > xMax + r) this.x = -r;
      if (this.y < -r) this.y = yMax + r;
      if (this.y > yMax + r) this.y = -r;

      return [this.x, this.y]
    }
  }

  class AnimatedDyingBubble extends AnimatedBubble {
    constructor (initialX, initialY, maxGenerations, xMax, yMax, stepSize) {
      super(xMax, yMax, stepSize)

      this.x = initialX
      this.y = initialY

      this.maxGenerations = maxGenerations
      this.generation = 0
      this.isDead = false

      this.seed = rand()
      this.maxSize = randFloor(15) + 3
    }

    tick () {
      if (this.isDead) {
        return
      }
      if (++this.generation > this.maxGenerations) {
        this.isDead = true
        return
      }
      super.tick()
    }
  }

  const width = window.innerWidth
  const height = window.innerHeight

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  document.getElementById('background').append(canvas)
  const ctx = canvas.getContext('2d')

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'

  const maxGenerations = 70
  let bubbles = []

  function drawCoordinates ({ clientX: x, clientY: y }) {
    for (let i = 0; i < 2; i++) {
      const bubble = new AnimatedDyingBubble(x, y, maxGenerations, width, height, 2)
      bubbles.push(bubble)
    }
  }

  function drawBubble ({ x, y, r, generation, seed, maxSize }) {
    const normGen = generation / maxGenerations
    ctx.fillStyle = `hsl(${seed * 360}, 100%, ${100 - generation / maxGenerations * 40 + 20}%)`
    ctx.beginPath()
    ctx.arc(x, y, normGen * maxSize + 1, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }

  let isRendering = false

  window.addEventListener('pointermove', e => {
    drawCoordinates(e)
    // avoid duplicate renders
    if (!isRendering) {
      isRendering = true
      requestAnimationFrame(render)
    }
  })

  function render () {
    if (isRendering) {
      requestAnimationFrame(render)
    }
    let len = bubbles.length
    if (!len) {
      isRendering = false
      return
    }
    let nextBubbles = []
    for (let i = 0; i < len; i++) {
      const bubble = bubbles[i]
      bubble.tick()
      if (bubble.isDead) {
        continue
      }
      nextBubbles.push(bubble)
      drawBubble(bubble)
    }

    bubbles = nextBubbles
  }
})();
