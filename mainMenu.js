module.exports = [
  {
    label: "edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { role: "copy" },
      { role: "paste" },
    ]
  },
  {
    label: "actions",
    submenu: [
      { label: "action2", enabled: false },
      { label: "DEvtools", role: "toggleDevTools" },
      { role: "toggleFullScreen" },
      {
        label: "greet",
        click: () => {
          console.log("hello");
        },
        accelerator: "shift+alt+G"
      },
    ]
  }
]