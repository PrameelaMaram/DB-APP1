SELECT substr(grantee,1,10) Grantee, substr(owner,1,10) Owner, substr(column_name,1,20) "Column Name", substr(table_name,1,20) "Table Name", substr(privilege,1,10) Privilege
FROM sys.dba_col_privs
WHERE grantee = 'PUBLIC' AND owner IN ('SYS', 'SYSTEM') AND privilege IN ('ALTER', 'DELETE', 'UPDATE')
ORDER BY table_name, column_name, privilege, grantee