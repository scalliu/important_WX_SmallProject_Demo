 

Page({ 
  data: {
    avatarUrl:'../orderLess/aaaa.png',//用户头像
    isShowLoginDialog:true,//授权弹窗
    activeDefault: true,
    currentTab: 0, // 初始化tab 卡为0
    currentContent: 0,
    district: '全部',
    town: '深圳市全城',
    defaulta: [{
      name: '11',
      add: '11'
    }, {
      name: '22',
      add: '22'
    }],
    like: false,
    defaultakey: '深圳市'
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
  },
  onShareAppMessage: function (res) {
    // 自定义分享按钮
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '唉呀妈呀',
      path: 'pages/posts/post?id=123'
    }
  },
  onLoad: function (options) {
    console.log('myOload')
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
        console.log("----", res);
        console.log("----", res.authSetting["scope.userInfo"]);
          //用户信息 是否授权
         if(res.authSetting["scope.userInfo"]){
            //已经授权

            wx.getUserInfo({
              success: function(res) {
                console.log(res)
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  var province = userInfo.province
                  var city = userInfo.city
                  var country = userInfo.country
                  _self.setData({
                    avatarUrl:avatarUrl
                  })
              }
          })

         }else{  
           console.log(1)
          // 授权弹窗  模态窗口
          // _self.setData({'isShowLoginDialog':false})  
          
           
         }
      }
    });
   
 
  },
  onshare(res){
    console.log(res)
  },

  showShareMenu(){
    wx.getShareInfo({

    })
    wx.showShareMenu(  {
      withShareTicket:true,
      success:function( re){
        console.log(re)
      } 
    })
  },
  
  closeDialogWrap(){ 
    this.setData({'isShowLoginDialog':true}) 
  },
  onGotUserInfo(e){ //授权回调
    var _self = this;
     
    var res = e.detail;
    var userInfo = res.userInfo
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    var gender = userInfo.gender //性别 0：未知、1：男、2：女
    var province = userInfo.province
    var city = userInfo.city
    var country = userInfo.country
    _self.setData({
      avatarUrl:avatarUrl
    })
    _self.setData({'isShowLoginDialog':true})  
    
  },
  onShow: function () {

  },
  onHide: function () {
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
  }, 
   

})