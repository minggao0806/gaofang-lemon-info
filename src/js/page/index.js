require(['./js/config.js'], function() {
	require(['mui','echarts','picker','poppicker', 'dtpicker'], function(mui,echarts) {
		var picker = null,
			dtPicker = null,
			curYear = new Date().getFullYear(),
			curMonth = new Date().getMonth() + 1;
		init()
		function init(){
			mui.init();
			
			//初始化时间
			initDate()
			
			//点击事件
			addEvent();
			
			//初始化图表
			initTable()
			
			//获取用户名
			getUser()
		}
		
		function getUser(){
			localStorage.setItem('user','545cb6f0-fd0b-11e8-8c36-79fe76baf6e3')
		}
		
		
		function initDate(){
			picker = new mui.PopPicker();
			picker.setData([{
				value:'month',
				text : '月'
			},{
				value : 'year',
				text : '年'
			}]);
			
			dtPicker = new mui.DtPicker({type: 'month'});
			
		}
		

		function addEvent() {
			
			//点击选择年月
			mui('.month')[0].addEventListener('tap', function() {
				var that = this;
				picker.show(function (selectItems) {
					console.log(selectItems[0].text);//智子
					console.log(selectItems[0].value);//zz 
					that.innerHTML = selectItems[0].text;
					if(selectItems[0].text == '月'){
						mui('.year')[0].innerHTML = curYear + ' - ' + curMonth;
						mui('.month-click')[0].style.display = 'block';
						mui('.year-click')[0].style.display = 'none';
					}else{
						mui('.year')[0].innerHTML = curYear;
						mui('.month-click')[0].style.display = 'none';
						mui('.year-click')[0].style.display = 'block';
					}
				})
			})
			
			//点击选择年月日
			mui('.year')[0].addEventListener('tap',function(){
				var text = mui('.month')[0].innerHTML,
					that = this;
				console.log(text)
				if(text == '月'){
					dtPicker.show(function(selectItems) {
						console.log(selectItems.y); 
						console.log(selectItems.m);
						that.innerHTML = selectItems.y.text + " - " + selectItems.m.text
					})
					mui('.mui-dtpicker-title h5')[1].style.display = 'inline-block';
					mui('.mui-dtpicker-body>div')[1].style.display = 'inline-block';
					mui('.mui-dtpicker-title h5')[0].style.width = '50%';
					mui('.mui-dtpicker-body>div')[0].style.width = '50%';
					

				}else{
					dtPicker.show(function(selectItems) {
						console.log(selectItems.y); 
						console.log(selectItems.m);
						that.innerHTML = selectItems.y.text;
						
					})
					mui('.mui-dtpicker-title h5')[1].style.display = 'none';
					mui('.mui-dtpicker-body>div')[1].style.display = 'none';
					mui('.mui-dtpicker-title h5')[0].style.width = '100%';
					mui('.mui-dtpicker-body>div')[0].style.width = '100%';
					
				}
			})
			
			
			//账单图标切换
			mui('.choose-center').on('tap','.choose-center-bill',function(){
				var that = this;
				var dataId = this.getAttribute('data-id');
				console.log(dataId);
				for(var i=0;i<mui('.choose-center-bill').length;i++){
					mui('.choose-center-bill')[i].classList.remove('active');
					mui('.mui-scroll-bill')[i].style.display = 'none';
				}
				this.classList.add('active');
				mui('.mui-scroll-bill')[dataId].style.display = 'block';
			})
			
			
			//左划删除
			var btnArray = ['确认', '取消'];
			mui('#OA_task_1').on('tap', '.mui-btn', function(event) {
				var elem = this;
				var li = elem.parentNode.parentNode;
				mui.confirm('确认删除该条记录？','删除', btnArray, function(e) {
					if (e.index == 0) {
						li.parentNode.removeChild(li);
					} else {
						setTimeout(function() {
							mui.swipeoutClose(li);
						}, 0);
					}
				});
			});
			
			
			//点击出现侧菜单
			mui('.choose-left')[0].addEventListener('tap',function(){
				mui('.mui-off-canvas-wrap').offCanvas('show');
			})
			
			//点击关闭侧边栏
			mui('.close-btn')[0].addEventListener('tap',function(){
				mui('.mui-off-canvas-wrap').offCanvas('close');
			})
			
			//阻止默认行为
			 mui('.mui-inner-wrap')[0].addEventListener('drag', function(event) {
                event.stopPropagation()
            })

			
			//点击跳转页面，添加账单
			mui('.add-bill-btn')[0].addEventListener('tap',function(){
				location.href = './page/addBill.html'
			})
			
		}

		function initTable(){
			var myChart = echarts.init(document.getElementById('main'));
			
			option = {
				series: [
					
					{
						name:'访问来源',
						type:'pie',
						radius: ['40%', '55%'],
						
						data:[
							{value:335, name:'直达'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1048, name:'百度'},
							{value:251, name:'谷歌'},
							{value:147, name:'必应'},
							{value:102, name:'其他'}
						]
					}
				]
			};
			
			myChart.setOption(option);
		}

		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		

	})
})
