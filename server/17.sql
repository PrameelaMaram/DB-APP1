SELECT substr(file#, 1, 7) file#, substr(status, 1, 10) Status, substr(name, 1, 60) file_name
FROM v$datafile