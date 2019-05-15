import jetpack from 'fs-jetpack'
import path from 'path'
import store from '@/store'
import fs from 'fs'

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
        jetpack.write(path.join(currentPath,'.iae', 'intellisense.json'), this.Results)
    }
    readCached(currentPath) {
        this.cachedResults = jetpack.read(path.join(currentPath,'.iae', 'intellisense.json'), "json")
        if (typeof(this.cachedResults) === 'undefined') {
            this.cachedResults = []
        }
        store.state.refreshIon = true
    }
    async handleArray(filepaths) {
        let cachedResults = []
        for (let i in filepaths) {
            var stat = fs.statSync(filepaths[i]);
            if (stat.isFile()) {
                let res = await this.handleSingle(filepaths[i])
                console.log(res)
                cachedResults.push({
                    path: filepaths[i],
                    result: res.data
                })
            }
        }
        this.Results = cachedResults
    }
}

export default Analyzer