function init() {
	/* For phonegap app
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
	*/
	/* For web server */
	$("#loginForm").on("submit",handleLogin);
	};
//	document.getElementById('fpmessage').style.visibility = 'hidden';
		


	function checkPreAuth() {
		/* For phonegap app
		  console.log("Check Pre Auth");
		*/
		document.getElementById('fpmessage').style.visibility = 'hidden';
	    var form = $("#loginForm");
	    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
	        $("#username", form).val(window.localStorage["username"]);
	        $("#password", form).val(window.localStorage["password"]);
	        handleLogin();
	        
	    }
	};


function findUser(data) {
	//var employee = data.item;
	//alert(data.error);
	if (data.error==1) {
		//code
		$("#fpmessage").html("Λάθος κωδικός ή όνομα χρήστη! Προσπαθήστε ξανά.");
	}
	
	var form = $("#loginForm");    
	//window.localStorage["username"] = data.user.username;
	window.localStorage["username"] = $("#password", form).val(); 
	window.localStorage["password"] = $("#password", form).val(); 
	window.localStorage["name"] = data.user.fname + ' ' + data.user.lname;;
	window.localStorage["userid"] = data.uid;
	//alert(data.user.userrole);
	if (data.user.role =='1') {
		window.location.replace("fpage.html?userid="+data.uid);
	}
	else if (data.user.role =='2') {
		window.location.replace("admin/fpage.html?userid="+data.uid);
	}
	else {
		window.location.replace("fpage.html?userid="+data.uid);
	}
	
	
	
}

	function handleLogin() {
	    var form = $("#loginForm");    
	    //disable the button so we can't resubmit while we wait
	    $("#submitButton",form).attr("disabled","disabled");
	    var u = $("#username", form).val();
	    var p = $("#password", form).val();
	    //console.log("click");
	    if(u != '' && p!= '') 
	    {
		$.getJSON(websvcroot+'services.php?tag=login&username='+u+'&password='+p+'&callback=?', findUser);
	                
	        $("#submitButton").removeAttr("disabled");
	    } else {
	        
	        //navigator.notification.alert("You must enter a username and password", function() {});
		$("#fpmessage").html("Πρέπει να δώσετε όνομα χρήστη και κωδικό!");
		document.getElementById('fpmessage').style.visibility = 'visible';
		//alert('You must enter a username and password');
	        $("#submitButton").removeAttr("disabled");
	    }
	    return false;
	};
	
	


	function deviceReady() {
	    
	    $("#loginForm").on("submit",handleLogin);

	};

	
	
	
	
