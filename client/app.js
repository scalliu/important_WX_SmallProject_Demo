//app.js
var qcloud = require("./vendor/wafer2-client-sdk/index");
var config = require("./config");

App({
  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,

    doubanBase: "https://api.douban.com",
    isShowLoginDialog: true //全局音频播放数据
  },
  onLaunch: function() {
    qcloud.setLoginUrl(config.service.loginUrl);
  }
});
