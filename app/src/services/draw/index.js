import { createIntellisenseElement } from './intellisense'
import { attachNameLabel } from './annotation'
import { getElementOffset } from './utility'
import store from '@/store'
class Drawer {
    constructor(imgName) {
        this.imgName = imgName
    }
    setElWH(el, w, h) {
        el.style.width = w + 'px'
        el.style.height = h + 'px'
    }
    drawBackgroundImage(imgPath) {
        let backgroundCanvas = document.getElementById("iae-current-img-" + this.imgName)
        let intelliSenseDiv = document.getElementById("iae-intellisense-" + this.imgName)
        let annotationDiv = document.getElementById("iae-annotation-" + this.imgName)
        let bgCtx = backgroundCanvas.getContext("2d")
        let image = new Image()
        let self = this
        image.src = imgPath
        image.onload = drawImg;
        function drawImg() {
            self.setElWH(intelliSenseDiv, image.width, image.height)
            self.setElWH(annotationDiv, image.width, image.height)
            annotationDiv.style.zIndex = 10
            self.initAnnotation()
            backgroundCanvas.width = image.width
            backgroundCanvas.height = image.height
            bgCtx.drawImage(image, 0, 0);
        }
    }
    drawIntellisense (result) {
        let intelliSenseDiv = document.getElementById("iae-intellisense-" + this.imgName)
        let objects = result.result.objects
        for (let i in objects) {
            createIntellisenseElement(intelliSenseDiv, objects[i].rectangle.x, objects[i].rectangle.y, objects[i].rectangle.w, objects[i].rectangle.h, objects[i].object, objects[i].confidence)
        }
    }
    drawName (name) {
        attachNameLabel(this.objectDiv, name)
    }
    initAnnotation () {
        let self = this
        let objectDiv = document.createElement("div")
        self.objectDiv = objectDiv
        objectDiv.id = "iae-new-item-object-div"
        objectDiv.style.position = "absolute"
        objectDiv.style.border = '2px dotted #FF0000';
        let coordinates = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        }
        let needMove = false
        let annotationDiv = document.getElementById("iae-annotation-" + this.imgName)
        let parentLeft = getElementOffset(annotationDiv, 'offsetLeft')
        let parentTop = getElementOffset(annotationDiv, 'offsetTop')
        annotationDiv.onmousedown = function (event) {
            if (!needMove) {
                needMove = true
                store.state.finishingAnnotatingObject = false
                annotationDiv.style.cursor = 'move'
                let startX = event.pageX - parentLeft
                let startY = event.pageY - parentTop
                coordinates = {
                    "x": startX,
                    "y": startY
                }
                objectDiv.style.left = startX + 'px'
                objectDiv.style.top = startY + 'px'
                self.setElWH(objectDiv, 0, 0)
                annotationDiv.appendChild(objectDiv)

            } else {
                // finish annotating.
                needMove = false
            }
        }
        annotationDiv.onmousemove = function (event) {
            if (needMove) {
                let ePageX = event.pageX;
                let ePageY = event.pageY;
                var x = ePageX - parentLeft - coordinates["x"];
                var y = ePageY - parentTop - coordinates["y"];
                coordinates = {
                    "x": coordinates["x"],
                    "y": coordinates["y"],
                    "w": x,
                    "h": y
                }
                self.setElWH(objectDiv, x, y)
            }
        }
        annotationDiv.onmouseup = function () {
            needMove = false
            store.state.finishingAnnotatingObject = true
        }
    }
}

export { Drawer }