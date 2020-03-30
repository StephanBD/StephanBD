// DOM nodes
let items = document.getElementById("items")

// fs 
let fs = require("fs")

// shell 
let { shell } = require("electron")

// get readerJs  contents
let readerJs
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
  readerJs = data.toString()
})


// track items
exports.storage = JSON.parse(localStorage.getItem("readit-items")) || []

// listen for done
window.addEventListener("message", e => {
  // console.log(e.data);
  // delete item at given item
  // check
  if (e.data.action === "delete-reader-item") {
    this.delete(e.data.itemIndex)
    // close the render window
    e.source.close()
  }
})

// delete item
exports.delete = itemIndex => {
  items.removeChild(items.childNodes[itemIndex])
  // remove from storage
  this.storage.splice(itemIndex, 1)
  // WebGLShaderPrecisionFormat
  this.save()
  // select previous item or new item if first was delete
  if (this.storage.length) {
    let newSelectedItemIndex = (itemIndex === 0) ? 0 : itemIndex - 1
    // set item
    document.getElementsByClassName("read-item")[newSelectedItemIndex].classList.add("selected")
  }
}

// get index of item
exports.getSelectedItem = () => {
  let currentItem = document.getElementsByClassName("read-item selected")[0]

  // get item
  let itemIndex = 0
  let child = currentItem
  while ((child = child.previousSibling) != null) itemIndex++
  // return selected item
  return { node: currentItem, index: itemIndex }
}


// persist
exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage))
}

// select
exports.select = e => {
  // document.getElementsByClassName("read-item selected")[0].classList.remove("selected")  
  this.getSelectedItem().node.classList.remove("selected")
  // add click
  e.currentTarget.classList.add("selected")
}

// open
exports.open = () => {
  if (!this.storage.length) return
  let selectedItem = this.getSelectedItem()
  let contentUrl = selectedItem.node.dataset.url
  // open item in proxy
  let readerWin = window.open(contentUrl, "", `
    maxWidth=2000,
    maxHeight=2000,
    width=1200,
    height=800,
    backgroundColor=#dedede,
    nodeIntegration=0,
    contextIsolation=1,
  `)
  // inject javascript with item index
  readerWin.eval(readerJs.replace("{{index}}", selectedItem.index))
}

// move
exports.changeSelection = (direction) => {
  let currentItem = this.getSelectedItem()

  if (direction === "ArrowUp" && currentItem.node.previousSibling) {
    currentItem.node.classList.remove("selected")
    currentItem.node.previousSibling.classList.add("selected")
  } else if (direction === "ArrowDown" && currentItem.node.nextSibling) {
    currentItem.node.classList.remove("selected")
    currentItem.node.nextSibling.classList.add("selected")
  }
}

// add new item
exports.addItem = (item, isNew = false) => {
  // create DOm
  let itemNode = document.createElement("div")

  itemNode.setAttribute("class", "read-item")

  // data attribute
  itemNode.setAttribute("data-url", item.url)

  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`

  // append
  items.appendChild(itemNode)

  // 
  itemNode.addEventListener("click", this.select)

  itemNode.addEventListener("dblclick", this.open)


  // 
  if (document.getElementsByClassName("read-item").length === 1) {
    itemNode.classList.add("selected")
  }

  // add item to storage
  if (isNew) {
    this.storage.push(item)
    this.save()
  }
}

// add items from storage

this.storage.forEach(item => {
  this.addItem(item)
});


exports.openNative = () => {
  // only if we have
  if (!this.storage.length) return

  let selectedItem = this.getSelectedItem()

  shell.openExternal(selectedItem.node.dataset.url)
}