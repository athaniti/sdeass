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
if (isset($_POST['tag']) && $_POST['tag'] != '') {
    // get tag
    $tag = $_POST['tag'];

    // include db handler
    //require_once 'include/config.php';
    require_once 'include/db_functions.php';
    $db = new DB_Functions();

    // response Array
    $response = array("tag" => $tag, "success" => 0, "error" => 0);
    //$response = array("success" => 0, "error" => 0);

    // check for tag type
    if ($tag == 'login') {
        // Request type is check Login
        $username = $_POST['username'];
        $password = $_POST['password'];

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
            echo $_POST['callback'] . '(' . json_encode($response) . ');';
        } else {
            // user not found
            // echo json with error = 1
            $response["error"] = 1;
            $response["error_msg"] = "Incorrect email or password!";
            //echo json_encode($response);
            if (isset($_POST['callback']))
	    {
		echo $_POST['callback'] . '(' . json_encode($response) . ');';
	    }
	    else
	    {
		echo json_encode($response);
	    }
        }
    } else if ($tag == 'register') {
        // Request type is Register new user
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // check if user is already existed
        if ($db->isUserExisted($email)) {
            // user is already existed - error response
            $response["error"] = 2;
            $response["error_msg"] = "User already existed";
            //echo json_encode($response);
            //echo $_POST['callback'] . '(' . json_encode($response) . ');';
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
                //echo $_POST['callback'] . '(' . json_encode($response) . ');';
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "Error occured in Registartion";
                //echo json_encode($response);
                //echo $_POST['callback'] . '(' . json_encode($response) . ');';
            }
        }
    } else if ($tag == 'getuserlessons') {
        // Request type is Register new user
        $userid = $_POST['userid'];


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
	} else if ($tag == 'getuserclasses') {
        // Request type is Register new user
        $userid = $_POST['userid'];
        $lessonid = $_POST['lessonid'];

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
	} else if ($tag == 'role') {
        // Request type is Register new user
        $userid = $_POST['userid'];


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
        $studentid = $_POST['studentid'];
		$teacherid = $_POST['teacherid'];
		$eduyear = $_POST['eduyear'];


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
        $studentid = $_POST['studentid'];
		$lessonid = $_POST['lessonid'];
		$period = $_POST['period'];
		$teacherid = $_POST['teacherid'];
		$eduyear = $_POST['eduyear'];
		$grade = $_POST['value'];


            $res = $db->updUserGrades($studentid, $lessonid, $period, $teacherid, $eduyear, $grade);

            if ($res = '1') {
                // user stored successfully
                $response["success"] = 1;
                $response["res"] = $res;
				$response["studentgrades"] = $grade;
            } else {
                // user failed to store
                $response["error"] = 1;
                $response["error_msg"] = "General Error while saving grades";
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
if (isset($_POST['callback']))
{
    echo $_POST['callback'] . '(' . json_encode($response) . ');';
}
else
{
    echo json_encode($response);
}
?>
