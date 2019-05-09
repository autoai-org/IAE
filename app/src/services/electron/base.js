import { BrowserWindow, dialog } from 'electron'

function selectDirectoryDialog() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, function (filepaths, bookmarks) {
        const focusedWindow = BrowserWindow.getAllWindows()[0]
        focusedWindow.webContents.send('selected-directory', filepaths);
    });
}

function showPreferencesDialog() {
    const focusedWindow = BrowserWindow.getAllWindows()[0]
    focusedWindow.webContents.send('open-preferences');
}

export {
    selectDirectoryDialog,
    showPreferencesDialog
}