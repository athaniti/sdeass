var UserModel = function() {
	var self = this; //cache the current context
	this.fname = ko.observable(""); //default value for the student name
	this.lname = ko.observable(""); //default value for the student name
	this.eidikotita = ko.observable("");
	this.eidikotitacode = ko.observable("");
	this.address = ko.observable(""); 
	this.phone = ko.observable("");
	this.email = ko.observable("");
	this.username = ko.observable("");
	this.fullName = ko.computed(function() {
		return this.fname() + " " + this.lname();
		}, this);
	
	this.loadData = function(userid){
	  //fetch existing student data from database
	  $.ajax({
	      url : '/sde/websvc/sdeuser.php',
	      type: 'POST',
	      data: {'userid' : userid},
	      dataType: 'json',
	      success: function(d){ //json string of the user records returned from the server
		      //user details
		      self.fname(d[0]['fname']);
		      self.lname(d[0]['lname']);
		      self.eidikotita(d[0]['eidikotita']);
		      self.eidikotitacode(d[0]['eidikotitacode']);
		      self.address(d[0]['address']);
		      self.phone(d[0]['phone']);
		      self.email(d[0]['email']);
		      self.username(d[0]['username']);
	      }
	  });
	};
	
	this.save = function() {
        //get the student details
	  var id = userid;
	  var fname = this.fname();
	  var lname = this.lname();
	  var address = this.address();
	  var phone = this.phone();
	  var eidikotita = this.eidikotita();
	  var eidikotitacode = this.eidikotitacode();
	  var email = this.email();
	  
	
	  //build the data
	  var person = {
	    'personid' : id,
	    'fname' : fname,
	    'lname' : lname,
	    'address' : address,
	    'phone' : phone,
	    'eidikotita' : eidikotita,
	    'eidikotitacode' : eidikotitacode,
	    'email' : email
	    };
	  
	  //submit to server via POST
	  $.post(
	      '/sde/websvc/sdeuser.php',
	      {'action' : 'update', 'person' : person},
	      function(response){
		if (response=='true')
		{
		  alert('Επιτυχής Ενημέρωση');
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
	  if(self.fname() !== "" && self.lname() !== "" && self.eidikotita() != ""){
	      return true;
	  }
	  return false;
	};

	this.removePerson = function(person){
	  
	};

	this.updatePerson = function(person){
	};
};

