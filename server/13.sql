SELECT substr(NAME,1,length(NAME))||':'|| substr(VALUE,1,length(VALUE))||':'|| substr(ISDEFAULT,1,length(ISDEFAULT))||':' "Name  :  Value  :  DEFAULT"
FROM v$parameter
ORDER BY name