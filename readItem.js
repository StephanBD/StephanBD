// modules
const { BrowserWindow } = require("electron")

// offscreen BrowserWindow
let offScreenWindow

module.exports = (url, callback) => {
  // create offscreen
  offScreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
      // nodeIntegration: false
    }
  })
  // load item url
  offScreenWindow.loadURL(url)
  offScreenWindow.webContents.on("did-finish-load", e => {
    let title = offScreenWindow.getTitle()
    // get screenshot
    offScreenWindow.webContents.capturePage(image => {
      let screenshot = image.toDataURL()
      // execute callback
      callback({ title, screenshot, url })
      // clean
      offScreenWindow.close()
      offScreenWindow = null
    })
  })
}