create table users(
   id int not null primary key AUTO_INCREMENT,
   email varchar(400) unique key,
   password varchar(500),
   firstname varchar(100),
   lastname varchar(100),
   photo varchar(1000),
   roleid int,
   index users_role_id (roleid),
   verification_key varchar(1000),
   active TINYINT(1) DEFAULT 1,
   created datetime,
   createdby int,
   updated datetime,
   updatedby int 
)