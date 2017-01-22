<?php

class DB_Functions {

    private $db;

    //put your code here
    // constructor
    function __construct() {
        require_once 'DB_Connect.php';
        // connecting to database
        $this->db = new DB_Connect();
        $this->db->connect();

    }

    // destructor
    function __destruct() {

    }

    /**
     * Storing new user
     * returns user details
     */
    public function storeUser($name, $email, $password) {
        $uuid = uniqid('', true);
        $hash = $this->hashSSHA($password);
        $encrypted_password = $hash["encrypted"]; // encrypted password
        $salt = $hash["salt"]; // salt
        $result = mysql_query("INSERT INTO users(unique_id, name, email, encrypted_password, salt, created_at) VALUES('$uuid', '$name', '$email', '$encrypted_password', '$salt', NOW())");
        // check for successful store
        if ($result) {
            // get user details
            $uid = mysql_insert_id(); // last inserted id
            $result = mysql_query("SELECT * FROM users WHERE uid = $uid");
            // return user details
            return mysql_fetch_array($result);
        } else {
            return false;
        }
    }

    /**
     * Get user by email and password
     */
    public function getUserByUsernameAndPassword($username, $password) {
        $result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            $salt = $result['salt'];
            $encrypted_password = $result['encrypted_password'];
            $hash = $this->checkhashSSHA($salt, $password);
            // check for password equality
            if ($encrypted_password == $hash) {
                //user authentication details are correct
                return $result;
            }
        } else {
            // user not found
            return false;
        }
    }


	 /**
     * Get user by email and password
     */
    public function getUserEmail($userid) {
        $result = mysql_query("SELECT * FROM users WHERE uid = $userid") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            $email = $result['email'];
            return $email;

        } else {
            // user not found
            return false;
        }
    }

	/**
     * Get user role
     */
    public function getUserRole($userid) {
        $result = mysql_query("SELECT userrole FROM sdeusers WHERE uid = $userid") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            $role = $result['userrole'];
            return $role;

        } else {
            // user not found
            return false;
        }
    }

	/**
     * Get username by id
     */
    public function getUserName($userid) {
        $result = mysql_query("SELECT * FROM `users` WHERE uid = ".$userid) or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            $uname = $result['name'];
            return $uname;

        } else {
            // user not found
            return false;
        }
    }

    /**
     * Get user by id
     */
    public function getUser($userid) {
        $result = mysql_query("SELECT * FROM `sdeusers` WHERE UserID = ".$userid) or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            return $result;

        } else {
            // user not found
            return false;
        }
    }

	/**
     * Get user by email and password
     */
    public function getProductCodeById($pid) {
        $result = mysql_query("SELECT * FROM products WHERE pid = $pid") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            $pcode = $result['pcode'];
            return $pcode;

        } else {
            // user not found
            return "NF";
        }
    }

	/**
     * Get user by email and password
     */
    public function getUserEmailByProductId($pid) {
        $result = mysql_query("SELECT email FROM users WHERE uid IN (Select userid from user_products where productid = $pid)") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            $email = $result['email'];
            return $email;

        } else {
            // user not found
            return "NF";
        }
    }

    /**
     * Check user is existed or not
     */
    public function isUserExisted($email) {
        $result = mysql_query("SELECT email from users WHERE email = '$email'");
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            // user existed
            return true;
        } else {
            // user not existed
            return false;
        }
    }

    /**
     * Encrypting password
     * @param password
     * returns salt and encrypted password
     */
    public function hashSSHA($password) {

        $salt = sha1(rand());
        $salt = substr($salt, 0, 10);
        $encrypted = base64_encode(sha1($password . $salt, true) . $salt);
        $hash = array("salt" => $salt, "encrypted" => $encrypted);
        return $hash;
    }

    /**
     * Decrypting password
     * @param salt, password
     * returns hash string
     */
    public function checkhashSSHA($salt, $password) {

        $hash = base64_encode(sha1($password . $salt, true) . $salt);

        return $hash;
    }

    public function updatePersonData($personid, $address, $eidikotita, $eidikotitacode, $fname, $lname, $phone, $email) {
		//*** Start Transaction ***//
		mysql_query("BEGIN");
		$result = mysql_query("UPDATE `sdeusers` SET
				      UserFname = '".$fname."',
				      UserLname = '".$lname."',
				      Eidikotita = '".$eidikotita."',
				      EidikotitaCode = '".$eidikotitacode."',
				      Address = '".$address."',
				      Phone = '".$phone."',
				      Email = '".$email."'
				      WHERE UserID = ".$personid.";") or die(mysql_error());

		$successfull = true;
		if($successfull)
		{
			//*** Commit Transaction ***//
			mysql_query("COMMIT");
			$msg = "Save Done.";
			$res = true;
		}
		else
		{
			//*** RollBack Transaction ***//
			mysql_query("ROLLBACK");
			$msg = "Error. Try Again";
			$qry = "UPDATE `_sdeusers` SET
				      UserFname = '".$fname."',
				      UserLname = '".$lname."',
				      Eidikotita = '".$eidikotita."',
				      EidikotitaCode = '".$eidikotitacode."',
				      Address = '".$address."',
				      Phone = '".$phone."',
				      Email = '".$email."'
				      WHERE UserID = ".$personid.";";
			$res = $qry;
		}
		return $res;
    }

	/**
     * Update User Password
     * @param userid, password
     * returns boolean
     */
    public function updateUserPass($userid, $password) {

		$hash = $this->hashSSHA($password);
        $encrypted_password = $hash["encrypted"]; // encrypted password
        $salt = $hash["salt"];

		$result = mysql_query("UPDATE `sdeusers` SET encrypted_password = '$encrypted_password', salt = '$salt' WHERE UserID = '$userid';") or die(mysql_error());

		$res='0';
		if ($result) {$res='1';}
		return $res;


    }


	/**
     * Get users classes
     */
    public function getUserLessons($userid) {
		$result = mysql_query("SELECT lt.*, lessons.LessonName AS lessonname, lt.LessonID As lessonid FROM `_lessons_teachers` As lt INNER JOIN lessons ON lessons.LessonID = lt.LessonID INNER JOIN sdeusers ON sdeusers.UserID = lt.TeacherID WHERE lt.TeacherId = '$userid'") or die(mysql_error());
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=mysql_fetch_assoc($result))
			{
				$arr[]=array('lessonid'=>$row['LessonID'],'lessonname'=>$row['lessonname']);
			}
            //$result = mysql_fetch_array($result);
            return $arr;
        } else {
            // user not found
            return false;
        }
    }

    /**
     * Get users classes
     */
    public function getUserClasses($userid, $lessonid)
    {
	$result = mysql_query("SELECT ct.*, class.ClassName AS classname, ct.ClassID As classid FROM `_class_teachers` As ct INNER JOIN class ON class.ClassID = ct.ClassID INNER JOIN sdeusers ON sdeusers.UserID = ct.TeacherID WHERE ct.TeacherID = '$userid'") or die(mysql_error());
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=mysql_fetch_assoc($result))
			{
				$arr[]=array('classid'=>$row['ClassID'],'classname'=>$row['classname'],'lessonid'=>$row['LessonID'],);
			}
            //$result = mysql_fetch_array($result);
            return $arr;
        } else {
            // user not found
            return false;
        }
    }


    /**
     * Get user responsible class
     **/
    public function getUserRespClass($userid)
    {
		$result = mysql_query("SELECT ClassName AS classname, ClassID As classid FROM class
				      WHERE RespTeacher = $userid") or die(mysql_error());
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=mysql_fetch_assoc($result))
			{
				$arr[]=array('classid'=>$row['classid'],'classname'=>$row['classname']);
			}
            //$result = mysql_fetch_array($result);
            return $arr;
        } else {
            // user not found
            return false;
        }
    }

    /**
     * Get users classes
     */
    public function getStudents()
    {
	    return mysql_query("SELECT * FROM students WHERE IsActive = 1") or die(mysql_error());



    }

    /**
     * Get Student by id
     */
    public function getStudent($studentid) {
        $result = mysql_query("SELECT * FROM `students` WHERE StudentID = ".$studentid) or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            return $result;

        } else {
            // user not found
            return false;
        }
    }

     /**
     * Get Student's class by edu year
     */
    public function getClassByEduyear($studentid, $eduyear)
    {
	$result = mysql_query("SELECT ClassID FROM `_students_class`
			      WHERE StudentID = ".$studentid." AND eduperiod='".$eduyear."'") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            return $result['ClassID'];

        } else {
            // user not found
            return 0;
        }


    }

    /**
     * Get Details For Student for every year of study
     */
    public function getDetailsForStudent($studentid)
    {
	$result = mysql_query("SELECT `_students_general`.*FROM `_students_general`
			      WHERE `_students_general`.StudentID = ".$studentid) or die(mysql_error());
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=mysql_fetch_assoc($result))
			{
			    $classid = 0;
			    $result2 = mysql_query("SELECT ClassID FROM `_students_class`
			      WHERE StudentID = ".$studentid." AND eduperiod='".$row['eduyear']."'") or die(mysql_error());
			    $no_of_rows2 = mysql_num_rows($result2);
			    if ($no_of_rows2 > 0) {
				$result2 = mysql_fetch_array($result2);
				$classid = $result2['ClassID'];
			    }

			    $result3 = mysql_query("SELECT less.*, lessons.LessonName As lname FROM `_students_lessons` as less
						   INNER JOIN lessons ON lessons.LessonID = less.LessonID
			      WHERE StudentID = ".$studentid." AND eduyear='".$row['eduyear']."'") or die(mysql_error());
			    $no_of_rows3 = mysql_num_rows($result3);
			    $arr2 = array();
			    while($row3=mysql_fetch_assoc($result3))
			    {
				$arr2[]=array('lesson'=>$row3['lname'],
					      'asemester'=>$row3['asemester'],
					      'aendiaferon'=>$row3['aendiaferon'],
					      'aantapokrisi'=>$row3['aantapokrisi'],
					      'bsemester'=>$row3['bsemester'],
					      'bendiaferon'=>$row3['bendiaferon'],
					      'bantapokrisi'=>$row3['bantapokrisi'],
					      'finalgrade'=>$row3['finalgrade']
					     );
			    }

			    $arr[]=array('eduyear'=>$row['eduyear'],
					     'classid'=>$classid,
					     'amathisiakiporeia'=>$row['amathisiakiporeia'],
					     'asynergasia'=>$row['asynergasia'],
					     'aendiaferon'=>$row['aendiaferon'],
					     'adesmefsi'=>$row['adesmefsi'],
					     'bmathisiakiporeia'=>$row['bmathisiakiporeia'],
					     'bsynergasia'=>$row['bsynergasia'],
					     'bendiaferon'=>$row['bendiaferon'],
					     'bdesmefsi'=>$row['bdesmefsi'],
					     'lessondetails'=>$arr2
					     );
			}
            //$result = mysql_fetch_array($result);
            return $arr;
        } else {
            // user not found
            return false;
        }
    }

    /**
     * Get Student Data
     */
    public function getStudData($studentid)
    {
		$result = mysql_query("SELECT * FROM students WHERE StudentID = '$studentid'") or die(mysql_error());
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=mysql_fetch_assoc($result))
			{
				$arr[]=array('studentfname'=>$row['StudentFname'],'studentlname'=>$row['StudentLname']);
			}
            //$result = mysql_fetch_array($result);
            return $arr;
        } else {
            // user not found
            return false;
        }
    }




    /**
     * Get users grades
     */
    public function getUserGrades($studentid, $teacherid, $eduyear) {
		$result = mysql_query("SELECT asemester, bsemester FROM `_students_lessons` WHERE StudentID = '$studentid' AND eduyear='$eduyear' AND LessonID IN (SELECT LessonID FROM `_lessons_teachers` WHERE TeacherID = '$teacherid')") or die(mysql_error());
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
		if ($result) {

			}
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=mysql_fetch_assoc($result))
			{
				$arr[]=array('asemester'=>$row['asemester'],'bsemester'=>$row['bsemester']);
			}
            //$result = mysql_fetch_array($result);
            return $arr;
        } else {
            // user not found
            return false;
        }
    }

    /**
     * Get users classes
     */
    public function updUserGrades($studentid, $lessonid, $period, $teacherid, $eduyear, $grade) {
	$sem = 'asemester';
	if ($period=='2') {
	    $sem= 'bsemester';
	}

		$result = mysql_query("UPDATE `_students_lessons` SET ".$sem."='$grade' WHERE StudentID = '$studentid' AND eduyear='$eduyear'  AND LessonID = '$lessonid'") or die(mysql_error());

		if ($result) {$res='1';} else {$res='0';}
		return $res;
    }

    /**************************************************************************
     * Project Functions
     **************************************************************************/

    /**
     * Get project by id
     */
    public function getProject($projectid) {
        $result = mysql_query("SELECT * FROM `projects` WHERE ProjectID = ".$projectid) or die(mysql_error());
        // check for result
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            $result = mysql_fetch_array($result);
            return $result;

        } else {
            // user not found
            return false;
        }
    }

    /**
     * Get projects for user
     */
    public function getUserProjects($userid, $eduyear) {
	$result = mysql_query("SELECT p.ProjectID As projectid, p.projectName As projectname, p.Type As projecttype FROM `projects` As p
		INNER JOIN `_projects_teachers` As t ON t.ProjectID = p.ProjectID
		WHERE p.projectPeriod = '".$eduyear."' AND t.TeacherID = ".$userid) or die(mysql_error());
        // check for result
	if ($result) {
	    $no_of_rows = mysql_num_rows($result);

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=mysql_fetch_assoc($result))
		{
		    $arr[]=array('projectid'=>$row['projectid'],'projectname'=>$row['projectname'],'projecttype'=>$row['projecttype']);
		}
		//$result = mysql_fetch_array($result);
		return $arr;
	    }
	    else
	    {
		// user not found
		return false;
	    }
	}
	else
	{
            // user not found
            return false;
        }
    }

    /**
     * Get project details
     */
    public function getProjectDetails($projectid) {
	$result = mysql_query("SELECT * FROM projects WHERE ProjectID = ".$projectid) or die(mysql_error());
        // check for result
	if ($result)
	{
	    $no_of_rows = mysql_num_rows($result);

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=mysql_fetch_assoc($result))
		{
		    $arr[]=array('projectid'=>$row['ProjectID'],'projectName'=>$row['projectName'], 'type'=>$row['Type'],'projectWebPage'=>$row['projectWebPage']);
		}
		//$result = mysql_fetch_array($result);
		return $arr;
	    }
	    else
	    {
		// user not found
		return false;
	    }
	}
	else
	{
            // user not found
            return false;
        }
    }

    /**
     * Get project Responsible Teachers
     */
    public function getProjectResp($projectid) {
	$result = mysql_query("SELECT t.* FROM `_projects_teachers` As p
		INNER JOIN sdeusers As t ON t.UserID = p.TeacherID
		WHERE p.ProjectID = ".$projectid) or die(mysql_error());
        // check for result
	if ($result) {
	    $no_of_rows = mysql_num_rows($result);

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=mysql_fetch_assoc($result))
		{
		    $arr[]=array('userid'=>$row['UserID'],'userfname'=>$row['UserFname'],'userlname'=>$row['UserLname']);
		}
		//$result = mysql_fetch_array($result);
		return $arr;
	    }
	    else
	    {
		// user not found
		return false;
	    }
	}
	else
	{
            // user not found
            return false;
        }
    }

    /**
     * Get ����� Teachers
     */
    public function getProjectOtherTeachers($projectid) {
	$result = mysql_query("SELECT t.* FROM sdeusers As t WHERE UserID NOT IN (100) AND UserID NOT IN
		(SELECT TeacherID FROM `_projects_teachers` As p
		WHERE p.ProjectID = ".$projectid.")") or die(mysql_error());
        // check for result
	if ($result) {
	    $no_of_rows = mysql_num_rows($result);

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=mysql_fetch_assoc($result))
		{
		    $arr[]=array('userid'=>$row['UserID'],'userfname'=>$row['UserFname'],'userlname'=>$row['UserLname']);
		}
		//$result = mysql_fetch_array($result);
		return $arr;
	    }
	    else
	    {
		// user not found
		return false;
	    }
	}
	else
	{
            // user not found
            return false;
        }
    }

    /**
     * Get Other Students
     */
    public function getProjectOtherStudents($projectid) {
	$result = mysql_query("SELECT t.* FROM students As t WHERE IsCurrent=1 AND StudentID NOT IN
		(SELECT StudentID FROM `_projects_students` As p
		WHERE p.ProjectID = ".$projectid.") ORDER BY t.StudentLname") or die(mysql_error());
        // check for result
	if ($result) {
	    $no_of_rows = mysql_num_rows($result);

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=mysql_fetch_assoc($result))
		{
		    $arr[]=array('studentid'=>$row['StudentID'],'studentfname'=>$row['StudentFname'],'studentlname'=>$row['StudentLname']);
		}
		//$result = mysql_fetch_array($result);
		return $arr;
	    }
	    else
	    {
		// user not found
		return false;
	    }
	}
	else
	{
            // user not found
            return false;
        }
    }

    /**
     * Get project Students
     */
    public function getProjectStudents($projectid) {
	$result = mysql_query("SELECT t.* FROM `_projects_students` As p
		INNER JOIN students As t ON t.StudentID = p.StudentID
		WHERE p.ProjectID = ".$projectid) or die(mysql_error());
        // check for result
	if ($result) {
	    $no_of_rows = mysql_num_rows($result);

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=mysql_fetch_assoc($result))
		{
		    $arr[]=array('studentid'=>$row['StudentID'],'studentfname'=>$row['StudentFname'],'studentlname'=>$row['StudentLname']);
		}
		//$result = mysql_fetch_array($result);
		return $arr;
	    }
	    else
	    {
		// user not found
		return false;
	    }
	}
	else
	{
            // user not found
            return false;
        }
    }


    /**
     * Adding Project Responsible Teacher
     * returns true or false
     */
    public function addProjectResp($projectid, $userid) {
        $result = mysql_query("INSERT INTO `_projects_teachers`(ProjectID, TeacherID) VALUES('$projectid', '$userid')");
        // check for successful store
        if ($result) {
            // get user details
            return true;
        }
	else
	{
            return false;
        }
    }

    /**
     * Deleting Project Responsible
     * returns true or false
     */
    public function removeProjectResp($projectid, $userid) {
        $result = mysql_query("DELETE FROM `_projects_teachers` WHERE ProjectID = '$projectid' AND TeacherID = '$userid'");
        // check for successful store
        if ($result) {
            // get user details
            return true;
        }
	else
	{
            return false;
        }
    }

    /**
     * Adding Project Student
     * returns true or false
     */
    public function addProjectStudent($projectid, $studentid) {
        $result = mysql_query("INSERT INTO `_projects_students`(ProjectID, StudentID) VALUES('$projectid', '$studentid')");
        // check for successful store
        if ($result) {
            // get user details
            return true;
        }
	else
	{
            return false;
        }
    }

    /**
     * Deleting Project Student
     * returns true or false
     */
    public function removeProjectStudent($projectid, $studentid) {
        $result = mysql_query("DELETE FROM `_projects_students` WHERE ProjectID = '$projectid' AND StudentID = '$studentid'");
        // check for successful store
        if ($result) {
            // get user details
            return true;
        }
	else
	{
            return false;
        }
    }

    /**************************************************************************
     * End of Project Functions
     **************************************************************************/

	/**
     * Insert Excel Data into the database
     */
    public function insertExcelData($mitroo, $studentfname, $studentlname, $sex, $age, $classid, $fathername, $phone, $address, $marital, $children, $jobstatus, $monthsunemployment, $isroma, $eduyear, $iscurrent, $isactive) {
		//*** Start Transaction ***//
		mysql_query("BEGIN"); 
		$result = mysql_query("INSERT INTO students
							  (StudentCode, StudentFname, StudentLname, Sex, Age, ClassID, Fathername, Phone, Address, MaritalStatus, ChildrenNumber, JobStatus, MonthsUnemployment, IsRoma, IsCurrent, IsActive)
							  VALUES
							  ('$mitroo', '$studentfname', '$studentlname', '$sex', '$age', $classid,'$fathername','$phone','$address', '$marital', '$children','$jobstatus', '$monthsunemployment','$isroma', '$iscurrent', $isactive);") or die(mysql_error());
		$sid = mysql_insert_id();
		$successfull = true;
		$result1 = mysql_query("INSERT INTO `_students_class` (StudentID, ClassID, eduperiod) VALUES (".$sid.", ".$classid.", '".$eduyear."');") or die(mysql_error());
		if ($result1 == false) {$successfull = false;}

		for ($x = 1; $x <= 10; $x++) {
			$result2 = mysql_query("INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (".$sid.", ".$x.", '0', '".$eduyear."');") or die(mysql_error());
			if ($result2 == false) {$successfull = false;}
		}
		$msg = '';
		if(($result) and ($successfull))
		{
			//*** Commit Transaction ***//
			mysql_query("COMMIT");
			$msg = "Save Done.";
			$res = true;
		}
		else
		{
			//*** RollBack Transaction ***//
			mysql_query("ROLLBACK");
			$msg = "Error. Try Again";
			$res = false;
		}
		return $res;
    }

    public function changeStudentsYear($oldeduyear, $neweduyear)
    {

	$result = mysql_query("SELECT * FROM `_students_class` WHERE eduperiod= '$oldeduyear'") or die(mysql_error());
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0)
	{
	    $successfull = true;
	    mysql_query("BEGIN");
	    while($row=mysql_fetch_assoc($result))
	    {

		//*** Start Transaction ***//

		$sid = $row['StudentID'];
		$classid = $row['ClassID'];
		if ((int)$classid<4)
		{
		    $newclass = (int)$classid+3;

		    $result1 = mysql_query("INSERT INTO `_students_class` (StudentID, ClassID, eduperiod)
					   VALUES (".$sid.", ".$newclass.", '".$neweduyear."');") or die(mysql_error());
		    if ($result1 == false) {$successfull = false;}
		    for ($x = 1; $x <= 10; $x++)
		    {
			$result2 = mysql_query("INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (".$sid.", ".$x.", '0', '".$neweduyear."');") or die(mysql_error());
			if ($result2 == false) {$successfull = false;}
		    }
		}
		else
		{
		    $result3 = mysql_query("UPDATE `students` SET IsActive=0, IsCurrent=0 WHERE StudentID=".$sid.";") or die(mysql_error());
		    if ($result3 == false) {$successfull = false;}
		}

	    }
	    if($successfull)
	    {
		//*** Commit Transaction ***//
		mysql_query("COMMIT");
		$msg = "Save Done for ".$neweduyear;
		$res = true;
	    }
	    else
	    {
		//*** RollBack Transaction ***//
		mysql_query("ROLLBACK");
		$msg = "Error. Try Again";
		$res = false;
	    }
	    return $res;
        }
	else
	{
            // problem executing select query
            return false;
        }
		$result = mysql_query("INSERT INTO students
							  (StudentFname, StudentLname, Sex, Age, ClassID, Fathername, Phone, Address, JobStatus, IsRoma, IsCurrent, IsActive)
							  VALUES
							  ('$studentfname', '$studentlname', '$sex', '$age', $classid,'$fathername','$phone','$address','$jobstatus','$isroma', '$iscurrent', $isactive);") or die(mysql_error());
		$sid = mysql_insert_id();
		$successfull = true;
		$result1 = mysql_query("INSERT INTO `_students_class` (StudentID, ClassID, eduperiod) VALUES (".$sid.", ".$classid.", '".$eduyear."');") or die(mysql_error());
		if ($result1 == false) {$successfull = false;}

		for ($x = 1; $x <= 10; $x++) {
			$result2 = mysql_query("INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (".$sid.", ".$x.", '0', '".$eduyear."');") or die(mysql_error());
			if ($result2 == false) {$successfull = false;}
		}
		$msg = '';
		if(($result) and ($successfull))
		{
			//*** Commit Transaction ***//
			mysql_query("COMMIT");
			$msg = "Save Done.";
			$res = true;
		}
		else
		{
			//*** RollBack Transaction ***//
			mysql_query("ROLLBACK");
			$msg = "Error. Try Again";
			$res = false;
		}
		return $res;
    }

    public function updateStudentData($studentid, $studentCode, $studentfname, $studentlname, $sex, $age, $classid, $fathername,
				      $phone, $address, $marital, $children, $jobstatus, $monthsunemployment, $isroma, $iscurrent, $isactive, $eduyear) {
		//*** Start Transaction ***//
		mysql_query("BEGIN");
		$result = mysql_query("UPDATE students SET
				      StudentCode = '".$studentCode."',
				      StudentFname = '".$studentfname."',
				      StudentLname = '".$studentlname."',
				      Sex = '".$sex."',
				      Age = '".$age."',
				      ClassID = ".$classid.",
				      Fathername = '".$fathername."',
				      Phone = '".$phone."',
				      Address = '".$address."',
				      MaritalStatus = '".$marital."',
				      ChildrenNumber = '".$children."',
				      JobStatus = '".$jobstatus."',
				      MonthsUnemployment = '".$monthsunemployment."',
				      IsRoma = '".$isroma."',
				      IsCurrent = '".$iscurrent."',
				      IsActive = '".$isactive."'
				      WHERE StudentID = ".$studentid.";") or die(mysql_error());

		$successfull = true;
		if($eduyear>0)
		{
		    $result1 = mysql_query("UPDATE `_students_class` SET ClassID = ".$classid." WHERE StudentID = ".$studentid." AND eduperiod ='".$eduyear."';") or die(mysql_error());
		    if ($result1 == false) {$successfull = false;}
		}
		if(($result) and ($successfull))
		{
			//*** Commit Transaction ***//
			mysql_query("COMMIT");
			$msg = "Save Done.";
			$res = true;
		}
		else
		{
			//*** RollBack Transaction ***//
			mysql_query("ROLLBACK");
			$msg = "Error. Try Again";
			$res = false;
		}
		return $res;
    }


    public function removeStudentFromEduyear($studentid, $eduyear) {

	mysql_query("BEGIN");
        $result1 = mysql_query("DELETE FROM `_projects_students` WHERE StudentID = ".$studentid." AND ProjectID
			      IN (SELECT ProjectID FROM projects WHERE projectPeriod='".$eduyear."')");
	$result2 = mysql_query("DELETE FROM `_students_class` WHERE StudentID = ".$studentid." AND eduperiod='".$eduyear."';");

        // check for successful store
        if ($result1 != false and $result2 != false) {
            //*** Commit Transaction ***//
	    mysql_query("COMMIT");
	    $msg = "Save Done.";
	    $res = true;
        }
	else
	{
            //*** RollBack Transaction ***//
	    mysql_query("ROLLBACK");
	    $msg = "Error. Try Again";
	    $res = false;
        }
	return $res;
    }

    public function removeStudent($studentid) {

	mysql_query("BEGIN");
        $result1 = mysql_query("DELETE FROM `_projects_students` WHERE StudentID = ".$studentid);
	$result2 = mysql_query("DELETE FROM `_students_class` WHERE StudentID = ".$studentid);
	$result4 = mysql_query("DELETE FROM `_students_general` WHERE StudentID = ".$studentid);
	$result3 = mysql_query("DELETE FROM `students` WHERE StudentID = ".$studentid);

        // check for successful store
        if ($result1 != false and $result2 != false and $result3 != false and $result4 != false) {
            //*** Commit Transaction ***//
	    mysql_query("COMMIT");
	    $msg = "Delete Done.";
	    $res = true;
        }
	else
	{
            //*** RollBack Transaction ***//
	    mysql_query("ROLLBACK");
	    $msg = "Error. Try Again";
	    $res = false;
        }
	return $res;
    }





}

?>
