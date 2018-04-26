create table loginhistory(
   id int not null primary key AUTO_INCREMENT,
   token varchar(400) unique key,
   expiretime datetime,
   userid int,
   active TINYINT(1) DEFAULT 1,
   created datetime,
   createdby int,
   updated datetime,
   updatedby int 
)

