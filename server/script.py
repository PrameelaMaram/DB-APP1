import cx_Oracle
import pandas as pd
import csv
import datetime
import getpass;


#shortname=getpass.getuser()
destinationPath = "C:/Users/pshrava/OneDrive - Gap/SOX/"
print(destinationPath)


#print("Helloo....is anybody there...?")



file_DBS=open('/opt/oracle/admin/DBINV/DB-APP/server/DBS.txt','r')
content=file_DBS.read()
content_list=content.strip().split(",")
file_DBS.close()
DBS=content_list
print("DBS:",DBS)
file_con=open('/opt/oracle/admin/DBINV/DB-APP/server/con_str.txt','r')
content=file_con.read()
content_list=content.strip().split(",")
file_con.close()
con_str=content_list
print(con_str)


i=0
for i in range(len(DBS)):
    if DBS[i] == "FMRP1" or DBS[i] == "FMRP2" or DBS[i] == "ESCRMSP2" or DBS[i] == "ESCRMSP1" or DBS[i] == "ISCRMSP2" or DBS[i] == "ISCRMSP1" or DBS[i] == "CFSEBSP2" or DBS[i] == "CFSEBSP1" or DBS[i] == "GDOFINP1" or DBS[i] == "GDOFINP2" or DBS[i] == "PISCCOSP6_1" or DBS[i] == "PISCCOSP6_2" or DBS[i] == "PISCCOSP5_1"  or DBS[i] == "PISCCOSP5_2"  or DBS[i] == "PEGICOSP3_1" or DBS[i] == "PEGICOSP3_2":
        print("first if statement")
        try:
            conn=cx_Oracle.connect(con_str[i])
        except cx_Oracle.DatabaseError as exc:
            error = exc.args
##            print("Oracle-Error-Code:", error.code)
            print(DBS[i]+" : Not connected, check remote connectivity :", error.message)
    else:
        try:
            conn=cx_Oracle.connect(con_str[i]+DBS[i])
        except cx_Oracle.DatabaseError as exc:
