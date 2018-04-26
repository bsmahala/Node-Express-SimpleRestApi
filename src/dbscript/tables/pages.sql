create table pages(
   id int not null primary key AUTO_INCREMENT,
   name varchar(500) unique key,
   description varchar(1000),
   created datetime,
   createdby int,
   updated datetime,
   updatedby int 
)