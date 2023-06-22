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
 require_once 'include/db_functions.php';
    $db = new DB_Functions();
	$con = $db->con;

$eduyear = (!empty($_POST['eduyear'])) ? $_POST['eduyear'] : '';
$action = (!empty($_POST['action'])) ? $_POST['action'] : ''; //action to be used(insert, delete, update, fetch)
$student = (!empty($_POST['student'])) ? $_POST['student'] : ''; //an array of the student details
$studentid = (!empty($_POST['student_id'])) ? $_POST['student_id'] : 0; //an array of the student details

//check if the student is not an empty string
//and assigns a value to $name and $age if its not empty
if(!empty($student)){
  $fname = $student['fname'];
  $lname = $student['lname'];
  $age = $student['age'];
  $sex = $student['sex'];
  $fathername = $student['fathername'];
  $fathernamegen = $student['fathernamegen'];
  $classname = $student['classname'];
  $address = $student['address'];
  $marital = $student['marital'];
  $children = $student['children'];
  $phone = $student['phone'];
  $studentcode = $student['studentcode'];
  $isroma = $student['isroma'];
  $foraksiologisi = $student['foraksiologisi'];
  $iscurrent = $student['iscurrent'];
  $isactive = $student['isactive'];
  $jobstatus = $student['jobstatus'];
  $monthsunemployment = $student['monthsunemployment'];


}

switch($action){
  //actions here...
  case "addlessons":

    if(!empty($studentid)){
      $res = $db->insertStudLessonsData($studentid, $eduyear);
      echo json_encode($res);
    }
    break;
    //actions here...
    case "removelessons":

      if(!empty($studentid)){
        $res = $db->removeStudLessonsData($studentid, $eduyear);
        echo json_encode($res);
      }
      break;
  //actions here...
  case "update":

    if(!empty($student)){
      $res = $db->updateStudentData2($student['studentid'], $studentcode, $fname, $lname, $sex, $age, $classname, $fathername, $fathernamegen,
				      $phone, $address, $marital, $children, $jobstatus, $monthsunemployment, $isroma, $foraksiologisi, $iscurrent, $isactive, $eduyear);
      echo json_encode($res);
    }
    break;

  //actions here...
  case "remove":

    if($studentid>0){
      $res = $db->removeStudentFromEduyear($studentid, $eduyear);
      echo json_encode($res);
    }
    break;

  default:
  //only select student records which aren't deleted
  //mysqli_query("SET NAMES utf8");
  mysqli_query($con, "SET NAMES utf8");

  $wherestr = '';
  if(!empty($eduyear)){
    $wherestr = " WHERE `_students_class`.eduperiod='".$eduyear."' ";
  }
  $students = $con->query("SELECT students.*, `_students_class`.ClassID As class
			  FROM students INNER JOIN `_students_class` ON students.StudentID = `_students_class`.StudentID".$wherestr."
			  ORDER BY students.StudentCode, students.StudentLname, students.StudentFname");
  $students_r = array();

    while($row = $students->fetch_assoc()){

      //default student data
      $id = $row['StudentID'];
      $studentcode = $row['StudentCode'];
      $fname = $row['StudentFname'];
      $lname = $row['StudentLname'];
      $age = $row['Age'];
      $sex = $row['Sex'];
      $classname = $row['class'];
      $fathername = $row['Fathername'];
      $fathernamegen = $row['FathernameGen'];
      $address = $row['Address'];
      $marital = $row['MaritalStatus'];
      $children = $row['ChildrenNumber'];
      $phone = $row['Phone'];
      $jobstatus = $row['JobStatus'];
      $monthsunemployment = $row['MonthsUnemployment'];
      $isroma = $row['IsRoma'];
	  $foraksiologisi = $row['foraksiologisi'];
      $iscurrent = $row['IsCurrent'];
      $isactive = $row['IsActive'];


      //update status
      //its false by default since
      //this is only true if the user clicks
      //on the span
      $student_update = $studentcode_update = $fname_update = $lname_update = $age_update = $sex_update = $classname_update = $fathername_update = $fathernamegen_update = $address_update = $marital_update = $children_update = $phone_update = $jobstatus_update = $monthsunemployment_update = $isroma_update = $foraksiologisi_update = $iscurrent_update = $isactive_update = false;
      $studentcode_focus = $fname_focus = $lname_focus = $age_focus = $sex_focus = $classname_focus = $fathername_focus = $fathernamegen_focus = $address_focus = $marital_focus = $children_focus = $phone_focus = $jobstatus_focus = $monthsunemployment_focus = $isroma_focus = $foraksiologisi_focus = $iscurrent_focus = $isactive_focus = false;

      //build the array that will store all the student records
      $students_r[] = array(
          'id' => $id, 'studentcode' => $studentcode, 'fname' => $fname, 'lname' => $lname, 'age' => $age,
	  'sex' => $sex, 'classname' => $classname, 'fathername' => $fathername, 'fathernamegen' => $fathernamegen, 'address' => $address, 'marital' => $marital, 'children' => $children,
	  'phone' => $phone, 'jobstatus' => $jobstatus, 'monthsunemployment' => $monthsunemployment, 'isroma' => $isroma, 'foraksiologisi' => $foraksiologisi, 'iscurrent' => $iscurrent,
	  'isactive' => $isactive,
          'studentUpdate' => $student_update,
          'studentcodeUpdate' => $studentcode_update, 'fnameUpdate' => $fname_update, 'lnameUpdate' => $lname_update, 'ageUpdate' => $age_update,
          'sexUpdate' => $sex_update, 'classnameUpdate' => $classname_update, 'fathernameUpdate' => $fathername_update,'fathernamegenUpdate' => $fathernamegen_update,
          'addressUpdate' => $address_update, 'maritalUpdate' => $marital_update, 'childrenUpdate' => $children_update,
	  'phoneUpdate' => $phone_update, 'jobstatusUpdate' => $jobstatus_update, 'monthsunemploymentUpdate' => $monthsunemployment_update,
          'isromaUpdate' => $isroma_update, 'foraksiologisiUpdate' => $foraksiologisi_update, 'iscurrentUpdate' => $iscurrent_update, 'isactiveUpdate' => $isactive_update,
          'studentcodeHasFocus' => $studentcode_focus, 'fnameHasFocus' => $fname_focus, 'lnameHasFocus' => $lname_focus,
	  'ageHasFocus' => $age_focus,
          'sexHasFocus' => $sex_focus, 'classnameHasFocus' => $classname_focus, 'fathernameHasFocus' => $fathername_focus,'fathernamegenHasFocus' => $fathernamegen_focus,
          'addressHasFocus' => $address_focus, 'maritalHasFocus' => $marital_focus, 'childrenHasFocus' => $children_focus,
	  'phoneHasFocus' => $phone_focus,
	  'jobstatusHasFocus' => $jobstatus_focus, 'monthsunemploymentHasFocus' => $monthsunemployment_focus,
          'isromaHasFocus' => $isroma_focus, 'foraksiologisiHasFocus' => $foraksiologisi_focus,'iscurrentHasFocus' => $iscurrent_focus, 'isactiveHasFocus' => $isactive_focus
          );
  }
      $response["eduyear"] = $eduyear;
      $response["testdata"] = $wherestr;
      $response["res"] = $students_r;

      echo json_encode($students_r); //convert the array to JSON string
    break;
}
