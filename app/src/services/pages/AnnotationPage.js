import { Page } from '@/services/pages'

class ImageAnnotationPage extends Page {
    constructor(imgSrc) {
        super()
        this.imgSrc = imgSrc
        this.type = 'iae-image-annotation-page'
        this.title = imgSrc.substring(
            imgSrc.lastIndexOf("/") + 1
        );
    }
}

export {
    ImageAnnotationPage
}