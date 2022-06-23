<?php
// Include classes
include_once('plugins/tbs/tbs_class.php'); // Load the TinyButStrong template engine
include_once('plugins/tbs/tbs_plugin_opentbs.php'); // Load the OpenTBS plugin
include_once('include/helper_functions.php');
require_once 'include/db_functions.php';
$db = new DB_Functions();
$con = $db->con;
$con->query(DB_DATABASE);
$hf = new Helper_Functions();


// response Array
$response = array("success" => 0, "error" => 0);
// Retrieve the Educational Period
$eduyear = '1819';


if (isset($_GET['eduyear'])) {
    $eduyear = $_GET["eduyear"];
  }
$praxi = '22';
$titleprotocolnumber = intval('301');
$apodeiktikoprotocolnumber = intval('301');
$titleprotocoldate = '28/06/2019';
$praxiprotocoldate = '28-06-2019';

$protocoln = intval('301');
$protocoldate = '28/06/2019';
$save_as = '';

if ($_SERVER['REQUEST_METHOD'] != 'POST')
{
  if (isset($_GET['eduyear'])) {
      $eduyear = $_GET["eduyear"];
    }
    if (isset($_GET['praxi']) && !empty($_GET['praxi']))
    {
      $praxi = $_GET["praxi"];
    }
    if (isset($_GET['protocol-number']) && !empty($_GET['protocol-number']))
    {
      $protocoln = intval(trim($_GET["protocol-number"]));
    }
    if (isset($_GET['protocol-date']) && !empty($_GET['protocol-date']))
    {
      $protocoldate = $_GET["protocol-date"];
		
    }
    if (isset($_GET['title-protocol-number']) && !empty($_GET['title-protocol-number']))
    {
      $titleprotocolnumber = intval(trim($_GET["title-protocol-number"]));
    }
	if (isset($_GET['praxi-protocol-date']) && !empty($_GET['praxi-protocol-date']))
  {
	  $praxiprotocoldate = $_GET["praxi-protocol-date"];
    
  }
    if (isset($_GET['title-protocol-date']) && !empty($_GET['title-protocol-date']))
    {
      
		$titleprotocoldate = $_GET["title-protocol-date"];
    }

}
else
{
  if (isset($_POST['eduyear']) && !empty($_POST['eduyear']))
  {
        $eduyear = $_POST['eduyear'];
  }
  if (isset($_POST['praxi']) && !empty($_POST['praxi']))
  {
    $praxi = $_POST["praxi"];
  }
  if (isset($_POST['protocol-number']) && !empty($_POST['protocol-number']))
  {
    $protocoln = intval(trim($_POST["protocol-number"]));
  }
  if (isset($_POST['protocol-date']) && !empty($_POST['protocol-date']))
  {
    $protocoldate = $_POST["protocol-date"];
	  
  }
  if (isset($_POST['title-protocol-number']) && !empty($_POST['title-protocol-number']))
  {
    $titleprotocolnumber = intval(trim($_POST["title-protocol-number"]));
  }
  if (isset($_POST['praxi-protocol-date']) && !empty($_POST['praxi-protocol-date']))
  {
	  $praxiprotocoldate = $_POST["praxi-protocol-date"];
    
  }
   if (isset($_POST['title-protocol-date']) && !empty($_POST['title-protocol-date']))
  {
	  $titleprotocoldate = $_POST["title-protocol-date"];
    
  }

}
  //$eduyear = '1516'; //For test reasons
$eduyearstr='20'.substr($eduyear, 0, 2).' - 20'.substr($eduyear, -2, 2);


// prevent from a PHP configuration problem when using mktime() and date()
if (version_compare(PHP_VERSION,'5.1.0')>=0) {
    if (ini_get('date.timezone')=='') {
        date_default_timezone_set('UTC');
    }
}

// Initialize the TBS instance
$TBS = new clsTinyButStrong; // new instance of TBS
$TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN); // load the OpenTBS plugin

// ------------------------------
// Prepare some data for the demo
// ------------------------------
//Get records from database
$filename = 'Τίτλοι Σπουδών '.$eduyearstr;

$qry = "SELECT s.StudentID AS studentid, s.StudentCode as scode, s.StudentFname AS fname, s.Sex as sex, s.FathernameGen as fathername, s.MotherNameGen as mname, s.Genos as genos,
s.StudentLname AS lname, s.Age as birthyear, s.ipikootita as ipikootita, s.mitrooarrenwn as mitrooar, s.dimotologio as dimotologio, s.dimos as dimos, s.nomos as nomos
FROM `_students_class` as l INNER JOIN  students as s ON s.StudentID = l.StudentID
INNER JOIN class ON class.ClassID = l.ClassID
 WHERE l.eduperiod =  '".$eduyear."' AND class.classID>3
