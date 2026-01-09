-- Εισαγωγή εκπαιδευόμενου σε ακαδημαϊκό έτος

START TRANSACTION;

SET @student_id := 1510;
SET @year := '2021';
SET @class_id := 2;

INSERT INTO `_students_class` (StudentID, ClassID, eduperiod)
VALUES (@student_id, @class_id, @year);

INSERT INTO `_students_lessons` (StudentID, LessonID, isLocked, eduyear)
VALUES
(@student_id, 1, 0, @year),
(@student_id, 2, 0, @year),
(@student_id, 3, 0, @year),
(@student_id, 4, 0, @year),
(@student_id, 5, 0, @year),
(@student_id, 6, 0, @year),
(@student_id, 7, 0, @year),
(@student_id, 8, 0, @year),
(@student_id, 9, 0, @year),
(@student_id, 10, 0, @year);

INSERT INTO `_students_general` (StudentID, eduyear)
VALUES (@student_id, @year);

COMMIT;


-- Διαγραφή εκπαιδευόμενου από ακαδημαϊκό έτος

DELETE FROM `_students_class` where StudentID IN (1489, 1490, 1495,1496, 1499) and eduperiod='2021';
DELETE FROM `_students_lessons` where StudentID IN (1489, 1490, 1495,1496, 1499) and eduyear='2021';
DELETE FROM `_students_general` where StudentID IN (1489, 1490, 1495,1496, 1499) and eduyear='2021';
