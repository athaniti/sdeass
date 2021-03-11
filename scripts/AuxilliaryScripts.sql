Για κάποιον λόγο με τη δημιουργία νέου ακαδημαϊκού έτους περάστηκαν ξανά και με νέα StudentIDs οι εκπαιδευόμενοι του (νέου) Β' κύκλου. Με τα ακόλουθα 2 scripts ενημερώνονται οι εγγραφές με τα κανονικά IDs στους πίνακες `_students_class` και `_students_lessons`.
Update `_students_class` set
StudentID= (select min(StudentID) FROM students where StudentCode= (select StudentCode FROM students where StudentID=`_students_class`.StudentID))
where eduperiod='1617' and ClassID>3;

Update `_students_lessons` set
StudentID= (select min(StudentID) FROM students where StudentCode= (select StudentCode FROM students where StudentID=`_students_lessons`.StudentID))
where eduyear='1617';


Με το script αυτό γίνεται εισαγωγή των απαραίτητων εγγραφών για τη γενική αξιολόγηση για το τρέχων ακαδημαϊκό έτος.

insert into `_students_general` (`StudentID`, `eduyear`)
select `_students_class`.StudentID, '1617' 
FROM `_students_class` where eduperiod='1617'