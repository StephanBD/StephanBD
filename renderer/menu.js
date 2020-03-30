// // Modules
const { remote, shell } = require("electron")

const template = [
  {
    label: "Items",
    submenu: [
      { label: "add new", click: window.newItem, accelerator: "Ctrl+O" },
      { label: "read item", click: window.openItem, accelerator: "Ctrl+Enter" },
      { label: "delete item", click: window.deleteItem, accelerator: "Ctrl+Backspace" },
      { label: "open in browser", click: window.openItemNative, accelerator: "Ctrl+Shift+O" },
      { label: "search items", click: window.searchItem, accelerator: "Ctrl+S" },
    ]
  },
  {
    role: "editMenu"
  },
  {
    role: "windowMenu"
  },
  {
    role: "help",
    submenu: [
      { label: "lear more", click: () => { shell.openExternal("https://github.com/stackacademytv/master-electron") } }
    ]
  }

]

// set mac
if (process.platform === "darwin") {
  template.unshift({
    label: remote.app.getName(),
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { type: "separator" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quite" },
    ]
  })
}

const menu = remote.Menu.buildFromTemplate(template)

// // set as main app menu
remote.Menu.setApplicationMenu(menu)
