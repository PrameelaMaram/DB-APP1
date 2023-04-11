SELECT username, expiry_date, profile
FROM sys.dba_users
where username IN (SELECT grantee FROM sys.dba_role_privs WHERE granted_role ='DBA')
ORDER BY username