var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
    data: {
        isPlayingMusic: false,
        isCollect: false,
        backgroundAudioManager:''

    },
    onLoad: function (option) {
  
        var g_isPlayingMusic = app.globalData.g_isPlayingMusic;//获取全局播放状态变量
        
        this.setData({
            isPlayingMusic: g_isPlayingMusic
        });
        
        console.log(this.data.isPlayingMusic,'初始化全局变量');
        var postId = option.Id;
        console.log(postsData)

        var postData = postsData.postList[postId];
        this.setData({
            postData: postData
        });

        // 是否选中
        var isCollect = wx.getStorageSync('collect');
        console.log(isCollect)
        if (isCollect) {
            this.setData({
                isCollect: isCollect
            })
        }
        //在生命周期 onLoad 里面获取参数


        // const backgroundAudioManager = wx.getBackgroundAudioManager();
        // backgroundAudioManager.title = '此时此刻'
        // backgroundAudioManager.epname = '此时此刻'
        // backgroundAudioManager.singer = '许巍'
        // backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
        // backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
        // this.setData({
        //     "backgroundAudioManager":backgroundAudioManager
        // })


    },

    setMusicMonitor: function () {

    },

    onColletionTap: function (event) {
        this.setData({
            isCollect: !this.data.isCollect
        })
        wx.setStorageSync('collect', this.data.isCollect)
    },

    getPostsCollectedAsy: function () {

    },

    getPostsCollectedSyc: function () {

    },

    showModal: function (postsCollected, postCollected) {

    },

    showToast: function (postsCollected, postCollected) {

    },

    onShareTap: function (event) {

    },

    onMusicTap: function (event) {

    },
    onPlayMusic: function (event) {
        const isPlayingMusic = this.data.isPlayingMusic
        this.setData({
            isPlayingMusic: !isPlayingMusic
        });

        console.log(!isPlayingMusic,'<<<===')
        if(!isPlayingMusic){ //true 表示播放
            console.log('播放')

            // this.data.backgroundAudioManager.play()
            wx.playBackgroundAudio({
                dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',
                title: '123',
                coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
            })
            app.globalData.g_isPlayingMusic = true;
        }else{
            console.log('暂停')
            // this.data.backgroundAudioManager.pause();//暂停
            wx.pauseBackgroundAudio();
            app.globalData.g_isPlayingMusic = false;

        }


        // 全局
        // const backgroundAudioManager = wx.getBackgroundAudioManager()
        // console.log('===>',backgroundAudioManager)
    },

    /*
     * 定义页面分享函数
     */
    onShareAppMessage: function (event) {
        return {
            // title: '离思五首·其四1',
            // desc: '曾经沧海难为水，除却巫山不是云2',
            // imageUrl:'自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。',
            // path: '/pages/posts/post-detail/post-detail?id=0'
        }
    }

})