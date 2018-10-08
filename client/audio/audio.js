var order = ['red', 'yellow', 'blue', 'green', 'red'];

import {goDetailTemplate} from './audio-list/audio-item-template.js'

var postsData = require("../../data/posts-data.js");

 

console.log(postsData.postList)

Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    postData:'',
    ab:[{date: "Sep 18 2016", title: "正是虾肥蟹壮时", imgSrc: "/images/post/crab.png", avatar: "/images/avatar/1.png", content: "菊黄蟹正肥，品尝秋之味。徐志摩把,“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满，" }]
  
  },
  onLoad:function(){
    //先出触发 onload   然后再试onready
    this.setData({
      postList:postsData.postList
     });
     console.log(this.data)
     console.log(this.data.postList)
     
  },
   onReady:function(){
    // this.setData({
    //   postData:listData.postList
    //  });
    // // this.setData({'listData':listData.postList});
    
   }, 
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  
  goDetail :function(e,a) {
     
    var datapostI = e.currentTarget.dataset.postid
    console.log(e.currentTarget);

    wx.navigateTo({
      url: `./audio-detail/audio-detail?Id=${datapostI}`
    })

    // wx.navigateTo({
    //   url: '/pages/posts/post'
    // })

    //  goDetailTemplate();

  },
   
})

