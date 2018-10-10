
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLoginDialog:true,
    imageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _self = this
    //判断用户是否授权 
    wx.getSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
        console.log("----", res.authSetting);
        console.log("----", res.authSetting["scope.userInfo"]);
          //用户信息 是否授权
         if(res.authSetting["scope.userInfo"]){
            //已经授权
         }else{ 
          console.log(1)
          // 授权弹窗  模态窗口
          _self.setData({'isShowLoginDialog':false})  
          
           
         }
      }
    });
   
 
  },
  chooseImg:function(){
    var that = this
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  previewImage:function(e){
    var current = e.target.dataset.src
    console.log(current)
    //wx.scanCode(Object object)
    //通过 wx.scanCode(Object object) 识别图中二维码
    wx.previewImage({
      current:current, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls:this.data.imageList,
      
      
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onGotUserInfo: function(e) { //用户同意授权回调
    console.log(e.detail.errMsg.getUserInfo)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  closeDialogWrap(){
    _self.setData({'isShowLoginDialog':true})  
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})