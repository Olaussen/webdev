
const canvas = document.getElementById("canvas-art")
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


function initiateCanvasArt() {
    matchCanvasPixelsToDisplayPixels()

    const w = canvas.width
    const h = canvas.height
    const offset = w/10

    ctx.fillstyle = "gold"
    ctx.fillRect(0, 0, w, h);
    ctx.clearRect(offset, offset, w-2*offset, h-2*offset);
    ctx.strokeRect(offset+0.25*offset, offset+0.25*offset, w-2.5*offset, h-2.5*offset);
}

$("document").ready(() => {
    initiateCanvasArt()
    const $canvas = $("#canvas-art")
    const $svg = $("#svg-art")

    $canvas.click(() => {
        console.log("clicked canvas")
    })

    $svg.click(() => {
        console.log("clicked svg")
    })
})
