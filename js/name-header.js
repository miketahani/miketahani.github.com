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

  const width = 900
  const height = 400
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
    ctx.fillRect(width / 4, halfHeight - textHeight * 1.5, halfWidth, textHeight * 1.5)

    ctx.font = 'bold 80px Helvetica'
    ctx.fillText(SUB_TEXT, halfWidth, halfHeight + subTextHeight / 1.5)

    ctx.font = '180px RoadRage'
    ctx.fillStyle = 'white'
    ctx.fillText(LARGE_TEXT, halfWidth, halfHeight + LARGE_TEXT_Y_OFFSET)

    ctx.globalAlpha = 0.5
    ctx.globalCompositeOperation = 'screen'

    const ax = Math.sin(x * 0.01) // Next x angle, cached
    const ay = Math.cos(y * 0.01) // Next y angle, cached

    for (let i = 0; i < len; i++) {
      const direction = textDirections[i]
      ctx.fillStyle = COLORS[i]
      ctx.fillText(
        LARGE_TEXT,
        halfWidth + direction[0] * maxTravelDistance * ax,
        halfHeight + LARGE_TEXT_Y_OFFSET + direction[1] * maxTravelDistance * ay
      )
    }
  }

  window.addEventListener('mousemove', e => {
    update(
      e.clientX * 0.5 - window.innerWidth,
      e.clientY * 0.5 - window.innerHeight
    )
  })

  document.fonts.ready.then(_ => {
    update(halfWidth, halfHeight)
  })
})();
