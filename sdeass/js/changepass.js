function init() {
	/* For phonegap app
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
	*/
	/* For web server */
	$("#chpassForm").on("submit",handleAction);
	
	};


	function checkPreAuth() {
		/* For phonegap app
		  console.log("Check Pre Auth");
		*/
		
	    var form = $("#loginForm");
	    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
	        $("#username", form).val(window.localStorage["username"]);
	        $("#password", form).val(window.localStorage["password"]);
	        handleLogin();
	        
	    }
	};


function setMsg(data) {
	//var employee = data.item;
	//alert(data.user.name);
	var form = $("#chpassForm");    
	//alert(data.user.userrole);
	if (data.success == '1'){
		$("#actionres").html('Επιτυχής αλλαγή κωδικού!');
	}
	else {
		$("#actionres").html('Αποτυχία στην αλλαγή κωδικού! '+data.error_msg);
	}
	
	
}

	function handleAction() {
		var userid = window.localStorage["userid"]
	    var form = $("#chpassForm");    
	    //disable the button so we can't resubmit while we wait
	    $("#submitButton",form).attr("disabled","disabled");
	    var u = $("#pass1", form).val();
	    var p = $("#pass2", form).val();
	    //console.log("click");
	    if((u != '' && p!= '') && (u == p))
	    {
		$.getJSON(websvcroot+'/services.php?tag=chpass&userid='+userid+'&password='+p+'&callback=?', setMsg);
	                
	        $("#submitButton").removeAttr("disabled");
	    } else {
	        
	        //navigator.notification.alert("You must enter a username and password", function() {});
		alert('You must enter a username and password or passwords are not identical');
	        $("#submitButton").removeAttr("disabled");
	    }
	    return false;
	};
	
	


	
	
	
	
	