AND l.StudentID IN (SELECT StudentID FROM students WHERE IsActive =1)
ORDER BY lname, fname";



//$result = mysql_query($qry) or die(mysql_error());

$result = $con->query($qry);


// Retrieve the user name to display
$yourname = (isset($_POST['yourname'])) ? $_POST['yourname'] : '';
$yourname = trim(''.$yourname);
if ($yourname=='') $yourname = "(no name)";

// A recordset for merging tables
$data = array();
while($row = $result->fetch_assoc())
{
        $studentid = $row["studentid"];
        $studentsex = $hf->getArthro($row["sex"]);
		$studentgenos = $row["genos"];
		if ($studentgenos=='0') {$studentgenos='..............';}
		$katalixi1 = $hf->getKataliksi($row["sex"]);
		$katalixi2 = $hf->getArthro2($row["sex"]);
        $fathernamegen = $row["fathername"];
        $qry = "SELECT g.finalendiaferon as endiaferon, g.finalantapokrisi as antapokrisi
        FROM `_students_general`  g
        WHERE g.eduyear =  '".$eduyear."'
        AND g.StudentID=".$studentid;
        //$result2 = mysql_query($qry) or die(mysql_error());
		
		    $result2 = $con->query($qry);
        $lessons = array();
        $i = 0;
        $total = 0;
        $count = 0;
		$endiaferon = '............';
		$antapokrisi = '............';
		 
        while($row2 = $result2->fetch_assoc())
        {

			if (!isset($row2['endiaferon']) || !is_null($row2['endiaferon']) || !empty($row2['endiaferon'])) {$endiaferon = $row2['endiaferon'];}
			if (!isset($row2['antapokrisi']) || !is_null($row2['antapokrisi']) || !empty($row2['antapokrisi'])) {$antapokrisi = $row2['antapokrisi'];}
		  
        }
		
		/// 
		
		
		$qry3 = "SELECT l.LessonName, g.finalgrade as finalgrade
        FROM `_students_lessons` as g INNER JOIN lessons as l ON g.LessonID = l.LessonID
        WHERE g.eduyear =  '".$eduyear."'
        AND g.StudentID=".$studentid." AND l.lessonID<9";
        //$result2 = mysql_query($qry) or die(mysql_error());
		    $result3 = $con->query($qry3);
        $lessons = array();
        $i = 0;
        $total = 0;
        $count = 0;
        while($row3 = $result3->fetch_assoc())
        {
          $lessons[$i] = $row3['finalgrade'];
          $total += intval($row3["finalgrade"]);
          if (intval($row3["finalgrade"])>0) $count=$count+1;
          $i = $i + 1;
        }
		
		
		///

		try //Get Student's Numeric grades
    {
			if ($count>0 and $total>60)
			{
  			//echo $count + ' ' + $total;
			     $data[] = array(
				 'studentid'=> $studentid, 
				 'firstname'=>$row["fname"],
				 'mitroo'=>$row["scode"],
      			 'lname'=>  $row["lname"],
      			 'ftname'=>  $fathernamegen,
				 'mname'=>  $row["mname"],
				 'genos'=>  $studentgenos,
      			 'arthro'=>  $studentsex,
      			 'mitrooar'=>  $row["mitrooar"],
				 'dimotologio'=>  $row["dimotologio"],
				 'dimos'=>  $row["dimos"],
				 'nomos'=>  $row["nomos"],
				 'ipikootita'=>  $row["ipikootita"],
				 'birthyear'=>  $row["birthyear"],
      			 'endiaferon'=>  $endiaferon,
				 'antapokrisi'=>  $antapokrisi,
              'titleprotocolnumber'=>$titleprotocolnumber,
			  'apodeiktikoprotocolnumber'=>$apodeiktikoprotocolnumber,
              'katalixi1'=>  $katalixi1,
			  'katalixi2'=>  $katalixi2
      			  );
				
              $protocoln=$protocoln+3; //+1 when Vevaioseis are protocoled after titles and apolytiria, +3 when all 3 of them are together
              $titleprotocolnumber=$titleprotocolnumber+3; //+2 when Vevaioseis are protocoled after titles and apolytiria, +3 when all 3 of them are together
			  $apodeiktikoprotocolnumber=$titleprotocolnumber-1; //+2 when Vevaioseis are protocoled after titles and apolytiria, +3 when all 3 of them are together
			  } //End of if(count)
		}
		catch (Exception $e)
		{
			echo 'Caught exception: ',  $e->getMessage(), "\n";
		}


}//End of while loop

