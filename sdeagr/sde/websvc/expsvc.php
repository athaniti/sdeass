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
  $ethnosimosrc = 'https://athaniti.com/sde/websvc/images/ethnosimo.jpg';
  $titletext = 'ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ<br />ΥΠΟΥΡΓΕΙΟ ΠΑΙΔΕΙΑΣ ΚΑΙ ΘΡΗΣΚΕΥΜΑΤΩΝ<br />ΓΕΝΙΚΗ ΓΡΑΜΜΑΤΕΙΑ ΕΠΑΓΓΕΛΜΑΤΙΚΗΣ ΕΚΠΑΙΔΕΥΣΗΣ,<br />ΚΑΤΑΡΤΙΣΗΣ, ΔΙΑ ΒΙΟΥ ΜΑΘΗΣΗΣ ΚΑΙ ΝΕΟΛΑΙΑΣ<br />ΔΙΕΥΘΥΝΣΗ ΔΙΑ ΒΙΟΥ ΜΑΘΗΣΗΣ<br />ΙΔΡΥΜΑ ΝΕΟΛΑΙΑΣ ΚΑΙ ΔΙΑ ΒΙΟΥ ΜΑΘΗΣΗΣ';
  $directorname = 'ΝΑΣΙΟΣ ΝΙΚΟΛΑΟΣ';
  $subdirectorname = 'ΑΘΑΝΙΤΗΣ ΑΝΔΡΕΑΣ';
  $poreiastart = 'Η μαθησιακή του/ της πορεία είναι ';
  $poreiaend = '.';
  $synergasiastart = 'Η συνεργασία του/ της και η συμμετοχή της σε Ομαδικές Δραστηριότητες κρίνεται ';
  $synergasiaend = '.';
  $endiaferonstart = 'Δείχνει ';
  $endiaferonend = ' ενδιαφέρον για ανάληψη πρωτοβουλιών.';
  $desmefsistart = 'Η δέσμευσή του/ της ως προς τη φοίτηση σε συνδυασμό με την αποτελεσματικότητά του/ της στους στόχους του προγράμματος είναι ';
  $desmefsiend = '.';
  $lpagecont = '';
  $content='';

