DROP PROCEDURE IF EXISTS login; 

DELIMITER $$

create PROCEDURE login (
email varchar(255),
password varchar(255)
) 
BEGIN
    declare userid int;
    declare rolename varchar(200);
    declare token varchar(255);

    select u.`id`, r.`name` into userid, rolename from `users` as u
    join `roles` as r on r.`id` = u.`roleid`
    where u.`email` = email and u.`active` = 1 and u.`password` = md5(password)   limit 1;

    if userid is not null THEN
        set token = md5(now() + userid + now() + 'suffix');
        insert into loginhistory(`expiretime`, `token`, `userid`, `created`, `createdby`, `active`)
        values(
            DATE_ADD(now(), INTERVAL 30 MINUTE),
            token,
            userid,
            now(),
            userid,
            1
            );

            select userid as `userid`, token as `token`, rolename as `role`;
            select 1;
    else 
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Invalid credentials';
    end if;
end $$