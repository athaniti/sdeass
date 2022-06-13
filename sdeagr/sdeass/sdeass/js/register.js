function init() {
	/* For phonegap app
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
	*/
	/* For web server */
	$("#registerForm").on("submit",handleRegistration);
	};


	function checkPreAuth() {
		/* For phonegap app
		  console.log("Check Pre Auth");
		*/
		/*
	    var form = $("#registerForm");
	    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
	        $("#username", form).val(window.localStorage["username"]);
	        $("#password", form).val(window.localStorage["password"]);
	        handleRegistration();
	        
	    }
		*/
	};


function findUser(data) {
	//var employee = data.item;
	//alert(data.user.name);
	var form = $("#loginForm");    
	window.localStorage["username"] = data.user.email;
	window.localStorage["password"] = $("#password", form).val(); 
	window.localStorage["userid"] = data.uid;
	alert('Registration Succesfull');
	//window.location.replace("fpage.html");
	
}

	function handleRegistration() {
	    var form = $("#registerForm");    
	    //disable the button so we can't resubmit while we wait
	    $("#regsubmitButton",form).attr("disabled","disabled");
	    var email = $("#regusername", form).val();
	    var pass = $("#regpassword", form).val();
	    var repass = $("#reregpassword", form).val();
	    var name = $("#regname", form).val();
	    //console.log("click");
	    if (pass != repass)
	    {
		alert('Passwords are not the same. Try Again.');
		return false;
	    }
	    if(email != '' && pass!= '') 
	    {
		$.getJSON('http://athaniti.zapto.org:81/qrenvs/index.php?tag=register&name='+name+'&email='+email+'&password='+pass+'&callback=?', findUser);
	                
	        $("#regsubmitButton").removeAttr("disabled");
	    } else {
	        
	        //navigator.notification.alert("You must enter a username and password", function() {});
		alert('You must enter a username and password.');
	        $("#regsubmitButton").removeAttr("disabled");
	    }
	    return false;
	};


	function deviceReady() {
	    
	    $("#registerForm").on("submit",handleRegistration);

	};

	
	
	
	