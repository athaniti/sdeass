<?php

try
{
	//Open database connection
	require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
    $eduyear = '1314';
    if (isset($_GET['eduyear']) && $_GET['eduyear'] != '') {
	$eduyear = $_GET['eduyear'];
    }
    
	
	//Getting records (listAction)
	if($_GET["action"] == "list")
	{
		//Get records from database
		//$a1 = "SELECT COUNT(*) FROM `_class_teachers`
		$result = mysql_query("SELECT *, l.LessonID FROM sdeusers LEFT JOIN `_lessons_teachers` AS l ON l.TeacherID = sdeusers.UserID;");
		
		//Add all records to an array
		$rows = array();
		while($row = mysql_fetch_array($result))
		{
			$result2 = mysql_query("SELECT ClassID FROM `_class_teachers` WHERE eduyear= '".$eduyear."' AND TeacherID = ".$row['UserID'].";");
			while($row2 = mysql_fetch_array($result2))
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
			$res1 =  mysql_query("SELECT MAX(UserID) AS mid FROM sdeusers WHERE UserID <> 100");
			if ($res1)
			{
				$rows = mysql_fetch_array($res1);
				$newid = intval($rows["mid"])+1;
			}
			$result = mysql_query("INSERT INTO sdeusers(UserID, UserFname, UserLname, Username, Eidikotita, EidikotitaCode, userrole, Phone, Address, encrypted_password, salt) VALUES($newid, '" . $_POST["UserFname"] . "', '" . $_POST["UserLname"] . "', '" . $_POST["Username"] . "', '" . $_POST["Eidikotita"] . "', '" . $_POST["EidikotitaCode"] . "','" . $_POST["userrole"] . "','" . $_POST["Phone"] . "','" . $_POST["Address"] . "','DXkRD8/Mbv65wCxVams09oQZBlQ2MTg3MzBiZWFm', '618730beaf');");
			if ($result)
			{
			
				//Get last inserted record (to return to jTable)
				$resultu = mysql_query("SELECT * FROM sdeusers WHERE UserID = $newid;");
				$row = mysql_fetch_array($resultu);
				
				$result1 = mysql_query("INSERT INTO `_lessons_teachers` (LessonID, TeacherID, eduyear) VALUES(" . $_POST["LessonID"] . ", " . $row["UserID"] . ",'".$eduyear."');");
				$insvalues = "";
				if ($_POST["A1"] == "1") {$insvalues .= "(1, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["A2"] == "1") {$insvalues .= ",(2, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["A3"] == "1") {$insvalues .= ",(3, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["B1"] == "1") {$insvalues .= ",(4, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["B2"] == "1") {$insvalues .= ",(5, " . $row["UserID"] . ",'".$eduyear."')";}
				if ($_POST["B3"] == "1") {$insvalues .= ",(6, " . $row["UserID"] . ",'".$eduyear."')";}
				if (substr($insvalues, 0, 1) == ",") {$insvalues = substr($insvalues, 1);}
				if ($insvalues != "") {
					$result2 = mysql_query("INSERT INTO `_class_teachers` (ClassID, TeacherID, eduyear) VALUES ".$insvalues.";");
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
			$result = mysql_query("UPDATE sdeusers SET UserFname = '" . $_POST["UserFname"] . "', UserLname = '" . $_POST["UserLname"] . "', Username = '" . $_POST["Username"] . "', Eidikotita = '" . $_POST["Eidikotita"] . "', EidikotitaCode = '" . $_POST["EidikotitaCode"] . "', Phone = '" . $_POST["Phone"] . "', Address = '" . $_POST["Address"] . "', userrole = '" . $_POST["userrole"] . "' WHERE UserID = " . $_POST["UserID"] . ";");
			
			$result1 = mysql_query("DELETE FROM `_lessons_teachers` WHERE TeacherID = " . $_POST["UserID"] . ";");
			$result1 = mysql_query("INSERT INTO `_lessons_teachers` (LessonID, TeacherID, eduyear) VALUES(" . $_POST["LessonID"] . ", " . $_POST["UserID"] . ",'".$eduyear."');");
			$insvalues = "";
			if ($_POST["A1"] == "1") {$insvalues .= "(1, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["A2"] == "1") {$insvalues .= ",(2, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["A3"] == "1") {$insvalues .= ",(3, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["B1"] == "1") {$insvalues .= ",(4, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["B2"] == "1") {$insvalues .= ",(5, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if ($_POST["B3"] == "1") {$insvalues .= ",(6, " . $_POST["UserID"] . ",'".$eduyear."')";}
			if (substr($insvalues, 0, 1) == ",") {$insvalues = substr($insvalues, 1);}
			$resq = "01";
			$result2 = mysql_query("DELETE FROM `_class_teachers` WHERE TeacherID = " . $_POST["UserID"] . " AND eduyear='".$eduyear."';");
			if ($insvalues != "") {
				$resq = "INSERT INTO `_class_teachers` (ClassID, TeacherID, eduyear) VALUES ".$insvalues.";";
				$result2 = mysql_query("INSERT INTO `_class_teachers` (ClassID, TeacherID, eduyear) VALUES ".$insvalues.";");
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
		$result1 = mysql_query("DELETE FROM `_lessons_teachers` WHERE TeacherID = " . $_POST["UserID"] . ";");
		$result2 = mysql_query("DELETE FROM `_class_teachers` WHERE TeacherID = " . $_POST["UserID"] . ";");
		$result = mysql_query("DELETE FROM sdeusers WHERE UserID = " . $_POST["UserID"] . ";");

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