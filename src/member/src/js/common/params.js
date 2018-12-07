define(function(){
	var url=location.search;
	var params={};
	if(url.indexOf('?')!=-1){
		url=url.substr(1);
		url.split('&').forEach(function(item){
			params[item.split('=')[0]]=item.split('=')[1];
		});
	}
	return params;
})