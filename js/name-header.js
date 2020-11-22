(function () {
  const LARGE_TEXT = 'MIKE'
  const SUB_TEXT = 'TAHANI'
  // const COLORS = [
  //   '#FF0033',
  //   '#0099FF',
  //   '#00FF00',
  //   '#FF9900'
  // ]
  const COLORS = [
    'hsl(0, 100%, 60%)',
    'hsl(200, 100%, 60%)',
    'hsl(150, 100%, 60%)',
    'hsl(50, 100%, 60%)'
  ]

  const maxTravelDistance = 20

  // use -20 for "MTXT" -- something about letter forms in "MIKE" look good offsetted
  // const LARGE_TEXT_Y_OFFSET = -20 // for MXTX
  const LARGE_TEXT_Y_OFFSET = 0 // for MIKE

  const width = 600
  const height = 250
  const halfWidth = width / 2
  const halfHeight = height / 2

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  document.getElementById('header').appendChild(canvas)
  const ctx = canvas.getContext('2d')

  ctx.textAlign = 'center'

  ctx.font = '180px RoadRage'
  const size = ctx.measureText(LARGE_TEXT)
  const textHeight = size.actualBoundingBoxAscent - size.actualBoundingBoxDescent

  ctx.font = 'bold 80px Helvetica'
  const subSize = ctx.measureText(SUB_TEXT)
  const subTextHeight = size.actualBoundingBoxAscent - size.actualBoundingBoxDescent

  // Will be multiplied by x and y coordinates to determine a direction of movement
  //  for each animated text block.
  // FIXME use bitshifting or something
  const textDirections = [
    [-1, -1],
    [ 1,  1],
    [-1,  1],
    [ 1, -1]
  ]

  const len = textDirections.length

  function update (x, y) {
    ctx.clearRect(0, 0, width, height)

    ctx.globalAlpha = 1.0
    ctx.globalCompositeOperation = 'source-over'

    ctx.fillStyle = 'black'
    ctx.fillRect(70, 10, 460, 155)

    ctx.font = 'bold 80px Helvetica'
    ctx.fillText(SUB_TEXT, halfWidth, 235)

    ctx.font = '180px RoadRage'
    ctx.fillStyle = 'white'
    ctx.fillText(LARGE_TEXT, halfWidth, 170)

    ctx.globalAlpha = 0.5
    ctx.globalCompositeOperation = 'screen'

    // x and y angles, constricted to a small window
    const ax = Math.cos(x * 0.01)
    const ay = Math.sin(y * 0.01)

    for (let i = 0; i < len; i++) {
      const [dx, dy] = textDirections[i]
      ctx.fillStyle = COLORS[i]
      ctx.fillText(
        LARGE_TEXT,
        // These are just parametric equations for a circle:
        //   x = cx + r * cos(angle)
        //   y = cy + r * sin(angle)
        dx * maxTravelDistance * ax + halfWidth,
        dy * maxTravelDistance * ay + 170
      )
    }
  }

  document.fonts.ready.then(() => {
    window.addEventListener('mousemove', e => {
      // Set (0, 0) at center of page
      update(
        e.clientX * 0.5 - window.innerWidth,
        e.clientY * 0.5 - window.innerHeight
      )
    })

    update(halfWidth, halfHeight)
  })
})();
