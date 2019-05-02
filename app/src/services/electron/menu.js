import { BrowserWindow, Menu, dialog } from 'electron'

function selectDirectoryDialog() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, function (filepaths, bookmarks) {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        focusedWindow.webContents.send('selected-directory', filepaths);
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
    selectDirectoryDialog,
    createMenu
}