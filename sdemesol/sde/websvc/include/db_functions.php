<?php

class DB_Functions {

    private $db;
	public $con;

    //put your code here
    // constructor
    function __construct() {
        require_once 'DB_Connect.php';
        // connecting to database
        $this->db = new DB_Connect();
        $this->con = $this->db->connect();
		$con=$this->con;

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
        $result = $this->con->query("INSERT INTO users(unique_id, name, email, encrypted_password, salt, created_at) VALUES('$uuid', '$name', '$email', '$encrypted_password', '$salt', NOW())");
        // check for successful store
        if ($result) {
            // get user details
            $uid = $this->con->insert_id; // last inserted id
            $result = $this->con->query("SELECT * FROM users WHERE uid = $uid");
            // return user details
            return $result->fetch_array();
        } else {
            return false;
        }
    }

    /**
     * Get user by email and password
     */
    public function getUserByUsernameAndPassword($username, $password) {
        $result = $this->con->query("SELECT * FROM sdeusers WHERE Username = '$username'");
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
        $result = $this->con->query("SELECT * FROM users WHERE uid = $userid");
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
        $result = $this->con->query("SELECT userrole FROM sdeusers WHERE uid = $userid");
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
        $result = $this->con->query("SELECT * FROM `users` WHERE uid = ".$userid);
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
        $result = $this->con->query("SELECT * FROM `sdeusers` WHERE UserID = ".$userid);
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
        $result = $this->con->query("SELECT * FROM products WHERE pid = $pid");
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
        $result = $this->con->query("SELECT email FROM users WHERE uid IN (Select userid from user_products where productid = $pid)");
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
        $result = $this->con->query("SELECT email from users WHERE email = '$email'");
        $no_of_rows = $result->num_rows;
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
		$this->con->query("BEGIN");
		$result = $this->con->query("UPDATE `sdeusers` SET
				      UserFname = '".$fname."',
				      UserLname = '".$lname."',
				      Eidikotita = '".$eidikotita."',
				      EidikotitaCode = '".$eidikotitacode."',
				      Address = '".$address."',
				      Phone = '".$phone."',
				      Email = '".$email."'
				      WHERE UserID = ".$personid.";");

		$successfull = true;
		if($successfull)
		{
			//*** Commit Transaction ***//
			$this->con->query("COMMIT");
			$msg = "Save Done.";
			$res = true;
		}
		else
		{
			//*** RollBack Transaction ***//
			$this->con->query("ROLLBACK");
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

		$result = $this->con->query("UPDATE `sdeusers` SET encrypted_password = '$encrypted_password', salt = '$salt' WHERE UserID = '$userid';");

		$res='0';
		if ($result) {$res='1';}
		return $res;


    }


	/**
     * Get users classes
     */
    public function getUserLessons($userid) {
		$result = $this->con->query("SELECT lt.*, lessons.LessonName AS lessonname, lt.LessonID As lessonid FROM `_lessons_teachers` As lt INNER JOIN lessons ON lessons.LessonID = lt.LessonID INNER JOIN sdeusers ON sdeusers.UserID = lt.TeacherID WHERE lt.TeacherId = '$userid'");
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=$result->fetch_assoc())
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
	$result = $this->con->query("SELECT ct.*, class.ClassName AS classname, ct.ClassID As classid FROM `_class_teachers` As ct INNER JOIN class ON class.ClassID = ct.ClassID INNER JOIN sdeusers ON sdeusers.UserID = ct.TeacherID WHERE ct.TeacherID = '$userid'");
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=$result->fetch_assoc())
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
		$result = $this->con->query("SELECT ClassName AS classname, ClassID As classid FROM class
				      WHERE RespTeacher = $userid");
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=$result->fetch_assoc())
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
	    return $this->con->query("SELECT * FROM students WHERE IsActive = 1");



    }

