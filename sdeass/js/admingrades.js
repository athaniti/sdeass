function init() {
	/* For phonegap app
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
	*/
	/* For web server */
	$("#gradesForm").on("submit",registerGrades);
	
};

function registerGrades() {
	var studentid = getUrlVars()["studentid"];
			var teacherid = getUrlVars()["teacherid"];
	       var form = $("#gradesForm"); 
	    var a = $("#atetramino", form).val();
	    var b = $("#btetramino", form).val();
	    //console.log("click");
	    
		$.getJSON(websvcroot+'services.php?tag=gradeupd&a='+a+'&b='+b+'&eduyear=1213&studentid='+studentid+'&teacherid='+teacherid+'&callback=?', function(data) {
            //validate the response here, set variables... whatever needed
                //and if credentials are valid, forward to the next page
        	//store
        	//console.log("success login");
        	//alert(data.success);
        	if (data.success == '1') {
				//return data.userrole;
		}
			return '-1';
        });
	                
	        
	    
	    return false;
	};

var getStudentGrades = function(studentid, teacherid){
	//var form = $("#gradesForm"); 
	$.getJSON(websvcroot+'services.php?tag=grade&eduyear=1213&studentid='+studentid+'&teacherid='+teacherid+'&callback=?',
	    function(data) {
            //validate the response here, set variables... whatever needed
                //and if credentials are valid, forward to the next page
        	//store
        	//console.log("success login");
        	//alert(data.success);
        	if (data.success == '1') {
				//return data.userrole;
				$("#atetramino").html(data.studentgrades[0].description);
				$("#btetramino").html(data.studentgrades[1].description);

		}
			return '-1';
        });
};





	
	
	
	