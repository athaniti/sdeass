var pid = getUrlVars()["projectid"];
function fillProjectDetails() {
		/* For phonegap app
		  console.log("Check Pre Auth");
		*/
		//alert('1');
		//var uid = getUrlVars()["userid"];
	 
	
	    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
	        $.getJSON(websvcroot+'services.php?tag=getprojectdetails&projectid='+pid+'&callback=?', fillTheProjectPage);
	        
	    }
	}
	
function fillTheProjectPage(data) {
	var project = $('#project');
	var teachers = $('#teachers');
	var students = $('#students');
	var otherteachers = $('#otherteachers');
	var otherstudents = $('#otherstudents');
	
	
	
	var items = data.projectdetails;
	//console.log(items);
	
	project.html("");
	
	$.each(items, function(key, val) {
		project.html("Project: " + val.projectName);
		});
	
	items = data.responsibles;
	//console.log(items);
	teachers.html("<h2>Υπεύθυνοι Καθηγητές</h2>");
	
	$.each(items, function(key, val) {
		var newel =   document.createElement('li');
		newel.className = "listitems";
                var admtext = '';
                if (isAdmin == 1)
                {
                       admtext =  ' <a href="javascript:removeResp('+pid+','+val.userid+');"><img src="'+websderoot+'images/remove_btn.jpg" height="14px" /></a>';
                }
		teachers.append($(newel).html(val.userlname + ' ' + val.userfname + admtext + '<br />'));
                });
	
	items = data.otherteachers;
	
	if (isAdmin == 1)
        {
            //console.log(items);
            otherteachers.html("<h2>Άλλοι Καθηγητές</h2>");
            
            $.each(items, function(key, val) {
                    var newel =   document.createElement('li');
                    newel.className = "listitems";
                    var admtext = '';
                    if (isAdmin == 1)
                        {
                               admtext =  ' <a href="javascript:addResp('+pid+','+val.userid+');"><img src="'+websderoot+'images/add_btn.jpg" height="14px" /></a>';
                        }
                    otherteachers.append($(newel).html(val.userlname + ' ' + val.userfname + admtext + '<br />')); 
                    });
        }
        
	items = data.projstudents;
	//console.log(items);
	students.html("<h2>Εκπαιδευόμενοι</h2>");
	
	$.each(items, function(key, val) {
		var newel =   document.createElement('li');
		newel.className = "listitems";
                var admtext = '';
                if (isAdmin == 1)
                        {
                               admtext =  ' <a href="javascript:removeStudent('+pid+','+val.studentid+');"><img src="'+websderoot+'images/remove_btn.jpg" height="14px" /></a>';
                        }
		students.append($(newel).html(val.studentlname + ' ' + val.studentfname + admtext + '<br />')); 
		});
	
        if (isAdmin == 1)
        {
            items = data.otherstudents;
            //console.log(items);
            otherstudents.html("<h2>Άλλοι Εκπαιδευόμενοι</h2>");
            
            $.each(items, function(key, val) {
                    var newel =   document.createElement('li');
                    newel.className = "listitems";
                    otherstudents.append($(newel).html(val.studentlname + ' ' + val.studentfname + ' <a href="javascript:addStudent('+pid+','+val.studentid+');"><img src="'+websderoot+'images/add_btn.jpg" height="14px" /></a><br />')); 
                    });
        }
		
}

function addResp(pid, uid) {
	$.getJSON(websvcroot+'services.php?tag=addprojectresp&projectid='+pid+'&userid='+uid+'&callback=?', fillTeachers);
}

function removeResp(pid, uid) {
	$.getJSON(websvcroot+'services.php?tag=removeprojectresp&projectid='+pid+'&userid='+uid+'&callback=?', fillTeachers);
}

function addStudent(pid, uid) {
	$.getJSON(websvcroot+'services.php?tag=addprojectstudent&projectid='+pid+'&studentid='+uid+'&callback=?', fillStudents);
}

function removeStudent(pid, uid) {
	$.getJSON(websvcroot+'services.php?tag=removeprojectstudent&projectid='+pid+'&studentid='+uid+'&callback=?', fillStudents);
}

function fillTeachers(data) {
	var teachers = $('#teachers');
	var otherteachers = $('#otherteachers');
	
	
	items = data.responsibles;
	//console.log(items);
	teachers.html("<h2>Υπεύθυνοι Καθηγητές</h2>");
	
	$.each(items, function(key, val) {
		var newel =   document.createElement('li');
		newel.className = "listitems";
                var admtext = '';
                if (isAdmin == 1)
                        {
                               admtext =  ' <a href="javascript:removeResp('+pid+','+val.userid+');"><img src="'+websderoot+'images/remove_btn.jpg" height="14px" /></a>';
                        }
		teachers.append($(newel).html(val.userlname + ' ' + val.userfname + admtext + '<br />')); 
		});
	
        if (isAdmin == 1)
            {
                        items = data.otherteachers;
                        //console.log(items);
                        otherteachers.html("<h2>Άλλοι Καθηγητές</h2>");
                        
                        $.each(items, function(key, val) {
                                var newel =   document.createElement('li');
                                newel.className = "listitems";
                                var admtext = '';
                                if (isAdmin == 1)
                                        {
                                               admtext =  ' <a href="javascript:addResp('+pid+','+val.userid+');"><img src="'+websderoot+'images/add_btn.jpg" height="14px" /></a>';
                                        }
                                otherteachers.append($(newel).html(val.userlname + ' ' + val.userfname + admtext + '<br />')); 
                                });
            }
		
		
}

function fillStudents(data) {
	var students = $('#students');
	var otherstudents = $('#otherstudents');
	
		
	items = data.projstudents;
	//console.log(items);
	students.html("<h2>Εκπαιδευόμενοι</h2>");
	
	$.each(items, function(key, val) {
		var newel =   document.createElement('li');
		newel.className = "listitems";
                var admtext = '';
                if (isAdmin == 1)
                        {
                               admtext =  ' <a href="javascript:removeStudent('+pid+','+val.studentid+');"><img src="'+websderoot+'images/remove_btn.jpg" height="14px" /></a>';
                        }
		students.append($(newel).html(val.studentlname + ' ' + val.studentfname + admtext + '<br />')); 
		});
	
        if (isAdmin == 1)
            {
                        items = data.otherstudents;
                        //console.log(items);
                        otherstudents.html("<h2>Εκπαιδευόμενοι</h2>");
                        
                        $.each(items, function(key, val) {
                                var newel =   document.createElement('li');
                                newel.className = "listitems";
                                 var admtext = '';
                                if (isAdmin == 1)
                                        {
                                               admtext =  ' <a href="javascript:addStudent('+pid+','+val.studentid+');"><img src="'+websderoot+'images/add_btn.jpg" height="14px" /></a>';
                                        }
                                otherstudents.append($(newel).html(val.studentlname + ' ' + val.studentfname + admtext + '<br />')); 
                                });
            }
}

	
	
	
	