var postsData = require('../../data/posts-data.js')
var distractList = require('../../data/posts-data1.js')


var QQMapWX  = require("../../utils/qqmap-wx-jssdk.min")
var demo = new QQMapWX({
    key: 'GMDBZ-RJHCP-4DGDF-LJUTF-LGRAQ-JZFKL' // 必填
});


Page({
  
  onChange(event) {
    // console.log(event.detail, 'click right menu callback data')
  },
  //页面滚动执行方式
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },
  changeTabRight(event){
    // console.log(event)
    let cur = event.currentTarget.dataset.current
    let key =  event.currentTarget.dataset.flag
    let town =  event.currentTarget.dataset.town

    this.setData({
      showRight: !this.data.showRight,
      currentRight: cur,
      defaultakey: key,
      district:town
    });
    
  },
  dingwei(event) { 
    let tempdetail = event.currentTarget.dataset.add; 
    let detail = tempdetail.split(',') 
    
    // wx.chooseLocation({
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   complete: function (res) {
    //     console.log(res, 2) 
    //   }
    // })
 
    demo.geocoder({
      address: detail[1],
      success: res => { 
          wx.openLocation({
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,
              scale: 28,
              address:detail[1],
              name: detail[0]
          });
      },
      fail: function(res) {
          console.log(res);
      },
      complete: function(res) {
          // console.log(res);  
      }
  });



   


    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function(res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     console.log(res)
       
    //   },
    //   complete:function(ddd){
    //     console.log(ddd)
    //   }
    // })
  },
  toggleIconFn(event) {
    let cur = event.currentTarget.dataset.index;
    let flag = event.currentTarget.dataset.flag;
    let like = event.currentTarget.dataset.like;
    let b = `defaulta.${flag}[${cur}].checked`;
    console.log(b,'222')
    this.setData({
      [b]: !like
    });
  },

  toggleLeft1Fn() {
    this.setData({
      showLeft1: !this.data.showLeft1
    });
  },

  toggleRightFn() {
    this.setData({
      showRight: !this.data.showRight
    });
  },
  toggleLeft2Fn() {
    this.setData({
      showRight: !this.data.showRight
    });
  },
  toggleLeft1(event) {

    let curContent = event.currentTarget.dataset.currentContent;
    let district = event.currentTarget.dataset.district;
    let town = event.currentTarget.dataset.town;
    let key =  event.currentTarget.dataset.flag
    console.log(key)
    this.setData({
      showLeft1: !this.data.showLeft1,
      currentContent: curContent,
      // district:district,
      town: town + district,
      defaultakey: key
    });
    // this.setData({ 
    //   currentContent:curContent
    // });
  },
  changeTabStyle(event) { //改变tab选项卡颜色
    let cur = event.currentTarget.dataset.current;
    let town = event.currentTarget.dataset.town;

    console.log(cur)
    this.setData({
      'currentTab': cur,
      district: '全部',
      currentContent: 0,
      town: town + '全城',
      // array:this.data.default,

    })
  },
  handleClick() {
    console.log('handleClick')
  },
  data: {
    showLeft1: false,
    showRight:false,
    activeDefault: true,
    currentTab: 0, // 初始化tab 卡为0
    currentRight:0,
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
    defaultakey: '深圳市',
    scrollTop: 0,//置顶插件
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
  },
  onLoad: function () {

    this.setData({
      defaulta: distractList.distractList
    })
 
    // this.data.postList = postsData.postList
    // this.setData({
    //   postList: postsData.postList
    // });
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


  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

})