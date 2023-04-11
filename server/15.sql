
SELECT substr(a.grantee,1,20) Grantee, substr(a.privilege,1,60) Privilege, substr(a.admin_option,1,20) "Admin Option"
FROM sys.dba_sys_privs a, sys.dba_users b
WHERE a.grantee = b.username and grantee not in ('SYS', 'SYSTEM', 'OUTLN','DBSNMP')
ORDER BY grantee, privilege