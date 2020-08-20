
const canvas = document.getElementById("canvas-art")
const svg = document.getElementById("svg-art")
const ctx = canvas.getContext("2d")

function matchCanvasPixelsToDisplayPixels() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }

    return false;
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function drawCanvasArt(initial) {

    // Ground and sky
    ctx.fillStyle = initial ? "green" : randomColor()
    ctx.fillRect(45, 45, 260, 310)
    ctx.fillStyle = initial ? "skyblue" : randomColor()
    ctx.fillRect(45, 45, 260, 150)

    // Main house body
    ctx.fillStyle = initial ? "saddlebrown" : randomColor()
    ctx.fillRect(100, 200, 150, 70)

    // Door
    ctx.fillStyle = initial ? "red" : randomColor()
    ctx.fillRect(160, 220, 30, 50)

    // Doorhandle
    ctx.fillStyle = initial ? "black" : randomColor()
    ctx.beginPath()
    ctx.arc(165, 245, 4, Math.PI * 2, false);
    ctx.fill()
    ctx.closePath()

    // Windows
    ctx.fillStyle = initial ? "grey" : randomColor()

        // Left
        ctx.fillRect(115, 215, 30, 30)
        ctx.beginPath()
        ctx.moveTo(130, 215)
        ctx.lineTo(130, 245)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(115, 230)
        ctx.lineTo(145, 230)
        ctx.stroke()

        // Right
        ctx.fillRect(205, 215, 30, 30)
        ctx.beginPath()
        ctx.moveTo(205, 230)
        ctx.lineTo(235, 230)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(220, 215)
        ctx.lineTo(220, 245)
        ctx.stroke()
        ctx.closePath()

    // Roof
    ctx.fillStyle = initial ? "black" : randomColor()
    ctx.beginPath()
    ctx.moveTo(90, 200)
    ctx.lineTo(180, 150)
    ctx.lineTo(260, 200)
    ctx.fill()

        // Chimney
        ctx.fillStyle = initial ? "black" : randomColor()
        ctx.fillRect(205, 150, 20, 30)
}

function initiateCanvasArt() {
    matchCanvasPixelsToDisplayPixels()

    const w = canvas.width
    const h = canvas.height
    const offset = w / 10

    // Frame
    ctx.fillRect(0, 0, w, h);
    ctx.clearRect(offset, offset, w - 2 * offset, h - 2 * offset);
    ctx.strokeRect(offset + 0.25 * offset, offset + 0.25 * offset, w - 2.5 * offset, h - 2.5 * offset);

    drawCanvasArt(true)
}

$("document").ready(() => {
    initiateCanvasArt()
    const $canvas = $("#canvas-art")
    const $svg = $("#svg-art")

    $canvas.hover(() => { drawCanvasArt(false) }, () => { drawCanvasArt(true) })

    $svg.click(() => {
        console.log("clicked svg")
    })
})
