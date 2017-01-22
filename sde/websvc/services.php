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
if (isset($_GET['tag']) && $_GET['tag'] != '') {
    // get tag
    $tag = $_GET['tag'];

    // include db handler
    //require_once 'include/config.php';
    require_once 'include/DB_Functions.php';
    $db = new DB_Functions();

    // response Array
    $response = array("tag" => $tag, "success" => 0, "error" => 0);
    //$response = array("success" => 0, "error" => 0);

    // check for tag type
    if ($tag == 'login')
    {
        // Request type is check Login
        $username = $_GET['username'];
        $password = $_GET['password'];

        // check for user
        $user = $db->getUserByUsernameAndPassword($username, $password);
        if ($user != false) {
            // user found
            // echo json with success = 1
            $response["success"] = 1;
            $response["uid"] = $user["UserID"];
            $response["user"]["fname"] = $user["UserFname"];
            $response["user"]["lname"] = $user["UserLname"];
            $response["user"]["role"] = $user["userrole"];
            $response["user"]["username"] = $user["Username"];
            echo $_GET['callback'] . '(' . json_encode($response) . ');';
        } else {
            // user not found
            // echo json with error = 1
            $response["error"] = 1;
            $response["error_msg"] = "Incorrect email or password!";
            //echo json_encode($response);
            if (isset($_GET['callback']))
	    {
		echo $_GET['callback'] . '(' . json_encode($response) . ');';
	    }
	    else
	    {
		echo json_encode($response);
	    }
        }
    }
    else if ($tag == 'chpass') 
    {
        // Request type is Register new user
	if (isset($_GET['userid']) && isset($_GET['password'])) {												  
		$userid = $_GET['userid'];
		$password = $_GET['password'];
		// check for user
		$res = $db->updateUserPass($userid, $password);
		if ($res == '1') {
			// user found
			// echo json with success = 1
			$response["success"] = 1;
			echo $_GET['callback'] . '(' . json_encode($response) . ');';
		} else {
			// user not found
			// echo json with error = 1
			$response["error"] = 1;
			$response["error_msg"] = "Something went wrong!";
		}
	}
	else
	{
		$response["error"] = 1;
		$response["error_msg"] = "UserID or Password missing!";
	}
	if (isset($_GET['callback']))
	{
		echo $_GET['callback'] . '(' . json_encode($response) . ');';
	}
	else
	{
		echo json_encode($response);
	}		
    }
    else if ($tag == 'resetpass') 
    {
        // Request type is Register new user
	if (isset($_GET['userid'])) {												  
		$userid = $_GET['userid'];
		$password = 'password';
		// check for user
		$res = $db->updateUserPass($userid, $password);
		if ($res == '1') {
			// user found
			// echo json with success = 1
			$response["success"] = 1;
			echo $_GET['callback'] . '(' . json_encode($response) . ');';
		} else {
			// user not found
			// echo json with error = 1
			$response["error"] = 1;
			$response["error_msg"] = "Something went wrong!";
		}
	}
	else
	{
		$response["error"] = 1;
		$response["error_msg"] = "Problem resetting the user password!";
	}
	if (isset($_GET['callback']))
	{
		echo $_GET['callback'] . '(' . json_encode($response) . ');';
	}
	else
	{
		echo json_encode($response);
	}		
    }
    else if ($tag == 'register')
    {
        // Request type is Register new user
        $name = $_GET['name'];
        $email = $_GET['email'];
        $password = $_GET['password'];

        // check if user is already existed
        if ($db->isUserExisted($email)) {
            // user is already existed - error response
            $response["error"] = 2;
            $response["error_msg"] = "User already existed";
            //echo json_encode($response);
            //echo $_GET['callback'] . '(' . json_encode($response) . ');';
        }
        else
        {
            // store user
            $user = $db->storeUser($name, $email, $password);
            if ($user) {
                // user stored successfully
                $response["success"] = 1;
                $response["uid"] = $user["unique_id"];
                $response["user"]["name"] = $user["name"];
                $response["user"]["email"] = $user["email"];
                $response["user"]["created_at"] = $user["created_at"];
                $response["user"]["updated_at"] = $user["updated_at"];
                //echo json_encode($response);
                //echo $_GET['callback'] . '(' . json_encode($response) . ');';
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "Error occured in Registartion";
                //echo json_encode($response);
                //echo $_GET['callback'] . '(' . json_encode($response) . ');';
            }
        }
    }
    else if ($tag == 'getuserlessons') {
        // Request type is Register new user
        $userid = $_GET['userid'];
        
        
            $lessons = $db->getUserLessons($userid);
			
            if ($lessons) {
                // user stored successfully
                $response["success"] = 1;
                $response["lessons"] = $lessons;
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "Error occured while fetching the Data";
            }
	}
    else if ($tag == 'getuserprojects')
    {
        // Request type is Register new user
        $userid = $_GET['userid'];
	$eduyear = $_GET['eduyear'];
        $projects = $db->getUserProjects($userid, $eduyear);
	if ($projects) {
	    // user stored successfully
	    $response["success"] = 1;
	    $response["projects"] = $projects;
	} else {
	    // user failed to store
	    $response["error"] = 1;
	    $response["error_msg"] = "Error occured while fetching the Data";
	}
    }
    else if ($tag == 'getuserclasses')
    {
        // Request type is Register new user
        $userid = $_GET['userid'];
        $lessonid = $_GET['lessonid'];        
        
	$classes = $db->getUserClasses($userid, $lessonid);
		    
	if ($classes) {
	    // user stored successfully
	    $response["success"] = 1;
	    $response["classes"] = $classes;
			    
	} else {
	    // user failed to store
	    $response["error"] = 1;
	    $response["error_msg"] = "Error occured while fetching the Data";
	}
    }
    else if ($tag == 'getprojectdetails')
    {
        $projectid = 1;
	if (isset($_GET['projectid']))
	{
	    $projectid = $_GET['projectid'];
	}
    
	$projdet = $db->getProjectDetails($projectid);
	$resps = $db->getProjectResp($projectid);
	$projstuds = $db->getProjectStudents($projectid);
	$otherteac = $db->getProjectOtherTeachers($projectid);
	$otherstud = $db->getProjectOtherStudents($projectid);
		    
	$success = 0;
	if ($projdet)
	{
	    $projectdetails = $projdet;
	    $success = 1;
	}
	else
	{
	    $projectdetails = '';
	}
	
	if ($resps)
	{
	    $responsibles = $resps;
	    $success = 1;
	}
	else
	{
	    $responsibles = '';
	}
	if ($projstuds)
	{
	    $projstudents = $projstuds;
	    $success = 1;
	}
	else
	{
	    $projstudents = '';
	}
	if ($otherteac)
	{
	    $otherteachers = $otherteac;
	    $success = 1;
	}
	else
	{
	    $otherteachers = '';
	}
	
	if ($otherstud)
	{
	    $otherstudents = $otherstud;
	    $success = 1;
	}
	else
	{
	    $otherstudents = '';
	}
	
	if ($success == 1) {
	    // user stored successfully
	    $response["success"] = 1;
	    $response["projectdetails"] = $projectdetails;
	    $response["responsibles"] = $responsibles;
	    $response["otherteachers"] = $otherteachers;
	    $response["projstudents"] = $projstudents;
	    $response["otherstudents"] = $otherstudents;
			    
	}
	else
	{
	    // user failed to store
	    $response["error"] = 1;
	    $response["error_msg"] = "Error occured while fetching the Data";
	}
    }
    
    else if ($tag == 'addprojectresp')
    {
        $projectid = 1;
	if (isset($_GET['projectid']))
	{
	    $projectid = $_GET['projectid'];
	}
	$userid = $_GET['userid'];
    
	$addProjectResp = $db->addProjectResp($projectid, $userid);
	if ($addProjectResp == true)
	{
	    $resps = $db->getProjectResp($projectid);
	    $otherteac = $db->getProjectOtherTeachers($projectid);
			
	    $success = 0;
	    
	    if ($resps)
	    {
		$responsibles = $resps;
		$success = 1;
	    }
	    else
	    {
		$responsibles = '';
	    }
	    
	    if ($otherteac)
	    {
		$otherteachers = $otherteac;
		$success = 1;
	    }
	    else
	    {
		$otherteachers = '';
	    }
	    
	    if ($success == 1) {
		// user stored successfully
		$response["success"] = 1;
		$response["responsibles"] = $responsibles;
		$response["otherteachers"] = $otherteachers;
			
	    }
	    else
	    {
		// user failed to store
		$response["error"] = 1;
		$response["error_msg"] = "Error occured while fetching the Data";
	    }
	}
	else
	{
	    // user failed to store
	    $response["error"] = 1;
	    $response["error_msg"] = "Error occured while fetching the Data";
	}
    }
    else if ($tag == 'removeprojectresp')
    {
        $projectid = 1;
	if (isset($_GET['projectid']))
	{
	    $projectid = $_GET['projectid'];
	}
	$userid = $_GET['userid'];
    
	$removeProjectResp = $db->removeProjectResp($projectid, $userid);
	if ($removeProjectResp == true)
	{
	    $resps = $db->getProjectResp($projectid);
	    $otherteac = $db->getProjectOtherTeachers($projectid);
			
	    $success = 0;
	    
	    if ($resps)
	    {
		$responsibles = $resps;
		$success = 1;
	    }
	    else
	    {
		$responsibles = '';
	    }
	    
	    if ($otherteac)
	    {
		$otherteachers = $otherteac;
		$success = 1;
	    }
	    else
	    {
		$otherteachers = '';
	    }
	    
	    if ($success == 1) {
		// user stored successfully
		$response["success"] = 1;
		$response["responsibles"] = $responsibles;
		$response["otherteachers"] = $otherteachers;
			
	    }
	    else
	    {
		// user failed to store
		$response["error"] = 1;
		$response["error_msg"] = "Error occured while fetching the Data";
	    }
	}
	else
	{
	    // user failed to store
	    $response["error"] = 1;
	    $response["error_msg"] = "Error occured while fetching the Data";
	}
    }
    
    else if ($tag == 'addprojectstudent')
    {
        $projectid = 1;
	if (isset($_GET['projectid']))
	{
	    $projectid = $_GET['projectid'];
	}
	$studentid = $_GET['studentid'];
    
	$addProjectStudent = $db->addProjectStudent($projectid, $studentid);
	if ($addProjectStudent == true)
	{
	    $prstudents = $db->getProjectStudents($projectid);
	    $otherstud = $db->getProjectOtherStudents($projectid);
			
	    $success = 0;
	    
	    if ($prstudents)
	    {
		$projstudents = $prstudents;
		$success = 1;
	    }
	    else
	    {
		$projstudents = '';
	    }
	    
	    if ($otherstud)
	    {
		$otherstudents = $otherstud;
		$success = 1;
	    }
	    else
	    {
		$otherstudents = '';
	    }
	    
	    if ($success == 1) {
		// user stored successfully
		$response["success"] = 1;
		$response["projstudents"] = $projstudents;
		$response["otherstudents"] = $otherstudents;
			
	    }
	    else
	    {
		// user failed to store
		$response["error"] = 1;
		$response["error_msg"] = "Error occured while fetching the Data";
	    }
	}
	else
	{
	    // user failed to store
	    $response["error"] = 1;
	    $response["error_msg"] = "Error occured while fetching the Data";
	}
    }
    else if ($tag == 'removeprojectstudent')
    {
        $projectid = 1;
	if (isset($_GET['projectid']))
	{
	    $projectid = $_GET['projectid'];
	}
	$studentid = $_GET['studentid'];
    
	$removeProjectStudent = $db->removeProjectStudent($projectid, $studentid);
	if ($removeProjectStudent == true)
	{
	    $prstudents = $db->getProjectStudents($projectid);
	    $otherstud = $db->getProjectOtherStudents($projectid);
			
	    $success = 0;
	    
	    if ($prstudents)
	    {
		$projstudents = $prstudents;
		$success = 1;
	    }
	    else
	    {
		$projstudents = '';
	    }
	    
	    if ($otherstud)
	    {
		$otherstudents = $otherstud;
		$success = 1;
	    }
	    else
	    {
		$otherstudents = '';
	    }
	    
	    if ($success == 1) {
		// user stored successfully
		$response["success"] = 1;
		$response["projstudents"] = $projstudents;
		$response["otherstudents"] = $otherstudents;
			
	    }
	    else
	    {
		// user failed to store
		$response["error"] = 1;
		$response["error_msg"] = "Error occured while fetching the Data";
	    }
	}
	else
	{
	    // user failed to store
	    $response["error"] = 1;
	    $response["error_msg"] = "Error occured while fetching the Data";
	}
    }
    
    
    else if ($tag == 'getuserrespclass') {
        // Request type is Register new user
        $userid = $_GET['userid'];
        
            $classes = $db->getUserRespClass($userid);
			
            if ($classes) {
                // user stored successfully
                $response["success"] = 1;
                $response["classes"] = $classes;
				
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "Error occured while fetching the Data";
            }
	}
    else if ($tag == 'role')
    {
        // Request type is Register new user
        $userid = $_GET['userid'];
        
        
            $userrole = $db->getUserRole($userid);
			
            if ($classes) {
                // user stored successfully
                $response["success"] = 1;
                $response["classes"] = $userrole;
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "Error occured while fetching the Data";
            }
	} else if ($tag == 'grade') {
        // Request type is Register new user
        $studentid = $_GET['studentid'];
		$teacherid = $_GET['teacherid'];
		$eduyear = $_GET['eduyear'];
        
        
            $studentgrades = $db->getUserGrades($studentid, $teacherid, $eduyear);
			
            if ($studentgrades) {
                // user stored successfully
                $response["success"] = 1;
                $response["studentgrades"] = $studentgrades;
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "Error occured while fetching the Grades Data";
            }
	} else if ($tag == 'savegrade') {
        // Request type is Register new user
        $studentid = $_GET['studentid'];
		$lessonid = $_GET['lessonid'];
		$period = $_GET['period'];
		$teacherid = $_GET['teacherid'];
		$eduyear = $_GET['eduyear'];
		$grade = $_GET['grade'];
        
        
            $res = $db->updUserGrades($studentid, $lessonid, $period, $teacherid, $eduyear, $grade);
			
            if ($res) {
                // user stored successfully
                $response["success"] = 1;
                $response["res"] = $res;
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "General Error while saving grades";
			}
	} else if ($tag == 'studdata') {
            // Request type is Register new user
            $studentid = $_GET['studentid'];
        
            $res = $db->getStudData($studentid);
			
            if ($res) {
                // user stored successfully
                $response["success"] = 1;
                $response["studentfname"] = $res[0]['studentfname'];
                $response["studentlname"] = $res[0]['studentlname'];
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "General Error while saving grades";
			}
    }
    else if ($tag == 'newyear')
    {
        // Request type is Register new user
        $oldeduyear = $_GET['oldeduyear'];
	$neweduyear = $_GET['neweduyear'];
        $res = $db->changeStudentsYear($oldeduyear, $neweduyear);
	if ($res) {
            // user stored successfully
            $response["success"] = 1;
        }
	else
	{
            // user failed to store
            $response["error"] = 1;
            $response["error_msg"] = "General Error";
	}
    }
    else
    {
        $response["error"] = 1;
    $response["error_msg"] = "Invalid Request";
    }
}
else
{
    $response["error"] = 1;
    $response["error_msg"] = "Access Denied";

}
if (isset($_GET['callback']))
{
    echo $_GET['callback'] . '(' . json_encode($response) . ');';
}
else
{
    echo json_encode($response);
}
?>
