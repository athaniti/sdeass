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
		$filter = "";
		if(isset($_GET['jtSorting'])) {
		   $filter .= " ORDER BY ".$_GET['jtSorting'];
		}
		if(isset($_GET['jtPageSize'])) {
		   $filter .= " LIMIT "." ".$_GET['jtStartIndex'].",".$_GET['jtPageSize'];
		}
		$filterstr = "";
		if (isset($_GET['type']) && $_GET["type"] == "educ") 
		{
			if (isset($_GET["classid"]))
			{
				if($_GET["classid"]!='0') {
					$filterstr = " AND students.ClassID=".$_GET["classid"];
				}
			}
		}
		//Get records from database
		$result = mysql_query("SELECT *, _students_class.ClassID AS StudentClassID FROM students
				      INNER JOIN _students_class ON students.StudentID=_students_class.StudentID
				      WHERE _students_class.eduperiod='".$eduyear."'".$filterstr.$filter.";");
		
		//Add all records to an array
		$rows = array();
		while($row = mysql_fetch_array($result))
		{
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
		//Insert record into database
		$result = mysql_query("INSERT INTO students(StudentFname, StudentLname, ClassID, Sex, Age, Fathername, Phone, Address, JobStatus, IsActive, IsRoma) VALUES('" . $_POST["StudentFname"] . "', '" . $_POST["StudentLname"] . "', '" . $_POST["ClassID"] . "', '" . $_POST["Sex"] . "', " . $_POST["Age"] . ",'" . $_POST["Fathername"] . "','" . $_POST["Phone"] . "','" . $_POST["Address"] . "','" . $_POST["JobStatus"] . "','" . $_POST["IsActive"] . "','" . $_POST["IsRoma"] . "');");
		
		//Get last inserted record (to return to jTable)
		$result = mysql_query("SELECT * FROM students WHERE StudentId = LAST_INSERT_ID();");
		$row = mysql_fetch_array($result);

		//Return result to jTable
		$jTableResult = array();
		$jTableResult['Result'] = "OK";
		
		$jTableResult['Record'] = $row;
		print json_encode($jTableResult);
	}
	//Updating a record (updateAction)
	else if($_GET["action"] == "update")
	{
		//Update record in database
		$qry = "UPDATE students SET StudentFname = '" . $_POST["StudentFname"] . "', StudentLname = '" . $_POST["StudentLname"] . "', ClassID = '" . $_POST["StudentClassID"] . "', Sex = '" . $_POST["Sex"] . "', Fathername = '" . $_POST["Fathername"] . "', Phone = '" . $_POST["Phone"] . "', Address = '" . $_POST["Address"] . "', JobStatus = '" . $_POST["JobStatus"] . "', IsActive = " . $_POST["IsActive"].", IsRoma = " . $_POST["IsRoma"].", Age = " . $_POST["Age"] . " WHERE StudentID = " . $_POST["StudentID"] . ";";
		$result = mysql_query($qry);
		$qry2 = "UPDATE _students_class SET ClassID = " . $_POST["StudentClassID"] . " WHERE StudentID = " . $_POST["StudentID"] . " AND eduperiod = '" . $eduyear . "';";
		$result2 = mysql_query($qry2);

		//Return result to jTable
		$jTableResult = array();
		$jTableResult['Result'] = "OK";
		$jTableResult['Query'] = $qry." | ".$qry2;
		print json_encode($jTableResult);
	}
	//Deleting a record (deleteAction)
	else if($_GET["action"] == "delete")
	{
		//Delete from database
		$result = mysql_query("DELETE FROM `_students_lessons` WHERE StudentID = " . $_POST["StudentID"] . ";");
		$result = mysql_query("DELETE FROM `_students_class` WHERE StudentID = " . $_POST["StudentID"] . ";");
		$result = mysql_query("DELETE FROM students WHERE StudentID = " . $_POST["StudentID"] . ";");

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