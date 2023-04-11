
SELECT substr(owner,1,15) Owner, substr(grantee,1,10) Grantee, substr(table_name,1,30) table_name, substr(privilege,1,10) Privilege
FROM sys.dba_tab_privs
WHERE owner IN ('SYS', 'SYSTEM') AND privilege IN ('ALTER', 'DELETE', 'UPDATE') AND grantee = 'PUBLIC'
ORDER BY owner, grantee, table_name, privilege