<?php

try
{
	//Open database connection
	require_once 'include/db_functions.php';
    $db = new DB_Functions();
	$con = $db->con;
    $eduyear = '2526';
    if (isset($_GET['eduyear']) && $_GET['eduyear'] !== '') {
		$eduyear = $_GET['eduyear'];
	} elseif (isset($_POST['eduyear']) && $_POST['eduyear'] !== '') {
		$eduyear = $_POST['eduyear'];
	}


	//Getting records (listAction)
	if($_GET["action"] == "list")
	{
		//Get records from database
		//$a1 = "SELECT COUNT(*) FROM `_class_teachers`
		$result = $con->query("SELECT distinct sdeusers.*, l.LessonID FROM sdeusers LEFT JOIN `_lessons_teachers` AS l ON l.TeacherID = sdeusers.UserID;");

		//Add all records to an array
		$rows = array();
		while($row = $result->fetch_array())
		{
			$userid=(int)$row['UserID'];
			$result2 = $con->query("SELECT ClassID FROM `_class_teachers` WHERE eduyear= '".$eduyear."' AND TeacherID = ".$userid.";");
			
			while($row2 = $result2->fetch_array())
			{
				switch ($row2["ClassID"])
				{
					case 1:
						$row["A1"] = '1';
						break;
					case '2':
						$row['A2'] = 1;
						break;
					case 3:
						$row["A3"] = '1';
						break;
					case 4:
						$row["B1"] = '1';
						break;
					case 5:
						$row["B2"] = '1';
						break;
					case 6:
						$row["B3"] = '1';
						break;
					case 7:
						$row["B4"] = '1';
						break;
					case 8:
						$row["B5"] = '1';
						break;
				}
			}
			$rows[] = $row;



		}

		//Return result to jTable
		$jTableResult = array();
		$jTableResult['Result'] = "OK";
		$jTableResult['Records'] = $rows;
		print json_encode($jTableResult);
	}
	//Creating a new record (createAction)
	else if($_GET["action"] == "create")
	{
		if ($_POST["UserFname"]=='' || $_POST["UserLname"]=='')
		{
			$jTableResult = array();
			$jTableResult['Result'] = "ERROR";
			$jTableResult['Message'] = "Πρέπει να δώσετε όνομα και επίθετο.";
			print json_encode($jTableResult);

		}
		else
		{
			//Insert record into database
			$res1 =  $con->query("SELECT MAX(UserID) AS mid FROM sdeusers WHERE UserID <> 100");
			if ($res1)
			{
				$rows = $res1->fetch_array();
				$newid = intval($rows["mid"])+1;
			}
			$result = $con->query("INSERT INTO sdeusers(UserID, UserFname, UserLname, Username, Eidikotita, EidikotitaCode, userrole, Phone, Email, Address, encrypted_password, salt) VALUES($newid, '" . $_POST["UserFname"] . "', '" . $_POST["UserLname"] . "', '" . $_POST["Username"] . "', '" . $_POST["Eidikotita"] . "', '" . $_POST["EidikotitaCode"] . "','" . $_POST["userrole"] . "','" . $_POST["Phone"] . "','" . $_POST["Email"] . "','" . $_POST["Address"] . "','DXkRD8/Mbv65wCxVams09oQZBlQ2MTg3MzBiZWFm', '618730beaf');");
			if ($result)
			{

				//Get last inserted record (to return to jTable)
				$resultu = $con->query("SELECT * FROM sdeusers WHERE UserID = $newid;");
				$userId   = (int)$newid;
				$lessonId = isset($_POST['LessonID']) && $_POST['LessonID'] !== '' ? (int)$_POST['LessonID'] : 0;
				$row = $resultu->fetch_array();
				if ($lessonId <= 0) {
					throw new Exception("LessonID is required");
				}
				$con->query("DELETE FROM `_lessons_teachers` WHERE TeacherID = $userId AND eduyear = '$eduyear'");
				$con->query("INSERT INTO `_lessons_teachers` (`TeacherID`,`LessonID`,`eduyear`) VALUES ($userId, $lessonId, '$eduyear')");
				//$result1 = $con->query("INSERT INTO `_lessons_teachers` (LessonID, TeacherID, eduyear) VALUES(" . $_POST["LessonID"] . ", " . $row["UserID"] . ",'".$eduyear."');");
				$insvalues = "";
				if ($_POST["A1"] == "1") {$insvalues .= "(1, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["A2"] == "1") {$insvalues .= ",(2, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["A3"] == "1") {$insvalues .= ",(3, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["B1"] == "1") {$insvalues .= ",(4, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["B2"] == "1") {$insvalues .= ",(5, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["B3"] == "1") {$insvalues .= ",(6, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["B4"] == "1") {$insvalues .= ",(7, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["B5"] == "1") {$insvalues .= ",(8, " . $row["UserID"] . ",'".$eduyear."')";}
				if (substr($insvalues, 0, 1) == ",") {$insvalues = substr($insvalues, 1);}
				if ($insvalues != "") {
					$result2 = $con->query("INSERT INTO `_class_teachers` (ClassID, TeacherID, eduyear) VALUES ".$insvalues.";");
				}
			}

			//Return result to jTable
			$jTableResult = array();
			$jTableResult['Result'] = "OK";
			$jTableResult['Record'] = $result;

			print json_encode($jTableResult);
		}
	}
	//Updating a record (updateAction)
	else if($_GET["action"] == "update")
	{
		if ($_POST["UserFname"]=='' || $_POST["UserLname"]=='')
		{
			$jTableResult = array();
			$jTableResult['Result'] = "ERROR";
			$jTableResult['Message'] = "Πρέπει να δώσετε όνομα και επίθετο.";
			print json_encode($jTableResult);

		}
		else
		{
			//Update record in database
			$result = $con->query("UPDATE sdeusers SET UserFname = '" . $_POST["UserFname"] . "', UserLname = '" . $_POST["UserLname"] . "', Username = '" . $_POST["Username"] . "', Eidikotita = '" . $_POST["Eidikotita"] . "', EidikotitaCode = '" . $_POST["EidikotitaCode"] . "', Phone = '" . $_POST["Phone"] . "', Email = '" . $_POST["Email"] . "', Address = '" . $_POST["Address"] . "', userrole = '" . $_POST["userrole"] . "' WHERE UserID = " . $_POST["UserID"] . ";");

			//$result1 = $con->query("DELETE FROM `_lessons_teachers` WHERE TeacherID = " . $_POST["UserID"] . ";");
			//$result1 = $con->query("INSERT INTO `_lessons_teachers` (LessonID, TeacherID, eduyear) VALUES(" . $_POST["LessonID"] . ", " . $_POST["UserID"] . ",'".$eduyear."');");
			$userId   = (int)($_POST['UserID'] ?? 0);
			$lessonId = isset($_POST['LessonID']) && $_POST['LessonID'] !== '' ? (int)$_POST['LessonID'] : 0;

			if ($userId <= 0) {
				throw new Exception("Invalid UserID");
			}
			if ($lessonId <= 0) {
				throw new Exception("LessonID is required");
			}

			// delete ONLY for this year
			$con->query("DELETE FROM `_lessons_teachers` WHERE TeacherID = $userId AND eduyear = '$eduyear'");

			// insert mapping with LessonID
			$con->query("INSERT INTO `_lessons_teachers` (`TeacherID`,`LessonID`,`eduyear`) VALUES ($userId, $lessonId, '$eduyear')");
			//echo json_encode("INSERT INTO `_lessons_teachers` (`TeacherID`,`LessonID`,`eduyear`) VALUES ($userId, $lessonId, '$eduyear')");
			
			$insvalues = "";
			if ($_POST["A1"] == "1") {$insvalues .= "(1, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["A2"] == "1") {$insvalues .= ",(2, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["A3"] == "1") {$insvalues .= ",(3, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["B1"] == "1") {$insvalues .= ",(4, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["B2"] == "1") {$insvalues .= ",(5, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["B3"] == "1") {$insvalues .= ",(6, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["B4"] == "1") {$insvalues .= ",(7, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["B5"] == "1") {$insvalues .= ",(8, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if (substr($insvalues, 0, 1) == ",") {$insvalues = substr($insvalues, 1);}
			$resq = "01";
			$result2 = $con->query("DELETE FROM `_class_teachers` WHERE TeacherID = " . $_POST["UserID"] . " AND eduyear='".$eduyear."';");
			if ($insvalues != "") {
				$resq = "INSERT INTO `_class_teachers` (ClassID, TeacherID, eduyear) VALUES ".$insvalues.";";
				$result2 = $con->query("INSERT INTO `_class_teachers` (ClassID, TeacherID, eduyear) VALUES ".$insvalues.";");
			}

			//Return result to jTable
			$jTableResult = array();
			$jTableResult['Result'] = "OK";
			$jTableResult['Insvals'] = $resq;
			print json_encode($jTableResult);
		}

	}
	//Deleting a record (deleteAction)
	else if($_GET["action"] == "delete")
	{
		//Delete from database
		$result1 = $con->query("DELETE FROM `_lessons_teachers` WHERE TeacherID = " . $_POST["UserID"] . ";");
		$result2 = $con->query("DELETE FROM `_class_teachers` WHERE TeacherID = " . $_POST["UserID"] . ";");
		$result = $con->query("DELETE FROM sdeusers WHERE UserID = " . $_POST["UserID"] . ";");

		//Return result to jTable
		$jTableResult = array();
		$jTableResult['Result'] = "OK";
		print json_encode($jTableResult);
	}

	//Close database connection
	//mysql_close($con);

}
catch(Exception $ex)
{
    //Return error message
	$jTableResult = array();
	$jTableResult['Result'] = "ERROR";
	$jTableResult['Message'] = $ex->getMessage();
	print json_encode($jTableResult);
}

?>
