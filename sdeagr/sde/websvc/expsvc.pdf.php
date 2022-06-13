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
  
  // include db handler
    //require_once 'include/config.php';
    require_once 'include/DB_Functions.php';
    require_once 'lib/fpdf/fpdf.php';
    require_once 'lib/fpdf/tfpdf.php';
    class PDF extends tFPDF
    {
	//Page header
	public function Header() {
	    // Logo
	    $image_file = 'images/ethnosimo.jpg';
	    $this->Image($image_file, 10, 10, 15, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
	    // Set font
	    $this->AddFont('DejaVu','','DejaVuSansCondensed.ttf',true);
	    $this->SetFont('DejaVu','',14);
	    // Title
	    $this->Cell(0, 15, 'ΣΔΕ Αγρινίου', 0, false, 'C', 0, '', 0, false, 'M', 'M');
	    $this->Ln();
	    $this->Ln();
	}
    
	
	function WordWrap(&$text, $maxwidth)
	{
	    $text = trim($text);
	    if ($text==='')
		return 0;
	    $space = $this->GetStringWidth(' ');
	    $lines = explode("\n", $text);
	    $text = '';
	    $count = 0;
	
	    foreach ($lines as $line)
	    {
		$words = preg_split('/ +/', $line);
		$width = 0;
	
		foreach ($words as $word)
		{
		    $wordwidth = $this->GetStringWidth($word);
		    if ($width + $wordwidth <= $maxwidth)
		    {
			$width += $wordwidth + $space;
			$text .= $word.' ';
		    }
		    else
		    {
			$width = $wordwidth + $space;
			$text = rtrim($text)."\n".$word.' ';
			$count++;
		    }
		}
		$text = rtrim($text)."\n";
		$count++;
	    }
	    $text = rtrim($text);
	    return $count;
	}
    }

    $db = new DB_Functions();

    // response Array
    $response = array("tag" => $tag, "success" => 0, "error" => 0);
  
  
$tag = (!empty($_POST['tag'])) ? $_POST['tag'] : ''; //action to be used(insert, delete, update, fetch)
    
    
if ($tag != '')
{ //Export student data
    $studentid = (!empty($_POST['studentid'])) ? $_POST['studentid'] : 0; //an array of the student details
     if ($studentid!='')
     {
	
	//Get records from database
	$qry = "SELECT s.* FROM  `students` AS s WHERE s.StudentID = ".$studentid;
	    
			    
	$result = mysql_query($qry) or die(mysql_error());
    
	$jTableResult = array();
	    
	if ($result)
	{
		$studentname = '';
		$pdf = new PDF();
		// Column headings
		$header = array('Γραμματισμός', 'Αξιολόγηση');
		// Column widths
		$w = array(50, 130);
		$h = 30;
		// Add a Unicode font (uses UTF-8)
		$pdf->AddFont('DejaVu','','DejaVuSansCondensed.ttf',true);
		$pdf->SetFont('DejaVu','',11);
		$pdf->AddPage();
		$pdf->SetFillColor(224, 235, 255);
		$pdf->SetTextColor(0);
		$pdf->SetDrawColor(128, 0, 0);
		$pdf->SetLineWidth(0.1);
    
		     
		while($row = mysql_fetch_assoc($result))
		{
		    $studentname = $row["StudentLname"].' '.$row["StudentFname"];
		    $filename = $studentname;
		    
		    $pdf->Cell($w[0],10,"Ονοματεπώνυμο: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$studentname, 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Αρ. Μητρώου: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["StudentCode"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Έτος Γέννησης: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["Age"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Φύλο: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,(($row["Sex"]==1) ? 'Άρρεν' : 'Θύλη'), 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Πατρώνυμο: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["FatherName"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Διεύθυνση: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["Address"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Οικ. Κατάσταση: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["MaritalStatus"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Αρ. Τέκνων: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["ChildrenNumber"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Τηλέφωνο: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["Phone"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Εργασιακή Κατάσταση: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["JobStatus"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Μήνες Ανεργίας: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,$row["MonthsUnemployment"], 1, 0, 'L');
		    $pdf->Ln();
		    $pdf->Cell($w[0],10,"Ρομά: ", 1, 0, 'L', true);
		    $pdf->Cell($w[1],10,(($row["IsRoma"]==1) ? 'Ναι' : 'Οχι'), 1, 0, 'L');
		    $pdf->Ln();
		    
		    
		    
		    
		    
		 }
			    
		$pdf->Output("../../sdeass/data/".$studentid.".pdf", 'F');
			    
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
		$response["error_msg"] = "No Student Id given!";
    }
}
else if (isset($_GET['tag']) && $_GET['tag'] != '')
{
    // get tag
    $tag = $_GET['tag'];

    
    //$response = array("success" => 0, "error" => 0);
	$teacherid = 0;
	$eduyear = '1213';
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
		$qry = "SELECT students.StudentFname AS fname, students.StudentLname AS lname, l.asemester as asem, l.bsemester as bsem, class.ClassName as classname, class.ClassID as classid, lessons.LessonName As lessonname, l.*
		FROM `_students_lessons` AS l INNER JOIN students ON students.StudentID=l.StudentID	INNER JOIN class ON class.ClassID = students.ClassID	INNER JOIN lessons ON lessons.LessonID=l.LessonID WHERE l.eduyear='".$eduyear."' AND l.StudentID IN (SELECT StudentID from students WHERE IsActive=1 AND ClassID IN (SELECT ClassID FROM `_class_teachers` WHERE TeacherID = ".$teacherid.")) AND l.LessonID IN (SELECT LessonID from `_lessons_teachers` WHERE TeacherID = ".$teacherid.") ORDER BY lessonname, classname, lname, fname;";
				
		$result = mysql_query($qry) or die(mysql_error());
	
		$jTableResult = array();
		
		if ($result) {
			//Optional: print out title to top of Excel or Word file with Timestamp
			//for when file was generated:
			//set $Use_Titel = 1 to generate title, 0 not to use title
			$Use_Title = 1;
			//define date for title: EDIT this to create the time-format you need
			$now_date = DATE ('m-d-Y H:i');
			//define title for .doc or .xls file: EDIT this if you want
			$title = "Grades for teacher ".$user['UserFname']." ".$user['userFname']." on ".$now_date;
			
			
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
			 	$extracontst = '<table width="100%" cellspacing="0" style="border: 1px solid #000;">';
				$extracontst .= '<tr><th width="25%"  style="border: 1px solid #000; padding:3px;">Ονοματεπώνυμο</th><th width="50%"  style="border: 1px solid #000; padding:3px;">Περιγραφική Αξιολόγηση</th><th width="10%"  style="border: 1px solid #000; padding:3px;">Ενδιαφέρον</th><th width="10%"  style="border: 1px solid #000; padding:3px;">Ανταπόκριση</th><th width="5%"  style="border: 1px solid #000; padding:3px;">Βαθμός</th></tr>';
				$extracontend = '</table>';
				
				$contentstart = "Αξιολόγηση του εκπαιδευτικού: <strong>".$user['UserLname']." ".$user['UserFname']."</strong> για το ".$semestname." Τετράμηνο<br /><br />";
				$classname = '';
				$lessonname = '';
				$newclass = ''; 
				$newlesson = '';
					 
				 while($row = mysql_fetch_assoc($result))
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
				 
				 $content .= '<br /><table width="100%" cellspacing="0" style="border: none;"><tr><td width="60%">&nbsp;</td><td style="text-align:center">Ο/Η Εκπαιδευτικός<br /><br /><br />'.$user["UserLname"].' '.$user["UserFname"].'</td></tr></table>';
				 
				 
				 $content = '<html '.$word_xmlns.'>
				<head>'.$word_xml_settings.'<style type=“text/css”>
				'.$word_landscape_style.' table,td {border:0px solid #FFFFFF;} </style>
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
				 for($i = 0; $i < mysql_num_fields($result); $i++)
				 {
					echo mysql_field_name($result,$i) . "\t";
				 }
				 print("\n");
				 //end of printing column names
			 
				 //start while loop to get data
				 while($row = mysql_fetch_row($result))
				 {
					 //set_time_limit(60); // HaRa
					 $schema_insert = "";
					 for($j=0; $j<mysql_num_fields($result);$j++)
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
		
	    if (isset($_GET['eduyear'])) {
			$eduyear = $_GET["eduyear"];
	    }
		//$user = $db->getUser($teacherid);
	    $filename = 'Αξιολόγηση '.$semestname.' Τετραμήνου';
		//Get records from database
	    $qry = "SELECT students.StudentID AS studentid, students.StudentFname AS fname, students.StudentLname AS lname, l.asemester AS asem, l.bsemester AS bsem, class.ClassName AS classname, class.ClassID AS classid, lessons.LessonName AS lessonname, lessons.Priority AS priority, l . * FROM  `_students_lessons` AS l INNER JOIN students ON students.StudentID = l.StudentID INNER JOIN class ON class.ClassID = students.ClassID INNER JOIN lessons ON lessons.LessonID = l.LessonID WHERE l.eduyear =  '".$eduyear."' AND l.StudentID IN (SELECT StudentID FROM students WHERE IsActive =1) ORDER BY lname, fname, priority, classname";
		
				
	    $result = mysql_query($qry) or die(mysql_error());
	
	    $jTableResult = array();
		
	    if ($result)
	    {
			
			if (isset($_GET['type']) && ($_GET['type']=='w')) //check for $w again
			{
				    
				    
				
				
				    $contentstart = "Αξιολόγηση για το ".$semestname." Τετράμηνο<br /><br />";
				    $classname = '';
				    $lessonname = '';
				    $newclass = ''; 
				    $newlesson = '';
				    $studentid = '';
				    $newstudent = '';
				    $studentname = '';
				
				    $pdf = new PDF();
				    // Column headings
				    $header = array('Γραμματισμός', 'Αξιολόγηση');
				    // Column widths
				    $w = array(50, 130);
				    $h = 30;
				    // Add a Unicode font (uses UTF-8)
				    $pdf->AddFont('DejaVu','','DejaVuSansCondensed.ttf',true);
				    $pdf->SetFont('DejaVu','',11);
				    $pdf->AddPage();
			
					 
				    while($row = mysql_fetch_assoc($result))
				     {
						$newstudent = ''; 
						if ($studentid != $row["studentid"])
						{
						     
						     $studentid = $row["studentid"];
						     $studentname = $row["lname"].' '.$row["fname"];
						     $newstudent .= 'Εκπαιδευόμενος: '.$studentname;
						     $pdf->AddPage();
						     $pdf->Cell(40,10,$newstudent);
						     $pdf->Ln();
						     
						}
						$lessonname = $row["lessonname"];
						$wr1 = $pdf->WordWrap($lessonname,$w[0]);
						$aksiologisi = $row[$semest];
						$wr2 = $pdf->WordWrap($aksiologisi,$w[1]);
						
						$pdf->Cell($w[0],$h,$lessonname,1,0,'TR');
						$pdf->Cell($w[1],$h,$aksiologisi,1,0,'TR');
						$pdf->Ln();
				     }
						
				    $pdf->Output();
				
			}
			
		
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