##            print("Oracle-Error-Code:", error.code)
            print(DBS[i]+" : Not connected, check remote connectivity: ", error.message)
    try:
        pingtest=conn.ping()
        print(DBS[i]+" : connected, Running reports..Please wait....")
        cur1=conn.cursor()
        cur2=conn.cursor()
        cur12c=conn.cursor()
        cur3=conn.cursor()
        cur4=conn.cursor()
        cur5=conn.cursor()
        cur6=conn.cursor()
        cur7=conn.cursor()
        cur8=conn.cursor()
        cur9=conn.cursor()
        cur10=conn.cursor()
        cur11=conn.cursor()
        cur12=conn.cursor()
        cur13=conn.cursor()
        cur14=conn.cursor()
        cur15=conn.cursor()
        cur16=conn.cursor()
        cur17=conn.cursor()
        cur18=conn.cursor()
        cur19=conn.cursor()
        cur20=conn.cursor()
        cur21=conn.cursor()
        cur22=conn.cursor()
        
        DB=DBS[i]

        fd1=open('/opt/oracle/admin/DBINV/DB-APP/server/1.sql','r')
        sql1=fd1.read()
        cur1.execute(sql1)
        file1=open(DB+"_PR.csv","w")    
    ##    file1.write(DB+': Profile Details ')
        writer = csv.DictWriter(file1,fieldnames=["SYS_DATE", "INSTANCE_NAME","SERVER_NAME","PROFILE","RESOURCE_NAME","RESOURCE","LIMIT"])
        writer.writeheader()
        for row1 in cur1:
            file1.write(str(row1)[1:-1].replace("'","")+'\n');
        file1.close()
        cur1.close()
        fd1.close()

        
        a=pd.read_csv(DB+"_PR.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    a.columns=['SYS_DATE','INSTANCE_NAME','SERVER_NAME','PROFILE','RESOURCE_NAME','RESOURCE','LIMIT']
        a.to_html(DB+"_PR.html")
        html_file=a.to_html()

        fd2=open('/opt/oracle/admin/DBINV/DB-APP/server/2.sql','r')
        sql2=fd2.read()
        cur2.execute(sql2)
        file2t=open(DB+"_Function.txt","w")    
        for row2 in cur2:
            #print(row2[0])
            file2t.write(row2[0]+'\n')
            #file2t.write(str(row2)[2:-5]+'\n')
        file2t.close()
        cur2.close()
        fd2.close()

        fd212c=open('/opt/oracle/admin/DBINV/DB-APP/server/212c.sql','r')
        sql212c=fd212c.read()
        cur12c.execute(sql212c)
        file2tt=open(DB+"_Function.txt","a")
        file2tt.write("\n *********************************************  12C VERIFY FUNCTION ********************************************** \n")
        for row2t in cur12c:
            file2tt.write(row2t[0]+'\n')
        file2tt.close()
        cur12c.close()
        fd212c.close()    
      

    ##    fd2=open('/opt/oracle/admin/test_sox/2.sql','r')
    ##    sql2=fd2.read()
    ##    cur2.execute(sql2)
    ##    file2t=open(DB+"_Function.txt","w")
    ##    row2=cur2.fetchall()
    ##    file2t.write(row2[0][0].read())
    ##    file2t.close()
    ##    cur2.close()
    ##    fd2.close()    

    ##    fd2=open('/opt/oracle/admin/test_sox/2.sql','r')
    ##    sql2=fd2.read()
    ##    file2t=open(DB+"_Function.txt","w")
    ##    try:
    ##        cur2.execute(sql2)        
    ##        row2=cur2.fetchall()
    ##        file2t.write(row2[0][0].read())    
    ##    except:
    ##        file2t.write("Verify function not found")
    ##    file2t.close()
    ##    cur2.close()
    ##    fd2.close()

    ##    fd212c=open('/opt/oracle/admin/test_sox/212c.sql','r')
    ##    sql212c=fd212c.read()
    ##    cur12c.execute(sql212c)
    ##    file2tt=open(DB+"_Function.txt","a")
    ##    try:       
    ##        row2t=cur12c.fetchall()
    ##        file2tt.write("\n ***********************  12c VERIFY Function *********************** \n")
    ##        file2tt.write(row2t[0][0].read())
    ##    except:
    ##        file2tt.write("12c Verify function not found")
    ##    file2tt.close()
    ##    cur12c.close()
    ##    fd212c.close()

    ##    try:
    ##        fd212c=open('/opt/oracle/admin/test_sox/212c.sql','r')
    ##        sql212c=fd212c.read()
    ##        cur12c.execute(sql212c)
    ##        file2tt=open(DB+"_Function.txt","a")
    ##        row2t=cur12c.fetchall()
    ##        file2tt.write("\n ***********************  12c VERIFY Function *********************** \n")
    ##        file2tt.write(row2t[0][0].read())
    ##    except:
    ##        file2tt.write("12c Verify function not found")
    ##    file2tt.close()
    ##    cur12c.close()
    ##    fd212c.close()
        
        contents = open(DB+"_Function.txt","r")
        with open(DB+"_Function.html", "w") as e:
            for lines in contents.readlines():
                e.write("<pre>" + lines + "</pre>\n")
        contents.close()
        
    ##    cur3=conn.cursor()

        fd3=open('/opt/oracle/admin/DBINV/DB-APP/server/3.sql','r')
        sql3=fd3.read()
        cur3.execute(sql3)
        file3=open(DB+"_os3.csv","w")
        writer = csv.DictWriter(file3,fieldnames=["DB","SYSDATE"])
        writer.writeheader()
        #file3.write('SYSDATE'+'\n')
        for row3 in cur3:
            file3.write(str(row3)[1:-1].replace("'","")+'\n');
    ##        file3.write(str(row3));
        file3.close()
        cur3.close()
        fd3.close()

        fd4=open('/opt/oracle/admin/DBINV/DB-APP/server/4.sql','r')
        sql4=fd4.read()
        cur4.execute(sql4)
        file4=open(DB+"_os4.csv","w")
        writer = csv.DictWriter(file4,fieldnames=["USERNAME","ACCOUNT_STATUS","PROFILE","CREATED"])
        writer.writeheader()
        for row4 in cur4:
            file4.write(str(row4)[1:-1].replace("'","")+'\n');
        file4.close()
        cur4.close()

        if DB == 'REMRDXP3':
            fd5=open('/opt/oracle/admin/DBINV/DB-APP/server/5.sql','r')
            sql5=fd5.read()
            cur5.execute(sql5)
            file5=open(DB+"_os5rdx.csv","w")
            writer = csv.DictWriter(file5,fieldnames=["ROLE", "PASSWORD_REQUIRED","AUTHENTICATION_TYPE"])
            writer.writeheader()
            for row5 in cur5:
                file5.write(str(row5)[1:-1].replace("'","")+'\n');
            file5.close()
            cur5.close()

            fd6=open('/opt/oracle/admin/DBINV/DB-APP/server/6.sql','r')
            sql6=fd6.read()
            cur6.execute(sql6)
            file6=open(DB+"_os6rdx.csv","w")
            writer = csv.DictWriter(file6,fieldnames=["GRANTEE","GRANTED_ROLE","ADMIN_OPTION","DEFAULT_ROLE"])
            writer.writeheader()
            for row6 in cur6:
                file6.write(str(row6)[1:-1].replace("'","")+'\n');
            file6.close()
            cur6.close()
        else:
            fd5=open('/opt/oracle/admin/DBINV/DB-APP/server/5.sql','r')
            sql5=fd5.read()
            cur5.execute(sql5)
            file5=open(DB+"_os5.csv","w")
            writer = csv.DictWriter(file5,fieldnames=["ROLE", "ROLE_ID","PASSWORD_REQUIRED","AUTHENTICATION_TYPE","COMMON","ORACLE_MAINTAINED","INHERITED","IMPLICIT"])
            writer.writeheader()
            for row5 in cur5:
                file5.write(str(row5)[1:-1].replace("'","")+'\n');
            file5.close()
            cur5.close()

            fd6=open('/opt/oracle/admin/DBINV/DB-APP/server/6.sql','r')
            sql6=fd6.read()
            cur6.execute(sql6)
            file6=open(DB+"_os6.csv","w")
            writer = csv.DictWriter(file6,fieldnames=["GRANTEE","GRANTED_ROLE","ADMIN_OPTION","DELEGATE_OPTION","DEFAULT_ROLE","COMMON","INHERITED"])
            writer.writeheader()
            for row6 in cur6:
                file6.write(str(row6)[1:-1].replace("'","")+'\n');
            file6.close()
            cur6.close()

        file7=open(DB+"_os7.csv","w")
        try:
            fd7=open('/opt/oracle/admin/DBINV/DB-APP/server/7.sql','r')
            sql7=fd7.read()
            cur7.execute(sql7)
            writer = csv.DictWriter(file7,fieldnames=["USERNAME","Password Changed"])
            writer.writeheader()
            for row7 in cur7:
                file7.write(str(row7)[1:-1].replace("'","")+'\n');
        except:
            file7.write("User doesn't have privileges to query sys.user$ table - please grant");                
        file7.close()
        cur7.close()

        fd8=open('/opt/oracle/admin/DBINV/DB-APP/server/8.sql','r')
        sql8=fd8.read()
        cur8.execute(sql8)
        file8=open(DB+"_os8.csv","w")
        writer = csv.DictWriter(file8,fieldnames=["USERNAME","EXPIRY_DATE","PROFILE"])
        writer.writeheader()
        for row8 in cur8:
            file8.write(str(row8)[1:-1].replace("'","")+'\n');
        file8.close()
        cur8.close()

        fd9=open('/opt/oracle/admin/DBINV/DB-APP/server/9.sql','r')
        sql9=fd9.read()
        cur9.execute(sql9)
        file9=open(DB+"_os9.csv","w")
        writer = csv.DictWriter(file9,fieldnames=["PROFILE","RESOURCE_NAME","LIMIT"])
        writer.writeheader()
        for row9 in cur9:
            file9.write(str(row9)[1:-1].replace("'","")+'\n');
        file9.close()
        cur9.close()

        fd10=open('/opt/oracle/admin/DBINV/DB-APP/server/10.sql','r')
        sql10=fd10.read()
        cur10.execute(sql10)
        file10=open(DB+"_os10.csv","w")
        writer = csv.DictWriter(file10,fieldnames=["Remote Login","Parameter"])
        writer.writeheader()
    ##    file10.write('Remote Login Parameter : ')
        for row10 in cur10:
            file10.write(str(row10)[1:-1].replace("'","")+'\n');
        file10.close()
        cur10.close()

        fd11=open('/opt/oracle/admin/DBINV/DB-APP/server/11.sql','r')
        sql11=fd11.read()
        cur11.execute(sql11)
        file11=open(DB+"_os11.csv","w")
        writer = csv.DictWriter(file11,fieldnames=["pwfile_users"])
        writer.writeheader()
    ##    file11.write('pwfile_users: ')
        for row11 in cur11:
            #file11.write(str(row11)[1:-1].replace("'",""))+'\n');
            file11.write(str(row11)[1].replace("'","")+'\n');
        file11.close()
        cur11.close()

        fd12=open('/opt/oracle/admin/DBINV/DB-APP/server/12.sql','r')
        sql12=fd12.read()
        cur12.execute(sql12)
        file12=open(DB+"_os12.csv","w")
        writer = csv.DictWriter(file12,fieldnames=["OWNER","DB_LINK","USERNAME","HOST","CREATED"])
        writer.writeheader()
    ##    file12.write('DB links: ')
    ##    file12.write('\n')
        for row12 in cur12:
            file12.write(str(row12)[1:-1].replace("'","")+'\n');
        file12.close()
        cur12.close()

        fd13=open('/opt/oracle/admin/DBINV/DB-APP/server/13.sql','r')
        sql13=fd13.read()
        cur13.execute(sql13)
        file13=open(DB+"_os13.csv","w")
        writer = csv.DictWriter(file13,fieldnames=["Name  :  Value  :  DEFAULT"," "])
        writer.writeheader()
    ##    file13.write('LISTING OF PARAMETERS: '+'\n')
        for row13 in cur13:
            file13.write(str(row13)[1:-1].replace("'","")+'\n');
        file13.close()
        cur13.close()

        fd14=open('/opt/oracle/admin/DBINV/DB-APP/server/14.sql','r')
        sql14=fd14.read()
        cur14.execute(sql14)
        file14=open(DB+"_os14.csv","w")
        writer = csv.DictWriter(file14,fieldnames=["GRANTEE","PRIVILEGE","Admin Option"])
        writer.writeheader()
    ##    file14.write('ROLES WITH SYSTEM PRIVILEGES: ')
        for row14 in cur14:
            file14.write(str(row14)[1:-1].replace("'","")+'\n');
        file14.close()
        cur14.close()

        fd15=open('/opt/oracle/admin/DBINV/DB-APP/server/15.sql','r')
        sql15=fd15.read()
        cur15.execute(sql15)
        file15=open(DB+"_os15.csv","w")
        writer = csv.DictWriter(file15,fieldnames=["GRANTEE","PRIVILEGE","Admin Option"])
        writer.writeheader()
    ##    file15.write('USERS WITH '+'SYSTEM PRIVILEGES'+': '+'\n')
        for row15 in cur15:
            file15.write(str(row15)[1:-1].replace("'","")+'\n');
        file15.close()
        cur15.close()

        fd16=open('/opt/oracle/admin/DBINV/DB-APP/server/16.sql','r')
        sql16=fd16.read()
        cur16.execute(sql16)
        file16=open(DB+"_os16.csv","w")
        writer = csv.DictWriter(file16,fieldnames=["NAME","VALUE"])
        writer.writeheader()
    ##    file16.write('AUDIT PARAMETER: '+'\n')
        for row16 in cur16:
            file16.write(str(row16)[1:-1].replace("'","")+'\n');
        file16.close()
        cur16.close()

        fd17=open('/opt/oracle/admin/DBINV/DB-APP/server/17.sql','r')
        sql17=fd17.read()
        cur17.execute(sql17)
        file17=open(DB+"_os17.csv","w")
        writer = csv.DictWriter(file17,fieldnames=["FILE#","STATUS","FILE_NAME & LOCATION"])
        writer.writeheader()
    ##    file17.write(' LOCATIONS FOR ALL DATAFILES: '+'\n')
        for row17 in cur17:
            file17.write(str(row17)[1:-1].replace("'","")+'\n');
        file17.close()
        cur17.close()

        fd18=open('/opt/oracle/admin/DBINV/DB-APP/server/18.sql','r')
        sql18=fd18.read()
        cur18.execute(sql18)
        file18=open(DB+"_os18.csv","w")
        writer = csv.DictWriter(file18,fieldnames=["STATUS","FILE_NAME & LOCATION"])
        writer.writeheader()
    ##    file18.write(' CONTROL FILE LOCATIONS: '+'\n')
        for row18 in cur18:
            file18.write(str(row18)[1:-1].replace("'","")+'\n');
        file18.close()
        cur18.close()

        fd19=open('/opt/oracle/admin/DBINV/DB-APP/server/19.sql','r')
        sql19=fd19.read()
        cur19.execute(sql19)
        file19=open(DB+"_os19.csv","w")
        writer = csv.DictWriter(file19,fieldnames=["ARCHIVE LOG LIST PARAMETER"," "])
        writer.writeheader()
    ##    file19.write(' ARCHIVE LOG LOCATION: '+'\n')
        for row19 in cur19:
            file19.write(str(row19)[1:-1].replace("'","")+'\n');
        file19.close()
        cur19.close()

        fd20=open('/opt/oracle/admin/DBINV/DB-APP/server/20.sql','r')
        sql20=fd20.read()
        cur20.execute(sql20)
        file20=open(DB+"_os20.csv","w")
        writer = csv.DictWriter(file20,fieldnames=["GRANTEE","PRIVILEGE","ADMIN_OPTION"])
        writer.writeheader()
    ##    file20.write(' SYSTEM PRIVILEGES GRANTED TO PUBLIC: '+'\n')
        for row20 in cur20:
            file20.write(str(row20)[1:-1].replace("'","")+'\n');
        file20.close()
        cur20.close()

        fd21=open('/opt/oracle/admin/DBINV/DB-APP/server/21.sql','r')
        sql21=fd21.read()
        cur21.execute(sql21)
        file21=open(DB+"_os21.csv","w")
    ##    file21.write('OBJECT PRIVILEGES GRANTED TO PUBLIC '+'\n')
        writer = csv.DictWriter(file21,fieldnames=["OWNER","GRANTEE","TABLE_NAME","PRIVILEGE"])
        writer.writeheader()
        
        for row21 in cur21:
            file21.write(str(row21)[1:-1].replace("'","")+'\n');
        file21.close()
        cur21.close()

        fd22=open('/opt/oracle/admin/DBINV/DB-APP/server/22.sql','r')
        sql22=fd22.read()
        cur22.execute(sql22)
        file22=open(DB+"_os22.csv","w")
        writer = csv.DictWriter(file22,fieldnames=["GRANTEE","OWNER","COLUMN_NAME","TABLE_NAME","PRIVILEGE"])
        writer.writeheader()
    ##    file22.write('COLUMN PRIVILEGES GRANTED TO PUBLIC: '+'\n')
        for row22 in cur22:
            file22.write(str(row22)[1:-1].replace("'","")+'\n');
        file22.close()
        cur22.close()
        
        conn.close()
        #print("Command Executed successfully , Check the file(dboutput) for the Output")

        b=pd.read_csv(DB+"_os3.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    b.columns=['SYS_DATE','','','','','','']
        b.to_html(DB+"_os3.html")
        html_file=b.to_html()

        c=pd.read_csv(DB+"_os4.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    c.columns=['USERNAME','ACCOUNT_STATUS','PROFILE','CREATED']
        c.to_html(DB+"_os4.html")
        html_file=c.to_html()

        f=pd.read_csv(DB+"_os7.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    f.columns=['SYS_DATE','INSTANCE_NAME','SERVER_NAME','','','','','','']
        f.to_html(DB+"_os7.html")
        html_file=f.to_html()

        g=pd.read_csv(DB+"_os8.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    g.columns=['SYS_DATE','INSTANCE_NAME','SERVER_NAME']
        g.to_html(DB+"_os8.html")
        html_file=g.to_html()

        h=pd.read_csv(DB+"_os9.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    h.columns=['SYS_DATE','INSTANCE_NAME','SERVER_NAME']
        h.to_html(DB+"_os9.html")
        html_file=h.to_html()

        ii=pd.read_csv(DB+"_os10.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    ii.columns=['REMOTE','LOGIN PARAMETER']
        ii.to_html(DB+"_os10.html")
        html_file=ii.to_html()

        j=pd.read_csv(DB+"_os11.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    j.columns=['SYS_DATE','    ']
        j.to_html(DB+"_os11.html")
        html_file=j.to_html()
        
    ##    k=pd.read_csv(DB+"_os12.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ####    k.columns=['OWNER','DB_LINK','USERNAME','HOST','CREATED','','','','']
    ##    k.to_html(DB+"_os12.html")
    ##    html_file=k.to_html()
        try:
            k=pd.read_csv(DB+"_os12.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
            k.to_html(DB+"_os12.html")
            html_file=k.to_html()
        except pd.errors.EmptyDataError:
            k=pd.DataFrame()
            k.to_html(DB+"_os12.html")
            html_file=k.to_html()

        l=pd.read_csv(DB+"_os13.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    j.columns=['SYS_DATE','    ']
        l.to_html(DB+"_os13.html")
        html_file=l.to_html()

        m=pd.read_csv(DB+"_os14.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    m.columns=['GRANTEE','PRIVILEGE','Admin Option']
        m.to_html(DB+"_os14.html")
        html_file=m.to_html()

        n=pd.read_csv(DB+"_os15.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    n.columns=['GRANTEE','PRIVILEGE','Admin Option']
        n.to_html(DB+"_os15.html")
        html_file=n.to_html()

        o=pd.read_csv(DB+"_os16.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    n.columns=['GRANTEE','PRIVILEGE','Admin Option']
        o.to_html(DB+"_os16.html")
        html_file=o.to_html()

        p=pd.read_csv(DB+"_os17.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    n.columns=['GRANTEE','PRIVILEGE','Admin Option']
        p.to_html(DB+"_os17.html")
        html_file=p.to_html()

        q=pd.read_csv(DB+"_os18.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    n.columns=['GRANTEE','PRIVILEGE','Admin Option']
        q.to_html(DB+"_os18.html")
        html_file=q.to_html()

        r=pd.read_csv(DB+"_os19.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    n.columns=['GRANTEE','PRIVILEGE','Admin Option']
        r.to_html(DB+"_os19.html")
        html_file=r.to_html()

        s=pd.read_csv(DB+"_os20.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    n.columns=['GRANTEE','PRIVILEGE','Admin Option']
        s.to_html(DB+"_os20.html")
        html_file=s.to_html()

        t=pd.read_csv(DB+"_os21.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    n.columns=['GRANTEE','PRIVILEGE','Admin Option']
        t.to_html(DB+"_os21.html")
        html_file=t.to_html()

        u=pd.read_csv(DB+"_os22.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##    n.columns=['GRANTEE','PRIVILEGE','Admin Option']
        u.to_html(DB+"_os22.html")
        html_file=u.to_html()

    ###Html Headerfiles#################################

        dt=datetime.datetime.now().strftime("%d-%B-%Y")
        f = open(DB+"_PRH.html",'w')
        message = '<html><body>'+'<h1 style="color:Tomato;text-align:center">'+'<p>'+"SOX 3.3dbh Report for the Database : "+DB+'</p>'+'</h1>'+'<h3 style="color:blue">'+'<p>'+"Date : "+dt+'</p>'+'</h3>'+'<h3 style="color:blue">'+'<p>'+"PROFILE"+'</p>'+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_OSH.html",'w')
        message = '<html><body>'+'<h1 style="color:Tomato;text-align:center">'+'<p>'+"SOX 3.5dba Report for the Database : "+DB+'</p>'+'</h1>'+'<h3 style="color:blue">'+'<p>'+"Date : "+dt+'</p>'+'</h3>'+'<h3 style="color:blue">'+'<p>'+"OS"+'</p>'+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_FunctionH.html",'w')
        message = '<html><body>'+'<h3 style="color:blue">'+"Verify Function "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os3H.html",'w')
        message = '<html><body>'+'<h3 style="color:blue">'+"DB System Date"+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os4H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 1 "+'</h2>'+'<h3 style="color:blue">'+"USERS"+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os5H.html",'w')
        message = '<html><body>'+'<h3 style="color:blue">'+"ROLES"+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os6H.html",'w')
        message = '<html><body>'+'<h3 style="color:blue">'+"ROLES GRANTED TO ROLES / USERS"+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os7H.html",'w')
        message = '<html><body>'+'<h3 style="color:blue">'+"Last Password Changed Date"+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os8H.html",'w')
        message = '<html><body>'+'<h3 style="color:blue">'+"Password Expiration Date"+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os9H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 2 "+'</h2>'+'<h3 style="color:blue">'+"PROFILES "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os10H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 3 "+'</h2>'+'<h3 style="color:blue">'+"REMOTE LOGIN PARAMETER "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os12H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 4 "+'</h2>'+'<h3 style="color:blue">'+"DB LINKS "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os13H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 5 "+'</h2>'+'<h3 style="color:blue">'+"LISTING OF PARAMETERS "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os14H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 6 "+'</h2>'+'<h3 style="color:blue">'+"ROLES WITH SYSTEM PRIVILEGES "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os15H.html",'w')
        message = '<html><body>'+'<h3 style="color:blue">'+"USERS WITH SYSTEM PRIVILEGES "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os16H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 7 "+'</h2>'+'<h3 style="color:blue">'+"AUDIT PARAMETER "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os17H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 8 "+'</h2>'+'<h3 style="color:blue">'+"LOCATIONS FOR ALL DATAFILES "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os18H.html",'w')
        message = '<html><body>'+'<h3 style="color:blue">'+"CONTROL FILE LOCATIONS "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os19H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 9 "+'</h2>'+'<h3 style="color:blue">'+"ARCHIVE LOG LOCATION "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os20H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 10 "+'</h2>'+'<h3 style="color:blue">'+"SYSTEM PRIVILEGES GRANTED TO PUBLIC "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os21H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 11 "+'</h2>'+'<h3 style="color:blue">'+"OBJECT PRIVILEGES GRANTED TO PUBLIC "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
        f = open(DB+"_os22H.html",'w')
        message = '<html><body>'+'<h2 style="color:crimson">'+"Section 12 "+'</h2>'+'<h3 style="color:blue">'+"COLUMN PRIVILEGES GRANTED TO PUBLIC "+'</h3>'+'</body></html>'
        f.write(message)
        f.close()
            
        if DB == 'REMRDXP3':
            rdxd=pd.read_csv(DB+"_os5rdx.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##        rdxd.columns=['SYS_DATE','INSTANCE_NAME','SERVER_NAME']
            rdxd.to_html(DB+"_os5rdx.html")
            html_file=rdxd.to_html()

            rdxe=pd.read_csv(DB+"_os6rdx.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##        rdxe.columns=['SYS_DATE','INSTANCE_NAME','SERVER_NAME',' ']
            rdxe.to_html(DB+"_os6rdx.html")
            html_file=rdxe.to_html()

    ## Sox 3.3        
            filenames = [DB+"_PRH.html",DB+"_PR.html",DB+"_FunctionH.html",DB+"_Function.html"]
            with open(destinationPath+DB+'_3.3dbh_FUNC_PR.html', 'w') as outfile:
                for fname in filenames:
                    with open(fname) as infile:
                        for line in infile:
                            outfile.write(line)
            #print(DB+" : Reports Generated Successfully")
    ## Sox 3.5 
            filenames = [DB+"_OSH.html",DB+"_os3H.html",DB+"_os3.html",DB+"_os4H.html",DB+"_os4.html",DB+"_os5H.html",DB+"_os5rdx.html",DB+"_os6H.html",DB+"_os6rdx.html",DB+"_os7H.html",DB+"_os7.html",DB+"_os8H.html",DB+"_os8.html",DB+"_os9H.html",DB+"_os9.html",DB+"_os10H.html",DB+"_os10.html",DB+"_os11.html",DB+"_os12H.html",DB+"_os12.html",DB+"_os13H.html",DB+"_os13.html",DB+"_os14H.html",DB+"_os14.html",DB+"_os15H.html",DB+"_os15.html",DB+"_os16H.html",DB+"_os16.html",DB+"_os17H.html",DB+"_os17.html",DB+"_os18H.html",DB+"_os18.html",DB+"_os19H.html",DB+"_os19.html",DB+"_os20H.html",DB+"_os20.html",DB+"_os21H.html",DB+"_os21.html",DB+"_os22H.html",DB+"_os22.html"]
            with open(destinationPath+DB+'_3.5dba_OS.html', 'w') as outfile:
                for fname in filenames:
                    with open(fname) as infile:
                        for line in infile:
                            outfile.write(line)
            print(DB+" : Reports Generated Successfully")

        else:
            d=pd.read_csv(DB+"_os5.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##        d.columns=['SYS_DATE','INSTANCE_NAME','SERVER_NAME','PROFILE','RESOURCE_NAME','','','']
            d.to_html(DB+"_os5.html")
            html_file=d.to_html()

            e=pd.read_csv(DB+"_os6.csv",error_bad_lines= False,quoting=csv.QUOTE_NONE,na_filter=False)
    ##        e.columns=['SYS_DATE','INSTANCE_NAME','SERVER_NAME','','','','']
            e.to_html(DB+"_os6.html")
            html_file=e.to_html()

    ## Sox 3.3
            
            filenames = [DB+"_PRH.html",DB+"_PR.html",DB+"_FunctionH.html",DB+"_Function.html",]
            with open(destinationPath+DB+'_3.3dbh_FUNC_PR.html', 'w') as outfile:
                for fname in filenames:
                    with open(fname) as infile:
                        for line in infile:
                            outfile.write(line)
    ## Sox 3.5
            filenames = [DB+"_OSH.html",DB+"_os3H.html",DB+"_os3.html",DB+"_os4H.html",DB+"_os4.html",DB+"_os5H.html",DB+"_os5.html",DB+"_os6H.html",DB+"_os6.html",DB+"_os7H.html",DB+"_os7.html",DB+"_os8H.html",DB+"_os8.html",DB+"_os9H.html",DB+"_os9.html",DB+"_os10H.html",DB+"_os10.html",DB+"_os11.html",DB+"_os12H.html",DB+"_os12.html",DB+"_os13H.html",DB+"_os13.html",DB+"_os14H.html",DB+"_os14.html",DB+"_os15H.html",DB+"_os15.html",DB+"_os16H.html",DB+"_os16.html",DB+"_os17H.html",DB+"_os17.html",DB+"_os18H.html",DB+"_os18.html",DB+"_os19H.html",DB+"_os19.html",DB+"_os20H.html",DB+"_os20.html",DB+"_os21H.html",DB+"_os21.html",DB+"_os22H.html",DB+"_os22.html"]
            with open(destinationPath+DB+'_3.5dba_OS.html', 'w') as outfile:
                for fname in filenames:
                    with open(fname) as infile:
                        for line in infile:
                            outfile.write(line)

            print(DB+" : Reports Generated Successfully")
        i=i+1

    except:
        print(DBS[i]+" : Not connected, check remote connectivity")
        
print("SOX reported are uploaded to sharepoint: https://folio.gap.com/:f:/r/sites/HDC-Database-Team/Shared%20Documents/SOX?csf=1&web=1&e=hnk8Sr ")    

