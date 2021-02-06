browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  request;
  sender;
  if(request.message.message == "start" || request.message == "restart"){
    const querying = browser.tabs.query({currentWindow: true, active: true});

    querying.then(function(tabs){
      console.log(tabs[0])
      browser.tabs.sendMessage(tabs[0].id, {message: { message: 'start', startNum: request.message.startNum }})
        .then(e => {
          console.log(e)
        }).catch(e => {
          console.error(e)
        });
    });
  }

  sendResponse("backgronded");
});
