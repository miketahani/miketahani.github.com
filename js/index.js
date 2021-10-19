require('core-js/stable')
require('regenerator-runtime/runtime')
const initBubbles = require('./bubbles.js')
const initNameHeader = require('./name-header.js')

// Add listeners to change link background color
Array.from(document.querySelectorAll('.links a')).forEach(el => {
  el.addEventListener('mouseover', () => {
    el.style.background = `hsl(${Math.random() * 360 | 0}, 100%, 70%)`
  })
  el.addEventListener('mouseout', () => {
    el.style.background = '#000'
  })
})

initBubbles()
initNameHeader()
