class Drawer {
    constructor(elid) {
        this.elid = elid
        this.canvas = document.getElementById(elid)
        console.log(this.canvas)
        this.ctx = this.canvas.getContext("2d")
    }
    drawBackgroundImage(imgPath) {
        let self = this
        let image = new Image()
        image.src = imgPath
        image.onload = drawImg;
        function drawImg() {
            self.canvas.width = image.width
            self.canvas.height = image.height
            self.ctx.drawImage(image,0,0);

        }
    }
}

export { Drawer }