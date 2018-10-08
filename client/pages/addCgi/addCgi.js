//index.js
var qcloud = require("../../vendor/wafer2-client-sdk/index");
var config = require("../../config");
var util = require("../../utils/util.js");






Page({
  pages: ["pages/index/index", "pages/mine/mine", "pages/addCgi/addCgi"],
  tabBar: {
    
  },
 
  data: {
    requestResult: "",
    canIUseClipboard: wx.canIUse("setClipboardData")
  },
  toRedirect: () => {
    wx.navigateBack({
      delta: ""
    });
  },
  onLaunch: function(options) {
    console.log(options, "onLaunch");
    // 生命周期函数--监听小程序初始化
  },
  onLoad: function(options) {
    console.log(options, "onLoad");
    // 生命周期函数--监听页面加载
  },
  onShow: function(options) {
    console.log(options, "onShow");

    //生命周期函数--监听页面初次渲染完成
  },
  onReady: function(options) {
    console.log(options, "onReady");
    // 生命周期函数--监听页面显示
  },
  onHide: function(options) {
    console.log(options, "onHide");
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function(options) {
    console.log(options, "onUnload");
    //  生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function(options) {
    console.log(options, "onPullDownRefresh");
    //页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function(options) {
    console.log(options, "onReachBottom");
    //页面上拉触底事件的处理函数
  },
  onShareAppMessage: function(options) {
    console.log(options, "onShareAppMessage");
    // 用户点击右上角转发
  },
  onPageScroll: function(options) {
    console.log(options, "onPageScroll");
    // 页面滚动触发事件的处理函数
  },
  onTabItemTap: function(options) {
    console.log(options, "onTabItemTap");
    //当前是 tab 页时，点击 tab 时触发
  },
  testCgi: function() {
    util.showBusy("请求中...");
    var that = this;
    qcloud.request({
      url: `${config.service.host}/weapp/demo`,
      login: false,
      success(result) {
        util.showSuccess("请求成功完成");
        that.setData({
          requestResult: JSON.stringify(result.data)
        });
      },
      fail(error) {
        util.showModel("请求失败", error);
        console.log("request fail", error);
      }
    });
  },

  copyCode: function(e) {
    var codeId = e.target.dataset.codeId;
    wx.setClipboardData({
      data: code[codeId - 1],
      success: function() {
        util.showSuccess("复制成功");
      }
    });
  }
});

var code = [
  `router.get('/demo', controllers.demo)`,
  `module.exports = ctx => {
    ctx.state.data = {
        msg: 'Hello World'
    }
}`
];
