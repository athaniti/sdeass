// Constructor for an object with two properties
    var Class = function(classid, classname) {
        this.classid = classid;
        this.classname = classname;
    };




var personModel = function(id, studentcode, fname, lname, age, sex, classname, fathername, fathernamegen, address, marital, children,
			   phone, jobstatus, monthsunemployment, isroma, iscurrent, isactive){
  var self = this; //caching so that it can be accessed later in a different context
  this.id = ko.observable(id); //unique id for the student (auto increment primary key from the database)
  this.studentcode = ko.observable(studentcode); //name of the student
  this.fname = ko.observable(fname); //name of the student
  this.lname = ko.observable(lname); //name of the student
  this.age = ko.observable(age);
  this.sex = ko.observable(sex);
  this.classname = ko.observable(classname);
  this.selectedClass = ko.observable(classname);
  this.fathername = ko.observable(fathername);
  this.fathernamegen = ko.observable(fathernamegen);
  this.address = ko.observable(address);
  this.marital = ko.observable(marital);
  this.children = ko.observable(children);
  this.phone = ko.observable(phone);
  this.jobstatus = ko.observable(jobstatus);
  this.monthsunemployment = ko.observable(monthsunemployment);

  this.isroma = ko.observable(isroma);
  this.isromabool = ko.observable((isroma==1 ? true : false));
  this.iscurrent = ko.observable(iscurrent);
  this.iscurrentbool = ko.observable((iscurrent==1 ? true : false));
  this.isactive = ko.observable(isactive);
  this.isactivebool = ko.observable((isactive==1 ? true : false));

  this.studentUpdate = ko.observable(false);

  this.ClassByName = ko.computed(function(){
        if ( this.classname() == 1) return "Α1";
	if ( this.classname() == 2) return "Α2";
	if ( this.classname() == 3) return "Α3";
	if ( this.classname() == 4) return "Β1";
	if ( this.classname() == 5) return "Β2";
	if ( this.classname() == 7) return "Β4";
	if ( this.classname() == 8) return "Β5";
        return "Β3";
    }, this);

  this.RomaByName = ko.computed(function(){
        if ( this.isroma() == 1) return "ΝΑΙ";
	return "ΟΧΙ";
    }, this);

  this.CurrentByName = ko.computed(function(){
        if ( this.isroma() == 1) return "ΝΑΙ";
	return "ΟΧΙ";
    }, this);

  this.ActiveByName = ko.computed(function(){
        if ( this.isroma() == 1) return "ΝΑΙ";
	return "ΟΧΙ";
    }, this);

  //this.url = ko.computed(function(){
  //  return 'student.html?studentid='+this.id();
  //});


  this.studentcodeHasFocus = ko.observable(false);
  this.fnameHasFocus = ko.observable(false); //if the name is currently updated
  this.lnameHasFocus = ko.observable(false); //if the name is currently updated
  this.ageHasFocus = ko.observable(false); //if the name is currently updated
  this.sexHasFocus = ko.observable(false); //if the name is currently updated
  this.classnameHasFocus = ko.observable(false); //if the name is currently updated
  this.fathernameHasFocus = ko.observable(false); //if the age is currently updated
  this.fathernamegenHasFocus = ko.observable(false); //if the age is currently updated
  this.addressHasFocus = ko.observable(false); //if the name is currently updated
  this.maritalHasFocus = ko.observable(false); //if the name is currently updated
  this.childrenHasFocus = ko.observable(false); //if the name is currently updated
  this.phoneHasFocus = ko.observable(false); //if the name is currently updated
  this.jobstatusHasFocus = ko.observable(false); //if the age is currently updated
  this.monthsunemploymentHasFocus = ko.observable(false); //if the age is currently updated
  this.isromaHasFocus = ko.observable(false); //if the name is currently updated
  this.iscurrentHasFocus = ko.observable(false); //if the name is currently updated
  this.isactiveHasFocus = ko.observable(false); //if the age is currently updated



  //executed if the user clicks on the span for the student fname
  this.studentUpdating = function(){
      self.studentUpdate(true); //make nameUpdate equal to true
  };

  //executed if the user clicks on the span for the student fname
  this.gotoDetails = function(){
      window.location.href = 'student.html?studentid='+this.id(); //make nameUpdate equal to true
  };

  this.availableClasses = ko.observableArray([
            new Class(1, "Α1"),
            new Class(2, "Α2"),
            new Class(3, "Α3"),
            new Class(4, "Β1"),
            new Class(5, "Β2"),
            new Class(6, "Β3"),
            new Class(7, "Β4"),
            new Class(8, "Β5")
        ]);


        //this.selectedClass = ko.observable()


};

