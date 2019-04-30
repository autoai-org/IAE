import { ipcMain, Menu, dialog, remote } from 'electron'

function selectDirectoryDialog() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, function (filepaths, bookmarks) {
        const ipc = ipcMain
        ipc.sender.send('selected-directory', filepaths)
        console.log(remote.getCurrentWebContents)
        remote.getCurrentWebContents().send('selected-directory', filepaths)
        console.log(filepaths)
    });
}

function createMenu() {
    const template = [
        {
            label: "IAE 1.0",
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                {
                    label: 'Test',
                    click: () => { console.log('plop') }
                },
                {
                    label: 'Learn more',
                    click: () => { shell.openExternal('https://url') }
                },
                { type: 'separator' },
                { role: 'quit' }
            ],
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Folder',
                    click: function () { selectDirectoryDialog(); }
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

export {
    createMenu
}