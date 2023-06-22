var studentDetailsModel = function(eduyear, classid, amathisiakiporeia, asynergasia,
				   aendiaferon, adesmefsi, bmathisiakiporeia, bsynergasia, bendiaferon, bdesmefsi){
  var self = this; //caching so that it can be accessed later in a different context
  this.eduyear = ko.observable(eduyear); //unique id for the student (auto increment primary key from the database)
  this.classid = ko.observable(classid); //name of the student
  this.amathisiakiporeia = ko.observable(amathisiakiporeia);
  this.asynergasia = ko.observable(asynergasia); 
  this.aendiaferon = ko.observable(aendiaferon); 
  this.adesmefsi = ko.observable(adesmefsi); 
  this.bmathisiakiporeia = ko.observable(bmathisiakiporeia); 
  this.bsynergasia = ko.observable(bsynergasia); 
  this.bendiaferon = ko.observable(bendiaferon); 
  this.bdesmefsi = ko.observable(bdesmefsi);
  
  
  
};

var StudentModel = function() {
	var self = this; //cache the current context
	this.code = ko.observable(""); //default value for the student AM
	this.fname = ko.observable(""); //default value for the student name
	this.lname = ko.observable(""); //default value for the student name
	this.fathername = ko.observable("");
	this.classid = ko.observable("");
	this.sex = ko.observable(""); 
	this.phone = ko.observable("");
	this.address = ko.observable("");
	this.age = ko.observable("");
	this.jobstatus = ko.observable("");
	this.isroma = ko.observable("");
	this.foraksiologisi = ko.observable("");
	this.iscurrent = ko.observable("");
	this.isactive = ko.observable("");
	this.details = ko.observableArray([]);
	
	this.studentUpdate = ko.observable(false);
	//executed if the user clicks on the span for the student fname
	this.studentUpdating = function(){
		self.studentUpdate(true); //make nameUpdate equal to true
		};
	
	this.fullName = ko.computed(function() {
		return this.fname() + " " + this.lname();
		}, this);
	
	this.loadData = function(studentid){
	  //fetch existing student data from database
	  $.ajax({
	      url : websvcroot+'/sdestudent.php',
	      type: 'POST',
	      data: {'studentid' : studentid},
	      dataType: 'json',
	      success: function(d){ //json string of the user records returned from the server
		      //user details
		      self.code(d[0]['code']);
		      self.fname(d[0]['fname']);
		      self.lname(d[0]['lname']);
		      self.sex(d[0]['sex']);
		      self.age(d[0]['age']);
		      self.address(d[0]['address']);
		      self.phone(d[0]['phone']);
		      self.fathername(d[0]['fathername']);
		      self.classid(d[0]['classid']);
		      self.jobstatus(d[0]['jobstatus']);
		      self.isroma(d[0]['isroma']);
			  self.foraksiologisi(d[0]['foraksiologisi']);
		      self.iscurrent(d[0]['iscurrent']);
		      self.isactive(d[0]['isactive']);
		      
		      self.studentUpdate(false);
		      

	      }
	  });
	  
	  //fetch existing student data from database
	  $.ajax({
	      url : websvcroot+'/sdestudent.php',
	      type: 'POST',
	      data: {'action':'getdetails', 'studentid' : studentid},
	      dataType: 'json',
	      success: function(data){ //json string of the user records returned from the server
		      //user details
		      for(var x in data){
				self.details.push(new studentDetailsModel(data[x]['eduyear'], data[x]['classid'], data[x]['amathisiakiporeia'], data[x]['asynergasia'],
				   data[x]['aendiaferon'], data[x]['adesmefsi'], data[x]['bmathisiakiporeia'], data[x]['bsynergasia'], data[x]['bendiaferon'], data[x]['bdesmefsi']));
			}
	      }
	  });
	};
	
	this.save = function()
	{
        //get the student details
	  var id = studentid;
	  var code = this.code();
	  var fname = this.fname();
	  var lname = this.lname();
	  var fathername = this.fathername();
	  var address = this.address();
	  var phone = this.phone();
	  var sex = this.sex();
	  var age = this.age();
	  var classid = 0;
	  var jobstatus = this.jobstatus();
	  var isroma = this.isroma();
	  var foraksiologisi = this.foraksiologisi();
	  
	  var iscurrent = this.iscurrent();
	  var isactive = this.isactive();
	  
	
	  //build the data
	  var person = {
	    'personid' : id,
	    'code' : code,
	    'fname' : fname,
	    'lname' : lname,
	    'fathername' : fathername,
	    'address' : address,
	    'phone' : phone,
	    'sex' : sex,
	    'age' : age,
	    'jobstatus' : jobstatus,
	    'isroma' : isroma,
		'foraksiologisi' : foraksiologisi,
	    'iscurrent' : iscurrent,
	    'isactive' : isactive,
	    'classid' : classid
	    };
	  
	  //submit to server via POST
	  $.post(
	      websvcroot+'/sdestudent.php',
	      {'action' : 'update', 'person' : person},
	      function(response){
		if (response=='true')
		{
		  alert('Επιτυχής Ενημέρωση');
		  self.studentUpdate(false);
		}
		else
		{
			console.log(response);	
		}
	      }
	  );
	};

	this.createPerson = function(){
		  };

	this.validatePerson = function(){
	  if(self.fname() !== "" && self.lname()){
	      return true;
	  }
	  return false;
	};

	this.removePerson = function(person){
	  
	};

	this.updatePerson = function(person){
	};
};

