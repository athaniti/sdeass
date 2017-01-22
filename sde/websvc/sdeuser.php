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
	

$userid = (!empty($_POST['userid'])) ? $_POST['userid'] : ''; //action to be used(insert, delete, update, fetch)
$action = (!empty($_POST['action'])) ? $_POST['action'] : ''; //action to be used(insert, delete, update, fetch)
$person = (!empty($_POST['person'])) ? $_POST['person'] : ''; //an array of the student details

//check if the student is not an empty string
//and assigns a value to $name and $age if its not empty
if(!empty($person)){
  $fname = $person['fname'];
  $lname = $person['lname'];
  $address = $person['address'];
  $email = $person['email'];
  $phone = $person['phone'];
  $eidikotita = $person['eidikotita'];
  $eidikotitacode = $person['eidikotitacode']; 
}

switch($action){
  //actions here...
  case "update":
    if(!empty($person)){
      $res = $db->updatePersonData($person['personid'], $address, $eidikotita, $eidikotitacode, $fname, $lname, $phone, $email);
      echo json_encode($res);
    }
    
    break;
  default:
  //only select student records which aren't deleted
    $user=$db->getUser($userid);
    if ($user != false) {
      //build the array that will store all the student records
      $sdeuser[] = array(
          'id' => $user['UserID'], 'fname' => $user['UserFname'], 'lname' => $user['UserLname'], 'eidikotita' => $user['Eidikotita'],
          'eidikotitacode' => $user['EidikotitaCode'], 'email' => $user['Email'], 'address' => $user['Address'], 'phone' => $user['Phone'], 'username' => $user['Username']
          );
      echo json_encode($sdeuser);
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
