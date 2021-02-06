function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  console.log(sender);

  if(request.message == "mounted"){
    sendResponse({firstNum: localStorage.getItem('initialNum') ? parseInt(localStorage.getItem('initialNum'), 10) : 0 })
  }

  console.log(request);

  if(request.message.message == "start" || request.message == "restart"){

    var n = localStorage.getItem('initialNum') ? parseInt(localStorage.getItem('initialNum'), 10) : 0;

    console.log(request);
    if (parseInt(request.message.startNum, 10) > 0) {
      console.log('here will set');
      n = parseInt(request.message.startNum, 10);
    }

    var users = document.querySelectorAll("[class^=grid-user-item]");

    console.log(n);
    console.log(users.length);

    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (async() => {
      while(!users[n]){
        window.scroll(0, 4000);

        await _sleep(2000);

        console.log(users[n]);

        users = document.querySelectorAll("[class^=grid-user-item]");
      }
      while(users[n]){
        await _sleep(getRandomInt(800,1200));
        users[n].click();
        await _sleep(getRandomInt(800,1200));
        var checkExist = setInterval(function() {
          var closeButton = document.getElementsByClassName('css-1mkmt2a');
          if (closeButton.length > 0) {
            closeButton[0].click();
            clearInterval(checkExist);
          }
        }, 500);

        console.log(n);
        browser.runtime.sendMessage({message: "plus", num: n + 1});
        n += 1;
        localStorage.setItem('initialNum', n);

        if(!users[n]){
          while(!users[n]){
            window.scroll(0, 90000);

            await _sleep(1000);

            users = document.querySelectorAll("[class^=grid-user-item]");
          }
        }
        console.log(`users: ${users.length}`);
      }
    })();
  } else if (request.message == "reset"){
    localStorage.setItem('initialNum', 0);
    browser.runtime.sendMessage({message: "plus", num: 0});
    sendResponse({message: "success!"})
    window.location.href = "https://pairs.lv/search";
  }

  sendResponse({message: "success!"})
});
