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
require_once 'include/DB_Functions.php';
require_once 'include/helper_functions.php';
$db = new DB_Functions();

require_once 'Excel/reader.php';
$data = new Spreadsheet_Excel_Reader();
$data->setOutputEncoding('UTF8');
$data->read('external/aitiseis.xls');

$eduyear = '1617';
    if (isset($_GET['eduyear']) && $_GET['eduyear'] != '') {
	$eduyear = $_GET['eduyear'];
    }
console.log($eduyear);
$successes = 0;
$failures = 0;
for ($x == 2; $x <= count($data->sheets[0]["cells"]); $x++)
{
    $studentlname = $data->sheets[0]["cells"][$x][2];
	if($studentlname!="" && trim($studentlname)!="Επίθετο")
	{
		$studentfname = $data->sheets[0]["cells"][$x][3];
		//$yearofbirth = $data->sheets[0]["cells"][$x][4];
		$age = $data->sheets[0]["cells"][$x][4];
		$address = $data->sheets[0]["cells"][$x][6];
		$marital = '';
		$childrenNumber = '';
		$monthsunemployment = 0;
		$phone = $data->sheets[0]["cells"][$x][7];
		$sex = 1;
		if ((isset($data->sheets[0]["cells"][$x][8])) && ($data->sheets[0]["cells"][$x][8]=='Γ'))
		{ $sex = 2; }
		switch ($data->sheets[0]["cells"][$x][10])
		{
		case 'A2':
		  $classid = 2;
		  break;
		case 'Α2':
		  $classid = 2;
		  break;
		case 'A3':
		  $classid = 3;
		  break;
		case 'Α3':
		  $classid = 3;
		  break;
		case 'B1':
		  $classid = 4;
		  break;
		case 'Β1':
		  $classid = 4;
		  break;
		case 'B2':
		  $classid = 5;
		  break;
		case 'Β2':
		  $classid = 5;
		  break;
		case 'B3':
		  $classid = 6;
		  break;
		case 'Β3':
		  $classid = 6;
		  break;
		default:
		  $classid = 1;
		}
		$isroma = 0;
		if (isset($data->sheets[0]["cells"][$x][12])) {$isroma = 1;}
		$isactive = 1;
		if (isset($data->sheets[0]["cells"][$x][13])) {$isactive = $data->sheets[0]["cells"][$x][13];}
		$jobstatus = $data->sheets[0]["cells"][$x][11];
    $mitroo = "";
    if (isset($data->sheets[0]["cells"][$x][14])) {$mitroo = $data->sheets[0]["cells"][$x][14];}
		//$eduyear = '1213';
		$iscurrent=1;
		$sss = $studentfname.$studentlname.$sex.$age.$classid.$fathername.$phone.$address.$jobstatus.$isroma.$eduyear.$iscurrent.$isactive;
		$res = $db->insertExcelData($mitroo, $studentfname, $studentlname, $sex, $age, $classid, $fathername, $phone, $address, $marital, $childrenNumber, $jobstatus, $monthsunemployment, $isroma, $eduyear, $iscurrent, $isactive);
		if ($res) { $successes += 1;} else { $failures += 1;}
	}

	//$response["aaa"] = $sss;
	if ($successes > 0) {
		$response["success"] = 1;
		$response["success_msg"] = "Succesfull imports: ".$successes." - Failure imports: ".$failures;
	}
	else
	{
		$response["error"] = 1;
        $response["error_msg"] = "Not able to import data at all!";
	}
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
