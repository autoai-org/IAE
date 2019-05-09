import {  Menu } from 'electron'
import { selectDirectoryDialog, showPreferencesDialog } from './base'


function createMenu() {
    const template = [
        {
            label: "IAE 1.0",
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                {
                    label: 'Preferences',
                    click: () => { showPreferencesDialog() }
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