var model = function(){
	var self = this; //cache the current context
	this.person_studentcode = ko.observable(""); //default value for the student name
	this.person_fname = ko.observable(""); //default value for the student name
	this.person_lname = ko.observable(""); //default value for the student name
	this.person_age = ko.observable("");
	this.person_fname_focus = ko.observable(true); //if the student name text field has focus
	this.person_lname_focus = ko.observable(true); //if the student name text field has focus
	this.person_age_focus = ko.observable(true); //if the student name text field has focus
	this.people = ko.observableArray([]); //this will store all the students



	this.loadData = function(){

	  //fetch existing student data from database
	  $.ajax({
	      url : '/sde/websvc/person_save.php',
	      type: 'POST',
    	      dataType: 'json',
	      data: {'eduyear' : eduyear},
	      success: function(data){
		//json string of the student records returned from the server
		  for(var x in data){
		      //student details
		      var id = data[x]['id'];
		      var studentcode = data[x]['studentcode'];
		      var fname = data[x]['fname'];
		      var lname = data[x]['lname'];
		      var age = data[x]['age'];
		      var sex = data[x]['sex'];
		      var classname = data[x]['classname'];

		      var fathername = data[x]['fathername'];
          var fathernamegen = data[x]['fathernamegen'];
		      var address = data[x]['address'];
		      var marital = data[x]['marital'];
		      var children = data[x]['children'];
		      var phone = data[x]['phone'];
		      var jobstatus = data[x]['jobstatus'];
		      var monthsunemployment = data[x]['monthsunemployment'];
		      var isroma = data[x]['isroma'];

		      var iscurrent = data[x]['iscurrent'];
		      var isactive = data[x]['isactive'];


		      //push each of the student record to the observable array for
		      //storing student data
		      self.people.push(new personModel(id, studentcode, fname, lname, age, sex, classname, fathername, fathernamegen,
						       address, marital, children, phone, jobstatus, monthsunemployment, isroma, iscurrent, isactive));
		  }

	      }
	  });
	};

	this.createPerson = function(){
		if(self.validatePerson()){ //if the validation succeeded
			//build the data to be submitted to the server
			var person = {'fname' : this.person_fname(), 'lname' : this.person_lname(), 'age' : this.person_age()};

			//submit the data to the server
			$.ajax(
			    {
				url: '/sde/websvc/person_save.php',
				type: 'POST',
				data: {'student' : person, 'action' : 'insert'},
				success: function(id){//id is returned from the server

				    //push a new record to the student array
				    self.people.push(new personModel(id, self.person_fname(), self.person_lname(), self.person_age()));

				    self.person_fname(""); //empty the text field for the student name
				    self.person_lname(""); //empty the text field for the student name
				    self.person_age("");
				}
			    }
			);

		    }else{ //if the validation fails
			alert("Name and age are required and age should be a number!");
		    }
		  };

	this.validatePerson = function(){
	  if(self.person_fname() !== "" && self.person_lname() !== "" && self.person_age() != "" && Number(self.person_age()) + 0 == self.person_age()){
	      return true;
	  }
	  return false;
	};

	this.removePerson = function(person){
	  if (confirm('Είστε σίγουροι ότι θέλετε να αφαιρέσετε τον εκπαιδευόμενο '+ person.fname() +' '+person.lname()+' από το σχ. έτος '+eduyear))
	  {
	    // Save it!

	    $.post(
		'/sde/websvc/person_save.php',
		{'action' : 'remove', 'student_id' : person.id(), 'eduyear' : eduyear},
		function(response){
		    if (response) {
		      //remove the currently selected student from the array
		      self.people.remove(person);
		      alert('Ο εκπαιδευόμενος '+ person.fname() +' '+person.lname()+' αφαιρέθηκε από το σχ. έτος '+eduyear);
		    }
		    else
		    {alert('Υπήρξε πρόβλημα στη διαδικασία. παρακαλώ ξαναπροσπαθήστε.');}

		}
	    );
	  }
	};

	this.updatePerson = function(person){
	  //get the student details
	  var id = person.id();
	  var fname = person.fname();
	  var lname = person.lname();
	  var age = person.age();
	  var sex = person.sex();
	  var fathername = person.fathername();
    var fathernamegen = person.fathernamegen();
	  var studentcode = person.studentcode();
	  var classname = person.classname();

	  var address = person.address();
	  var marital = person.marital();
	  var children = person.children();
	  var phone = person.phone();
	  var isromabool = person.isromabool();
	  var isroma = (isromabool==true ? 1 : 0);

	  var iscurrentbool = person.iscurrentbool();
	  var iscurrent = (iscurrentbool==true ? 1 : 0);
	  var isactivebool = person.isactivebool();
	  var isactive = (isactivebool==true ? 1 : 0);

	  var jobstatus = person.jobstatus();
	  var monthsunemployment = person.monthsunemployment();

	  //build the data
	  var student = {
	    'studentid' : id,
	    'fname' : fname,
	    'lname' : lname,
	    'age' : age,
	    'sex' : sex,
	    'fathername' : fathername,
      'fathernamegen' : fathernamegen,
	    'studentcode' : studentcode,
	    'classname' : classname,
	    'address' : address,
	    'marital' : marital,
	    'children' : children,
	    'phone' : phone,
	    'isroma' : isroma,
	    'isactive' : isactive,
	    'iscurrent' : iscurrent,
	    'jobstatus' : jobstatus,
	    'monthsunemployment' : monthsunemployment

	    };

	  //submit to server via POST
	  $.post(
	      '/sde/websvc/person_save.php',
	      {'action' : 'update', 'student' : student, 'eduyear' : eduyear},
	      function(response){
		if (response=='true')
		{
		  removefocus(person);
		}
	      }
	  );
	};


  this.addPersonLessons = function(person){
	  //get the student details
	  var id = person.id();
	  //submit to server via POST
	  $.post(
	      '/sde/websvc/person_save.php',
	      {'action' : 'addlessons', 'studentid' : id, 'eduyear' : eduyear},
	      function(response){
		if (response=='true')
		{
		  removefocus(person);
		}
	      }
	  );
	};

  this.removePersonLessons = function(person){
	  //get the student details
	  var id = person.id();
	  //submit to server via POST
	  $.post(
	      '/sde/websvc/person_save.php',
	      {'action' : 'removelessons', 'studentid' : id, 'eduyear' : eduyear},
	      function(response){
		if (response=='true')
		{
		  removefocus(person);
		}
	      }
	  );
	};

	this.getPdf = function(person){
	  $.post(
		'/sde/websvc/expsvc.pdf.php',
		{'tag' : 'studentdata', 'studentid' : person.id()},
		function(response){
		    if (response) {
		      window.open("data/"+person.id()+".pdf", '_blanc');

		    }
		    else
		    {alert('Υπήρξε πρόβλημα στη διαδικασία. παρακαλώ ξαναπροσπαθήστε.');}

		}
	    );
	};
};

var removefocus = function(person)
{
  person.studentUpdate(false);

};

//var cont = document.getElementById("cont");
