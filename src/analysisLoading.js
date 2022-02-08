
const progressBarr = document.getElementsByClassName('progressBar')[0]
setInterval(() => {
    const computedStyle = getComputedStyle(progressBarr)
    const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
    progressBarr.style.setProperty('--width', width + .05)
}, 5)