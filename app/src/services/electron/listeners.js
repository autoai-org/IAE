import { ipcMain } from 'electron'
import { selectDirectoryDialog } from './menu'
function addOpenDirectoryListener() {
    ipcMain.on('open-folder-dialog', (event, arg) => {
        selectDirectoryDialog()
    })
}

function initListeners() {
    addOpenDirectoryListener()
}

export {
    initListeners
}