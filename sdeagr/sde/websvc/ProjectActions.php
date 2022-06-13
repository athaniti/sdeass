<?php

try
{
	//Open database connection
	require_once 'include/db_functions.php';
    $db = new DB_Functions();
	$con = $db->con;
    $eduyear = '';
	if (isset($_GET['eduyear']))
	    {
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
		//Get records from database
		//$a1 = "SELECT COUNT(*) FROM `_class_teachers`
		$result = $con->query("SELECT * FROM projects WHERE projectPeriod = '".$eduyear."'".$filter.";");

		//Add all records to an array
		$rows = array();
		while($row = $result->fetch_array())
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
		if ($_POST["projectName"]=='')
		{
			$jTableResult = array();
			$jTableResult['Result'] = "ERROR";
			$jTableResult['Message'] = "Πρέπει να δώσετε όνομα για το Project.";
			print json_encode($jTableResult);

		}
		else
		{

			//Insert record into database
			$res1 =  $con->query("SELECT MAX(ProjectID) AS pid FROM projects");
			if ($res1)
			{
				$rows = $res1->fetch_array();
				$newid = intval($rows["pid"])+1;
			}
			$result = $con->query("INSERT INTO projects(ProjectID, projectName, projectPeriod, Type, projectWebPage) VALUES($newid, '" . $_POST["projectName"] . "', '" . $eduyear . "', '" . $_POST["Type"] . "', '" . $_POST["projectWebPage"] . "');");


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
		if ($_POST["projectName"]=='')
		{
			$jTableResult = array();
			$jTableResult['Result'] = "ERROR";
			$jTableResult['Message'] = "Πρέπει να δώσετε όνομα για το Project.";
			print json_encode($jTableResult);

		}
		else
		{
			//Update record in database
			$result = $con->query("UPDATE projects SET projectName = '" . $_POST["projectName"] . "', projectPeriod = '" . $eduyear . "', Type = '" . $_POST["Type"] . "', projectWebPage = '" . $_POST["projectWebPage"] . "' WHERE ProjectID = " . $_POST["ProjectID"] . ";");

			//Return result to jTable
			$jTableResult = array();
			$jTableResult['Result'] = "OK";
			print json_encode($jTableResult);
		}

	}
	//Deleting a record (deleteAction)
	else if($_GET["action"] == "delete")
	{
		//Delete from database
		$result1 = $con->query("DELETE FROM `_projects_teachers` WHERE ProjectID = " . $_POST["ProjectID"] . ";");
		$result2 = $con->query("DELETE FROM `_projects_students` WHERE ProjectID = " . $_POST["ProjectID"] . ";");
		$result = $con->query("DELETE FROM projects WHERE ProjectID = " . $_POST["ProjectID"] . ";");

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
