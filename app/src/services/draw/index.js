class Drawer {
    constructor(imgName) {
        this.imgName = imgName
    }
    drawBackgroundImage(imgPath) {
        let backgroundCanvas = document.getElementById("iae-current-img-" + this.imgName)
        let intelliSenseCanvas = document.getElementById("iae-intellisense-" + this.imgName)
        let bgCtx = backgroundCanvas.getContext("2d")
        let image = new Image()
        image.src = imgPath
        image.onload = drawImg;
        function drawImg() {
            intelliSenseCanvas.width = image.width
            intelliSenseCanvas.height = image.height
            backgroundCanvas.width = image.width
            backgroundCanvas.height = image.height
            bgCtx.drawImage(image,0,0);
        }
    }
    drawIntellisense(result) {
        let intelliSenseCanvas = document.getElementById("iae-intellisense-" + this.imgName)
        let itlsCtx = intelliSenseCanvas.getContext("2d")
        let objects = result.result.objects
        console.log(itlsCtx)
        for (var i in objects) {
            itlsCtx.lineWidth = "5";
            itlsCtx.strokeStyle = "blue";
            // itlsCtx.rect(objects[i].rectangle.x, objects[i].rectangle.y, objects[i].rectangle.w, objects[i].rectangle.h);
            console.log(objects[i].rectangle)
            itlsCtx.strokeRect(objects[i].rectangle.x, objects[i].rectangle.y, objects[i].rectangle.w, objects[i].rectangle.h);
        }
    }
}

export { Drawer }