DROP PROCEDURE IF EXISTS login; 

DELIMITER $$

create PROCEDURE saveApiPageRelation (
pageId int,
pageTypeid int,
strIDs varchar(1000)
) 
BEGIN
    DECLARE strLen    INT DEFAULT 0;
    DECLARE SubStrLen INT DEFAULT 0;
    delete from `pages_apis_relation` where  pages_id = pageId and  pages_type_id = pageTypeid;
    
    do_this:
      LOOP
            SET strLen = CHAR_LENGTH(strIDs);
            	insert into `pages_apis_relation`(pages_id, pages_type_id, apis_id) values(pageId, pageTypeid, SUBSTRING_INDEX(strIDs, ',', 1));
            SET SubStrLen = CHAR_LENGTH(SUBSTRING_INDEX(strIDs, ',', 1)) + 2;
            SET strIDs = MID(strIDs, SubStrLen, strLen);
        IF strIDs = '' THEN
    		LEAVE do_this;
        END IF;
      END LOOP do_this;

end $$