    /**
     * Get Student by id
     */
    public function getStudent($studentid) {
        $result = $this->con->query("SELECT * FROM `students` WHERE StudentID = ".$studentid);
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
	$result = $this->con->query("SELECT ClassID FROM `_students_class`
			      WHERE StudentID = ".$studentid." AND eduperiod='".$eduyear."'");
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
	$result = $this->con->query("SELECT `_students_general`.*FROM `_students_general`
			      WHERE `_students_general`.StudentID = ".$studentid);
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=$result->fetch_assoc())
			{
			    $classid = 0;
			    $result2 = $this->con->query("SELECT ClassID FROM `_students_class`
			      WHERE StudentID = ".$studentid." AND eduperiod='".$row['eduyear']."'");
			    $no_of_rows2 = $result2->num_rows;
			    if ($no_of_rows2 > 0) {
				$result2 = $result2->fetch_array();
				$classid = $result2['ClassID'];
			    }

			    $result3 = $this->con->query("SELECT less.*, lessons.LessonName As lname FROM `_students_lessons` as less
						   INNER JOIN lessons ON lessons.LessonID = less.LessonID
			      WHERE StudentID = ".$studentid." AND eduyear='".$row['eduyear']."'");
			    $no_of_rows3 = $result3->num_rows;
			    $arr2 = array();
			    while($row3=$result3->fetch_assoc())
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
		$result = $this->con->query("SELECT * FROM students WHERE StudentID = '$studentid'");
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=$result->fetch_assoc())
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
		$result = $this->con->query("SELECT asemester, bsemester FROM `_students_lessons` WHERE StudentID = '$studentid' AND eduyear='$eduyear' AND LessonID IN (SELECT LessonID FROM `_lessons_teachers` WHERE TeacherID = '$teacherid')");
        //$result = mysql_query("SELECT * FROM sdeusers WHERE Username = '$username'") or die(mysql_error());
        // check for result
		if ($result) {

			}
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
			$arr=array();
			while($row=$result->fetch_assoc())
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

		$result = $this->con->query("UPDATE `_students_lessons` SET ".$sem."='$grade' WHERE StudentID = '$studentid' AND eduyear='$eduyear'  AND LessonID = '$lessonid'");

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
        $result = $this->con->query("SELECT * FROM `projects` WHERE ProjectID = ".$projectid);
        // check for result
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0) {
            $result = $result->fetch_array();
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
	$result = $this->con->query("SELECT p.ProjectID As projectid, p.projectName As projectname, p.Type As projecttype FROM `projects` As p
		INNER JOIN `_projects_teachers` As t ON t.ProjectID = p.ProjectID
		WHERE p.projectPeriod = '".$eduyear."' AND t.TeacherID = ".$userid);
        // check for result
	if ($result) {
	    $no_of_rows = $result->num_rows;

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=$result->fetch_assoc())
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
	$result = $this->con->query("SELECT * FROM projects WHERE ProjectID = ".$projectid) or die(mysql_error());
        // check for result
	if ($result)
	{
	    $no_of_rows = $result->num_rows;

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=$result->fetch_assoc())
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
	$result = $this->con->query("SELECT t.* FROM `_projects_teachers` As p
		INNER JOIN sdeusers As t ON t.UserID = p.TeacherID
		WHERE p.ProjectID = ".$projectid);
        // check for result
	if ($result) {
	    $no_of_rows = $result->num_rows;

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=$result->fetch_assoc())
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
	$result = $this->con->query("SELECT t.* FROM sdeusers As t WHERE UserID NOT IN (100) AND UserID NOT IN
		(SELECT TeacherID FROM `_projects_teachers` As p
		WHERE p.ProjectID = ".$projectid.")") or die(mysql_error());
        // check for result
	if ($result) {
	    $no_of_rows = $result->num_rows;

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=$result->fetch_assoc())
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
	$result = $this->con->query("SELECT t.* FROM students As t WHERE IsCurrent=1 AND StudentID NOT IN
		(SELECT StudentID FROM `_projects_students` As p
		WHERE p.ProjectID IN (Select ProjectID FROM `projects` where projectPeriod IN (select projectPeriod from `projects` where ProjectID=".$projectid.") AND Type IN (SELECT Type from `projects`where ProjectID=".$projectid."))) ORDER BY t.StudentLname");
        // check for result
	if ($result) {
	    $no_of_rows = $result->num_rows;

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=$result->fetch_assoc())
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
	$result = $this->con->query("SELECT t.* FROM `_projects_students` As p
		INNER JOIN students As t ON t.StudentID = p.StudentID
		WHERE p.ProjectID = ".$projectid);
        // check for result
	if ($result) {
	    $no_of_rows = $result->num_rows;

	    if ($no_of_rows > 0) {
		$arr=array();
		while($row=$result->fetch_assoc())
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
        $result = $this->con->query("INSERT INTO `_projects_teachers`(ProjectID, TeacherID) VALUES('$projectid', '$userid')");
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
        $result = $this->con->query("DELETE FROM `_projects_teachers` WHERE ProjectID = '$projectid' AND TeacherID = '$userid'");
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
        $result = $this->con->query("INSERT INTO `_projects_students`(ProjectID, StudentID) VALUES('$projectid', '$studentid')");
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
        $result = $this->con->query("DELETE FROM `_projects_students` WHERE ProjectID = '$projectid' AND StudentID = '$studentid'");
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
    public function insertExcelData($mitroo, $studentfname, $studentlname, $sex, $age, $classid, $fathername, $phone, $address, $marital, $children, $jobstatus, $monthsunemployment, $isroma, $eduyear, $iscurrent, $isactive, $isold) {
		if($isold==0)
		{
		//*** Start Transaction ***//
		$this->con->query("BEGIN");
		$result = $this->con->query("INSERT INTO students
							  (StudentCode, StudentFname, StudentLname, Sex, Age, ClassID, Fathername, Phone, Address, MaritalStatus, ChildrenNumber, JobStatus, MonthsUnemployment, IsRoma, IsCurrent, IsActive)
							  VALUES
							  ('$mitroo', '$studentfname', '$studentlname', '$sex', '$age', $classid,'$fathername','$phone','$address', '$marital', '$children','$jobstatus', '$monthsunemployment','$isroma', '$iscurrent', $isactive);");
		$sid = $this->con->insert_id;
		$successfull = true;
		$result1 = $this->con->query("INSERT INTO `_students_class` (StudentID, ClassID, eduperiod) VALUES (".$sid.", ".$classid.", '".$eduyear."');");
		if ($result1 == false) {$successfull = false;}
		
		$result1gen = $this->con->query("INSERT INTO `_students_general` (StudentID, eduyear) VALUES (".$sid.", '".$eduyear."');");
		if ($result1gen == false) {$successfull = false;}

		for ($x = 1; $x <= 10; $x++) {
			$result2 = $this->con->query("INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (".$sid.", ".$x.", '0', '".$eduyear."');");
			if ($result2 == false) {$successfull = false;}
		}
		$msg = '';
		if(($result) and ($successfull))
		{
			//*** Commit Transaction ***//
			$this->con->query("COMMIT");
			$msg = "Save Done.";
			$res = true;
		}
		else
		{
			//*** RollBack Transaction ***//
			$this->con->query("ROLLBACK");
			$msg = "Error. Try Again";
			$res = false;
		}
		return $res;
		}
		return true;
		
    }

    public function changeStudentsYear($oldeduyear, $neweduyear)
    {

	$result = $this->con->query("SELECT * FROM `_students_class` WHERE eduperiod= '$oldeduyear'");
        $no_of_rows = $result->num_rows;
        if ($no_of_rows > 0)
	{
	    $successfull = true;
	    $this->con->query("BEGIN");
	    while($row=$result->fetch_assoc())
	    {

		//*** Start Transaction ***//

		$sid = $row['StudentID'];
		$classid = $row['ClassID'];
		if ((int)$classid<4)
		{
		    $newclass = (int)$classid+3;

		    $result1 = $this->con->query("INSERT INTO `_students_class` (StudentID, ClassID, eduperiod)
					   VALUES (".$sid.", ".$newclass.", '".$neweduyear."');");
		    if ($result1 == false) {$successfull = false;}
		    for ($x = 1; $x <= 10; $x++)
		    {
			$result2 = $this->con->query("INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (".$sid.", ".$x.", '0', '".$neweduyear."');");
			if ($result2 == false) {$successfull = false;}
		    }
		}
		else
		{
		    $result3 = $this->con->query("UPDATE `students` SET IsActive=0, IsCurrent=0 WHERE StudentID=".$sid.";");
		    if ($result3 == false) {$successfull = false;}
		}

	    }
	    if($successfull)
	    {
		//*** Commit Transaction ***//
		$this->con->query("COMMIT");
		$msg = "Save Done for ".$neweduyear;
		$res = true;
	    }
	    else
	    {
		//*** RollBack Transaction ***//
		$this->con->query("ROLLBACK");
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
		$result = $this->con->query("INSERT INTO students
							  (StudentFname, StudentLname, Sex, Age, ClassID, Fathername, Phone, Address, JobStatus, IsRoma, foraksiologisi, IsCurrent, IsActive)
							  VALUES
							  ('$studentfname', '$studentlname', '$sex', '$age', $classid,'$fathername','$phone','$address','$jobstatus','$isroma', '$foraksiologisi', '$iscurrent', $isactive);");
		$sid = $this->con->insert_id();
		$successfull = true;
		$result1 = $this->con->query("INSERT INTO `_students_class` (StudentID, ClassID, eduperiod) VALUES (".$sid.", ".$classid.", '".$eduyear."');");
		if ($result1 == false) {$successfull = false;}

		for ($x = 1; $x <= 10; $x++) {
			$result2 = $this->con->query("INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (".$sid.", ".$x.", '0', '".$eduyear."');");
			if ($result2 == false) {$successfull = false;}
		}
		$msg = '';
		if(($result) and ($successfull))
		{
			//*** Commit Transaction ***//
			$this->con->query("COMMIT");
			$msg = "Save Done.";
			$res = true;
		}
		else
		{
			//*** RollBack Transaction ***//
			$this->con->query("ROLLBACK");
			$msg = "Error. Try Again";
			$res = false;
		}
		return $res;
    }

    public function updateStudentData($studentid, $studentCode, $studentfname, $studentlname, $sex, $age, $classid, $fathername,
				      $phone, $address, $marital, $children, $jobstatus, $monthsunemployment, $isroma, $foraksiologisi, $iscurrent, $isactive, $eduyear) {
		//*** Start Transaction ***//
		$this->con->query("BEGIN");
		$result = $this->con->query("UPDATE students SET
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
					  foraksiologisi = '".$foraksiologisi."',
				      IsCurrent = '".$iscurrent."',
				      IsActive = '".$isactive."'
				      WHERE StudentID = ".$studentid.";");

		$successfull = true;
		if($eduyear>0)
		{
		    $result1 = $this->con->query("UPDATE `_students_class` SET ClassID = ".$classid." WHERE StudentID = ".$studentid." AND eduperiod ='".$eduyear."';");
		    if ($result1 == false) {$successfull = false;}
		}
		if(($result) and ($successfull))
		{
			//*** Commit Transaction ***//
			$this->con->query("COMMIT");
			$msg = "Save Done.";
			$res = true;
		}
		else
		{
			//*** RollBack Transaction ***//
			$this->con->query("ROLLBACK");
			$msg = "Error. Try Again";
			$res = false;
		}
		return $res;
    }

    public function updateStudentData2($studentid, $studentCode, $studentfname, $studentlname, $sex, $age, $classid, $fathername, $fathernamegen,
              $phone, $address, $marital, $children, $jobstatus, $monthsunemployment, $isroma, $foraksiologisi, $iscurrent, $isactive, $eduyear) {
    
    
	//*** Start Transaction ***//
    $this->con->query("BEGIN");
    $result = $this->con->query("UPDATE students SET
              StudentCode = '".$studentCode."',
              StudentFname = '".$studentfname."',
              StudentLname = '".$studentlname."',
              Sex = '".$sex."',
              Age = '".$age."',
              ClassID = ".$classid.",
              Fathername = '".$fathername."',
              FathernameGen = '".$fathernamegen."',
              Phone = '".$phone."',
              Address = '".$address."',
              MaritalStatus = '".$marital."',
              ChildrenNumber = '".$children."',
              JobStatus = '".$jobstatus."',
              MonthsUnemployment = '".$monthsunemployment."',
              IsRoma = '".$isroma."',
			  foraksiologisi = '".$foraksiologisi."',
              IsCurrent = '".$iscurrent."',
              IsActive = '".$isactive."'
              WHERE StudentID = ".$studentid.";");

    $successfull = true;
	if($eduyear>0)
    {
        $result1 = $this->con->query("UPDATE `_students_class` SET ClassID = ".$classid." WHERE StudentID = ".$studentid." AND eduperiod ='".$eduyear."';");
        if ($result1 == false) {$successfull = false;}
    }
    if(($result) and ($successfull))
    {
      //*** Commit Transaction ***//
      $this->con->query("COMMIT");
      $msg = "Save Done.";
      $res = true;
    }
    else
    {
      //*** RollBack Transaction ***//
      $this->con->query("ROLLBACK");
      $msg = "Error. Try Again";
      $res = false;
    }
    return $res;
    }

    public function removeStudentFromEduyear($studentid, $eduyear) {

	$this->con->query("BEGIN");
        $result1 = $this->con->query("DELETE FROM `_projects_students` WHERE StudentID = ".$studentid." AND ProjectID
			      IN (SELECT ProjectID FROM projects WHERE projectPeriod='".$eduyear."')");
	$result2 = $this->con->query("DELETE FROM `_students_class` WHERE StudentID = ".$studentid." AND eduperiod='".$eduyear."';");

        // check for successful store
        if ($result1 != false and $result2 != false) {
            //*** Commit Transaction ***//
	    $this->con->query("COMMIT");
	    $msg = "Save Done.";
	    $res = true;
        }
	else
	{
            //*** RollBack Transaction ***//
	    $this->con->query("ROLLBACK");
	    $msg = "Error. Try Again";
	    $res = false;
        }
	return $res;
    }

    public function removeStudent($studentid) {

	$this->con->query("BEGIN");
        $result1 = $this->con->query("DELETE FROM `_projects_students` WHERE StudentID = ".$studentid);
	$result2 = $this->con->query("DELETE FROM `_students_class` WHERE StudentID = ".$studentid);
	$result4 = $this->con->query("DELETE FROM `_students_general` WHERE StudentID = ".$studentid);
	$result3 = $this->con->query("DELETE FROM `students` WHERE StudentID = ".$studentid);

        // check for successful store
        if ($result1 != false and $result2 != false and $result3 != false and $result4 != false) {
            //*** Commit Transaction ***//
	    $this->con->query("COMMIT");
	    $msg = "Delete Done.";
	    $res = true;
        }
	else
	{
            //*** RollBack Transaction ***//
	    $this->con->query("ROLLBACK");
	    $msg = "Error. Try Again";
	    $res = false;
        }
	return $res;
    }



    /**
       * Insert Student Lessons Data into the database
       */
      public function insertStudLessonsData($sid, $eduyear) {
      //*** Start Transaction ***//
      $this->con->uery("BEGIN");


      for ($x = 1; $x <= 10; $x++) {
        $result2 = $this->con->query("INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (".$sid.", ".$x.", '0', '".$eduyear."');");
        if ($result2 == false) {$successfull = false;}
      }
      $msg = '';
      if($successfull)
      {
        //*** Commit Transaction ***//
        $this->con->query("COMMIT");
        $msg = "Save Done.";
        $res = true;
      }
      else
      {
        //*** RollBack Transaction ***//
        $this->con->query("ROLLBACK");
        $msg = "Error. Try Again";
        $res = false;
      }
      return $res;
      }

      /**
        * Delete Student Lessons Data from the database
         */
        public function removeStudLessonsData($sid, $eduyear) {
        //*** Start Transaction ***//
        $this->con->query("BEGIN");


        for ($x = 1; $x <= 10; $x++) {
          $result2 = $this->con->query("DELETE FROM `_students_lessons` WHERE StudentID = ".$sid." AND eduyear= '".$eduyear."';");
          if ($result2 == false) {$successfull = false;}
        }
        $msg = '';
        if($successfull)
        {
          //*** Commit Transaction ***//
          $this->con->query("COMMIT");
          $msg = "Deletion Done.";
          $res = true;
        }
        else
        {
          //*** RollBack Transaction ***//
          $this->con->query("ROLLBACK");
          $msg = "Error. Try Again";
          $res = false;
        }
        return $res;
        }


}

?>
