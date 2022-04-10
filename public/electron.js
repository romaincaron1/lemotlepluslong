const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain } = require('electron')

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ 
        minWidth: 1400,
        minHeight: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        autoHideMenuBar: true,
        icon: ""
    });
    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
    mainWindow.setPosition(300, 100);
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});

ipcMain.on('close-me', (event, arg) => {
    app.quit();
})