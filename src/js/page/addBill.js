require(['../js/config.js'], function() {
	require(['mui','picker','poppicker','dtpicker'],function(mui){
		var type = '支出',
			time = null,
			cid = '';
		
		mui.init();
		
		
		
		//点击事件
		addEvent();
		
		
		//请求数据
		getData()
		
		
		function getData(){
			mui.ajax('/classify/api/getClassify',{
				dataType : 'json',
				data:{
					uid : '545cb6f0-fd0b-11e8-8c36-79fe76baf6e3'
				},
				success : function(data){
					console.log(data);
					var obj = {'支出' :[],'收入':[]}
					if(data.code == 1){
						var icon = {
							'c_icon' : 'mui-icon mui-icon-plus add',
							'c_name' : '自定义'
						}
						data.data.forEach((i) => {
							if(i.c_type == '支出'){
								obj['支出'].push(i);

							}else{
								obj['收入'].push(i);
							}
						})
						if(type == '支出'){
							obj['支出'].push(icon);

						}else{
							
							obj['收入'].push(icon);
						}
					}
					console.log(obj)
					render(obj)
				}
			});
		}
		
		
		
		function render(obj){
			for(var k in obj){
				if(k == type){
					console.log(obj[k].length);
					
					var arr = [];
					var count = Math.ceil(obj[k].length/8);
					
					for(var i=0;i<count;i++){
						arr.push(obj[k].splice(0,8))
					}
					var str = ''
					arr.forEach((i) => {
						str += `
							<div class="mui-slider-item">
								<div>`
							i.forEach((ele) => {
								str += `<dl>
											<dt><span class="${ele.c_icon}" data-id="${ele.cid}"></span></dt>
											<dd>${ele.c_name}</dd>
										</dl>`
							})	
						str += `</div>
					</div>`
					});
					mui('.mui-slider-group')[0].innerHTML = str
				}
			}
		}
		
		function addEvent(){
			mui('.bill-choose').on('tap','span',function(){
				for(var i=0;i<mui('.bill-choose span').length;i++){
					mui('.bill-choose span')[i].classList.remove('active')
				}
				this.classList.add('active');
				type = this.innerHTML;
				console.log(type);
				getData();
				mui('.mui-slider').slider().gotoItem(0);
				mui('.mui-slider').slider();
			})
			
			mui('.mui-slider-group').on('tap','span',function(){
				for(var i=0;i<mui('.mui-slider-group span').length;i++){
					mui('.mui-slider-group span')[i].classList.remove('active')
				}
				this.classList.add('active');
				cid = this.getAttribute('data-id')
				if(this.className == 'mui-icon mui-icon-plus add'){
					location.href = '../page/addClassify.html?type='+type
				}
			})
			
			//点击弹出日期
			
			mui('.select-time')[0].addEventListener('tap',function(){
				var dtPicker = new mui.DtPicker({
					type : 'date'
				}); 
				dtPicker.show(function (selectItems) { 
					console.log(selectItems.y);//{text: "2016",value: 2016} 
					console.log(selectItems.m);
					console.log(selectItems.d);
					mui('.date')[0].innerHTML = selectItems.m.text + '月' + selectItems.d.text + '日';
					date = selectItems.y + '-' + selectItems.m + '-' + selectItems.d.text
				})
				
				console.log(23424)
			})
			
			//点击键盘
			mui('.keyword').on('tap','span',function(){
				var money = mui('.money')[0].innerHTML;
				
				if(this.innerHTML == 'x'){
					
					if(mui('.money')[0].innerHTML.length > 1){
						console.log(money)
						mui('.money')[0].innerHTML = money.substr(0,mui('.money')[0].innerHTML.length-1)
					}else{
						mui('.money')[0].innerHTML = '00.00'
					}
					return
				}
				
				
				if(mui('.money')[0].innerHTML == '00.00'){
					mui('.money')[0].innerHTML = ''
					mui('.money')[0].innerHTML += this.innerHTML;
				}else if(mui('.money')[0].innerHTML.indexOf('.') != -1 && this.innerHTML == '.'){
					mui('.money')[0].innerHTML = money
				}else if(mui('.money')[0].innerHTML.indexOf('.') != -1 && mui('.money')[0].innerHTML.split('.')[1].length == 2){
					mui('.money')[0].innerHTML = money
				}else{
					mui('.money')[0].innerHTML += this.innerHTML;
				}
				
				if(this.innerHTML == '完成'){
					var uid = localStroage.getItem('user'),
						timer = time,
						money = mui('money')[0].innerHTML;
					mui.ajax('/bill/api/addBil',{
						type : 'post',
						dataType : 'json',
						success : function(res){
							console.log(res)
						}
					})
				}
			})
			
			
		}
	})
})