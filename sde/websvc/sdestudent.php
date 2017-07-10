<?php

/**
 * File to handle all API requests
 * Accepts GET and POST
 *
 * Each request will be identified by TAG
 * Response will be JSON data

  /**
 * check for POST request
 */
  require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
    mysql_select_db(DB_DATABASE);


$studentid = (!empty($_POST['studentid'])) ? $_POST['studentid'] : ''; //action to be used(insert, delete, update, fetch)
$action = (!empty($_POST['action'])) ? $_POST['action'] : ''; //action to be used(insert, delete, update, fetch)
$person = (!empty($_POST['person'])) ? $_POST['person'] : ''; //an array of the student details

//check if the student is not an empty string
//and assigns a value to $name and $age if its not empty
if(!empty($person)){
  $code = $person['code'];
  $fname = $person['fname'];
  $lname = $person['lname'];
  $address = $person['address'];
  $fathername = $person['fathername'];
  $fathernamegen = $person['fathernamegen'];
  $phone = $person['phone'];
  $classid = $person['classid'];
  $sex = $person['sex'];
  $age = $person['age'];
  $jobstatus = $person['jobstatus'];
  $isroma = $person['isroma'];
  $iscurrent = $person['iscurrent'];
  $isactive = $person['isactive'];


}

switch($action){
  //actions here...
  case "update":
    if(!empty($person)){
      $res = $db->updateStudentData2($person['personid'], $code, $fname,  $lname,  $sex, $age, $classid,
      $fathername, $fathernamegen,
				    $phone, $address, $jobstatus, $isroma, $iscurrent, $isactive, 0);
      echo json_encode($res);
    }

    break;
  case "getdetails":
    if(!empty($studentid)){
      $res = $db->getDetailsForStudent($studentid);
      echo json_encode($res);
    }

    break;
  default:
  //only select student records which aren't deleted
    $user=$db->getStudent($studentid);
    if ($user != false) {
      //build the array that will store all the student records
      $sdestudent[] = array(
          'id' => $user['StudentID'], 'code' => $user['StudentCode'], 'fname' => $user['StudentFname'],
	  'lname' => $user['StudentLname'],
	  'sex' => $user['Sex'],
          'age' => $user['Age'], 'classid' => $user['ClassID'], 'address' => $user['Address'], 'phone' => $user['Phone'],
	  'fathername' => $user['Fathername'],
    'fathernamegen' => $user['FathernameGen'], 'jobstatus' => $user['JobStatus'], 
    'isroma' => $user['IsRoma'], 'iscurrent' => $user['IsCurrent'], 'isactive' => $user['IsActive']
          );
      echo json_encode($sdestudent);
      break;
    }
    else
    {
      $response["error"] = 1;
            $response["error_msg"] = "Incorrect email or password!";
            //echo json_encode($response);
            if (isset($_GET['callback']))
	    {
		echo $_GET['callback'] . '(' . json_encode($response) . ');';
		break;
	    }
	    else
	    {
		echo json_encode($response);
		break;
	    }
    }

      ///echo json_encode($sdeuser); //convert the array to JSON string
    ///break;
}
