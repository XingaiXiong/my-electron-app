const {app, BrowserWindow, ipcMain, nativeTheme} = require('electron/main')//Importing two Electron modules;app controls your application's event lifecycle; BrowserWindow creates and manages app windows.

const path = require('node:path')

const createWindow = () => {//This function loads your web page into a new BrowserWindow instance.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
        })
        win.loadFile('购物网站.html')
}

app.whenReady().then(()=>{ //calling your function when the app is ready
    ipcMain.handle('ping', ()=>'pong')
    createWindow()
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length===0){
            createWindow()//For macOS, as the application may continue running in the background after the main process exits, launch the application using the following method
        }
    })
})

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
}
)