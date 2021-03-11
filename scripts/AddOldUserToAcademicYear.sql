-- Εισαγωγή εκπαιδευόμενου σε ακαδημαϊκό έτος

INSERT INTO `_students_class` (StudentID, ClassID, eduperiod) VALUES (1510, 2, '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 1, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 2, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 3, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 4, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 5, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 6, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 7, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 8, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 9, '0', '2021');
INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear) VALUES (1510, 10, '0', '2021');

insert into `_students_general` (`StudentID`, `eduyear`) VALUES (1510, '2021');

-- Διαγραφή εκπαιδευόμενου από ακαδημαϊκό έτος

DELETE FROM `_students_class` where StudentID IN (1489, 1490, 1495,1496, 1499) and eduperiod='2021';
DELETE FROM `_students_lessons` where StudentID IN (1489, 1490, 1495,1496, 1499) and eduyear='2021';
DELETE FROM `_students_general` where StudentID IN (1489, 1490, 1495,1496, 1499) and eduyear='2021';
