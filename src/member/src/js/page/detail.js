require(['../js/config.js'],function(){
	require(['mui','dom','params'],function(mui,dom,params){
		mui.init();
		var id=params.id;
		if(id){
			mui.ajax('/users/api/detail',{
				data:{
					id:id
				},
				success:function(res){
					if(res.code===1){
						var data=res.data[0];
						dom('.name').innerHTML=data.name;
						dom('.address').innerHTML=data.address||'无';
						dom('.phone').innerHTML=data.phone||'无';
						dom('.idcard').innerHTML=data.idcard;
					}
				}
			})
		}
		//点击修改
		dom('.edit-btn').addEventListener('tap',function(){
			if(id<=6){
				mui.toast('您没有此权限！');
			}else{
				location.href='../../page/add.html?id='+id;
			}
		})
	});
});