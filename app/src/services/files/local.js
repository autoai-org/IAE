import { Files } from '@/services/files'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import mime from 'mime'
import store from '@/store'
import { azureAnalyzer } from "@/services/intellisense/azure"
import { config } from '@/services/config'
import { cvpmAnalyzer } from '@/services/intellisense/cvpm'
import path from 'path'

class LocalFiles extends Files {
    constructor() {
        super()
    }
    watch() {
        let self = this
        ipcRenderer.on('selected-directory', (event, data) => {
            self._filepath = data[0]
            self.getFileLists(self._filepath)
        })
    }
    get fileslist() {
        return this._fileslist
    }
    set fileslist(val) {
        this._fileslist = val
    }
    getFileLists(filepath) {
        fs.readdir(filepath, (err, files) => {
            let filtered = []
            for (let each of files) {
                if (mime.getType(each) != null && mime.getType(each).match(/^image\/*/) != null) {
                  filtered.push(each)
                }
            }
            self._fileslist = filtered
            store.state.currentFiles = filtered
            store.state.currentPath = filepath
        })
    }
    getCachedIntellisense(filepath) {
        azureAnalyzer.readCached(filepath)
        let results = azureAnalyzer.Results
        if (results.length === 0) {
            this.callIntellisense(filepath)
        }
        store.state.currentObjects = results
    }
    callIntellisense(filepath) {
        console.log(config.JSON)

        let paths = store.state.currentFiles.map(function (each) {
            return path.join(filepath, each)
        })
        if (config.JSON['intellisense']['provider'] === "CVPM") {
            cvpmAnalyzer.handleArray(paths).then(function(res){
                console.log(res)
            })
        } else if (config.JSON['intellisense']['provider'] === "Azure") {
            azureAnalyzer.handleArray(paths).then(function () {
                azureAnalyzer.writeCached(filepath)
            })
        }

    }
}

export {
    LocalFiles
}