if (isset($_GET['tag']) && $_GET['tag'] != '')
{
    // get tag
    $tag = $_GET['tag'];

    $classid = '';
    if (isset($_GET['classid']) && $_GET['classid'] != '')
    {
	    $classid = $_GET['classid'];
    }


    // include db handler
    //require_once 'include/config.php';
    require_once 'include/db_functions.php';
    require_once 'lib/PHPWord.php';
    $db = new DB_Functions();
    $con = $db->con;
    $con->query(DB_DATABASE);


    // response Array
    $response = array("tag" => $tag, "success" => 0, "error" => 0);
    //$response = array("success" => 0, "error" => 0);
	$teacherid = 0;
	$eduyear = '1213';
	if (isset($_GET['eduyear'])) {
			$eduyear = $_GET["eduyear"];
		}
	if (isset($_GET['teacherid'])) {
			$teacherid = $_GET["teacherid"];
		}
	$eduyearstr='20'.substr($eduyear, 0, 2).' - 20'.substr($eduyear, -2, 2);
    // check for tag type
    if ($tag == 'perstudent')
    {
		    $semest = "asemester";
		      $semestfl = "a";
		        $semestname = "Α'";

	        if (isset($_GET['semester']) && $_GET['semester']=="b")
		        {
			           $semest = $_GET['semester']."semester";
			              $semestfl = $_GET['semester'];
			                 $semestname = "Β'";
		         }
		$endiaferon = $semestfl.'endiaferon';
		$antapokrisi = $semestfl.'antapokrisi';
		if (isset($_GET['teacherid'])) {
			$teacherid = $_GET['teacherid'];
		}
		if (isset($_GET['eduyear'])) {
			$eduyear = $_GET["eduyear"];
		}
		$user = $db->getUser($teacherid);
		$filename = $user['UserLname']."_".$user['UserFname'];
		//Get records from database

    //$qry = "SELECT students.StudentFname AS fname, students.StudentLname AS lname, l.asemester as asem, l.bsemester as bsem, class.ClassName as classname, class.ClassID as classid, lessons.LessonName As lessonname, l.*, g.amathisiakiporeia, g.bmathisiakiporeia, g.asynergasia, g.bsynergasia, g.bendiaferon as bendiaferongeneral, g.aendiaferon  as aendiaferongeneral, g.adesmefsi, g.bdesmefsi FROM `_students_lessons` AS l INNER JOIN students ON students.StudentID=l.StudentID INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID  INNER JOIN class ON class.ClassID = `_students_class`.ClassID INNER JOIN lessons ON lessons.LessonID=l.LessonID  LEFT JOIN `_students_general` AS g ON g.StudentID=l.StudentID WHERE l.eduyear='".$eduyear."'	AND `_students_class`.eduperiod='".$eduyear."' AND g.eduyear='".$eduyear."' AND l.StudentID IN (SELECT students.StudentID from students INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID WHERE students.IsActive=1 AND `_students_class`.eduperiod='".$eduyear."' AND `_students_class`.ClassID IN (SELECT ClassID FROM `_class_teachers` WHERE TeacherID = ".$teacherid." AND eduyear='".$eduyear."')) AND l.LessonID IN (SELECT LessonID from `_lessons_teachers` WHERE TeacherID = ".$teacherid.") ORDER BY lessonname, classname, lname, fname;";



    $qry = "SELECT students.StudentFname AS fname, students.StudentLname AS lname, l.asemester as asem, l.bsemester as bsem, class.ClassName as classname, class.ClassID as classid, lessons.LessonName As lessonname, l.*  FROM `_students_lessons` AS l INNER JOIN students ON students.StudentID=l.StudentID INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID INNER JOIN class ON class.ClassID = `_students_class`.ClassID INNER JOIN lessons ON lessons.LessonID=l.LessonID WHERE l.eduyear='".$eduyear."' AND `_students_class`.eduperiod='".$eduyear."' AND l.StudentID IN (SELECT students.StudentID from students INNER JOIN `_students_class` ON `_students_class`.StudentID = students.StudentID WHERE students.IsActive=1 AND `_students_class`.eduperiod='".$eduyear."' AND `_students_class`.ClassID IN (SELECT ClassID FROM `_class_teachers` WHERE TeacherID = ".$teacherid." AND eduyear='".$eduyear."')) AND l.LessonID IN (SELECT LessonID from `_lessons_teachers` WHERE TeacherID = ".$teacherid.") ORDER BY lessonname, classname, lname, fname;";


		$result = $con->query($qry);
    $response["whereami"]=$qry;

		$jTableResult = array();

		if ($result) {
			//Optional: print out title to top of Excel or Word file with Timestamp
			//for when file was generated:
			//set $Use_Titel = 1 to generate title, 0 not to use title
			$Use_Title = 1;
			//define date for title: EDIT this to create the time-format you need
			$now_date = DATE ('m-d-Y H:i');
			//define title for .doc or .xls file: EDIT this if you want
			$title = "Grades for teacher ".$user['UserFname']." ".$user['UserFname']." on ".$now_date;


			//if this parameter is included ($w=1), file returned will be in word format ('.doc')
			//if parameter is not included, file returned will be in excel format ('.xls')
			if (isset($_GET['type']) && ($_GET['type']=='w'))
			{
				 $file_type = "msword";
				 $file_ending = "doc";
			}else {
				 $file_type = "vnd.ms-excel";
				 $file_ending = "xls";
				 //header info for browser: determines file type ('.doc' or '.xls')
				header("Content-Type: application/$file_type; charset=utf-8");
				header("Content-Disposition: inline; filename=".$filename.".$file_ending");
				header("Pragma: no-cache");
				header("Expires: 0");

			}

			/*    Start of Formatting for Word or Excel    */

			if (isset($_GET['type']) && ($_GET['type']=='w')) //check for $w again
			{
				// Size – Denotes A4, Legal, A3, etc ——- size:8.5in 11.0in; for Legal size
				// Margin – Set the margin of the word document – margin:0.5in 0.31in 0.42in 0.25in; [margin: top right bottom left]

				$word_xmlns = "xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'";
				$word_xml_settings = '<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>';
				$word_landscape_style = "@page {size:8.5in 11.0in; margin:0.8in 0.8in 0.8in 0.8in;} div.Section1{page:Section1;}";
				$word_landscape_div_start = "<div class='Section1'>";
				$word_landscape_div_end = "</div>";

				//$content = "This is a test page";


				 /*    FORMATTING FOR WORD DOCUMENTS ('.doc')   */
				 //create title with timestamp:
				 if ($Use_Title == 1)
				 {
					 echo("$title\n\n");
				 }
				 //define separator (defines columns in excel & tabs in word)
				 $sep = "\n"; //new line character
			 	$extracontst = '<table width="100%" cellspacing="0" style="border: 1px solid #000;">';
				$extracontst .= '<tr><th width="25%"  style="border: 1px solid #000; padding:3px;">Ονοματεπώνυμο</th><th width="50%"  style="border: 1px solid #000; padding:3px;">Περιγραφική Αξιολόγηση</th><th width="10%"  style="border: 1px solid #000; padding:3px;">Ενδιαφέρον</th><th width="10%"  style="border: 1px solid #000; padding:3px;">Ανταπόκριση</th><th width="5%"  style="border: 1px solid #000; padding:3px;">Βαθμός</th></tr>';
				$extracontend = '</table>';

				$contentstart = "<strong>Σ.Δ.Ε. Αγρινίου</strong><br />Αξιολόγηση του εκπαιδευτικού: <strong>".$user['UserLname']." ".$user['UserFname']."</strong> για το ".$semestname." Τετράμηνο του Σχολικού Έτους ".$eduyearstr."<br /><br />";
				$classname = '';
				$lessonname = '';
				$newclass = '';
				$newlesson = '';

				 while($row = $result->fetch_assoc())
				 {
					 $newlesson = '';
					 if ($lessonname != $row["lessonname"])
					 {

						 if ($lessonname!='') {
							 $newlesson .=$extracontend;
						 }
						 $lessonname = $row["lessonname"];
						 $newlesson .= '<br /><br />Γραμματισμός: <strong>'.$lessonname.'</strong>';
						 $classname = '';

					 }
					 $newclass = '';
					 if ($classname != $row["classname"])
					 {
						 if ($classname!='') {
							 $newclass .=$extracontend;
						 }
						 $classname = $row["classname"];
						 $newclass .= '<br /><br />Τμήμα: '.$classname.'<br /><br />'.$extracontst;

					 }
					 //set_time_limit(60); // HaRa
					 $getgrade = "";
					 if ($row["classid"] > 3 && $semestfl == "b")
					 {
						 $getgrade = $row["finalgrade"];
					 }

					 $schema_insert = $newlesson.$newclass.'<tr style="border: 1px solid #000;">';
					 $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row["lname"].' '.$row["fname"].'</td>';
					 $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row[$semest].'</td><td style="border: 1px solid #000; padding:3px;">'.$row[$endiaferon].'</td><td style="border: 1px solid #000; padding:3px;">'.$row[$antapokrisi].'</td></td><td style="border: 1px solid #000; padding:3px;">'.$getgrade.'</td>';

					 $schema_insert .= '</tr>';
					 //$schema_insert = str_replace($sep."$", "", $schema_insert);
					 //$schema_insert .= "\t";
					$content .=$schema_insert;
				 }
				 $content = $contentstart.$content.$extracontend;
				$userfulname = $user["UserLname"].' '.$user["UserFname"];
				 $content .= '<br /><table width="100%" cellspacing="0" style="border: none;"><tr><td width="60%">&nbsp;</td><td style="text-align:center">Ο/Η Εκπαιδευτικός<br /><br /><br /></td></tr><tr><td width="60%">&nbsp;</td><td style="text-align:center">'.$userfulname.'<br /></td></tr></table>';


				 $content = '<html '.$word_xmlns.'>
				<head>'.$word_xml_settings.'<style type=“text/css”>
				'.$word_landscape_style.' 
				body {font-family:OpenSans, Calibri, Verdana; font-size:14px;}
				table,td {font-size:12px; border:0px solid #FFFFFF;} </style>
				</head>
				<body>'.$word_landscape_div_start.$content.$word_landscape_div_end.'</body>
				</html>';

				@header('Content-Type: application/'.$file_type.'; charset=utf-8');
				@header('Content-Length: '.strlen($content));
				@header('Content-disposition: inline; filename="'.$filename.'.doc"');
				echo $content;
			}
			else /*    FORMATTING FOR EXCEL DOCUMENTS ('.xls')   */
			{
				 /*    FORMATTING FOR EXCEL DOCUMENTS ('.xls')   */
				 //create title with timestamp:
				 if($Use_Title == 1)
				 {
					 echo("$title\n");
				 }
				 //define separator (defines columns in excel & tabs in word)
				 $sep = "\t"; //tabbed character

				 //start of printing column names as names of MySQL fields
				 for($i = 0; $i < $result->field_count; $i++)
				 {
					echo mysqli_fetch_field_direct($result, $i)->name . "\t";

				 }
				 print("\n");
				 //end of printing column names

				 //start while loop to get data
				 while($row = $result->fetch_row())
				 {
					 //set_time_limit(60); // HaRa
					 $schema_insert = "";
					 for($j=0; $j<$result->field_count;$j++)
					 {
						 if(!isset($row[$j]))
							 $schema_insert .= "NULL".$sep;
						 elseif($row[$j] != "")
							 $schema_insert .= "$row[$j]".$sep;
						 else
							 $schema_insert .= "".$sep;
					 }
					 $schema_insert = str_replace($sep."$", "", $schema_insert);
					 //following fix suggested by Josue (thanks, Josue!)
					 //this corrects output in excel when table fields contain \n or \r
					 //these two characters are now replaced with a space
					 $schema_insert = preg_replace("/\r\n|\n\r|\n|\r/", " ", $schema_insert);
					 $schema_insert .= "\t";
					 print(trim($schema_insert));
					 print  "\n";
				 }
			} /*    END OF FORMATTING FOR EXCEL DOCUMENTS ('.xls')   */
			$response["success"] = 1;
		}
		else
		{
			$response["error"] = 1;
			$response["error_msg"] = "Not able to fetch data!";
		}

    }
    elseif ($tag== 'perproject')
    {
		$semest = "asemester";
		$semestfl = "a";
		$semestname = "Α'";

	        if (isset($_GET['semester']) && $_GET['semester']=="b")
		{
			$semest = $_GET['semester']."semester";
			$semestfl = $_GET['semester'];
			$semestname = "Β'";
		}
		$endiaferon = $semestfl.'endiaferon';
		$antapokrisi = $semestfl.'antapokrisi';
		if (isset($_GET['projectid'])) {
			$projectid = $_GET['projectid'];
		}
		if (isset($_GET['eduyear'])) {
			$eduyear = $_GET["eduyear"];
		}
		$projdet = $db->getProjectDetails($projectid);
		$projdetails = $projdet[0];
		$projresp = $db->getProjectResp($projectid);

		$projtype="Σχέδιο Δράσης";
		if($projdetails['type']==2) {$projtype="Εργαστήριο";}


		$filename = $projdetails['projectName']."_".$eduyear."_".$semestname."_Τετράμηνο";
		//Get records from database
		$qry = "SELECT students.StudentFname AS StudentFname, students.StudentLname AS StudentLname, projects.projectName As ProjectName, projects.Type As ProjectType, p.* FROM `_projects_students` AS p INNER JOIN students ON students.StudentID=p.StudentID INNER JOIN projects ON projects.ProjectID=p.ProjectID WHERE projects.ProjectID=".$projectid.";";

		$result = $con->query($qry);

		$jTableResult = array();

		if ($result) {
			//Optional: print out title to top of Excel or Word file with Timestamp
			//for when file was generated:
			//set $Use_Titel = 1 to generate title, 0 not to use title
			$Use_Title = 1;
			//define date for title: EDIT this to create the time-format you need
			$now_date = DATE ('m-d-Y H:i');
			//define title for .doc or .xls file: EDIT this if you want
			$title = "Grades for project ".$projdetails['projectName']." on ".$now_date;


			//if this parameter is included ($w=1), file returned will be in word format ('.doc')
			//if parameter is not included, file returned will be in excel format ('.xls')
			if (isset($_GET['type']) && ($_GET['type']=='w'))
			{
				 $file_type = "msword";
				 $file_ending = "doc";
			}else {
				 $file_type = "vnd.ms-excel";
				 $file_ending = "xls";
				 //header info for browser: determines file type ('.doc' or '.xls')
				header("Content-Type: application/$file_type; charset=utf-8");
				header("Content-Disposition: inline; filename=".$filename.".$file_ending");
				header("Pragma: no-cache");
				header("Expires: 0");

			}

			/*    Start of Formatting for Word or Excel    */

			if (isset($_GET['type']) && ($_GET['type']=='w')) //check for $w again
			{
				// Size – Denotes A4, Legal, A3, etc ——- size:8.5in 11.0in; for Legal size
				// Margin – Set the margin of the word document – margin:0.5in 0.31in 0.42in 0.25in; [margin: top right bottom left]

				$word_xmlns = "xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'";
				$word_xml_settings = '<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>';
				$word_landscape_style = "@page {size:8.5in 11.0in; margin:0.8in 0.8in 0.8in 0.8in;} div.Section1{page:Section1;}";
				$word_landscape_div_start = "<div class='Section1'>";
				$word_landscape_div_end = "</div>";

				//$content = "This is a test page";


				 /*    FORMATTING FOR WORD DOCUMENTS ('.doc')   */
				 //create title with timestamp:
				 if ($Use_Title == 1)
				 {
					 echo("$title\n\n");
				 }
				 //define separator (defines columns in excel & tabs in word)
				 $sep = "\n"; //new line character
			 	$extracontst = '<table width="100%" cellspacing="0" style="border: 1px solid #000;">';
				$extracontst .= '<tr><th width="25%"  style="border: 1px solid #000; padding:3px;">Ονοματεπώνυμο</th><th style="border: 1px solid #000; padding:3px;">Αξιολόγηση</th></tr>';
				$extracontend = '</table>';

				$contentstart = "Αξιολόγηση για το ".$projtype.": <strong>".$projdetails['projectName']."</strong> για το ".$semestname." Τετράμηνο<br /><br />".$extracontst;
				$classname = '';
				$studentname = '';
				$newclass = '';
				$newstudent = '';

				 while($row = $result->fetch_assoc())
				 {
					$studentname = $row["StudentLname"]." ".$row["StudentFname"];

					 //set_time_limit(60); // HaRa


					 $schema_insert = $newlesson.$newclass.'<tr style="border: 1px solid #000;">';
					 $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$studentname.'</td>';
					 $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row[$semest].'</td>';

					 $schema_insert .= '</tr>';
					 //$schema_insert = str_replace($sep."$", "", $schema_insert);
					 //$schema_insert .= "\t";
					$content .=$schema_insert;
				 }
				 $content = $contentstart.$content.$extracontend;

				 $prespstext = '';
				 $result2 = mysql_query("SELECT t.* FROM `_projects_teachers` As p
					INNER JOIN sdeusers As t ON t.UserID = p.TeacherID
					WHERE p.ProjectID = ".$projectid) or die(mysql_error());
				// check for result
				if ($result2) {
					$no_of_rows = mysql_num_rows($result2);
					if ($no_of_rows > 0) {
						while($row2=mysql_fetch_assoc($result2))
						{
							$prespstext.=$row2['UserFname']." ".$row2['UserLname'];
						}
					}
				}



				 $content .= '<br />Οι Υπεύθυνοι Εκπαιδευτικοί<br /><br /><br />'.$prespstext;


				 $content = '<html '.$word_xmlns.'>
				<head>'.$word_xml_settings.'<style type=“text/css”>
				'.$word_landscape_style.' table,td {font-family:Verdana; border:0px solid #FFFFFF;} </style>
				</head>
				<body>'.$word_landscape_div_start.$content.$word_landscape_div_end.'</body>
				</html>';

				@header('Content-Type: application/'.$file_type.'; charset=utf-8');
				@header('Content-Length: '.strlen($content));
				@header('Content-disposition: inline; filename="'.$filename.'.doc"');
				echo $content;
			}
			else /*    FORMATTING FOR EXCEL DOCUMENTS ('.xls')   */
			{
				 /*    FORMATTING FOR EXCEL DOCUMENTS ('.xls')   */
				 //create title with timestamp:
				 if($Use_Title == 1)
				 {
					 echo("$title\n");
				 }
				 //define separator (defines columns in excel & tabs in word)
				 $sep = "\t"; //tabbed character

				 //start of printing column names as names of MySQL fields
				 for($i = 0; $i < $result->field_count; $i++)
				 {
					echo mysql_field_name($result,$i) . "\t";
				 }
				 print("\n");
				 //end of printing column names

				 //start while loop to get data
				 while($row = $result->fetch_row())
				 {
					 //set_time_limit(60); // HaRa
					 $schema_insert = "";
					 for($j=0; $j<$result->field_count;$j++)
					 {
						 if(!isset($row[$j]))
							 $schema_insert .= "NULL".$sep;
						 elseif($row[$j] != "")
							 $schema_insert .= "$row[$j]".$sep;
						 else
							 $schema_insert .= "".$sep;
					 }
					 $schema_insert = str_replace($sep."$", "", $schema_insert);
					 //following fix suggested by Josue (thanks, Josue!)
					 //this corrects output in excel when table fields contain \n or \r
					 //these two characters are now replaced with a space
					 $schema_insert = preg_replace("/\r\n|\n\r|\n|\r/", " ", $schema_insert);
					 $schema_insert .= "\t";
					 print(trim($schema_insert));
					 print  "\n";
				 }
			} /*    END OF FORMATTING FOR EXCEL DOCUMENTS ('.xls')   */
			$response["success"] = 1;
		}
		else
		{
			$response["error"] = 1;
			$response["error_msg"] = "Not able to fetch data!";
		}

    }
    elseif ($tag == 'allstudents')
    { //Export files for every student

	    $semest = "asemester";
	    $semestfl = "a";
	    $semestname = "Α'";

	    if (isset($_GET['semester']) && $_GET['semester']=="b") {
			$semest = $_GET['semester']."semester";
			$semestfl = $_GET['semester'];
			$semestname = "Β'";
		}
	    $endiaferon = $semestfl.'endiaferon';
	    $antapokrisi = $semestfl.'antapokrisi';
	    $mathisiakiporeia = $semestfl.'mathisiakiporeia';
	    $synergasia = $semestfl.'synergasia';
	    $endiaf = $semestfl.'endiaferon';
	    $desmefsi = $semestfl.'desmefsi';


	    if (isset($_GET['eduyear'])) {
			$eduyear = $_GET["eduyear"];
	    }
		//$user = $db->getUser($teacherid);
	    $filename = 'Αξιολόγηση '.$semestname.' Τετραμήνου';

	    $classfilter = '';
	    if ($classid!='')
	    {
		$classfilter = ' AND class.ClassID = '.$classid;
	    }
	    //Get records from database
	    $qry = "SELECT s.StudentID AS studentid, s.StudentFname AS fname, s.StudentLname AS lname, l.asemester AS asem, l.bsemester AS bsem, class.ClassName AS classname, class.ClassID AS classid, lessons.LessonName AS lessonname, lessons.Priority AS priority, l.*, g.*
FROM  students AS s
INNER JOIN `_students_class` ON `_students_class`.StudentID = s.StudentID
INNER JOIN class ON class.ClassID = `_students_class`.ClassID
INNER JOIN (SELECT * FROM `_students_general` WHERE eduyear='".$eduyear."') AS g ON g.StudentID = s.StudentID
INNER JOIN (SELECT * FROM `_students_lessons` WHERE eduyear='".$eduyear."') AS l ON l.StudentID = s.StudentID
INNER JOIN lessons ON lessons.LessonID = l.LessonID
WHERE l.eduyear =  '".$eduyear."'
AND `_students_class`.eduperiod='".$eduyear."'
AND l.StudentID IN (SELECT StudentID FROM students WHERE IsActive =1)".$classfilter." ORDER BY lname, fname, priority, classname";

	    //$qry = "SELECT students.StudentID AS studentid, students.StudentFname AS fname, students.StudentLname AS lname, l.asemester AS asem, l.bsemester AS bsem, class.ClassName AS classname, class.ClassID AS classid, lessons.LessonName AS lessonname, lessons.Priority AS priority, l.*, g.* FROM  `_students_lessons` AS l INNER JOIN `_students_general` AS g ON g.StudentID = l.StudentID INNER JOIN students ON students.StudentID = l.StudentID INNER JOIN class ON class.ClassID = students.ClassID INNER JOIN lessons ON lessons.LessonID = l.LessonID WHERE l.eduyear =  '".$eduyear."' AND l.StudentID IN (SELECT StudentID FROM students WHERE IsActive =1)".$classfilter." ORDER BY lname, fname, priority, classname";


	    //$result = mysql_query($qry) or die(mysql_error());
      $result = $con->query($qry);

	    $jTableResult = array();

	    if ($result)
	    {
			//Optional: print out title to top of Excel or Word file with Timestamp
			//for when file was generated:
			//set $Use_Titel = 1 to generate title, 0 not to use title
			$Use_Title = 1;
			//define date for title: EDIT this to create the time-format you need
			$now_date = DATE ('m-d-Y H:i');
			//define title for .doc or .xls file: EDIT this if you want
			$title = 'Αξιολόγηση '.$semestname.' Τετραμήνου';


			//if this parameter is included ($w=1), file returned will be in word format ('.doc')
			//if parameter is not included, file returned will be in excel format ('.xls')
			if (isset($_GET['type']) && ($_GET['type']=='w'))
			{
				 $file_type = "msword";
				 $file_ending = "doc";
			}else {
				 $file_type = "vnd.ms-excel";
				 $file_ending = "xls";
				 //header info for browser: determines file type ('.doc' or '.xls')
				header("Content-Type: application/$file_type; charset=utf-8");
				header("Content-Disposition: inline; filename=".$filename.".$file_ending");
				header("Pragma: no-cache");
				header("Expires: 0");

			}

			/*    Start of Formatting for Word or Excel    */

			if (isset($_GET['type']) && ($_GET['type']=='w')) //check for $w again
			{


				    // Size – Denotes A4, Legal, A3, etc ——- size:8.5in 11.0in; for Legal size
				// Margin – Set the margin of the word document – margin:0.5in 0.31in 0.42in 0.25in; [margin: top right bottom left]

				$word_xmlns = "xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'";
				$word_xml_settings = "<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>";
				$word_landscape_style = "@page {size:8.5in 11.0in; margin:0.8in 0.8in 0.8in 0.8in;} div.Section1{page:Section1;}";
				$word_landscape_div_start = "<div class='Section1'>";
				$word_landscape_div_end = "</div>";

				//$content = "This is a test page";


				 /*    FORMATTING FOR WORD DOCUMENTS ('.doc')   */
				 //create title with timestamp:
				 if ($Use_Title == 1)
				 {
					 echo("$title\n\n");
				 }
				 //define separator (defines columns in excel & tabs in word)
				 $sep = "\n"; //new line character
				 //$pagesep = '<br style="page-break-before: always">'; //new line character
				 $pagesep = "<br clear=all style='mso-special-character:line-break;page-break-before:always'>";


				 $fpagecont = '<div style="font-weight:bold; text-align:left; margin-bottom:60px;">';
				 $fpagecont .= '<img src="'.$ethnosimosrc.'" border=0 height=60px/><br />'.$titletext.'</div><br /><br /><br /><br /><br /><br /><br /><br />';

				 $fpagecont .= '<div style="font-weight:bold; text-align:center">ΣΧΟΛΕΙΟ ΔΕΥΤΕΡΗΣ ΕΥΚΑΙΡΙΑΣ ΑΓΡΙΝΙΟΥ<br /></div>';
				 $fpagecontend = '<br /><br /><br /><div style="font-weight:bold; text-align:right;  margin-top:60px;">ΣΧΟΛΙΚΟ ΕΤΟΣ '.$eduyearstr.'</div>'.$pagesep;

			 	$extracontst = '<div style="font-weight:bold; text-align:center">ΠΑΡΑΤΗΡΗΣΕΙΣ ΑΝΑ ΓΡΑΜΜΑΤΙΣΜΟ</div><table width="100%" cellspacing="0" style="border: 0px solid #000;">';
				//$extracontst .= '<tr><th width="25%"  style="border: 1px solid #000; padding:3px;">Γραμματισμός</th><th width="75%"  style="border: 1px solid #000; padding:3px;">Περιγραφική Αξιολόγηση</th></tr>';
				$extracontend = '</table>';

				$contentstart = 'Αξιολόγηση για το '.$semestname.' Τετράμηνο<br /><br />';
				$classname = '';
				$lessonname = '';
				$newclass = '';
				$newlesson = '';
				$studentid = '';
				$newstudent = '';
				$studentname = '';
				$studentcount=0;
$lpagecont='';
			        while($row = $result->fetch_assoc())
				 {
				    $newstudent = '';
				    if ($studentid != $row["studentid"])
				    {

					 if ($studentcount>0) {
						 $newstudent .=$extracontend;

					 }
					 $studentid = $row["studentid"];
					 $studentname = $row["lname"].' '.$row["fname"];
					 $fpagestudcont = $fpagecont.'<div style="font-weight:bold; text-align:center;  margin-bottom:250px;">ΦΥΛΛΟ ΑΞΙΟΛΟΓΗΣΗΣ <br /><br />Εκπαιδευόμενος: '.$studentname.'<br /><br /><br />'.$semestname.' ΤΕΤΡΑΜΗΝΟ</div>'.$fpagecontend;
					 //$fpagestudcont = '<div style="font-weight:bold; text-align:center;  margin-bottom:250px;">ΦΥΛΛΟ ΑΞΙΟΛΟΓΗΣΗΣ <br /><br />Εκπαιδευόμενος: '.$studentname.'<br /><br /><br />'.$semestname.' ΤΕΤΡΑΜΗΝΟ</div>';
					 //$newstudent .= '<br /><br />Εκπαιδευόμενος: <strong>'.$studentname.'</strong>';
					 $newstudent .=$lpagecont.$fpagestudcont.$extracontst;
					 $classname = '';
					 $studentcount = $studentcount + 1;
				    }

				    $schema_insert = $newstudent.'<tr style="border: 1px solid #000;">';
				    $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row["lessonname"].'</td>';
				    $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row[$semest].'</td>';
				    $schema_insert .= '</tr>';
				    $lpagecont = $pagesep.'<div style="font-weight:normal; font-size:0.8em;">';
				    $lpagecont .='<div style="text-align:center;font-weight:bold;">ΓΕΝΙΚΕΣ ΠΑΡΑΤΗΡΗΣΕΙΣ</div><br /><br />';
					
				    $lpagecont .='<span style="font-weight:bold; font-size:1em;">Μαθησιακή Πορεία</span><br /><br /><br />'.$poreiastart.mb_strtolower($row[$mathisiakiporeia], mb_detect_encoding($row[$mathisiakiporeia])).$poreiaend.'<br /><br /><br />';
				    $lpagecont .='<span style="font-weight:bold; font-size:1em;">Συνεργασία/ Συμμετοχή σε Ομαδικές Δραστηριότητες<br />(Εργαστήρια-Σχέδια Δράσης)</span><br /><br />'.$synergasiastart.mb_strtolower($row[$synergasia], mb_detect_encoding($row[$synergasia])).$synergasiaend.'<br /><br /><br /><br /><br /><br />';
				    $lpagecont .='<span style="font-weight:bold; font-size:1em;">Ενδιαφέρον-Ανάληψη Πρωτοβουλιών</span><br /><br />'.$endiaferonstart.mb_strtolower($row[$endiaf], mb_detect_encoding($row[$endiaf])).$endiaferonend.'<br /><br /><br /><br />';
				    $lpagecont .='<span style="font-weight:bold; font-size:1em;">Δέσμευση-Αποτελεσματικότητα</span><br /><br /><br />'.$desmefsistart.mb_strtolower($row[$desmefsi], mb_detect_encoding($row[$desmefsi])).$desmefsiend.'<br /><br /><br />';
				    $lpagecont .='<table width="100%" cellspacing="0" style="border: none;"><tr>';
				    $lpagecont .='<td width=50% style="border: none;font-weight:bold;vertical-align: top; text-align:center;" >Ο ΔΙΕΥΘΥΝΤΗΣ<br /><br /><br /><br /><br />'.$directorname.'</td><td width=50% style="border: none;font-weight:bold;vertical-align: top; text-align:center;">Ο ΥΠΟΔΙΕΥΘΥΝΤΗΣ<br /><br /><br /><br /><br />'.$subdirectorname.'</td></tr></table>';
				    $lpagecont .='</div>'.$pagesep.$pagesep;

				    //$content .=$schema_insert.$lpagecont.$pagesep;
				    $content .=$schema_insert;

				 }
				 $content = $content.$extracontend;

				 //$content .= '<br /><table width="100%" cellspacing="0" style="border: none;"><tr><td width="60%">&nbsp;</td><td style="text-align:center">Ο/Η Εκπαιδευτικός<br /><br /><br />'.$user["UserLname"].' '.$user["UserFname"].'</td></tr></table>';


				$content = '<html '.$word_xmlns.'>
				<head>'.$word_xml_settings.'<style type=“text/css”>
				'.$word_landscape_style.' table,td {font-size:0.9em;border:0px solid #FFFFFF;} body {font-family:Verdana;} td {height:70px;}</style>
				</head>
				<body>'.$word_landscape_div_start.$content.$word_landscape_div_end.'</body>
				</html>';

				@header('Content-Type: application/'.$file_type.'; charset=utf-8');
				@header('Content-Length: '.strlen($content));
				@header('Content-disposition: inline; filename="'.$filename.'.doc"');
				echo $content;


			}


			$response["success"] = 1;
	    }
	    else
	    {
			$response["error"] = 1;
			$response["error_msg"] = "Not able to fetch data!";
	    }

    }
    elseif ($tag == 'arithmetic')
    { //Export files for every student

	    $semest = "bsemester";
	    $semestfl = "b";
	    $semestname = "B'";


	    $endiaferon = $semestfl.'endiaferon';
	    $antapokrisi = $semestfl.'antapokrisi';
	    $mathisiakiporeia = $semestfl.'mathisiakiporeia';
	    $synergasia = $semestfl.'synergasia';
	    $endiaf = $semestfl.'endiaferon';
	    $desmefsi = $semestfl.'desmefsi';


	    if (isset($_GET['eduyear'])) {
			$eduyear = $_GET["eduyear"];
	    }
		//$user = $db->getUser($teacherid);
	    $filename = 'Αξιολόγηση '.$semestname.' Τετραμήνου';

	    $classfilter = '';
	    if ($classid!='')
	    {
		$classfilter = ' AND class.ClassID = '.$classid;
	    }
	    //Get records from database
	    $qry = "SELECT students.StudentID AS studentid, students.StudentFname AS fname,
	    students.StudentLname AS lname, l.asemester AS asem, l.bsemester AS bsem, class.ClassName AS classname,
	    class.ClassID AS classid, lessons.LessonName AS lessonname, lessons.Priority AS priority, l.*
	    FROM  `_students_lessons` AS l
	    INNER JOIN students ON students.StudentID = l.StudentID INNER JOIN  `_students_class` ON `_students_class`.StudentID = l.StudentID
INNER JOIN class ON class.ClassID = `_students_class`.ClassID
	    INNER JOIN lessons ON lessons.LessonID = l.LessonID WHERE l.eduyear =  '".$eduyear."'  AND `_students_class`.`eduperiod`='".$eduyear."' AND class.classID>3
	    AND l.StudentID IN (SELECT StudentID FROM students WHERE IsActive =1)".$classfilter."
	    ORDER BY lname, fname, priority, classname";


	    $result = $con->query($qry);

	    $jTableResult = array();

	    if ($result)
	    {
			//Optional: print out title to top of Excel or Word file with Timestamp
			//for when file was generated:
			//set $Use_Titel = 1 to generate title, 0 not to use title
			$Use_Title = 1;
			//define date for title: EDIT this to create the time-format you need
			$now_date = DATE ('m-d-Y H:i');
			//define title for .doc or .xls file: EDIT this if you want
			$title = 'Αξιολόγηση '.$semestname.' Τετραμήνου';


			//if this parameter is included ($w=1), file returned will be in word format ('.doc')
			//if parameter is not included, file returned will be in excel format ('.xls')
			if (isset($_GET['type']) && ($_GET['type']=='w'))
			{
				 $file_type = "msword";
				 $file_ending = "doc";
			}else {
				 $file_type = "vnd.ms-excel";
				 $file_ending = "xls";
				 //header info for browser: determines file type ('.doc' or '.xls')
				header("Content-Type: application/$file_type; charset=utf-8");
				header("Content-Disposition: inline; filename=".$filename.".$file_ending");
				header("Pragma: no-cache");
				header("Expires: 0");

			}

			/*    Start of Formatting for Word or Excel    */

			if (isset($_GET['type']) && ($_GET['type']=='w')) //check for $w again
			{


				    // Size – Denotes A4, Legal, A3, etc ——- size:8.5in 11.0in; for Legal size
				// Margin – Set the margin of the word document – margin:0.5in 0.31in 0.42in 0.25in; [margin: top right bottom left]

				$word_xmlns = "xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'";
				$word_xml_settings = "<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>";
				$word_landscape_style = "@page {size:8.5in 11.0in; margin:0.8in 0.8in 0.8in 0.8in;} div.Section1{page:Section1;}";
				$word_landscape_div_start = "<div class='Section1'>";
				$word_landscape_div_end = "</div>";

				//$content = "This is a test page";


				 /*    FORMATTING FOR WORD DOCUMENTS ('.doc')   */
				 //create title with timestamp:
				 if ($Use_Title == 1)
				 {
					 echo("$title\n\n");
				 }
				 //define separator (defines columns in excel & tabs in word)
				 $sep = "\n"; //new line character
				 //$pagesep = '<br style="page-break-before: always">'; //new line character
				 $pagesep = "<br clear=all style='mso-special-character:line-break;page-break-before:always'>";


				 $fpagecont = '<div style="font-weight:bold; text-align:left; margin-bottom:60px;">';
				 $fpagecont .= '<img src="'.$ethnosimosrc.'" border=0 height=60px/><br />'.$titletext.'</div><br /><br /><br /><br /><br /><br /><br /><br />';

				 $fpagecont .= '<div style="font-weight:bold; text-align:center">ΣΧΟΛΕΙΟ ΔΕΥΤΕΡΗΣ ΕΥΚΑΙΡΙΑΣ ΑΓΡΙΝΙΟΥ<br /></div>';
				 $fpagecontend = '<br /><br /><div style="font-weight:bold; text-align:right;  margin-top:60px;">ΣΧΟΛΙΚΟ ΕΤΟΣ '.$eduyearstr.'</div>'.$pagesep;

			 	$extracontst = '<div style="font-weight:bold; text-align:center">ΠΑΡΑΤΗΡΗΣΕΙΣ ΑΝΑ ΓΡΑΜΜΑΤΙΣΜΟ</div><table width="100%" cellspacing="0" style="border: 0px solid #000;">';
				//$extracontst .= '<tr><th width="25%"  style="border: 1px solid #000; padding:3px;">Γραμματισμός</th><th width="75%"  style="border: 1px solid #000; padding:3px;">Περιγραφική Αξιολόγηση</th></tr>';
				$extracontend = '</table>';

				$contentstart = 'Αξιολόγηση για το '.$semestname.' Τετράμηνο<br /><br />';
				$classname = '';
				$lessonname = '';
				$newclass = '';
				$newlesson = '';
				$studentid = '';
				$newstudent = '';
				$studentname = '';
        $lpagecont='';
				$total = 0;
				$count = 0;
			        while($row = $result->fetch_assoc())
				 {
				    $newstudent = '';
				    if ($studentid != $row["studentid"])
				    {
					 if ($studentid!='') {
						 $newstudent .=$extracontend;
						 $total = 0;
						 $count = 0;
					 }
					 $studentid = $row["studentid"];
					 $studentname = $row["lname"].' '.$row["fname"];
					 $fpagestudcont = $fpagecont.'<div style="font-weight:bold; text-align:center;  margin-bottom:250px;">ΦΥΛΛΟ ΑΞΙΟΛΟΓΗΣΗΣ <br /><br />Εκπαιδευόμενος: '.$studentname.'<br /><br /><br />'.$semestname.' ΤΕΤΡΑΜΗΝΟ</div>'.$fpagecontend;
					 //$newstudent .= '<br /><br />Εκπαιδευόμενος: <strong>'.$studentname.'</strong>';
					 $newstudent .=$lpagecont.$fpagestudcont.$extracontst;
					 $classname = '';
				    }

				    $total += intval($row["finalgrade"]);
				    $count+=1;
				    $schema_insert = $newstudent.'<tr style="border: 1px solid #000;">';
				    $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row["lessonname"].'</td>';
				    $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row["finalgrade"].'</td>';
				    $schema_insert .= '</tr>';




				    //$content .=$schema_insert.$lpagecont.$pagesep;
				    $content .=$schema_insert;
				    if ($count == 10)
				    {
					$ints = intval($total/8);
					$decs = $total%8;
					$average = '<tr style="border: 1px solid #000;">';
					$average .= '<td style="border: 1px solid #000; padding:3px;">Μέσος όρος</td>';
					$average .= '<td style="border: 1px solid #000; padding:3px;">('.$total.') - '.strval($ints).' και '.strval($decs).' όγδοα</td>';
					$average .= '</tr>';
					$content = $content.$average;
				    }
				 }
				 $ints = $total/8;
				 $decs = $total%8;
				 $average = '<tr style="border: 1px solid #000;">';
				 $average .= '<td style="border: 1px solid #000; padding:3px;">Μέσος όρος</td>';
				 $average .= '<td style="border: 1px solid #000; padding:3px;">'.strval($ints).' / '.strval($decs).' όγδοα</td>';
				 $average .= '</tr>';
				 $content = $content.$extracontend;

				 //$content .= '<br /><table width="100%" cellspacing="0" style="border: none;"><tr><td width="60%">&nbsp;</td><td style="text-align:center">Ο/Η Εκπαιδευτικός<br /><br /><br />'.$user["UserLname"].' '.$user["UserFname"].'</td></tr></table>';


				$content = '<html '.$word_xmlns.'>
				<head>'.$word_xml_settings.'<style type=“text/css”>
				'.$word_landscape_style.' table,td {font-size:0.9em;border:0px solid #FFFFFF;} body {font-family:Verdana;} td {height:70px;}</style>
				</head>
				<body>'.$word_landscape_div_start.$content.$word_landscape_div_end.'</body>
				</html>';

				@header('Content-Type: application/'.$file_type.'; charset=utf-8');
				@header('Content-Length: '.strlen($content));
				@header('Content-disposition: inline; filename="'.$filename.'.doc"');
				echo $content;


			}


			$response["success"] = 1;
	    }
	    else
	    {
			$response["error"] = 1;
			$response["error_msg"] = "Not able to fetch data!";
	    }

    } elseif ($tag == 'endiaferonantapokrisi')
	{ //Export files for every student

	    $semest = "bsemester";
	    $semestfl = "b";
	    $semestname = "B'";


	    $endiaferon = $semestfl.'endiaferon';
	    $antapokrisi = $semestfl.'antapokrisi';
	    $mathisiakiporeia = $semestfl.'mathisiakiporeia';
	    $synergasia = $semestfl.'synergasia';
	    $endiaf = $semestfl.'endiaferon';
	    $desmefsi = $semestfl.'desmefsi';


	    if (isset($_GET['eduyear'])) {
			$eduyear = $_GET["eduyear"];
	    }


		//$user = $db->getUser($teacherid);
	    $filename = 'Αξιολόγηση '.$semestname.' Τετραμήνου';

	    $classfilter = '';
	    if ($classid!='')
	    {
		$classfilter = ' AND class.ClassID = '.$classid;
	    }
	    //Get records from database
	    $qry = "SELECT students.StudentID AS studentid, students.StudentFname AS fname,
	    students.StudentLname AS lname, l.asemester AS asem, l.bsemester AS bsem, class.ClassName AS classname,
	    class.ClassID AS classid, lessons.LessonName AS lessonname, lessons.Priority AS priority, l.*
	    FROM  `_students_lessons` AS l
	    INNER JOIN students ON students.StudentID = l.StudentID INNER JOIN  `_students_class` ON `_students_class`.StudentID = l.StudentID
INNER JOIN class ON class.ClassID = `_students_class`.ClassID
	    INNER JOIN lessons ON lessons.LessonID = l.LessonID WHERE l.eduyear =  '".$eduyear."' AND `_students_class`.eduperiod =  '".$eduyear."'
	    AND l.StudentID IN (SELECT StudentID FROM students WHERE IsActive =1)".$classfilter."
	    ORDER BY lname, fname, priority, classname";


	    $result = $con->query($qry);

	    $jTableResult = array();

	    if ($result)
	    {
			//Optional: print out title to top of Excel or Word file with Timestamp
			//for when file was generated:
			//set $Use_Titel = 1 to generate title, 0 not to use title
			$Use_Title = 1;
			//define date for title: EDIT this to create the time-format you need
			$now_date = DATE ('m-d-Y H:i');
			//define title for .doc or .xls file: EDIT this if you want
			$title = 'Αξιολόγηση '.$semestname.' Τετραμήνου';


			//if this parameter is included ($w=1), file returned will be in word format ('.doc')
			//if parameter is not included, file returned will be in excel format ('.xls')
			if (isset($_GET['type']) && ($_GET['type']=='w'))
			{
				 $file_type = "msword";
				 $file_ending = "doc";
			}else {
				 $file_type = "vnd.ms-excel";
				 $file_ending = "xls";
				 //header info for browser: determines file type ('.doc' or '.xls')
				header("Content-Type: application/$file_type; charset=utf-8");
				header("Content-Disposition: inline; filename=".$filename.".$file_ending");
				header("Pragma: no-cache");
				header("Expires: 0");

			}

			/*    Start of Formatting for Word or Excel    */

			if (isset($_GET['type']) && ($_GET['type']=='w')) //check for $w again
			{


				    // Size – Denotes A4, Legal, A3, etc ——- size:8.5in 11.0in; for Legal size
				// Margin – Set the margin of the word document – margin:0.5in 0.31in 0.42in 0.25in; [margin: top right bottom left]

				$word_xmlns = "xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'";
				$word_xml_settings = "<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>";
				$word_landscape_style = "@page {size:8.5in 11.0in; margin:0.8in 0.8in 0.8in 0.8in;} div.Section1{page:Section1;}";
				$word_landscape_div_start = "<div class='Section1'>";
				$word_landscape_div_end = "</div>";

				//$content = "This is a test page";


				 /*    FORMATTING FOR WORD DOCUMENTS ('.doc')   */
				 //create title with timestamp:
				 if ($Use_Title == 1)
				 {
					 echo("$title\n\n");
				 }
				 //define separator (defines columns in excel & tabs in word)
				 $sep = "\n"; //new line character
				 //$pagesep = '<br style="page-break-before: always">'; //new line character
				 $pagesep = "<br clear=all style='mso-special-character:line-break;page-break-before:always'>";


				 $fpagecont = '<div style="font-weight:bold; text-align:left; margin-bottom:60px;">';
				 $fpagecont .= '<img src="'.$ethnosimosrc.'" border=0 height=60px/><br />'.$titletext.'</div><br /><br /><br /><br /><br /><br /><br /><br />';

				 $fpagecont .= '<div style="font-weight:bold; text-align:center">ΣΧΟΛΕΙΟ ΔΕΥΤΕΡΗΣ ΕΥΚΑΙΡΙΑΣ ΑΓΡΙΝΙΟΥ<br /></div>';
				 $fpagecontend = '<br /><br /><div style="font-weight:bold; text-align:right;  margin-top:60px;">ΣΧΟΛΙΚΟ ΕΤΟΣ '.$eduyearstr.'</div>'.$pagesep;

			 	$extracontst = '<div style="font-weight:bold; text-align:center">ΠΑΡΑΤΗΡΗΣΕΙΣ ΑΝΑ ΓΡΑΜΜΑΤΙΣΜΟ</div><table width="100%" cellspacing="0" style="border: 0px solid #000;">';
				//$extracontst .= '<tr><th width="25%"  style="border: 1px solid #000; padding:3px;">Γραμματισμός</th><th width="75%"  style="border: 1px solid #000; padding:3px;">Περιγραφική Αξιολόγηση</th></tr>';
				$extracontend = '</table>';

				$contentstart = 'Αξιολόγηση για το '.$semestname.' Τετράμηνο<br /><br />';
				$classname = '';
				$lessonname = '';
				$newclass = '';
				$newlesson = '';
				$studentid = '';
				$newstudent = '';
				$studentname = '';
				$total = 0;
				$count = 0;
			        while($row = $result->fetch_assoc())
				 {
				    $newstudent = '';
				    if ($studentid != $row["studentid"])
				    {
					 if ($studentid!='') {
						 $newstudent .=$extracontend;
						 $total = 0;
						 $count = 0;
					 }
					 $studentid = $row["studentid"];
					 $studentname = $row["lname"].' '.$row["fname"];
					 $fpagestudcont = $fpagecont.'<div style="font-weight:bold; text-align:center;  margin-bottom:250px;">ΦΥΛΛΟ ΑΞΙΟΛΟΓΗΣΗΣ <br /><br />Εκπαιδευόμενος: '.$studentname.'<br /><br /><br />'.$semestname.' ΤΕΤΡΑΜΗΝΟ</div>'.$fpagecontend;
					 //$newstudent .= '<br /><br />Εκπαιδευόμενος: <strong>'.$studentname.'</strong>';
					 $newstudent .=$lpagecont.$fpagestudcont.$extracontst;
					 $classname = '';
				    }

				    $total += intval($row["finalgrade"]);
				    $count+=1;
				    $schema_insert = $newstudent.'<tr style="border: 1px solid #000;">';
				    $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row["lessonname"].'</td>';
				    $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row[$endiaferon].'</td>';
				    $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row[$antapokrisi].'</td>';
				    $schema_insert .= '</tr>';




				    //$content .=$schema_insert.$lpagecont.$pagesep;
				    $content .=$schema_insert;

				 }
				 $content = $content.$extracontend;

				 //$content .= '<br /><table width="100%" cellspacing="0" style="border: none;"><tr><td width="60%">&nbsp;</td><td style="text-align:center">Ο/Η Εκπαιδευτικός<br /><br /><br />'.$user["UserLname"].' '.$user["UserFname"].'</td></tr></table>';


				$content = '<html '.$word_xmlns.'>
				<head>'.$word_xml_settings.'<style type=“text/css”>
				'.$word_landscape_style.' table,td {font-size:0.9em;border:0px solid #FFFFFF;} body {font-family:Verdana;} td {height:70px;}</style>
				</head>
				<body>'.$word_landscape_div_start.$content.$word_landscape_div_end.'</body>
				</html>';

				@header('Content-Type: application/'.$file_type.'; charset=utf-8');
				@header('Content-Length: '.strlen($content));
				@header('Content-disposition: inline; filename="'.$filename.'.doc"');
				echo $content;


			}


			$response["success"] = 1;
	    }

	    else
	    {
			$response["error"] = 1;
			$response["error_msg"] = "Not able to fetch data!";
	    }
	}

    if ($tag == 'perproject')
    {

	        if (isset($_GET['projectid'])) {
			$projectid = $_GET['projectid'];
		}
		$project = $db->getProject($projectid);

		$filename = $project['projectName']."_".date("Y-m-d");
		//Get records from database
		$qry = "SELECT students.StudentFname AS fname, students.StudentLname AS lname
		FROM `_projects_students` AS l INNER JOIN students ON students.StudentID=l.StudentID
		AND l.ProjectID = ".$projectid."
		ORDER BY lname, fname;";

		$result = $con->query($qry);

		$jTableResult = array();

		if ($result) {
			//Optional: print out title to top of Excel or Word file with Timestamp
			//for when file was generated:
			//set $Use_Titel = 1 to generate title, 0 not to use title
			$Use_Title = 1;
			//define date for title: EDIT this to create the time-format you need
			$now_date = DATE ('d-m-Y');
			//define title for .doc or .xls file: EDIT this if you want
			$title = "Project/Εργαστήριο:<strong> ".$project['projectName']."</strong><br /> Ημερομηνία: ".$now_date;


			//if this parameter is included ($w=1), file returned will be in word format ('.doc')
			//if parameter is not included, file returned will be in excel format ('.xls')
			if (isset($_GET['type']) && ($_GET['type']=='w'))
			{
				 $file_type = "msword";
				 $file_ending = "doc";
			}else {
				 $file_type = "vnd.ms-excel";
				 $file_ending = "xls";
				 //header info for browser: determines file type ('.doc' or '.xls')
				header("Content-Type: application/$file_type; charset=utf-8");
				header("Content-Disposition: inline; filename=".$filename.".$file_ending");
				header("Pragma: no-cache");
				header("Expires: 0");

			}

			/*    Start of Formatting for Word or Excel    */

			if (isset($_GET['type']) && ($_GET['type']=='w')) //check for $w again
			{
				// Size – Denotes A4, Legal, A3, etc ——- size:8.5in 11.0in; for Legal size
				// Margin – Set the margin of the word document – margin:0.5in 0.31in 0.42in 0.25in; [margin: top right bottom left]

				$word_xmlns = "xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'";
				$word_xml_settings = '<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>';
				$word_landscape_style = "@page {size:8.5in 11.0in; margin:0.8in 0.8in 0.8in 0.8in;} div.Section1{page:Section1;}";
				$word_landscape_div_start = "<div class='Section1'>";
				$word_landscape_div_end = "</div>";

				//$content = "This is a test page";


				 /*    FORMATTING FOR WORD DOCUMENTS ('.doc')   */
				 //create title with timestamp:
				 if ($Use_Title == 1)
				 {
					 echo("$title\n\n");
				 }
				 //define separator (defines columns in excel & tabs in word)
				 $sep = "\n"; //new line character
			 	$extracontst = '<table width="100%" cellspacing="0" style="border: 1px solid #000;">';
				$extracontst .= '<tr><th width="40%"  style="border: 1px solid #000; padding:3px;">Ονοματεπώνυμο</th><th width="10%"  style="border: 1px solid #000; padding:3px;">Παρουσία</th><th width="50%"  style="border: 1px solid #000; padding:3px;">Παρατηρήσεις</th></tr>';
				$extracontend = '</table>';

				$contentstart = $title."<br /><br />";
				$classname = '';
				$lessonname = '';
				$newclass = '';
				$newlesson = '';

				 while($row = $result->fetch_assoc())
				 {
					 $schema_insert = '<tr style="border: 1px solid #000;">';
					 $schema_insert .= '<td style="border: 1px solid #000; padding:3px;">'.$row["lname"].' '.$row["fname"].'</td><td style="border: 1px solid #000; padding:3px;">&nbsp;</td><td style="border: 1px solid #000; padding:3px;">&nbsp;</td></tr>';
					$content .=$schema_insert;
				 }
				 $content = $contentstart.$extracontst.$content.$extracontend;

				 $content = '<html '.$word_xmlns.'>
				<head>'.$word_xml_settings.'<style type=“text/css”>
				'.$word_landscape_style.' table,td {font-family:Verdana; border:0px solid #FFFFFF;} </style>
				</head>
				<body>'.$word_landscape_div_start.$content.$word_landscape_div_end.'</body>
				</html>';

				@header('Content-Type: application/'.$file_type.'; charset=utf-8');
				@header('Content-Length: '.strlen($content));
				@header('Content-disposition: inline; filename="'.$filename.'.doc"');
				echo $content;
			}
			else /*    FORMATTING FOR EXCEL DOCUMENTS ('.xls')   */
			{

			} /*    END OF FORMATTING FOR EXCEL DOCUMENTS ('.xls')   */
			$response["success"] = 1;
		}
		else
		{
			$response["error"] = 1;
			$response["error_msg"] = "Not able to fetch data!";
		}

    }

    else
    {
	    $response["error"] = 1;
	    $response["error_msg"] = "Access Denied";
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
