// create button
let reditClose = document.createElement("div")
reditClose.innerText = "Done"

// style button
reditClose.style.position = "fixed"
reditClose.style.bottom = "15px"
reditClose.style.right = "15px"
reditClose.style.padding = "5px 10px"
reditClose.style.fontSize = "20px"
reditClose.style.fontWeight = "bold"
reditClose.style.background = "dodgerblue"
reditClose.style.color = "white"
reditClose.style.borderRadius = "5px"
reditClose.style.cursor = "default"
reditClose.style.boxShadow = "2px 2px 2px rgba(0,0,0, .2)"

reditClose.onclick = (e) => {
  // message parent window
  window.opener.postMessage({
    itemIndex: {{index}},
    action: "delete-reader-item",
    }, "*")
}

// append to body
document.getElementsByTagName("body")[0].appendChild(reditClose)