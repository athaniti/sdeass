<?php

try
{
	//Open database connection
	//require_once 'include/DB_Connect.php';
	require_once 'include/db_functions.php';
	//$dbc = new DB_Connect();
    //$con = $dbc->connect();
    $db = new DB_Functions();
	$con = $db->con;
	
	if (isset($_GET['tag']) && $_GET['tag'] != '') {
		$tag = $_GET['tag'];

		// check for tag type
		if ($tag == 'perstudent')
		{
			if($_GET['action'] == "list")
			{
				$filter = "";
				if(isset($_GET['jtSorting'])) {
				   $filter .= " ORDER BY ".$_GET['jtSorting'];
				}
				if(isset($_GET['jtPageSize'])) {
				   $filter .= " LIMIT "." ".$_GET['jtStartIndex'].",".$_GET['jtPageSize'];
				}
				
				$eduyear = $_GET['eduyear'];
				$teacherid = $_GET['teacherid'];
				$classid = $_GET['classid'];
				$filterclass = '';
				if ($classid != '0')
				{
					//$filterclass = ' AND students.ClassID = '.$classid;
					$filterclass = ' AND `_students_class`.ClassID = '.$classid;
				}
				//Get records from database
				$qry = "SELECT students.StudentFname AS StudentFname, students.StudentLname AS StudentLname, class.ClassName, lessons.LessonName As LessonName, l.* FROM `_students_lessons` AS l INNER JOIN students ON students.StudentID=l.StudentID INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID
INNER JOIN class ON class.ClassID = `_students_class`.ClassID INNER JOIN lessons ON lessons.LessonID=l.LessonID WHERE students.IsActive=1 AND l.eduyear='".$eduyear."' AND `_students_class`.eduperiod='".$eduyear."' ".$filterclass." AND l.StudentID IN (SELECT students.StudentID from students INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID 
WHERE `_students_class`.eduperiod='".$eduyear."'
AND `_students_class`.ClassID IN (SELECT ClassID FROM `_class_teachers` WHERE TeacherID = ".$teacherid."
AND eduyear='".$eduyear."')) AND l.LessonID IN (SELECT LessonID from `_lessons_teachers` WHERE TeacherID = ".$teacherid.")".$filter.";";
	
								//Get records from database
				//$qry = "SELECT students.StudentFname AS StudentFname, students.StudentLname AS StudentLname, class.ClassName, lessons.LessonName As LessonName, l.* FROM `_students_lessons` AS l INNER JOIN students ON students.StudentID=l.StudentID INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID
//INNER JOIN class ON class.ClassID = `_students_class`.ClassID INNER JOIN lessons ON lessons.LessonID=l.LessonID WHERE l.eduyear='".$eduyear."' AND `_students_class`.eduperiod='".$eduyear."' ".$filterclass." AND l.StudentID IN (SELECT students.StudentID from students INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID 
//WHERE students.IsActive=1 AND `_students_class`.eduperiod='".$eduyear."'
//AND `_students_class`.ClassID IN (SELECT ClassID FROM `_class_teachers` WHERE TeacherID = ".$teacherid."
//AND eduyear='".$eduyear."')) AND l.LessonID IN (SELECT LessonID from `_lessons_teachers` WHERE TeacherID = ".$teacherid.")".$filter.";";
	
				$result = $con->query($qry);
				
				$jTableResult = array();
				
				if ($result) {
					//Add all records to an array
					$rows = array();
					while($row = $result->fetch_array())
					{
					    $rows[] = $row;
					}
			
					//Return result to jTable
					
					$jTableResult['Result'] = "OK";
				}
				else
				{
					$rows = array();
					$jTableResult['Result'] = "Query Failed";
				}
				$jTableResult['Records'] = $rows;
				$jTableResult['Query'] = $qry;
				print json_encode($jTableResult);
			} 
			else if($_GET["action"] == "update")
			{
				$eduyear = $_GET["eduyear"];
				//Update record in database
				/*$qry = "UPDATE `_students_lessons` SET asemester = '" . $_POST["asemester"] . "',
				bsemester = '" . $_POST["bsemester"] . "',
				aendiaferon = '" . $_POST["aendiaferon"] . "',
				aantapokrisi = '" . $_POST["aantapokrisi"] . "',
				bendiaferon = '" . $_POST["bendiaferon"] . "',
				bantapokrisi = '" . $_POST["bantapokrisi"] . "',
				finalgrade = " . $_POST["finalgrade"] . "
				WHERE LessonID=".$_POST["LessonID"]." AND StudentID = " . $_POST["StudentID"] . "
				AND eduyear='".$eduyear."';";
				$result = $con->query($qry); */
				
				// 1) Read + normalize inputs
				$asemester      = (string)($_POST['asemester'] ?? '');
				$bsemester      = (string)($_POST['bsemester'] ?? '');
				$aendiaferon    = (string)($_POST['aendiaferon'] ?? '');
				$aantapokrisi   = (string)($_POST['aantapokrisi'] ?? '');
				$bendiaferon    = (string)($_POST['bendiaferon'] ?? '');
				$bantapokrisi   = (string)($_POST['bantapokrisi'] ?? '');

				$finalgrade = ($_POST['finalgrade'] ?? null);
				$finalgrade = ($finalgrade === '' || $finalgrade === null) ? null : (float)$finalgrade;

				$lessonId  = (int)($_POST['LessonID'] ?? 0);
				$studentId = (int)($_POST['StudentID'] ?? 0);
				$eduyear   = (string)$eduyear;

				if ($lessonId <= 0 || $studentId <= 0 || $eduyear === '') {
					die(json_encode(["Result"=>"ERROR","Message"=>"Missing/invalid LessonID/StudentID/eduyear"]));
				}

				// 2) Prepare SQL (no string concatenation)
				$sql = "UPDATE `_students_lessons`
						SET asemester = ?,
							bsemester = ?,
							aendiaferon = ?,
							aantapokrisi = ?,
							bendiaferon = ?,
							bantapokrisi = ?,
							finalgrade = ?
						WHERE LessonID = ? AND StudentID = ? AND eduyear = ?";

				$stmt = $con->prepare($sql);
				if (!$stmt) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Prepare failed","MysqlError"=>$con->error]));
				}

				// 3) Bind params
				// s = string, d = double, i = integer
				// For nullable finalgrade: bind as double, but set to null when missing.
				$stmt->bind_param(
					"ssssssdiis",
					$asemester,
					$bsemester,
					$aendiaferon,
					$aantapokrisi,
					$bendiaferon,
					$bantapokrisi,
					$finalgrade,
					$lessonId,
					$studentId,
					$eduyear
				);

				// If you want NULL in DB when empty grade, you must set it and also set the parameter to null.
				// (mysqli will send NULL correctly when the PHP variable is null.)
				$result = $stmt->execute();

				if (!$result) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Execute failed","MysqlError"=>$stmt->error]));
				}
		
				//Return result to jTable
				$jTableResult = array();
				$jTableResult['Result'] = "OK";
				$jTableResult['Query'] = $stmt;
				print json_encode($jTableResult);
			}
			
		}
		
		
		if ($tag == 'projectperstudent')
		{
			if($_GET['action'] == "list")
			{
				$filter = "";
				
				if (isset($_GET['projectid']) && $_GET['projectid'] != '')
				{
					$filter .= " WHERE students.IsActive=1 AND projects.ProjectID=".$_GET['projectid'];
					
				}
				
				if(isset($_GET['jtSorting'])) {
				   $filter .= " ORDER BY ".$_GET['jtSorting'];
				}
				if(isset($_GET['jtPageSize'])) {
				   $filter .= " LIMIT "." ".$_GET['jtStartIndex'].",".$_GET['jtPageSize'];
				}
				
				
				
				//Get records from database
				$qry = "SELECT students.StudentFname AS StudentFname, students.StudentLname AS StudentLname, projects.projectName As ProjectName, projects.Type As ProjectType, p.* FROM `_projects_students` AS p 				INNER JOIN students ON students.StudentID=p.StudentID INNER JOIN projects ON projects.ProjectID=p.ProjectID".$filter.";";
	
	
				$result = $con->query($qry);
				
				$jTableResult = array();
				
				if ($result) {
					//Add all records to an array
					$rows = array();
					while($row = $result->fetch_array())
					{
					    $rows[] = $row;
					}
			
					//Return result to jTable
					
					$jTableResult['Result'] = "OK";
				}
				else
				{
					$rows = array();
					$jTableResult['Result'] = "Query Failed";
				}
				$jTableResult['Query'] = $qry;
				$jTableResult['Records'] = $rows;
				print json_encode($jTableResult);
			} 
			else if($_GET["action"] == "update")
			{
				//$eduyear = $_GET["eduyear"];
				//Update record in database
				/*$qry = "UPDATE `_projects_students` SET asemester = '" . $_POST["asemester"] . "',
				bsemester = '" . $_POST["bsemester"] . "'
				WHERE ProjectID=".$_POST["ProjectID"]." AND StudentID = " . $_POST["StudentID"] . ";";
				$result = $con->query($qry);*/
				
				$asemester = (string)($_POST['asemester'] ?? '');
				$bsemester = (string)($_POST['bsemester'] ?? '');

				$projectId = (int)($_POST['ProjectID'] ?? 0);
				$studentId = (int)($_POST['StudentID'] ?? 0);

				if ($projectId <= 0 || $studentId <= 0) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Missing/invalid ProjectID/StudentID"]));
				}

				$sql = "UPDATE `_projects_students`
						SET asemester = ?,
							bsemester = ?
						WHERE ProjectID = ? AND StudentID = ?";

				$stmt = $con->prepare($sql);
				if (!$stmt) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Prepare failed","MysqlError"=>$con->error]));
				}

				// 2 strings + 2 ints
				$stmt->bind_param("ssii", $asemester, $bsemester, $projectId, $studentId);

				if (!$stmt->execute()) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Execute failed","MysqlError"=>$stmt->error]));
				}
				
				//Update record in database
				$ptype = '9';
				if ($_POST["ProjectType"]=='2')
					$ptype = '10';
				
				/*$qry = "UPDATE `_students_lessons` SET asemester = '" . $_POST["asemester"] . "',
				bsemester = '" . $_POST["bsemester"] . "'
				WHERE StudentID = " . $_POST["StudentID"] . " AND LessonID = ".$ptype;
				$result = $con->query($qry);*/
				
				$asemester = (string)($_POST['asemester'] ?? '');
				$bsemester = (string)($_POST['bsemester'] ?? '');

				$studentId = (int)($_POST['StudentID'] ?? 0);
				$lessonId  = (int)$ptype;   // το $ptype να είναι LessonID

				if ($studentId <= 0 || $lessonId <= 0) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Missing/invalid StudentID/LessonID"]));
				}

				$sql = "UPDATE `_students_lessons`
						SET asemester = ?,
							bsemester = ?
						WHERE StudentID = ? AND LessonID = ?";

				$stmt = $con->prepare($sql);
				if (!$stmt) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Prepare failed","MysqlError"=>$con->error]));
				}

				// 2 strings + 2 ints
				$stmt->bind_param("ssii", $asemester, $bsemester, $studentId, $lessonId);

				if (!$stmt->execute()) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Execute failed","MysqlError"=>$stmt->error]));
				}
		
		
				//Return result to jTable
				$jTableResult = array();
				$jTableResult['Result'] = "OK";
				$jTableResult['ptype'] = $_POST["ProjectType"];
				$jTableResult['Query'] = $stmt;
				print json_encode($jTableResult);
			}
			
		}
		
		if ($tag == 'studentgrades')
		{
			if($_GET['action'] == "list")
			{
				
				
				$eduyear = $_GET['eduyear'];
				$studentid = $_GET['studentid'];
				$filterclass = '';
				
				//Get records from database
				$qry = "SELECT l.*, lessons.LessonName As LessonName FROM `_students_lessons` AS l 
					INNER JOIN lessons ON lessons.LessonID=l.LessonID
					WHERE l.eduyear='".$eduyear."' 
					AND l.StudentID = ".$studentid.";";
	
	
				$result = $con->query($qry);
				
				$jTableResult = array();
				
				if ($result) {
					//Add all records to an array
					$rows = array();
					while($row = $result->fetch_array())
					{
					    $rows[] = $row;
					}
			
					//Return result to jTable
					
					$jTableResult['Result'] = "OK";
				}
				else
				{
					$rows = array();
					$jTableResult['Result'] = "Query Failed";
				}
				$jTableResult['Records'] = $rows;
				print json_encode($jTableResult);
			} 
			else if($_GET["action"] == "update")
			{
				$eduyear = $_GET["eduyear"];
				//Update record in database
				/*$qry = "UPDATE `_students_lessons` SET asemester = '" . $_POST["asemester"] . "',
				bsemester = '" . $_POST["bsemester"] . "',
				aendiaferon = '" . $_POST["aendiaferon"] . "',
				aantapokrisi = '" . $_POST["aantapokrisi"] . "',
				bendiaferon = '" . $_POST["bendiaferon"] . "',
				bantapokrisi = '" . $_POST["bantapokrisi"] . "',
				finalgrade = " . $_POST["finalgrade"] . "
				WHERE LessonID=".$_POST["LessonID"]." AND StudentID = " . $_POST["StudentID"] . "
				AND eduyear='".$eduyear."';";
				$result = $con->query($qry); */
				
				// --- Inputs (normalize) ---
				$asemester    = (string)($_POST['asemester'] ?? '');
				$bsemester    = (string)($_POST['bsemester'] ?? '');
				$aendiaferon  = (string)($_POST['aendiaferon'] ?? '');
				$aantapokrisi = (string)($_POST['aantapokrisi'] ?? '');
				$bendiaferon  = (string)($_POST['bendiaferon'] ?? '');
				$bantapokrisi = (string)($_POST['bantapokrisi'] ?? '');

				$lessonId  = (int)($_POST['LessonID'] ?? 0);
				$studentId = (int)($_POST['StudentID'] ?? 0);
				$eduyear   = (string)$eduyear;

				// finalgrade: NULL αν κενό, αλλιώς αριθμός
				$finalgrade = $_POST['finalgrade'] ?? null;
				$finalgrade = ($finalgrade === '' || $finalgrade === null) ? null : (float)$finalgrade;

				if ($lessonId <= 0 || $studentId <= 0 || $eduyear === '') {
					die(json_encode(["Result"=>"ERROR","Message"=>"Missing/invalid LessonID/StudentID/eduyear"]));
				}

				// --- Prepared UPDATE ---
				$sql = "UPDATE `_students_lessons`
						SET asemester = ?,
							bsemester = ?,
							aendiaferon = ?,
							aantapokrisi = ?,
							bendiaferon = ?,
							bantapokrisi = ?,
							finalgrade = ?
						WHERE LessonID = ? AND StudentID = ? AND eduyear = ?";

				$stmt = $con->prepare($sql);
				if (!$stmt) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Prepare failed","MysqlError"=>$con->error]));
				}

				// types: 6 strings, 1 double (finalgrade), 2 ints, 1 string (eduyear)
				$stmt->bind_param(
					"ssssssdiis",
					$asemester,
					$bsemester,
					$aendiaferon,
					$aantapokrisi,
					$bendiaferon,
					$bantapokrisi,
					$finalgrade,
					$lessonId,
					$studentId,
					$eduyear
				);

				if (!$stmt->execute()) {
					die(json_encode(["Result"=>"ERROR","Message"=>"Execute failed","MysqlError"=>$stmt->error]));
				}
		
				//Return result to jTable
				$jTableResult = array();
				$jTableResult['Result'] = "OK";
				$jTableResult['Query'] = $stmt;
				print json_encode($jTableResult);
			}
			
		}
		
		
	
		return;
	}
		
	
	//Getting records (listAction)
	if($_GET["action"] == "list")
	{
		if (isset($_GET["studentid"]))
		{
			$eduyear = $_GET["eduyear"];
			$stid = $_GET["studentid"];
			//Get records from database
			$qry = "SELECT lessons.LessonName AS lessonname, l.* FROM `_students_lessons` AS l INNER JOIN lessons ON lessons.LessonID=l.LessonID WHERE l.StudentID = ".$stid." AND l.eduyear='".$eduyear."';";
			$result = $con->query($qry);
		
			$jTableResult = array();
			
			if ($result) {
				//Add all records to an array
				$rows = array();
				while($row = $result->fetch_array())
				{
				    $rows[] = $row;
				}
		
				//Return result to jTable
				
				$jTableResult['Result'] = "OK";
			}
			else
			{
				$rows = array();
				$jTableResult['Result'] = "Query Failed";
			}
			$jTableResult['Records'] = $rows;
			print json_encode($jTableResult);
			
		}
		else
		{
			$jTableResult['Result'] = "Failure";
			$jTableResult['Message'] = "Student ID not set.";
			
		}
	}
	//Updating a record (updateAction)
	else if($_GET["action"] == "update")
	{
		//Update record in database
		$qry = "UPDATE `_students_lessons` SET asemester = '" . $_POST["asemester"] . "', bsemester = '" . $_POST["bsemester"] . "' WHERE LessonID=".$_POST["LessonID"]." AND StudentID = " . $_POST["StudentID"] . ";";
		$result = $con->query($qry);

		//Return result to jTable
		$jTableResult = array();
		$jTableResult['Result'] = "OK";
		$jTableResult['Query'] = $qry;
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