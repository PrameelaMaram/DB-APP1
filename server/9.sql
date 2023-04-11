SELECT substr(profile,1,20) Profile, substr(resource_name,1,60) Resource_Name, substr(limit,1,20) Limit
FROM sys.dba_profiles
ORDER BY profile, resource_name