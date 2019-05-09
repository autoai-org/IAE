import { createIntellisenseElement } from './annotation'
class Drawer {
    constructor(imgName) {
        this.imgName = imgName
    }
    drawBackgroundImage(imgPath) {
        let backgroundCanvas = document.getElementById("iae-current-img-" + this.imgName)
        let intelliSenseDiv = document.getElementById("iae-intellisense-" + this.imgName)
        let bgCtx = backgroundCanvas.getContext("2d")
        let image = new Image()
        image.src = imgPath
        image.onload = drawImg;
        function drawImg() {
            intelliSenseDiv.style.width = image.width + "px"
            intelliSenseDiv.style.height = image.height + "px"
            backgroundCanvas.width = image.width
            backgroundCanvas.height = image.height
            bgCtx.drawImage(image,0,0);
        }
    }
    drawIntellisense(result) {
        let intelliSenseDiv = document.getElementById("iae-intellisense-" + this.imgName)
        let objects = result.result.objects
        for (let i in objects) {
            createIntellisenseElement(intelliSenseDiv, objects[i].rectangle.x, objects[i].rectangle.y, objects[i].rectangle.w, objects[i].rectangle.h, objects[i].object, objects[i].confidence)
        }
    }
}

export { Drawer }