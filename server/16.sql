select * from 
(select name,value from v$parameter where name like '%audit%' 
union
select name,value from v$spparameter where name like '%audit%') a 
where value is not null