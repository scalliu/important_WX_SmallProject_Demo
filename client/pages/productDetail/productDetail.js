Page({
    data: {
        Id: '', //路由参数
        index: 0,
        productObj: {
            firstTabConent: {
                Name: '',
                PackageContent: "",
                Price: '',
                OriginalPrice: '',
                discountPrice: '',
                type: 0, // 0 单品 1 表示套餐
            }
        },
        star1: 0, //星星默认
        star2: 0,
        stat3: 0,
    },
    onLoad(res) {
        console.log('商品详情页面onload');
        //获取参数
        var _self = this;
        // https://api.wqbol.com/ProReview/List
        wx.request({
            url: "https://api.wqbol.com/ProPackage/GetProckageInfoById", //,string		是	开发者服务器接口地址
            data: {Id:res.Id,datatype: 'json'}, //	string/object/ArrayBuffer		否	请求的参数
            // data: {
            //     Id: 'f6e97724-d2d1-4ae4-8cdc-cbca4f285183',
            //     datatype: 'json' //	string/object/ArrayBuffer		否	请求的参数
            // },

            header: {
                "content-type": "application/json"
            }, //	Object		否	设置请求的 header，header 中不能设置 Referer。

            method: "GET", //	string	GET	否	HTTP 请求方法
            dataType: "json", //	string	json	否	返回的数据格式
            success: function (res) {}, //function		否	接口调用成功的回调函数
            fail: function (res) {}, //function		否	接口调用失败的回调函数
            complete: function (res) {}
        });
    },
    onShow(res) {
        console.log(2, res)
    },
    changeTabButton(event) {
        let index = event.currentTarget.dataset.tapid;
        //console.log(event)
        this.setData({
            'index': index
        })
    },
    changeLightStar(event) { //星星
        let tempitem = event.currentTarget.dataset.item;
        let tempstar = event.currentTarget.dataset.star;
        if (tempitem == 'star1') {
            this.setData({
                star1: tempstar
            })
        } else if (tempitem == 'star2') {
            this.setData({
                star2: tempstar
            })
        } else {
            this.setData({
                star3: tempstar
            })
        }

    }
})