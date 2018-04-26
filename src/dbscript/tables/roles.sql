create table roles(
   id int not null primary key AUTO_INCREMENT,
   name varchar(500) unique key,
   description varchar(1000),
   active TINYINT(1) DEFAULT 1,
   created datetime,
   createdby int,
   updated datetime,
   updatedby int 
)