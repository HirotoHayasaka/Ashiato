module.exports = {
  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.js",
      title: "Popup"
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        components: {
          background: true,
          contentScripts: true
        },
        background: {
          entry: "src/background.js"
        },
        contentScripts: {
          entries: {
            "content":"src/content.js"
          }
        }
      }
    }
  }
};
