Page({
  data: {
  
    ProPackageList: []
       
    
  },
  goProduct() {},
  onLoad() { 
    var _self = this  
    wx.request({
      url: "https://api.wqbol.net/ProPackage/ProPackageList", //,string		是	开发者服务器接口地址
      data: {}, //	string/object/ArrayBuffer		否	请求的参数
      header: { "content-type": "application/json" }, //	Object		否	设置请求的 header，header 中不能设置 Referer。

      method: "GET", //	string	GET	否	HTTP 请求方法
      dataType: "json", //	string	json	否	返回的数据格式
      success: function(res) { 
        _self.setData({
            'ProPackageList':res.data.data.list
        }) 
      }, //function		否	接口调用成功的回调函数
      fail: function(res) { 
      }, //function		否	接口调用失败的回调函数
      complete: function(res) { 
      }  
    });
  },
  onShow() {
    
  },
  goProductPage(event){
    
      
   var Id = event.currentTarget.dataset.id;
     
    wx.navigateTo({url: `/pages/productDetail/productDetail?Id=${Id}`});
      
  }
});
