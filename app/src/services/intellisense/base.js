import jetpack from 'fs-jetpack'
import path from 'path'

class Analyzer {
    constructor () {
        this.cachedResults = []
    }
    get Results () {
        return this.cachedResults
    }
    set Results (val) {
        this.cachedResults = val
    }
    writeCached(currentPath) {
        console.log('writing cached results')
        jetpack.write(path.join(currentPath,'.iae', 'intellisense.json'), this.Results)
    }
    readCached(currentPath) {
        this.cachedResults = jetpack.read(path.join(currentPath,'.iae', 'intellisense.json'), "json")
        if (typeof(this.cachedResults) === 'undefined') {
            this.cachedResults = []
        }
    }
}

export default Analyzer