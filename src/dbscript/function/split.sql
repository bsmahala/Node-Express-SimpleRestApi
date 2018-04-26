DROP FUNCTION IF EXISTS split;

DELIMITER $$
CREATE FUNCTION split (word varchar(8000), delim varchar(100), pos int)
RETURNS varchar(8000)

begin
	 declare A varchar(8000);
 	 set  A = SUBSTRING_INDEX(SUBSTRING_INDEX(word, delim, pos), delim , -1);
 	 return A;
END $$
DELIMITER ;