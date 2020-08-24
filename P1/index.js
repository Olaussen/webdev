
// Global constants and variables
const canvas = document.getElementById("canvas-art")
const $canvas = $("#canvas-art")
const $svg = $("#svg-art")
const ctx = canvas.getContext("2d")

/**
 * Will fix the pixelresolution of the canvas if it is not already.
 * Sometimes the coordinate system of the canvas does not behave as one would think.
 */
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

/**
 * Will return a random color in hexadecimal
 */
function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

/**
 * Draws the art in the canvas with or without random colors based on the parameter
 * @param {boolean} random - Whether or not to draw the art with random colors
 */
function drawCanvasArt(random) {

    // Ground and sky
    ctx.fillStyle = random ? randomColor() : "green"
    ctx.fillRect(45, 45, 260, 310)
    ctx.fillStyle = random ? randomColor() : "skyblue"
    ctx.fillRect(45, 45, 260, 150)

    // Main house body
    ctx.fillStyle = random ? randomColor() : "saddlebrown"
    ctx.fillRect(100, 200, 150, 70)

    // Door
    ctx.fillStyle = random ? randomColor() : "red"
    ctx.fillRect(160, 220, 30, 50)

    // Doorhandle
    ctx.fillStyle = random ? randomColor() : "black"
    ctx.beginPath()
    ctx.arc(165, 245, 4, Math.PI * 2, false);
    ctx.fill()
    ctx.closePath()

    // Windows
    ctx.fillStyle = random ? randomColor() : "grey"

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
    ctx.fillStyle = random ? randomColor() : "black"
    ctx.beginPath()
    ctx.moveTo(90, 200)
    ctx.lineTo(180, 150)
    ctx.lineTo(260, 200)
    ctx.fill()

    // Chimney
    ctx.fillStyle = random ? randomColor() : "black"
    ctx.fillRect(205, 150, 20, 30)

    // Text
    ctx.font = "30px Helvetica";
    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.fillText("The fieldhouse", canvas.width / 2, 310);
}

/**
 * Initiates the canvas art. 
 * This function is called when the document is ready.
 */
function initiateCanvasArt() {
    matchCanvasPixelsToDisplayPixels()

    const w = canvas.width
    const h = canvas.height
    const offset = w / 10

    // Frame
    ctx.fillRect(0, 0, w, h)
    ctx.clearRect(offset, offset, w - 2 * offset, h - 2 * offset)
    ctx.strokeRect(offset + 0.25 * offset, offset + 0.25 * offset, w - 2.5 * offset, h - 2.5 * offset)

    drawCanvasArt(false)
}

/**
 * Will return a string with all the html which will be loaded inside the SVG html element
 * @param {boolean} random - Whether or not to draw the art with random colors
 */
function getArtwork(random) {
    const ground = `<rect x="50" y="50" width="250" height="300" fill = "${random ? randomColor() : "green"}"/>`
    const sky = `<rect x="50" y="50" width="250" height="150" fill = "${random ? randomColor() : "skyblue"}"/>`
    const house = `<rect x="100" y="200" width="150" height="70" fill = "${random ? randomColor() : "saddlebrown"}"/>`
    const door = `<rect x="160" y="220" width="30" height="50" fill = "${random ? randomColor() : "red"}"/>`
    const doorhandle = `<ellipse cx="165" cy="245" rx="4" ry="4" fill = "${random ? randomColor() : "black"}" />`
    const windows = `<rect x="115" y="215" width="30" height="30" fill = "${random ? randomColor() : "grey"}"/>
                     <rect x="205" y="215" width="30" height="30" fill = "${random ? randomColor() : "grey"}"/>
                     <line x1="130" y1="215" x2="130" y2="245" stroke = "black" />
                     <line x1="115" y1="230" x2="145" y2="230" stroke = "black" />
                     <line x1="205" y1="230" x2="235" y2="230" stroke = "black" />
                     <line x1="220" y1="215" x2="220" y2="245" stroke = "black" />`
    const roof = `<polygon points="90,200 180,150 260,200" fill = "${random ? randomColor() : "black"}"/>`
    const chimney = `<rect x="205" y="150" width="20" height="30" fill = "${random ? randomColor() : "black"}"/>`
    const text = `<text x="80" y="310" fill="green" style="font: 30px Helvetica;">The fieldhouse</text>`

    let artwork = ground + sky + house + door + doorhandle + windows + roof + chimney + text
    return artwork
}

/**
 * Will draw the second artwork with SVG by using the .html() method from jQuery
 * This function is also called when the document is ready.
 * @param {boolean} random - Whether or not to draw the art with random colors
 */
function drawSvgArt(random) {
    $svg.html(`<rect id="svgframe" x="0" y="0" width="100% " height="100%" fill = "black"/>
               <rect x = "10%" y = "10%" width = "80%" height = "80%" fill = "white"/>
               <rect x="50" y="50" width="250" height="300" fill="white" stroke="black" />
               ${getArtwork(random)}`)
}

function frameHoverSVG(hovering) {
    const $svgframe = $("#svgframe")
    if (hovering) {
        $svgframe.css("fill", "gold")
        return
    }
    $svgframe.css("fill", "black")
    drawSvgArt(false)
}

function frameHoverCanvas(hovering) {
    const w = canvas.width
    const h = canvas.height
    const offset = w / 10

    ctx.fillStyle = hovering ? "gold" : "black"
    ctx.fillRect(0, 0, w, h)
    ctx.clearRect(offset, offset, w - 2 * offset, h - 2 * offset)
    ctx.strokeRect(offset + 0.25 * offset, offset + 0.25 * offset, w - 2.5 * offset, h - 2.5 * offset)
    drawCanvasArt(false)


}

/**
 * This jQuery function will wait until the document is ready before executing any of the code inside
 * Listeners for the interactive parts of the website are created. This means both artworks, and the button to
 * show and hide documentation.
 */
$("document").ready(() => {
    initiateCanvasArt()
    drawSvgArt(false)

    // Hover listener for the canvas art
    $canvas.hover(() => { frameHoverCanvas(true) }, () => { frameHoverCanvas(false) })

    // Click listener for the canvas art
    $canvas.click(() => {
        drawCanvasArt(true)
    })

    // Hover listener for the SVG art
    $svg.hover(() => { frameHoverSVG(true) }, () => { frameHoverSVG(false) })

    // Click listener for the SVG art
    $svg.click(() => {
        drawSvgArt(true)
    })
})
