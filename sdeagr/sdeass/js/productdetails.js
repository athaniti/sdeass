$('#detailsPage').live('pageshow', function(event) {
	var pid = getUrlVars()["pid"];
	getProductDetails(pid);
	//$.getJSON('http://10.0.2.2:8888/ah_login_api/get_product_details.php?pid='+id, displayProduct);
});

function getProductDetails(pid){
	$.getJSON('http://athaniti.zapto.org:81/qrenvs/get_product_details.php?pid='+pid+'&callback=?',
	    function(data) {
		displayProduct(data);
            
        });
	
}

function displayProduct(data) {
	var product = data.product[0];
	//console.log(product);
	//$('#employeePic').attr('src', 'pics/' + product.picture);
	$('#productName').text(product.name);
	$('#productPrice').text('Price: '+product.price);
	$('#productDescription').text('Description: '+product.description);
	$('#productStatus').text('Status: '+product.status);
	if (product.created_at !='0000-00-00 00:00:00') {
		$('#created_at').text('Creation Date: '+product.created_at);
	}
	else
	{
		$('#created_at').text('Creation Date: ');
	}
	if (product.updated_at !='0000-00-00 00:00:00') {
		$('#updated_at').text('Last modification date: '+product.updated_at);
	}
	else
	{
		$('#updated_at').text('Last modification date: ');
	}
	$('#pcode').text('Document Code: '+product.pcode);
	$('#address').text('Recipient Address: '+product.address);
	$('#phone').text('Recipient Phone: '+product.phone);
	
	$('#actionList').listview('refresh');
	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
