import jetpack from 'fs-jetpack'
import path from 'path'
class AnnotationCache {
    constructor () {
        this.result = []
    }
    writeAnnotated (currentPath) {
        jetpack.write(path.join(currentPath,'.iae', 'annotation.json'), this.result)
    }
    load (currentPath) {
        this.readAnnotated(currentPath)
    }
    clear () {
        this.result = []
    }
    addItem (item) {
        this.result.push(item)
    }
    readAnnotated (currentPath) {
        this.result = jetpack.read(path.join(currentPath,'.iae', 'annotation.json'), 'json')
    }
}

const annotationCache = new AnnotationCache()

export default annotationCache