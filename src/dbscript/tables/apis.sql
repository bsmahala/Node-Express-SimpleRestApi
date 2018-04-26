create table apis(
   id int not null primary key AUTO_INCREMENT,
   uri varchar(500) unique key,
   description varchar(1000),
   created datetime,
   createdby int,
   updated datetime,
   updatedby int 
)