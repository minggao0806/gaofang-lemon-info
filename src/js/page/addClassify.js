require(['../js/config.js'], function() {
	require(['mui','parmas'],function(mui,parmas){
		mui.init();
		mui.ajax('/classify/api/iconlist',{
			dataType : 'json',
			success:function(data){
				console.log(data)
				var count = Math.ceil(data.data.length/8)
				var arr = [];
				for(var i=0;i<count;i++){
					arr.push(data.data.splice(0,8));
				}
				console.log(arr)
				rander(arr)
			}
		})
		
		
		//渲染页面
		function rander(item){
			var str = ''
			item.forEach((i) => {
				str+=`<div class="mui-slider-item">
							<div class='swiper'>
						`
				i.forEach((list) => {
					str += `
						<div class='icon-list'>
							<span class='${list.icon_name}'></span>
						</div>
					`
				})
				str += `</div></div>`
			})
			mui('.mui-slider-group')[0].innerHTML=str;
			mui('.mui-slider').slider();
		}
		
		mui('.mui-slider').on('tap','span',function(){
			var iconName = this.getAttribute('class');
			mui('.cname')[0].getElementsByTagName('span')[0].className = iconName;
		})
		mui('.save-btn')[0].addEventListener('tap',function(){
			var c_type = decodeURI(parmas.type),
				c_name = mui('#inp')[0].value,
				c_icon = mui('.cname span')[0].className,
				uid = localStorage.getItem('user');
			mui.ajax('/classify/api/addClassify',{
				dataType : 'json',
				type : 'post',
				data : {
					uid : uid,
					c_type : c_type,
					c_name : c_name,
					c_icon : c_icon
				},
				success : function(data){
					if(data.code == 1){
						console.log(23123)
						console.log(data)
						location.href = '../../page/addBill.html'
					}
				}
				
			})
			console.log(c_name)
		})
	})
})