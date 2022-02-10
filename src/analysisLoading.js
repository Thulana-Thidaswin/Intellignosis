//functions for the timeout function
function firstCheck() {
    document.getElementById("check1").style.visibility="visible";
}

function secondCheck() {
    document.getElementById("check2").style.visibility="visible";
}

function thirdCheck() {
    document.getElementById("check3").style.visibility="visible";
}



//loading bar animation
const progressBarr = document.getElementsByClassName('progressBar')[0]
setInterval(() => {
    const computedStyle = getComputedStyle(progressBarr)
    const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
    progressBarr.style.setProperty('--width', width + .05)
    if (width > 30) {
        firstCheck();
    } 
    if (width > 60) {
        secondCheck();
    } 
    if (width > 90) {
        thirdCheck();
    }
}, 5)








