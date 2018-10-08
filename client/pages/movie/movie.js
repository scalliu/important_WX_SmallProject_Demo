var API_URL = "https://api.douban.com/v2/movie/subject/";
var API_URL1 = 'https://douban.uieee.com/v2/movie/top250';
Page({
	data:{
		movie:{}
	},
	onLoad:function (params){
		// console.log(params);
		var that = this;
		// console.log(  params.id)
		console.log( "API_URL,params.id")
		
			
		wx.request({
		  url: API_URL1, 
		  // data: {},
		  header: {
		      'Content-Type': 'application/xml'
		  },
		  success: function(res) {
		    console.log(res.data)
		   
		  }
		})
		// wx.request({
		//   url: API_URL+params.id, 
		//   data: {},
		//   header: {
		//       'Content-Type': 'application/json'
		//   },
		//   success: function(res) {
		//     // console.log(res.data)
		//     that.setData({
		//     	movie: res.data
		//     });
		//   }
		// })
	}
});