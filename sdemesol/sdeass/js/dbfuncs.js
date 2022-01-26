var getDocuments = function() {
	var docList = $('#docList');
	$.getJSON(websvcroot+'qrenvs/get_all_documents.php?userid='+window.localStorage["userid"]+'&callback=?', 
			function(data){
		var items=data.products;
		//console.log(items);
		docList.html("");

		$.each(items, function(key, val) {
			docList.append($(document.createElement('li')).html(val.name)); 
			});
		
	    
});
};

