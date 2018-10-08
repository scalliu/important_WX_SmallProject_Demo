//index.js
var qcloud = require("../../vendor/wafer2-client-sdk/index");
var config = require("../../config");
var util = require("../../utils/util.js");

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: "",
    isShowLoginDialog: true
  },

  onGotUserInfo: function(options) {
    console.log(options);
    var _self = this;
    if (options.detail.errMsg == "getUserInfo:ok") {
      //授权成功
      //数据存入本地
      this.isShowLoginDialog = true;
    } else {
      // 提示取消授权将 不能正常访问
      wx.showModal({
        title: "提示",
        content: "取消授权可能无法正常使用",
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            _self.setData({ isShowLoginDialog: true });
          } else if (res.cancel) {
            console.log("用户点击取消");
            _self.setData({ isShowLoginDialog: true });
          }
        }
      });
    }
  },
  onOpenSetting: function(options) {
    console.log(options);
  },
  closeDialogWrap: function() {
    console.log(1);
    var _self = this;

    wx.showModal({
      title: "提示",
      content: "取消授权可能无法正常使用",
      success: function(res) {
        if (res.confirm) {
          console.log("用户点击确定");
          _self.setData({ isShowLoginDialog: false });
        } else if (res.cancel) {
          console.log("用户点击取消");
          _self.setData({ isShowLoginDialog: false });
        }
      }
    });
  },
  toRedirect: () => {
    wx.navigateBack({
      delta: ""
    });
  },

  login111: function(options) {
    wx.redirectTo({ url: "../addCgi/addCgi" });
  },
  onLaunch: function(options) {
    console.log(options, "onLaunch--index");
    // 生命周期函数--监听小程序初始化
  },
  onLoad: function(options) {
    console.log(options, "onLoad");
    console.log("onLaunch--app.js");
    wx.getSetting({
      //权限侦查
      success: res => {
        console.log("----", res.authSetting);

        console.log("----", res.authSetting["scope.userInfo"]);
        if (!res.authSetting["scope.userInfo"]) {
          //未授权
          console.log("-未授权---弹出授权窗口", this);
          this.setData({
            isShowLoginDialog: false
          });
        } else {
          //已经授权
        }
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    });

    

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
  // 用户登录示例 ---  腾讯云
  login: function() {
    if (this.data.logged) return;

    util.showBusy("正在登录");
    var that = this;

    // 调用登录接口  --
    qcloud.login({
      success(result) {
        if (result) {
          console.log(result);
          util.showSuccess("登录成功");
          that.setData({
            userInfo: result,
            logged: true
          });
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              console.log(result);
              util.showSuccess("登录成功");
              that.setData({
                userInfo: result.data.data,
                logged: true
              });
            },

            fail(error) {
              util.showModel("请求失败", error);
              console.log("request fail", error);
            }
          });
        }
      },

      fail(error) {
        util.showModel("登录失败", error);
        console.log("登录失败", error);
      }
    });
  },

  // 切换是否带有登录态
  switchRequestMode: function(e) {
    console.log("切换是否带有登录态");
    this.setData({
      takeSession: e.detail.value
    });
    this.doRequest();
  },

  doRequest: function() {
    util.showBusy("请求中...");
    var that = this;
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.showSuccess("请求成功完成");
        console.log("request success", result);
        that.setData({
          requestResult: JSON.stringify(result.data)
        });
      },
      fail(error) {
        util.showModel("请求失败", error);
        console.log("request fail", error);
      }
    };
    if (this.data.takeSession) {
      // 使用 qcloud.request 带登录态登录
      qcloud.request(options);
    } else {
      // 使用 wx.request 则不带登录态
      wx.request(options);
    }
  },

  // 上传图片接口
  doUpload: function() {
    var that = this;

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function(res) {
        util.showBusy("正在上传");
        var filePath = res.tempFilePaths[0];

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: "file",

          success: function(res) {
            util.showSuccess("上传图片成功");
            console.log(res);
            res = JSON.parse(res.data);
            console.log(res);
            that.setData({
              imgUrl: res.data.imgUrl
            });
          },

          fail: function(e) {
            util.showModel("上传图片失败");
          }
        });
      },
      fail: function(e) {
        console.error(e);
      }
    });
  },

  // 预览图片
  previewImg: function() {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    });
  },

  // 切换信道的按钮
  switchChange: function(e) {
    var checked = e.detail.value;

    if (checked) {
      this.openTunnel();
    } else {
      this.closeTunnel();
    }
  },

  openTunnel: function() {
    util.showBusy("信道连接中...");
    // 创建信道，需要给定后台服务地址
    var tunnel = (this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl));

    // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
    tunnel.on("connect", () => {
      util.showSuccess("信道已连接");
      console.log("WebSocket 信道已连接");
      this.setData({ tunnelStatus: "connected" });
    });

    tunnel.on("close", () => {
      util.showSuccess("信道已断开");
      console.log("WebSocket 信道已断开");
      this.setData({ tunnelStatus: "closed" });
    });

    tunnel.on("reconnecting", () => {
      console.log("WebSocket 信道正在重连...");
      util.showBusy("正在重连");
    });

    tunnel.on("reconnect", () => {
      console.log("WebSocket 信道重连成功");
      util.showSuccess("重连成功");
    });

    tunnel.on("error", error => {
      util.showModel("信道发生错误", error);
      console.error("信道发生错误：", error);
    });

    // 监听自定义消息（服务器进行推送）
    tunnel.on("speak", speak => {
      util.showModel("信道消息", speak);
      console.log("收到说话消息：", speak);
    });

    // 打开信道
    tunnel.open();

    this.setData({ tunnelStatus: "connecting" });
  },

  /**
   * 点击「发送消息」按钮，测试使用信道发送消息
   */
  sendMessage() {
    if (!this.data.tunnelStatus || !this.data.tunnelStatus === "connected")
      return;
    // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
    if (this.tunnel && this.tunnel.isActive()) {
      // 使用信道给服务器推送「speak」消息
      this.tunnel.emit("speak", {
        word: "I say something at " + new Date()
      });
    }
  },

  /**
   * 点击「关闭信道」按钮，关闭已经打开的信道
   */
  closeTunnel() {
    if (this.tunnel) {
      this.tunnel.close();
    }
    util.showBusy("信道连接中...");
    this.setData({ tunnelStatus: "closed" });
  }
});
