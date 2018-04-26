DROP FUNCTION IF EXISTS occurence;
DELIMITER $$

CREATE FUNCTION occurence (mainstring varchar(100), occurenceKeyWord varchar(100))
RETURNS INT

BEGIN

   DECLARE income INT;

   set income = (LENGTH(mainstring) - LENGTH(REPLACE(mainstring, occurenceKeyWord, '')))/LENGTH(occurenceKeyWord);

   RETURN income;
   
END $$
DELIMITER ;