<?php

try
{
	//Open database connection
	require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
	if (isset($_GET['tag']) && $_GET['tag'] != '') {
		$tag = $_GET['tag'];
		
		$classid = '';
		$classfilter = '';
		if (isset($_GET['classid']) && $_GET['classid'] != '')
		{
			$classid = $_GET['classid'];
			$classfilter = ' AND class.ClassID = '.$classid;
		}
		
	
		// check for tag type
		if ($tag == 'perstudent') {
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
				//Get records from database
				$qry = "SELECT students.StudentFname AS StudentFname, students.StudentLname AS StudentLname, class.ClassName, l.*
				FROM `_students_general` AS l 
	INNER JOIN students ON students.StudentID=l.StudentID
	INNER JOIN  `_students_class` ON  `_students_class`.StudentID = students.StudentID
	INNER JOIN class ON class.ClassID =  `_students_class`.ClassID
	WHERE l.eduyear='".$eduyear."'
	AND class.ClassID IN (SELECT ClassID FROM `_students_class` WHERE eduperiod='".$eduyear."' AND StudentID=students.StudentID)
	".$classfilter."
	AND l.StudentID IN (SELECT StudentID from students WHERE IsActive=1)".$filter.";";
	
	
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
				$qry = "UPDATE `_students_general`
				SET
				amathisiakiporeia = '" . $_POST["amathisiakiporeia"] . "',
				asynergasia = '" . $_POST["asynergasia"] . "',
				aendiaferon = '" . $_POST["aendiaferon"] . "',
				adesmefsi = '" . $_POST["adesmefsi"] . "',
				bmathisiakiporeia = '" . $_POST["bmathisiakiporeia"] . "',
				bsynergasia = '" . $_POST["bsynergasia"] . "',
				bendiaferon = '" . $_POST["bendiaferon"] . "',
				bdesmefsi = '" . $_POST["bdesmefsi"] . "'
				WHERE StudentID=".$_POST["StudentID"]." AND eduyear='".$eduyear."'";
		
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