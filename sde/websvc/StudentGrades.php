<?php

try
{
	//Open database connection
	require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
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
INNER JOIN class ON class.ClassID = `_students_class`.ClassID INNER JOIN lessons ON lessons.LessonID=l.LessonID WHERE l.eduyear='".$eduyear."' AND `_students_class`.eduperiod='".$eduyear."' ".$filterclass." AND l.StudentID IN (SELECT students.StudentID from students INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID 
WHERE students.IsActive=1 AND `_students_class`.eduperiod='".$eduyear."'
AND `_students_class`.ClassID IN (SELECT ClassID FROM `_class_teachers` WHERE TeacherID = ".$teacherid."
AND eduyear='".$eduyear."')) AND l.LessonID IN (SELECT LessonID from `_lessons_teachers` WHERE TeacherID = ".$teacherid.")".$filter.";";
	
	
				$result = mysql_query($qry) or die(mysql_error());
				
				$jTableResult = array();
				
				if ($result) {
					//Add all records to an array
					$rows = array();
					while($row = mysql_fetch_array($result))
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
				$qry = "UPDATE `_students_lessons` SET asemester = '" . $_POST["asemester"] . "',
				bsemester = '" . $_POST["bsemester"] . "',
				aendiaferon = '" . $_POST["aendiaferon"] . "',
				aantapokrisi = '" . $_POST["aantapokrisi"] . "',
				bendiaferon = '" . $_POST["bendiaferon"] . "',
				bantapokrisi = '" . $_POST["bantapokrisi"] . "',
				finalgrade = " . $_POST["finalgrade"] . "
				WHERE LessonID=".$_POST["LessonID"]." AND StudentID = " . $_POST["StudentID"] . "
				AND eduyear='".$eduyear."';";
				$result = mysql_query($qry);
		
				//Return result to jTable
				$jTableResult = array();
				$jTableResult['Result'] = "OK";
				$jTableResult['Query'] = $qry;
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
					$filter .= " WHERE projects.ProjectID=".$_GET['projectid'];
					
				}
				
				if(isset($_GET['jtSorting'])) {
				   $filter .= " ORDER BY ".$_GET['jtSorting'];
				}
				if(isset($_GET['jtPageSize'])) {
				   $filter .= " LIMIT "." ".$_GET['jtStartIndex'].",".$_GET['jtPageSize'];
				}
				
				
				
				//Get records from database
				$qry = "SELECT students.StudentFname AS StudentFname, students.StudentLname AS StudentLname, projects.projectName As ProjectName, projects.Type As ProjectType, p.* FROM `_projects_students` AS p 				INNER JOIN students ON students.StudentID=p.StudentID INNER JOIN projects ON projects.ProjectID=p.ProjectID".$filter.";";
	
	
				$result = mysql_query($qry) or die(mysql_error());
				
				$jTableResult = array();
				
				if ($result) {
					//Add all records to an array
					$rows = array();
					while($row = mysql_fetch_array($result))
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
				$eduyear = $_GET["eduyear"];
				//Update record in database
				$qry = "UPDATE `_projects_students` SET asemester = '" . $_POST["asemester"] . "',
				bsemester = '" . $_POST["bsemester"] . "'
				WHERE ProjectID=".$_POST["ProjectID"]." AND StudentID = " . $_POST["StudentID"] . ";";
				$result = mysql_query($qry);
				
				//Update record in database
				$ptype = '9';
				if ($_POST["ProjectType"]=='2')
					$ptype = '10';
				
				$qry = "UPDATE `_students_lessons` SET asemester = '" . $_POST["asemester"] . "',
				bsemester = '" . $_POST["bsemester"] . "'
				WHERE StudentID = " . $_POST["StudentID"] . " AND LessonID = ".$ptype;
				$result = mysql_query($qry);
		
		
				//Return result to jTable
				$jTableResult = array();
				$jTableResult['Result'] = "OK";
				$jTableResult['ptype'] = $_POST["ProjectType"];
				$jTableResult['Query'] = $qry;
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
	
	
				$result = mysql_query($qry) or die(mysql_error());
				
				$jTableResult = array();
				
				if ($result) {
					//Add all records to an array
					$rows = array();
					while($row = mysql_fetch_array($result))
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
				$qry = "UPDATE `_students_lessons` SET asemester = '" . $_POST["asemester"] . "',
				bsemester = '" . $_POST["bsemester"] . "',
				aendiaferon = '" . $_POST["aendiaferon"] . "',
				aantapokrisi = '" . $_POST["aantapokrisi"] . "',
				bendiaferon = '" . $_POST["bendiaferon"] . "',
				bantapokrisi = '" . $_POST["bantapokrisi"] . "',
				finalgrade = " . $_POST["finalgrade"] . "
				WHERE LessonID=".$_POST["LessonID"]." AND StudentID = " . $_POST["StudentID"] . "
				AND eduyear='".$eduyear."';";
				$result = mysql_query($qry);
		
				//Return result to jTable
				$jTableResult = array();
				$jTableResult['Result'] = "OK";
				$jTableResult['Query'] = $qry;
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
			$result = mysql_query($qry) or die(mysql_error());
		
			$jTableResult = array();
			
			if ($result) {
				//Add all records to an array
				$rows = array();
				while($row = mysql_fetch_array($result))
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
		$result = mysql_query($qry);

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