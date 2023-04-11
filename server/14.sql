SELECT substr(grantee,1,20) Grantee, substr(privilege,1,60) Privilege, substr(admin_option,1,20) "Admin Option"
FROM sys.dba_sys_privs
WHERE grantee in (SELECT role FROM sys.dba_roles
WHERE role not in ('DBA', 'EXP_FULL_DATABASE', 'IMP_FULL_DATABASE'))
ORDER BY grantee, privilege