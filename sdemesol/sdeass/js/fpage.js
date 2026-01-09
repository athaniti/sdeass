var impFile = function(edyear){
	$.getJSON(websvcroot+'impsvc.php?eduyear='+edyear+'&callback=?',
	    function(data) {
            //validate the response here, set variables... whatever needed
                //and if credentials are valid, forward to the next page
        	//store
        	//console.log("success login");
        	//alert(data.success);
        	if (data.success == '1') {
			$('#impResults').html("Succesfull Import of Excel Data!");
				return "Success!";
				
		}
			return '-1';
        });
};

var newYear = function(oldedyear, newedyear){
	$.getJSON(websvcroot+'services.php?tag=newyear&oldeduyear='+oldedyear+'&neweduyear='+newedyear+'&callback=?',
	    function(data) {
            //validate the response here, set variables... whatever needed
                //and if credentials are valid, forward to the next page
        	//store
        	//console.log("success login");
        	//alert(data.success);
        	if (data.success == '1') {
			$('#newyearResults').html("Succesfull Change of Academin Year! New Academic year is "+newedyear);
				return "Success!";
				
		}
			return '-1';
        });
};

var uid = getUrlVars()["userid"];
function fillPage() {
		/* For phonegap app
		  console.log("Check Pre Auth");
		*/
		//alert('1');
		//var uid = getUrlVars()["userid"];
	getUserRespClass(userid);
	getUserProjects(userid);
	 
	
	    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
	        $.getJSON(websvcroot+'services.php?tag=getuserlessons&userid='+userid+'&callback=?', fillThePage);
	        
	    }
	}
	
function fillThePage(data) {
	var lessonList = $('#lessons');
	var tname = $('#teachername');
	
	
	var items = data.lessons;
		//console.log(items);
		tname.html("");
		tname.append(window.localStorage["name"]);
		lessonList.html("");

		$.each(items, function(key, val) {
			var newel =   document.createElement('li');
			newel.className = "lessons";
			lessonList.append($(newel).html('<button onClick="getUserLessonClasses('+val.lessonid+','+userid+');">'+val.lessonname+'</button>')); 
			});
		
}

function getUserLessonClasses(lessonid, userid) {
	$.getJSON(websvcroot+'services.php?tag=getuserclasses&lessonid='+lessonid+'&userid='+userid+'&callback=?', fillClasses);
}

function getUserProjects(userid) {
	$.getJSON(websvcroot+'services.php?tag=getuserprojects&userid='+userid+'&eduyear='+eduyear+'&callback=?', fillProjects);
}

function getUserRespClass(userid) {
	$.getJSON(websvcroot+'services.php?tag=getuserrespclass&userid='+userid+'&callback=?', fillClass);
}


function fillClasses(data) {
	var classesList = $('#classes');
	
	var items = data.classes;
		//console.log(items);
		classesList.html("");

		$.each(items, function(key, val) {
			classesList.append($(document.createElement('li')).html('<a href="'+sderoot+'/educators/students.html?classid='+val.classid+'&lessonid='+val.lessonid+'">'+val.classname+'</a><br />')); 
			});
		
}

function fillProjects(data) {
	var projectsList = $('#projects');
	
	var items = data.projects;
		//console.log(items);
		projectsList.html("");

		$.each(items, function(key, val) {
			projectsList.append($(document.createElement('span')).html('<a href="'+sderoot+'/educators/project.html?projectid='+val.projectid+'">'+val.projectname+'</a><br />')); 
			});
		
}


function fillClass(data) {
	var classesList = $('#respclass');
	var classesAksiologisia = $('#aksiologisia');
	var classesAksiologisib = $('#aksiologisib');
	var classesAksiologisi = $('#aksiologisi');
	
	var items = data.classes;
		//console.log(items);
		classesList.html("");

		$.each(items, function(key, val) {
			classesList.append($(document.createElement('span')).html(val.classname));
			
			classesAksiologisia.append($(document.createElement('span')).html('<a href="'+websvcroot+'expsvc.php?type=w&tag=allstudents&classid='+val.classid+'&semester=a&eduyear='+getCurrentAcademicYear()+'" class="adminbtn"><img src="images/word.jpg" border="0" height="25px" /> Εξαγωγή αξιολόγησης σε word ανά Εκπαιδευόμενο (Α Τετραμήνο) για το '+val.classname+'</a><br />'));
			classesAksiologisib.append($(document.createElement('span')).html('<a href="'+websvcroot+'expsvc.php?type=w&tag=allstudents&classid='+val.classid+'&semester=b&eduyear='+getCurrentAcademicYear()+'" class="adminbtn"><img src="images/word.jpg" border="0" height="25px" /> Εξαγωγή αξιολόγησης σε word ανά Εκπαιδευόμενο (B Τετραμήνο) για το '+val.classname+'</a><br />'));
			
			classesAksiologisi.append($(document.createElement('span')).html('<a href="'+sderoot+'educators/generalgradesperstudent.html?classid='+val.classid+'" class="adminbtn">Καταχώρηση Γενικής Αξιολόγησης ανά Εκπαιδευόμενο για το '+val.classname+'</a><br />'));
			});
		
}

	
	
	
	