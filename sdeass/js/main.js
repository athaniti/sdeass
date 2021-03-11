var sderoot='/sdeass/';
var homepage = 'index.html';
var websderoot='/sdeass/';
var websvcroot = '/sde/websvc/';
var eduyear = getSelectedAcademicYear();
var userid = window.localStorage["userid"];
var isAdmin = 0;
if (userid==100){ isAdmin=1;}


function getMenu() {
    if (userid==100){ isAdmin=1;}
    var hpage = '';
    if (isAdmin==1) {hpage = 'admin/';}
    document.write('<div class="navbar-collapse collapse"><ul class="nav navbar-nav">');
    document.write('<li><a href="'+sderoot+hpage+'fpage.html?userid='+userid+'">Αρχική Σελίδα</a></li>');
    if (isAdmin==0){
        document.write('<li class="dropdown">');
        document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown">Αξιολογήσεις <span class="caret"></span></a>');
        document.write('<ul class="dropdown-menu" role="menu">');
        document.write('<li><a href="'+sderoot+'educators/gradesperstudent.html?teacherid='+userid+'&eduyear='+eduyear+'" class="menubtn">Γραμματισμός</a></li>');
	document.write('<li><a href="'+sderoot+'educators/gradesprojects.html?teacherid='+userid+'&eduyear='+eduyear+'" class="menubtn">Project - Εργαστήρια</a></li>');
	document.write('</ul></li>');
    }
    document.write('<li class="dropdown">');
              document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown">Ρυθμίσεις <span class="caret"></span></a>');
    document.write('<ul class="dropdown-menu" role="menu">');


    document.write('<li><a href="#"  onClick="gotoProfil();">Προφίλ Χρήστη</a></li>');
    document.write('<li><a href="#"  onClick="changePass();">Αλλαγή Κωδικού</a></li>');
    document.write('<li><a href="#" onClick="logout();">Αποσύνδεση</a></li>');
    document.write('</ul></li>');
    document.write('<li class="active"><a href="#">Σχ. Έτος: <span id="eduyear">'+eduyear+'</span></a></li>');
    document.write('</ul>');
    document.write('<select id="academicyear" class="selectpicker btn" style="margin-top:10px;"><option value="1112">1112</option><option value="1213">1213</option><option value="1314">1314</option><option value="1415">1415</option><option value="1516">1516</option><option value="1617">1617</option><option value="1718">1718</option><option value="1819">1819</option><option value="1920">1920</option><option value="2021">2021</option><option value="2122">2122</option><option value="2223">2223</option><option value="2324">2324</option></select></div>');





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

function getCurrentAcademicYear() {
    var currentAcademicYear='';

    //alert('bika');
    var d = new Date();
    var mon = d.getMonth();
    var yr='';

    if (mon<8)
    {
	currentAcademicYear = (d.getFullYear()-1).toString().substr(2,2) + d.getFullYear().toString().substr(2,2);
    }
    else
    {
	currentAcademicYear = d.getFullYear().toString().substr(2,2) + (d.getFullYear()+1).toString().substr(2,2);
    }

    //return document.getElementById("eduyear").innerHTML;
    return currentAcademicYear;
}

function getPreviousAcademicYear() {
    var prevAcademicYear='';

    //alert('bika');
    var d = new Date();
    var mon = d.getMonth();
    var yr='';
    //alert(d);
    if (mon<8)
    {
	prevAcademicYear = (d.getFullYear()-2).toString().substr(2,2) + (d.getFullYear()-1).toString().substr(2,2);
    }
    else
    {
	prevAcademicYear = (d.getFullYear()-1).toString().substr(2,2) + d.getFullYear().toString().substr(2,2);
    }

    //return document.getElementById("eduyear").innerHTML;
    return prevAcademicYear;
}

function getSelectedAcademicYear() {
    var selectedAcademicYear='';
    if(window.localStorage["eduyear"]!= '' && window.localStorage["eduyear"]!= undefined)
    {
	//alert('tpt');
	selectedAcademicYear=window.localStorage["eduyear"];
    }
    else
    {
	//alert('bika');
	var d = new Date();
	var mon = d.getMonth();
	var yr='';

	if (mon<8)
	{
	    selectedAcademicYear = (d.getFullYear()-1).toString().substr(2,2) + d.getFullYear().toString().substr(2,2);
	}
	else
	{
	    selectedAcademicYear = d.getFullYear().toString().substr(2,2) + (d.getFullYear()+1).toString().substr(2,2);
	}
	window.localStorage["eduyear"] = selectedAcademicYear;
    }
    //return document.getElementById("eduyear").innerHTML;
    return selectedAcademicYear;
}

function isLoggedIn() {
	if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined)
	{
		return true;
	}
	else
	{
		window.location.replace(homepage);
	}
}

function logout() {
	localStorage.clear();
	window.location.replace(sderoot+"/"+homepage);
}

function changePass() {
	window.location.replace(sderoot+"changepassword.html");
}

function gotoProfil() {
	window.location.replace(sderoot+"profil.html");
}



var getUserRole = function(userid){
	$.getJSON(websvcroot+'services.php?tag=role&userid='+window.localStorage["userid"]+'&callback=?',
	    function(data) {
            //validate the response here, set variables... whatever needed
                //and if credentials are valid, forward to the next page
        	//store
        	//console.log("success login");
        	//alert(data.success);
        	if (data.success == '1') {
				return data.userrole;
		}
			return '-1';
        });
};

var resetPass = function(userid){
	$.getJSON(websvcroot+'services.php?tag=resetpass&userid='+userid+'&callback=?',
	    function(data) {
            //validate the response here, set variables... whatever needed
                //and if credentials are valid, forward to the next page
        	//store
        	//console.log("success login");
        	//alert(data.success);
        	if (data.success == '1') {
		    return data.success;
		}
		    return '-1';
		});
};

function showRegForm() {
    window.location.replace("register.html");
}



var getAllDocs = function() {
	window.location.replace("allDocuments.html");
};



function getProjectsForUser() {
    var uid = getUrlVars()["userid"];
    var eduyear = getUrlVars()["eduyear"];


    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
	$.getJSON(websvcroot+'services.php?tag=getuserprojects&userid='+userid+'&eduyear='+eduyear+'&callback=?', fillTheProjects);

    }
}

function fillTheProjects(data) {
	var projectsList = $('#projects');


	var items = data.projects;
		//console.log(items);

		projectsList.html("");

		$.each(items, function(key, val) {
			var newel =   document.createElement('li');
			newel.className = "lessons";
			projectsList.append($(newel).html('<a class="adminbtn" href="projectgrades.html?projectid='+val.projectid+'">'+val.projectname+'</a>'));
			});

}
