<template>
  <div>
    <h1 class="title">Ashiato</h1>
    <div class="columns is-multiline">
      <div class="column is-four-fifths is-centered columns">
        <div class="placehold-box vcentering-box">
          <div v-if="isRunning" class="centering-box">
            <img src="../assets/footprints.png" class="footprint" >
          </div>
          <div class="centering-box is-size-2">
            {{isRunning ? `現在 ${count} 人目` : `次は ${count} 人目から`}}
          </div>
          <p class="alert" v-if="count > 30 && isRunning">
            ※スクロール処理が追いつかない場合があるので止まった場合は最初は自分で下にスクロールしてください🙇🏻‍♂️
          </p>
        </div>
      </div>
      <div class="column is-four-fifths is-centered space-around-box">
        <b-button id="start-button" type="is-primary" @click="start">スタート</b-button>
        <b-button id="start-button" type="is-primary" @click="reset">リセット</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      isRunning: false,
      count: 0
    }
  },
  mounted: function() {
    var self = this;
    const querying = browser.tabs.query({currentWindow: true, active: true});
      querying.then(function(tabs){
        console.log(tabs[0])
        browser.tabs.sendMessage(tabs[0].id, {message: 'mounted'})
          .then(e => self.count = e.firstNum)
          .catch(e => console.error(e));
      });
    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if(request.message == "plus"){
        console.log(request);
        console.log(sender);
        console.log(sendResponse);
        self.count = request.num;
        console.log(self.count);
      }
    });
  },
  methods: {
    start () {
      var self = this;
      self.isRunning = true;
      console.log("start clicked!!!")
      browser.runtime.sendMessage({message: "start"})
        .then(e => {
          console.log(e);
        }).catch(e => {
          console.log(e);
          alert("足跡に失敗しました")
        });
    },
    reset () {
      this.isRunning = false;
      const querying = browser.tabs.query({currentWindow: true, active: true});
      querying.then(function(tabs){
        console.log(tabs[0])
        browser.tabs.sendMessage(tabs[0].id, {message: 'reset'}).then(e => console.log(`retuened!: ${e}`)).catch(e => console.error(e));
      });
    }
  }
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}

.columns {
  margin: 0 !important;
}

.centering-box {
  display: flex;
  justify-content: center;
  text-align: center;
}

.vcentering-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.space-around-box {
  display: flex !important;
  justify-content: space-around;
  text-align: center;
}

.title {
  text-align: center;
  margin-top: 10px;
}

.footprint {
  width: 40%;
  animation: flash 1.5s linear infinite;
}

@keyframes flash {
  0%,100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.placehold-box {
  min-width: 100px;
  min-height: 00px;
}

.alert {
  font-size: 12px;
  color: red;
}
</style>