// -----------------
// Load the template for Titlous
// -----------------
try 
{
	$template2 = 'templates/apodeiktiko.docx';
	
	$TBS->LoadTemplate($template2, OPENTBS_ALREADY_UTF8); // Also merge some [onload] automatic fields (depends of the type of document).

	// --------------------------------------------
	// Merging and other operations on the template
	// --------------------------------------------

	// Merge data in the body of the document
	$TBS->MergeBlock('a', $data);

	// Delete comments
	$TBS->PlugIn(OPENTBS_DELETE_COMMENTS);

	// -----------------
	// Output the result
	// -----------------

	// Define the name of the output file
	$save_as = (isset($_GET['save_as']) && (trim($_GET['save_as'])!=='') && ($_SERVER['SERVER_NAME']=='localhost')) ? trim($_GET['save_as']) : '';
	$output_file_name = str_replace('.', '_'.date('Y-m-d').$save_as.'.', $template2);
	//$output_file_name = str_replace('templates/','../../../sdeass/documents/',$output_file_name);
	
	$save_as='1';
	if ($save_as==='') {
		// Output the result as a downloadable file (only streaming, no data saved in the server)
		$TBS->Show(OPENTBS_DOWNLOAD, $output_file_name); // Also merges all [onshow] automatic fields.
		// Be sure that no more output is done, otherwise the download file is corrupted with extra data.
		exit();
	} else {
		// Output the result as a file on the server.
		$TBS->Show(OPENTBS_FILE, $output_file_name); // Also merges all [onshow] automatic fields.
		// The script can continue.
		$source_file = $output_file_name;
		$netfilename = str_replace('templates/','',$output_file_name);
		$destination_path = '../../sdeass/documents/';
		rename($source_file, $destination_path . pathinfo($source_file, PATHINFO_BASENAME));
		
		
		
		
		exit('File <a href="/sdemesol/sdeass/documents/'.$netfilename.'" target="_blank">['.$netfilename.']</a> has been created.');
	}
}
catch (Exception $e)
		{
			echo 'Caught exception: ',  $e->getMessage(), "\n";
		}
		
try 
{
	$template2 = 'templates/apodeiktiko.docx';
	$TBS->LoadTemplate($template2, OPENTBS_ALREADY_UTF8); // Also merge some [onload] automatic fields (depends of the type of document).

	// --------------------------------------------
	// Merging and other operations on the template
	// --------------------------------------------

	// Merge data in the body of the document
	$TBS->MergeBlock('a', $data);

	// Delete comments
	$TBS->PlugIn(OPENTBS_DELETE_COMMENTS);

	// -----------------
	// Output the result
	// -----------------

	// Define the name of the output file
	$save_as = (isset($_GET['save_as']) && (trim($_GET['save_as'])!=='') && ($_SERVER['SERVER_NAME']=='localhost')) ? trim($_GET['save_as']) : '';
	$output_file_name = str_replace('.', '_'.date('Y-m-d').$save_as.'.', $template2);
	//$output_file_name = str_replace('templates/','../../../sdeass/documents/',$output_file_name);
	$save_as='1';
	if ($save_as==='') {
		// Output the result as a downloadable file (only streaming, no data saved in the server)
		$TBS->Show(OPENTBS_DOWNLOAD, $output_file_name); // Also merges all [onshow] automatic fields.
		// Be sure that no more output is done, otherwise the download file is corrupted with extra data.
		exit();
	} else {
		// Output the result as a file on the server.
		$TBS->Show(OPENTBS_FILE, $output_file_name); // Also merges all [onshow] automatic fields.
		// The script can continue.
		$source_file = $output_file_name;
		$netfilename = str_replace('templates/','',$output_file_name);
		$destination_path = '../../sdeass/documents/';
		rename($source_file, $destination_path . pathinfo($source_file, PATHINFO_BASENAME));
		exit('File <a href="/sdemesol/sdeass/documents/'.$netfilename.'" target="_blank">['.$netfilename.']</a> has been created.');
	}
}
catch (Exception $e)
		{
			echo 'Caught exception: ',  $e->getMessage(), "\n";
		}