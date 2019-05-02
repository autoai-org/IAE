import { Files } from '@/services/files'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import store from '@/store'

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
            self._fileslist = files
            store.state.currentFiles = files
            store.state.currentPath = filepath
        })
    }
}

export {
    LocalFiles
}