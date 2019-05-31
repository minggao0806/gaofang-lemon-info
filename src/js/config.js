require.config({
	baseUrl : "/js/",
	paths : {
		'mui' : './libs/mui.min',
		'picker':'./libs/mui.picker',
		'poppicker' : "./libs/mui.poppicker",
		'dtpicker' : "./libs/mui.dtpicker",
		'echarts' : './libs/echarts.min',
		'parmas' : './common/get-params'
	},
	shim:{
		'picker' : {
			deps : ['mui']
		},
		'poppicker' : {
			deps : ['mui']
		},
		'dtpicker' : {
			deps : ['mui']
		}
	}
})