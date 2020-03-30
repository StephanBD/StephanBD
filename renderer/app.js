// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require("electron");
const items = require("./items");

// const { remote } = require("electron")
// nodes
let showModal = document.getElementById("show-modal"),
  closeModal = document.getElementById("close-modal"),
  addItem = document.getElementById("add-item"),
  itemUrl = document.getElementById("url"),
  search = document.getElementById("search"),
  modal = document.getElementById("modal");

// open modal
window.newItem = () => {
  showModal.click()
}
// open item
window.openItem = items.open

window.deleteItem = () => {
  let selectedItem = items.getSelectedItem()
  items.delete(selectedItem.index)
}

window.openItemNative = items.openNative

window.searchItem = () => {
  search.focus()
}
/*--------------------------------------------------------------------------/
  
/--------------------------------------------------------------------------*/

// navigate with arrows
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    items.changeSelection(e.key)
  }
})


// toggle button
const toggleModalButton = () => {
  if (addItem.disabled === true) {
    addItem.disabled = false
    addItem.style.opacity = 1
    addItem.innerText = "Add item"
    closeModal.style.display = "inline"
  } else {
    addItem.disabled = true
    addItem.style.opacity = 0.5
    addItem.innerText = "Adding..."
    closeModal.style.display = "none"
  }
}

// ------------------------------------------ show
showModal.addEventListener("click", e => {
  modal.style.display = "flex"
  itemUrl.focus()
})

// ------------------------------------------ close
closeModal.addEventListener("click", e => {
  modal.style.display = "none"
})

// ------------------------------------------ new item
addItem.addEventListener("click", e => {
  if (itemUrl.value) {
    // send new item
    ipcRenderer.send("new-item", itemUrl.value)
  }
  toggleModalButton()
})

// ------------------------------------------ listener from main
ipcRenderer.on("new-item-success", (e, newItem) => {
  // add items
  items.addItem(newItem, true)

  toggleModalButton()
  modal.style.display = "none"
  itemUrl.value = ""
})

// ------------------------------------------ listen key event
itemUrl.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    addItem.click()
  }
})

// https://electronjs.org


// filter
search.addEventListener("keyup", e => {
  Array.from(document.getElementsByClassName("read-item")).forEach(item => {
    // hide
    let hasmatch = item.innerText.toLowerCase().includes(search.value)
    item.style.display = hasmatch ? "flex" : "none"
  })
})