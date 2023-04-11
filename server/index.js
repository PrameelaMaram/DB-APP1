var fs  = require('fs');
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");
const {PythonShell} =require('python-shell');
const {spawn} = require('child_process');
const hostname="localhost"
const dotenv=require('dotenv')
dotenv.config()
app.use(cors({
    cors: {
        origin: [
            "http://localhost:3000"
        ],
        credentials: true
    }
}));

app.use(express.json())
const db = mysql.createConnection({
    user:process.env.user,
    host:process.env.host,
    password:process.env.password,
    database:process.env.database,
});

app.get('/retrieveRedis',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Redis',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.put("/updateRedis",(req,res) => {
    console.log(req.body)
    const id=req.body.id
const host_name=req.body.host_name
const db_name=req.body.db_name
const clusterwebui=req.body.clusterwebui
const cluster=req.body.cluster
const dbendpoint=req.body.dbendpoint
const dbConfig=req.body.dbConfig
const shards=req.body.shards
const cloudconfiguration=req.body.cloudconfiguration
const persistence=req.body.persistence
const rack_zone_awareness=req.body.rack_zone_awareness
const rdbms=req.body.rdbms
const status=req.body.status
const domain=req.body.domain
const environment=req.body.environment
const Redis_version=req.body.Redis_version
const Redis_db_version=req.body.Redis_db_version
const ha_role=req.body.ha_role
const location=req.body.location
const port_num=req.body.port_num
const Product_Team_Distro=req.body.Product_Team_Distro
const db_size=req.body.db_size
const dba_owner=req.body.dba_owner
const sn_group=req.body.sn_group
const compliance=req.body.compliance
const comments=req.body.comments
const app_name=req.body.app_name
const app_family=req.body.app_family
const app_vp_owner=req.body.app_vp_owner
const pt_contact=req.body.pt_contact
const pt_name=req.body.pt_name
const VP_name=req.body.VP_name
     
db.query('UPDATE DB_Inv_Redis SET host_name=?,db_name=?,clusterwebui=?,cluster=?,dbendpoint=?,dbConfig=?,shards=?,cloudconfiguration=?,persistence=?,rack_zone_awareness=?,rdbms=?,status=?,domain=?,environment=?,Redis_version=?,Redis_db_version=?,ha_role=?,location=?,port_num=?,Product_Team_Distro=?,db_size=?,dba_owner=?,sn_group=?,compliance=?,comments=?,app_name=?,app_family=?,app_vp_owner=?,pt_contact=?,pt_name=?,VP_name=? where id=?',[host_name,db_name,clusterwebui,cluster,dbendpoint,dbConfig,shards,cloudconfiguration,persistence,rack_zone_awareness,rdbms,status,domain,environment,Redis_version,Redis_db_version,ha_role,location,port_num,Product_Team_Distro,db_size,dba_owner,sn_group,compliance,comments,app_name,app_family,app_vp_owner,pt_contact,pt_name,VP_name,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.post('/createRedis',(req,res) => {
    console.log(req.body)
    const host_name=req.body.host_name
const db_name=req.body.db_name
const clusterwebui=req.body.clusterwebui
const cluster=req.body.cluster
const dbendpoint=req.body.dbendpoint
const dbConfig=req.body.dbConfig
const shards=req.body.shards
const cloudconfiguration=req.body.cloudconfiguration
const persistence=req.body.persistence
const rack_zone_awareness=req.body.rack_zone_awareness
const rdbms=req.body.rdbms
const status=req.body.status
const domain=req.body.domain
const environment=req.body.environment
const Redis_version=req.body.Redis_version
const Redis_db_version=req.body.Redis_db_version
const ha_role=req.body.ha_role
const location=req.body.location
const port_num=req.body.port_num
const Product_Team_Distro=req.body.Product_Team_Distro
const db_size=req.body.db_size
const dba_owner=req.body.dba_owner
const sn_group=req.body.sn_group
const compliance=req.body.compliance
const comments=req.body.comments
const app_name=req.body.app_name
const app_family=req.body.app_family
const app_vp_owner=req.body.app_vp_owner
const pt_contact=req.body.pt_contact
const pt_name=req.body.pt_name
const VP_name=req.body.VP_name

    db.query('INSERT INTO DB_Inv_Redis (host_name,db_name,clusterwebui,cluster,dbendpoint,dbConfig,shards,cloudconfiguration,persistence,rack_zone_awareness,rdbms,status,domain,environment,Redis_version,Redis_db_version,ha_role,location,port_num,Product_Team_Distro,db_size,dba_owner,sn_group,compliance,comments,app_name,app_family,app_vp_owner,pt_contact,pt_name,VP_name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [host_name,db_name,clusterwebui,cluster,dbendpoint,dbConfig,shards,cloudconfiguration,persistence,rack_zone_awareness,rdbms,status,domain,environment,Redis_version,Redis_db_version,ha_role,location,port_num,Product_Team_Distro,db_size,dba_owner,sn_group,compliance,comments,app_name,app_family,app_vp_owner,pt_contact,pt_name,VP_name], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Insererted..")
        }
    });
});


app.get('/retrieve',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Mysql',(err,result) => {
        if(err){
            console.log(err)
        } else{
            console.log("hi")
            res.send(result)
        }
    })
});
 

app.get('/retrieveMssql',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Mssql',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.delete("/deleteMysql/:id", (req, res) => {
    const id = req.params.id;
    console.log(id)
    db.query("DELETE FROM DB_Inv_Mysql WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  
app.post('/createMysql',(req,res) => {
    console.log(req.body)
    const rdbms = req.body.rdbms
    const instance_name = req.body.instance_name
    const port = req.body.port
    const db_name = req.body.db_name
    const status = req.body.status
    const distribution = req.body.distribution
    const domain = req.body.domain
    const environment = req.body.environment
    const version = req.body.version
    const ha_role = req.body.ha_role
    const db_size = req.body.db_size
    const db_replication_type = req.body.db_replication_type
    const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    const db_dfo = req.body.db_dfo
    const app_name = req.body.app_name
    const app_family = req.body.app_family
    const host_name = req.body.host_name
    const location = req.body.location

    db.query('INSERT INTO DB_Inv_Mysql(rdbms,instance_name,port,db_name,status,distribution,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,db_dfo,app_name,app_family,host_name,location) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [rdbms,instance_name,port,db_name,status,distribution,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,db_dfo,app_name,app_family,host_name,location], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Insererted..")
        }
    });

});

app.put("/updateMysql",(req,res) => {
    console.log(req.body)
    console.log("hello")
    const id = req.body.id
    const rdbms = req.body.rdbms
    const instance_name = req.body.instance_name
    const port = req.body.port
    const db_name = req.body.db_name
    const status = req.body.status
    const distribution = req.body.distribution
    const domain = req.body.domain
    const environment = req.body.environment
    const version = req.body.version
    const ha_role = req.body.ha_role
    const db_size = req.body.db_size
    const db_replication_type = req.body.db_replication_type
    const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    const db_dfo = req.body.db_dfo
    const app_name = req.body.app_name
   const app_family = req.body.app_family
    const host_name = req.body.host_name
    const location = req.body.location

    db.query('UPDATE DB_Inv_Mysql SET rdbms=?,instance_name=?,port=?,db_name=?,status=?,distribution=?,domain=?,environment=?,version=?,ha_role=?,db_size=?,db_replication_type=?,dba_sme=?,sn_group=?,compliance=?,comments=?,db_dfo=?,app_name=?,app_family=?,host_name=?,location=? where id = ? ',[rdbms,instance_name,port,db_name,status,distribution,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,db_dfo,app_name,app_family,host_name,location,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});


app.post('/createMssql',(req,res) => {
    console.log(req.body)
    const rdbms = req.body.rdbms
  
    const instance_name = req.body.instance_name
    const port = req.body.port
    const db_name = req.body.db_name
    const status = req.body.status
    const domain = req.body.domain
    const environment = req.body.environment
    const version = req.body.version
    const core_count = req.body.core_count
    const ha_role = req.body.ha_role
    const db_size = req.body.db_size
    const db_replication_type = req.body.db_replication_type
    const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    
    const app_name = req.body.app_name
   const app_family = req.body.app_family
    const host_name = req.body.host_name
    const location = req.body.location
 const app_vp_owner= req.body.app_vp_owner
const pt_name= req.body.pt_name
const pt_contact= req.body.pt_contact
const VP_name= req.body.VP_name

    db.query('INSERT INTO DB_Inv_Mssql(rdbms,instance_name,port,db_name,status,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,app_name,app_family,host_name,location,app_vp_owner,pt_name,pt_contact,VP_name,core_count) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [rdbms,instance_name,port,db_name,status,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,app_name,app_family,host_name,location,app_vp_owner,pt_name,pt_contact,VP_name,core_count], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/deleteMssql/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Inv_Mssql WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put("/updateMssql",(req,res) => {
   console.log(req.body)
   const id = req.body.id
    const rdbms = req.body.rdbms
   
    const instance_name = req.body.instance_name
    const port = req.body.port
    const db_name = req.body.db_name
    const status = req.body.status
    const domain = req.body.domain
    const environment = req.body.environment
    const version = req.body.version
    const core_count = req.body.core_count
    const ha_role = req.body.ha_role
    const db_size = req.body.db_size
    const db_replication_type = req.body.db_replication_type
    const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
   
    const app_name = req.body.app_name
   const app_family = req.body.app_family
    const host_name = req.body.host_name
    const location = req.body.location
const app_vp_owner= req.body.app_vp_owner
const pt_name= req.body.pt_name
const pt_contact= req.body.pt_contact
const VP_name= req.body.VP_name
    
    db.query('UPDATE DB_Inv_Mssql SET rdbms=?,instance_name=?,port=?,db_name=?,status=?,domain=?,environment=?,version=?,ha_role=?,db_size=?,db_replication_type=?,dba_sme=?,sn_group=?,compliance=?,comments=?,app_name=?,app_family=?,host_name=?,location=?,app_vp_owner=?,pt_name=?,pt_contact=?,VP_name=?,core_count=? where id = ? ',[rdbms,instance_name,port,db_name,status,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,app_name,app_family,host_name,location,app_vp_owner,pt_name,pt_contact,VP_name,core_count,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.get('/retrieveMongo',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Mongo',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/createMongo',(req,res) => {
    console.log(req.body)
     const instance_name = req.body.instance_name
	const host_name = req.body.host_name
    const port = req.body.port
    const linux_version = req.body.linux_version
    const status = req.body.status
    const distribution = req.body.distribution
    const domain = req.body.domain
    const environment = req.body.environment
    const version = req.body.version
    const tier = req.body.tier
	 const replica_set_name = req.body.replica_set_name
    const ha_role = req.body.ha_role
    const ops_manager = req.body.ops_manager
    const dba_sme = req.body.dba_sme
	const app_name = req.body.app_name
    const app_family = req.body.app_family
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    const location = req.body.location
    const app_vp_owner = req.body.app_vp_owner
    const pt_contact=req.body.pt_contact
    const pt_name=req.body.pt_name
    const VP_name=req.body.VP_name

    db.query('INSERT INTO DB_Inv_Mongo(instance_name,host_name,port,linux_version,tier,status,distribution,domain,environment,version,replica_set_name,ha_role,ops_manager,dba_sme,app_name,app_family,sn_group,compliance,comments,location,app_vp_owner,pt_contact,pt_name,VP_name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [instance_name,host_name,port,linux_version,status,distribution,domain,environment,version,tier,replica_set_name,ha_role,ops_manager,dba_sme,app_name,app_family,sn_group,compliance,comments,location,app_vp_owner,pt_contact,pt_name,VP_name],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/deleteMongo/:id", (req, res) => {
    const id = req.params.id;
    console.log(id)
    db.query("DELETE FROM DB_Inv_Mongo WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put("/updateMongo",(req,res) => {
   console.log(req.body)
   const id = req.body.id;
    const replica_set_name = req.body.replica_set_name
    const instance_name = req.body.instance_name
    const port = req.body.port
    const linux_version = req.body.linux_version
        const status = req.body.status
    const distribution = req.body.distribution
    const domain = req.body.domain
    const environment = req.body.environment
    const version = req.body.version
    const tier = req.body.tier
    const ha_role = req.body.ha_role
        const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    const ops_manager = req.body.ops_manager
    const app_name = req.body.app_name
   const app_family = req.body.app_family
    const host_name = req.body.host_name
    const location = req.body.location
    const app_vp_owner = req.body.app_vp_owner
    const pt_contact=req.body.pt_contact
    const pt_name=req.body.pt_name
    const VP_name=req.body.VP_name
    
    db.query('UPDATE DB_Inv_Mongo SET replica_set_name=?,instance_name=?,port=?,linux_version=?,status=?,distribution=?,domain=?,environment=?,version=?,tier=?,ha_role=?,dba_sme=?,sn_group=?,compliance=?,comments=?,ops_manager=?,app_name=?,app_family=?,host_name=?,location=?,app_vp_owner=?,pt_contact=?,pt_name=?,VP_name=? where id = ? ',[replica_set_name,instance_name,port,linux_version,status,distribution,domain,environment,version,tier,ha_role,dba_sme,sn_group,compliance,comments,ops_manager,app_name,app_family,host_name,location,app_vp_owner,pt_contact,pt_name,VP_name,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.get('/retrieveOracle',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Oracle',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/createOracle',(req,res) => {
    const instance_name = req.body.instance_name
    const db_name = req.body.db_name
    const rdbms = req.body.rdbms
    const Physical_VM = req.body.Physical_VM
    const VM_Cluster = req.body.VM_Cluster
    const status = req.body.status
    const domain = req.body.domain
    const cdb = req.body.cdb
    const environment = req.body.environment
    const version = req.body.version
    const ha_role = req.body.ha_role
    const location = req.body.location
    const oracle_home = req.body.oracle_home
    const port_num = req.body.port_num
    const db_size = req.body.db_size
    const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    const app_name = req.body.app_name
    const app_family = req.body.app_family
    const host_name = req.body.host_name
    const app_vp_owner = req.body.app_vp_owner
    const pt_contact=req.body.pt_contact
    const pt_name=req.body.pt_name
    const VP_name=req.body.VP_name
    

    db.query('INSERT INTO DB_Inv_Oracle(instance_name,db_name,rdbms,status,domain,cdb,environment,version,ha_role,location,oracle_home,port_num,db_size,dba_sme,sn_group,compliance,comments,app_name,app_family,host_name,app_vp_owner,pt_contact,pt_name,VP_name,VM_Cluster,Physical_VM) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [instance_name,db_name,rdbms,status,domain,cdb,environment,version,ha_role,location,oracle_home,port_num,db_size,dba_sme,sn_group,compliance,comments,app_name,app_family,host_name,app_vp_owner,pt_contact,pt_name,VP_name,VM_Cluster,Physical_VM], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/deleteOracle/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Inv_Oracle WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


app.put("/updateOracle",(req,res) => {
    const id = req.body.id;
    const instance_name = req.body.instance_name
    const db_name = req.body.db_name
    const rdbms = req.body.rdbms
    const Physical_VM = req.body.Physical_VM
    const VM_Cluster = req.body.VM_Cluster
    const status = req.body.status
    const domain = req.body.domain
    const cdb = req.body.cdb
    const environment = req.body.environment
    const version = req.body.version
    const ha_role = req.body.ha_role
    const location = req.body.location
    const oracle_home = req.body.oracle_home
    const port_num = req.body.port_num
    const db_size = req.body.db_size
    const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    const app_name = req.body.app_name
    const app_family = req.body.app_family
    const host_name = req.body.host_name
    const app_vp_owner = req.body.app_vp_owner
    const pt_contact=req.body.pt_contact
    const pt_name=req.body.pt_name
    const VP_name=req.body.VP_name
    
    db.query('UPDATE DB_Inv_Oracle SET instance_name=?,db_name=?,rdbms=?,status=?,domain=?,cdb=?,environment=?,version=?,ha_role=?,location=?,oracle_home=?,port_num=?,db_size=?,dba_sme=?,sn_group=?,compliance=?,comments=?,app_name=?,app_family=?,host_name=?,app_vp_owner=?,pt_contact=?,pt_name=?,VP_name=?,Physical_VM=?,VM_Cluster=? where id = ? ',[instance_name,db_name,rdbms,status,domain,cdb,environment,version,ha_role,location,oracle_home,port_num,db_size,dba_sme,sn_group,compliance,comments,app_name,app_family,host_name,app_vp_owner,pt_contact,pt_name,VP_name,Physical_VM,VM_Cluster,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.get('/retrievePostgres',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Postgresql',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/createPostgres',(req,res) => {
    const rdbms = req.body.rdbms
    const instance_name = req.body.instance_name
    const port = req.body.port
    const db_name = req.body.db_name
    const status = req.body.status
    const domain = req.body.domain
    const environment = req.body.environment
    const version = req.body.version
    const ha_role = req.body.ha_role
    const db_size = req.body.db_size
    const db_replication_type = req.body.db_replication_type
    const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    const db_dfo = req.body.db_dfo
    const app_name = req.body.app_name
    const app_family = req.body.app_family
    const host_name = req.body.host_name
    const distribution = req.body.distribution
    const location = req.body.location

    db.query('INSERT INTO DB_Inv_Postgresql(rdbms,instance_name,port,db_name,status,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,db_dfo,app_name,app_family,host_name,distribution,location) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [rdbms,instance_name,port,db_name,status,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,db_dfo,app_name,app_family,host_name,distribution,location], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});


app.put("/updatePostgres",(req,res) => {
    const id = req.body.id;
    const rdbms = req.body.rdbms
    const instance_name = req.body.instance_name
    const port = req.body.port
    const db_name = req.body.db_name
    const status = req.body.status
    const domain = req.body.domain
    const environment = req.body.environment
    const version = req.body.version
    const ha_role = req.body.ha_role
    const db_size = req.body.db_size
    const db_replication_type = req.body.db_replication_type
    const dba_sme = req.body.dba_sme
    const sn_group = req.body.sn_group
    const compliance = req.body.compliance
    const comments = req.body.comments
    const db_dfo = req.body.db_dfo
    const app_name = req.body.app_name
  const app_family = req.body.app_family
    const host_name = req.body.host_name
    const distribution = req.body.distribution
    const location = req.body.location
    
    db.query('UPDATE DB_Inv_Postgresql SET rdbms=?,instance_name=?,port=?,db_name=?,status=?,domain=?,environment=?,version=?,ha_role=?,db_size=?,db_replication_type=?,dba_sme=?,sn_group=?,compliance=?,comments=?,db_dfo=?,app_name=?,app_family=?,host_name=?,distribution=?,location=? where id = ? ',[rdbms,instance_name,port,db_name,status,domain,environment,version,ha_role,db_size,db_replication_type,dba_sme,sn_group,compliance,comments,db_dfo,app_name,app_family,host_name,distribution,id,location],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.delete("/deletePostgres/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Inv_Postgresql WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.get('/retrieveApp',(req,res) => {
    db.query('SELECT * FROM App_Inv',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/createApp',(req,res) => {
    console.log(req.body)
	const app_name=req.body.app_name
    const app_family = req.body.app_family
    const current_state = req.body.current_state
    const reporting_name = req.body.reporting_name
    const brief_func = req.body.brief_func
    const apm_owner = req.body.apm_owner
    const app_type = req.body.app_type
    const app_tech = req.body.app_tech
    const db_tech = req.body.db_tech
    const no_users = req.body.no_users
    const availability = req.body.availability
    const oper_impact = req.body.oper_impact
    const revenue_impact = req.body.revenue_impact
    const stores_or_custimpact = req.body.stores_or_custimpact
    

    db.query('INSERT INTO App_Inv(app_name,app_family,current_state,reporting_name,brief_func,apm_owner,app_type,app_tech,db_tech,no_users,availability,oper_impact,revenue_impact,stores_or_custimpact) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [app_name,app_family,current_state,reporting_name,brief_func,apm_owner,app_type,app_tech,db_tech,no_users,availability,oper_impact,revenue_impact,stores_or_custimpact], 
    (err, result) => {
        if(err){
            console.log(err)
    
        }else{
            res.send("Insererted..")
        }
    });

});


app.put("/updateApp",(req,res) => {
    console.log(req.body)
    const oldapp_name=req.body.oldapp_name
    const newapp_name=req.body.newapp_name
   const app_family = req.body.app_family
    const current_state = req.body.current_state
    const reporting_name = req.body.reporting_name
    const brief_func = req.body.brief_func
    const apm_owner = req.body.apm_owner
    const app_type = req.body.app_type
    const app_tech = req.body.app_tech
    const db_tech = req.body.db_tech
    const no_users = req.body.no_users
    const availability = req.body.availability
    const oper_impact = req.body.oper_impact
    const revenue_impact = req.body.revenue_impact
    const stores_or_custimpact = req.body.stores_or_custimpact
    db.query('UPDATE App_Inv SET app_name=?,app_family=?,current_state=?,reporting_name=?,brief_func=?,apm_owner=?,app_type=?,app_tech=?,db_tech=?,no_users=?,availability=?,oper_impact=?,revenue_impact=?,stores_or_custimpact=? where app_name = ? ',[newapp_name,app_family,current_state,reporting_name,brief_func,apm_owner,app_type,app_tech,db_tech,no_users,availability,oper_impact,revenue_impact,stores_or_custimpact,oldapp_name],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.delete("/deleteApp/:app_name", (req, res) => {
    const app_name1 = req.params.app_name;
    //console.log(id)
    db.query("DELETE FROM App_Inv WHERE app_name = ?", app_name1, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

 app.post('/createApp1',(req,res) => {
    console.log(req.body)
	const app_name=req.body.app_name
    const app_family = req.body.app_family
    //const app_key = req.body.app_key
    const app_vp_owner = req.body.app_vp_owner
    const app_business_type = req.body.app_business_type
    const current_state = req.body.current_state
    const brief_func = req.body.brief_func
    const pt_contact=req.body.pt_contact
    const pt_name=req.body.pt_name
    

    db.query('INSERT INTO App_Inv(app_name,app_family,current_state,brief_func,app_vp_owner,app_business_type,pt_contact,pt_name,VP_name) VALUES(?,?,?,?,?,?,?,?,?)',[app_name,app_family,current_state,brief_func,app_vp_owner,app_business_type,pt_contact,pt_name,VP_name],(err, result) => {
        if(err){
            console.log(err)
    
        }else{
            res.send("Insererted..")
        }
    });

});



app.put("/updateApp1",(req,res) => {
    console.log(req.body)
    const oldapp_name=req.body.oldapp_name
    const newapp_name=req.body.newapp_name
    const app_family = req.body.app_family
    //const app_key = req.body.app_key
    const app_vp_owner = req.body.app_vp_owner
    const app_business_type = req.body.app_business_type
    const current_state = req.body.current_state
    const brief_func = req.body.brief_func
    const pt_contact=req.body.pt_contact
    const pt_name=req.body.pt_name
    const VP_name=req.body.VP_name
    
    db.query('UPDATE App_Inv SET app_name=?,app_family=?,current_state=?,brief_func=?,app_vp_owner=?,app_business_type=?,pt_contact=?,pt_name=?,VP_name=? where app_name = ? ',[newapp_name,app_family,current_state,brief_func,app_vp_owner,app_business_type,pt_contact,pt_name,VP_name,oldapp_name],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.delete("/deleteApp1/:app_name", (req, res) => {
    const app_name1 = req.params.app_name;
    //console.log(id)
    db.query("DELETE FROM App_Inv WHERE app_name = ?", app_name1, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


app.get('/retrieveApp1',(req,res) => {
    db.query('SELECT * FROM App_Inv',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.get('/retrieveHost',(req,res) => {
    db.query('SELECT * FROM Host_Inv',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/createHost',(req,res) => {
    console.log(req.body)
    const host_name=req.body.host_name
    //const app_key = req.body.app_key
    const tier = req.body.tier
    const compliance = req.body.compliance
    const comments = req.body.comments
    const decommission = req.body.decommission
    const type = req.body.type
    const host_name_2 = req.body.host_name_2
    const os_version = req.body.os_version
    const ha_role = req.body.ha_role
    const validated_date = req.body.validated_date
    const ip_addr = req.body.ip_addr
    const machine_serial = req.body.machine_serial
    const os = req.body.os
    const vm = req.body.vm
    const capped = req.body.capped
    const processor_type = req.body.processor_type
    const cpu_usage_mean = req.body.cpu_usage_mean
    const cpu_usage_max = req.body.cpu_usage_max
    const no_of_cores = req.body.no_of_cores
    const licenses = req.body.licenses
    const v_cpu = req.body.v_cpu
    const core_multiplier = req.body.core_multiplier
    const app = req.body.app
    const nis_uds = req.body.nis_uds
    

    db.query('INSERT INTO Host_Inv(host_name,tier,compliance,comments,decommission,type,host_name_2 ,os_version ,ha_role ,validated_date,ip_addr ,machine_serial,os,vm,capped ,processor_type,cpu_usage_mean,cpu_usage_max,no_of_cores,licenses,v_cpu,core_multiplier,app ,nis_uds) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [host_name,tier,compliance,comments,decommission,type,host_name_2 ,os_version ,ha_role ,validated_date,ip_addr ,machine_serial,os,vm,capped ,processor_type,cpu_usage_mean,cpu_usage_max,no_of_cores,licenses,v_cpu,core_multiplier,app ,nis_uds], 
    (err, result) => {
        if(err){
            console.log(err)
            return err 
        }else{
            res.send("Insererted..")
        }
    });

});



app.put("/updateHost",(req,res) => {
    console.log(req.body)
    const newhost_name = req.body.newhost_name
    const oldhost_name=req.body.oldhost_name
    //const app_key = req.body.app_key
    const tier = req.body.tier
    const compliance = req.body.compliance
    const comments = req.body.comments
    const decommission = req.body.decommission
    const type = req.body.type
    const host_name_2 = req.body.host_name_2
    const os_version = req.body.os_version
    const ha_role = req.body.ha_role
    const validated_date = req.body.validated_date
    const ip_addr = req.body.ip_addr
    const machine_serial = req.body.machine_serial
    const os = req.body.os
    const vm = req.body.vm
    const capped = req.body.capped
    const processor_type = req.body.processor_type
    const cpu_usage_mean = req.body.cpu_usage_mean
    const cpu_usage_max = req.body.cpu_usage_max
    const no_of_cores = req.body.no_of_cores
    const licenses = req.body.licenses
    const v_cpu = req.body.v_cpu
    const core_multiplier = req.body.core_multiplier
    const app = req.body.app
    const nis_uds = req.body.nis_uds
    db.query('UPDATE Host_Inv SET host_name=?,tier=?,compliance=?,comments=?,decommission=?,type=?,host_name_2 =?,os_version =?,ha_role =?,validated_date=?,ip_addr =?,machine_serial=?,os=?,vm=?,capped =?,processor_type=?,cpu_usage_mean=?,cpu_usage_max=?,no_of_cores=?,licenses=?,v_cpu=?,core_multiplier=?,app =?,nis_uds=? where host_name = ?',[newhost_name,tier,compliance,comments,decommission,type,host_name_2 ,os_version ,ha_role ,validated_date,ip_addr ,machine_serial,os,vm,capped ,processor_type,cpu_usage_mean,cpu_usage_max,no_of_cores,licenses,v_cpu,core_multiplier,app ,nis_uds,oldhost_name],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.delete("/deleteHost/:host_name", (req, res) => {
    const host_name1 = req.params.host_name;
    //console.log(id)
    db.query("DELETE FROM Host_Inv WHERE host_name = ?", host_name1, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.get('/retrieve_oci',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Oracle_OCI',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/create_oci',(req,res) => {
    console.log(req.body)
    const Parent_Compartment_Name = req.body.Parent_Compartment_Name
    const Compartment_Name = req.body.Compartment_Name
    const Logical_DB_Display_name = req.body.Logical_DB_Display_name
    const Licence_Model = req.body.Licence_Model
    const CPU_Core_Count = req.body.CPU_Core_Count
    const Lifecycle_State = req.body.Lifecycle_State
    const Machine_Shape = req.body.Machine_Shape
    const EXA_VM = req.body.EXA_VM
    const Node_Count = req.body.Node_Count
    const RAC_NON_RAC = req.body.RAC_NON_RAC
    const DB_Edition = req.body.DB_Edition


    db.query('INSERT INTO DB_Inv_Oracle_OCI(Parent_Compartment_Name,Compartment_Name,Logical_DB_Display_name,Licence_Model,CPU_Core_Count,Lifecycle_State,Machine_Shape,EXA_VM,Node_Count,RAC_NON_RAC,DB_Edition) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    [Parent_Compartment_Name,Compartment_Name,Logical_DB_Display_name,Licence_Model,CPU_Core_Count,Lifecycle_State,Machine_Shape,EXA_VM,Node_Count,RAC_NON_RAC,DB_Edition], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/delete_oci/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Inv_Oracle_OCI WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put("/update_oci",(req,res) => {
   console.log(req.body)
   const id = req.body.id
    const Parent_Compartment_Name = req.body.Parent_Compartment_Name
    const Compartment_Name = req.body.Compartment_Name
    const Logical_DB_Display_name = req.body.Logical_DB_Display_name
    const Licence_Model = req.body.Licence_Model
    const CPU_Core_Count = req.body.CPU_Core_Count
    const Lifecycle_State = req.body.Lifecycle_State
    const Machine_Shape = req.body.Machine_Shape
    const EXA_VM = req.body.EXA_VM
    const Node_Count = req.body.Node_Count
    const RAC_NON_RAC = req.body.RAC_NON_RAC
    const DB_Edition = req.body.DB_Edition
    
    db.query(`UPDATE DB_Inv_Oracle_OCI SET Parent_Compartment_Name=?,Compartment_Name=?,Logical_DB_Display_name=?,Licence_Model=?,CPU_Core_Count=?,Lifecycle_State=?,Machine_Shape=?,EXA_VM=?,Node_Count=?,RAC_NON_RAC=?,DB_Edition=? where id = ? `,[Parent_Compartment_Name,Compartment_Name,Logical_DB_Display_name,Licence_Model,CPU_Core_Count,Lifecycle_State,Machine_Shape,EXA_VM,Node_Count,RAC_NON_RAC,DB_Edition,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});



app.get('/retrieve_physical_vm',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Physical_VM',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/create_physical_vm',(req,res) => {
    console.log(req.body)
    const VIP_Hostname = req.body.VIP_Hostname
    const Hostname = req.body.Hostname
    const Os_Type = req.body.Os_Type
    const Memory = req.body.Memory
    const CPU = req.body.CPU
    const Processor_Type = req.body.Processor_Type
    const Total_Cores = req.body.Total_Cores
    const License_Counted = req.body.License_Counted
    const Machine_Serial = req.body.Machine_Serial
    const RAC_NON_RAC = req.body.RAC_NON_RAC
    const Env_Type = req.body.Env_Type
	const Corp_Gid = req.body.Corp_Gid
	const Version = req.body.Version
	const Status = req.body.Status
	const Physical_VM = req.body.Physical_VM


    db.query('INSERT INTO DB_Inv_Physical_VM(VIP_Hostname,Hostname,Os_Type,Memory,CPU,Processor_Type,Total_Cores,License_Counted,Machine_Serial,RAC_NON_RAC,Env_Type,Corp_Gid,Version,Status,Physical_VM) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [VIP_Hostname,Hostname,Os_Type,Memory,CPU,Processor_Type,Total_Cores,License_Counted,Machine_Serial,RAC_NON_RAC,Env_Type,Corp_Gid,Version,Status,Physical_VM], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/delete_physical_vm/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Inv_Physical_VM WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put("/update_oci",(req,res) => {
   console.log(req.body)
   const id = req.body.id
    const VIP_Hostname = req.body.VIP_Hostname
    const Hostname = req.body.Hostname
    const Os_Type = req.body.Os_Type
    const Memory = req.body.Memory
    const CPU = req.body.CPU
    const Processor_Type = req.body.Processor_Type
    const Total_Cores = req.body.Total_Cores
    const License_Counted = req.body.License_Counted
    const Machine_Serial = req.body.Machine_Serial
    const RAC_NON_RAC = req.body.RAC_NON_RAC
    const Env_Type = req.body.Env_Type
	const Corp_Gid = req.body.Corp_Gid
	const Version = req.body.Version
	const Status = req.body.Status
	const Physical_VM = req.body.Physical_VM
    
    db.query(`UPDATE DB_Inv_Physical_VM SET VIP_Hostname=?,Hostname=?,Os_Type=?,Memory=?,CPU=?,Processor_Type=?,Total_Cores=?,License_Counted=?,Machine_Serial=?,RAC_NON_RAC=?,Env_Type=?,Corp_Gid=?,Version=?,Status=?,Physical_VM=? where id = ? `,[VIP_Hostname,Hostname,Os_Type,Memory,CPU,Processor_Type,Total_Cores,License_Counted,Machine_Serial,RAC_NON_RAC,Env_Type,Corp_Gid,Version,Status,Physical_VM,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});


app.get('/retrieveDB2',(req,res) => {
    db.query('SELECT * FROM DB_Inv_DB2',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/createDB2',(req,res) => {
    console.log(req.body)
const environment= req.body.environment
const host_name1= req.body.host_name1
const host_name2= req.body.host_name2
const vip_name= req.body.vip_name
const db_version= req.body.db_version
const instance_name= req.body.instance_name
const port= req.body.port
const db_name= req.body.db_name
const ha_type= req.body.ha_type
const core_srvr= req.body.core_srvr
const Total_cores= req.body.Total_cores
const Processor_Type= req.body.Processor_Type
const OS_version= req.body.OS_version
const Product_name= req.body.Product_name
const rdbms= req.body.rdbms
const status= req.body.status
const location= req.body.location
const dba_sme= req.body.dba_sme
const sn_group= req.body.sn_group
const compliance= req.body.compliance
const comments= req.body.comments
const app_name= req.body.app_name
const app_vp_owner= req.body.app_vp_owner
const pt_contact= req.body.pt_contact
const pt_name= req.body.pt_name
const VP_name= req.body.VP_name

    db.query('INSERT INTO DB_Inv_DB2(environment,host_name1,host_name2,vip_name,db_version,instance_name,port,db_name,ha_type,core_srvr,Total_cores,Processor_Type,OS_version,Product_name,rdbms,status,location,dba_sme,sn_group,compliance,comments,app_name,app_vp_owner,pt_contact,pt_name,VP_name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [environment,host_name1,host_name2,vip_name,db_version,instance_name,port,db_name,ha_type,core_srvr,Total_cores,Processor_Type,OS_version,Product_name,rdbms,status,location,dba_sme,sn_group,compliance,comments,app_name,app_vp_owner,pt_contact,pt_name,VP_name], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/deleteDB2/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Inv_DB2 WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put("/updateDB2",(req,res) => {
   console.log(req.body)
const id = req.body.id
const environment= req.body.environment
const host_name1= req.body.host_name1
const host_name2= req.body.host_name2
const vip_name= req.body.vip_name
const db_version= req.body.db_version
const instance_name= req.body.instance_name
const port= req.body.port
const db_name= req.body.db_name
const ha_type= req.body.ha_type
const core_srvr= req.body.core_srvr
const Total_cores= req.body.Total_cores
const Processor_Type= req.body.Processor_Type
const OS_version= req.body.OS_version
const Product_name= req.body.Product_name
const rdbms= req.body.rdbms
const status= req.body.status
const location= req.body.location
const dba_sme= req.body.dba_sme
const sn_group= req.body.sn_group
const compliance= req.body.compliance
const comments= req.body.comments
const app_name= req.body.app_name
const app_vp_owner= req.body.app_vp_owner
const pt_contact= req.body.pt_contact
const pt_name= req.body.pt_name
const VP_name= req.body.VP_name
    
    db.query('UPDATE DB_Inv_DB2 SET environment=?,host_name1=?,host_name2=?,vip_name=?,db_version=?,instance_name=?,port=?,db_name=?,ha_type=?,core_srvr=?,Total_cores=?,Processor_Type=?,OS_version=?,Product_name=?,rdbms=?,status=?,location=?,dba_sme=?,sn_group=?,compliance=?,comments=?,app_name=?,app_vp_owner=?,pt_contact=?,pt_name=?,VP_name=? where id = ? ',[environment,host_name1,host_name2,vip_name,db_version,instance_name,port,db_name,ha_type,core_srvr,Total_cores,Processor_Type,OS_version,Product_name,rdbms,status,location,dba_sme,sn_group,compliance,comments,app_name,app_vp_owner,pt_contact,pt_name,VP_name,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.get('/retrieveInformix',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Informix',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/createInformix',(req,res) => {
    console.log(req.body)
const environment= req.body.environment
const rdbms= req.body.rdbms
const host_name= req.body.host_name
const vip_name= req.body.vip_name
const db_version= req.body.db_version
const db_name= req.body.db_name
const db_config= req.body.db_config
const os_version= req.body.os_version
const application= req.body.application
const tier= req.body.tier
const dba_sme= req.body.dba_sme
const location= req.body.location
const app_vp_owner= req.body.app_vp_owner
const pt_name= req.body.pt_name
const pt_contact= req.body.pt_contact
const VP_name= req.body.VP_name

    db.query('INSERT INTO DB_Inv_Informix(environment,rdbms,host_name,vip_name,db_version,db_name,db_config,os_version,application,tier,dba_sme,location,app_vp_owner,pt_name,pt_contact,VP_name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[environment,rdbms,host_name,vip_name,db_version,db_name,db_config,os_version,application,tier,dba_sme,location,app_vp_owner,pt_name,pt_contact,VP_name], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/deleteInformix/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Inv_Informix WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put("/updateInformix",(req,res) => {
   console.log(req.body)
const id = req.body.id
const environment= req.body.environment
const rdbms= req.body.rdbms
const host_name= req.body.host_name
const vip_name= req.body.vip_name
const db_version= req.body.db_version
const db_name= req.body.db_name
const db_config= req.body.db_config
const os_version= req.body.os_version
const application= req.body.application
const tier= req.body.tier
const dba_sme= req.body.dba_sme
const location= req.body.location
const app_vp_owner= req.body.app_vp_owner
const pt_name= req.body.pt_name
const pt_contact= req.body.pt_contact
const VP_name= req.body.VP_name
    
    db.query('UPDATE DB_Inv_Informix SET environment=?,rdbms=?,host_name=?,vip_name=?,db_version=?,db_name=?,db_config=?,os_version=?,application=?,tier=?,dba_sme=?,location=?,app_vp_owner=?,pt_name=?,pt_contact=?,VP_name=? where id = ? ',[environment,rdbms,host_name,vip_name,db_version,db_name,db_config,os_version,application,tier,dba_sme,location,app_vp_owner,pt_name,pt_contact,VP_name,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});


app.get('/retrieveAIX',(req,res) => {
    db.query('SELECT * FROM DB_Consolidated_LPARS',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.post('/createAIX',(req,res) => {
    console.log(req.body)
const Location= req.body.Location
const HMC= req.body.HMC
const Managed_System_Name= req.body.Managed_System_Name
const Managed_System_Serial= req.body.Managed_System_Serial
const Name= req.body.Name
const OS= req.body.OS
const OS_Version= req.body.OS_Version
const IP_Address= req.body.IP_Address
const APP$DB= req.body.APP$DB
const Environment= req.body.Environment
const Business_Contacts= req.body.Business_Contacts
const Comments= req.body.Comments
const Propose_Decommission$Migration= req.body.Propose_Decommission$Migration
const DG_Details= req.body.DG_Details
const Alias_Name= req.body.Alias_Name
const Alias_IP_Address= req.body.Alias_IP_Address

    db.query('INSERT INTO DB_Consolidated_LPARS(Location,HMC,Managed_System_Name,Managed_System_Serial,Name,OS,OS_Version,IP_Address,APP$DB,Environment,Business_Contacts,Comments,Propose_Decommission$Migration,DG_Details,Alias_Name,Alias_IP_Address) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[Location,HMC,Managed_System_Name,Managed_System_Serial,Name,OS,OS_Version,IP_Address,APP$DB,Environment,Business_Contacts,Comments,Propose_Decommission$Migration,DG_Details,Alias_Name,Alias_IP_Address], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/deleteAIX/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Consolidated_LPARS WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.put("/updateAIX",(req,res) => {
   console.log(req.body)
const id = req.body.id
const Location= req.body.Location
const HMC= req.body.HMC
const Managed_System_Name= req.body.Managed_System_Name
const Managed_System_Serial= req.body.Managed_System_Serial
const Name= req.body.Name
const OS= req.body.OS
const OS_Version= req.body.OS_Version
const IP_Address= req.body.IP_Address
const APP$DB= req.body.APP$DB
const Environment= req.body.Environment
const Business_Contacts= req.body.Business_Contacts
const Comments= req.body.Comments
const Propose_Decommission$Migration= req.body.Propose_Decommission$Migration
const DG_Details= req.body.DG_Details
const Alias_Name= req.body.Alias_Name
const Alias_IP_Address= req.body.Alias_IP_Address
    
    db.query('UPDATE DB_Consolidated_LPARS SET Location=?,HMC=?,Managed_System_Name=?,Managed_System_Serial=?,Name=?,OS=?,OS_Version=?,IP_Address=?,APP$DB=?,Environment=?,Business_Contacts=?,Comments=?,Propose_Decommission$Migration=?,DG_Details=?,Alias_Name=?,Alias_IP_Address=? where id = ? ',[Location,HMC,Managed_System_Name,Managed_System_Serial,Name,OS,OS_Version,IP_Address,APP$DB,Environment,Business_Contacts,Comments,Propose_Decommission$Migration,DG_Details,Alias_Name,Alias_IP_Address,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

/*  app.get('/retrieveOracleOci',(req,res) => {
    db.query('SELECT * FROM DB_Inv_Oracle_OCI',(err,result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    })
})
app.post('/createOracleOci',(req,res) => {
    const parent_compartment_name = req.body.parent_compartment_name
    const compartment_name = req.body.compartment_name
    const logical_db_display_name = req.body.logical_db_display_name
    const licence_model = req.body.licence_model
    const cpu_core_count = req.body.cpu_core_count
    const lifecycle_state = req.body.lifecycle_state
    const machine_shape = req.body.machine_shape
    const exa_vm = req.body.exa_vm
    const node_count = req.body.node_count
    const rac_non-rac = req.body.rac_non_rac
    const db_edition = req.body.db_edition
        

    db.query('INSERT INTO DB_Inv_Oracle_OCI(Parent_Compartment_Name,Compartment_Name,Logical_DB_Display_name, Licence_Model,CPU_Core_Count, Lifecycle_State, Machine_Shape, EXA_VM, Node_Count, RAC_NON-RAC, DB_Edition) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    [parent_compartment_name,compartment_name,logical_db_display_name,licence_model,cpu_core_count,lifecycle_state,machine_shape,exa_vm,node_count,rac_non-rac,db_edition], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Inserted..")
        }
    });

});

app.delete("/deleteOracleOci/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM DB_Inv_Oracle_OCI WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


app.put("/updateOracleOci",(req,res) => {
    const id = req.body.id;
     const parent_compartment_name = req.body.parent_compartment_name
    const compartment_name = req.body.compartment_name
    const logical_db_display_name = req.body.logical_db_display_name
    const licence_model = req.body.licence_model
    const cpu_core_count = req.body.cpu_core_count
    const lifecycle_state = req.body.lifecycle_state
    const machine_shape = req.body.machine_shape
    const exa_vm = req.body.exa_vm
    const node_count = req.body.node_count
    const rac_non-rac = req.body.rac_non_rac
    const db_edition = req.body.db_edition
    
    db.query('UPDATE DB_Inv_Oracle_OCI SET Parent_Compartment_Name=?,Compartment_Name=?,Logical_DB_Display_name=?,Licence_Model=?,CPU_Core_Count=?,Lifecycle_State=?,Machine_Shape=?,EXA_VM=?,Node_Count=?,RAC_NON-RAC=?,DB_Edition=?where id = ? ',[parent_compartment_name,compartment_name,logical_db_display_name,licence_model,cpu_core_count,lifecycle_state,machine_shape,exa_vm,node_count,rac_non-rac,db_edition,id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
})


*/

app.put('/generateSoxReport', (req, res) => {
    var dataToSend = "";
    console.time()
    console.log(req.body+"->1")
    let dataToWrite1 = ""
    req.body.params.arrayy.forEach(database => {
        dataToWrite1 += database
        dataToWrite1 += ","
    });
    dataToSend += dataToWrite1
    dataToWrite1 = dataToWrite1.slice(0,-1)
    console.log(dataToWrite1)
    fs.writeFile("DBS.txt", dataToWrite1, function (err) {
        if (err) 
            console.log(err);
        else
            console.log("DBS - File Saved!");
    })
    
    let dataToWrite2 = ""
    req.body.params.cs.forEach(constr => {
        dataToWrite2 += constr
        dataToWrite2 += ","
    });
    dataToSend += dataToWrite2
    dataToWrite2 = dataToWrite2.slice(0,-1)
    console.log(dataToWrite2)
    fs.writeFile("con_str.txt", dataToWrite2, function (err) {
        if (err) 
            console.log(err);
        else
            console.log("con_str - File Saved!");
    })

    const python = spawn('/usr/local/bin/python', ['script.py']);    
 
    dataToSend += ", After .py script"
    python.stdout.on('data', function (data) {
    dataToSend += " inside stdout "
    
    console.log('Pipe data from python script ...');
    
    dataToSend += data.toString()

    });

	python.stderr.on("data", (data) => {

	dataToSend = ", error:"+data

	});
  
    python.on('close', (code) => {
    
    console.log('child process close all stdio with code ${code}');
    

    dataToSend += ", before sending response "    

    res.send(dataToSend)
    })



	//let options = {
    	//mode: 'text',
    	//pythonOptions: ['-u'],     
	//};
 
	//var response = ""
	//PythonShell.run('script.py', options, function (err, result){
      	//if (err) {
        //response += "error: " + err
      		//}
           //response += "result: " + result.toString()
      	//res.send(response)
	//});


   });


app.listen(8000,hostname,() => {
    console.log("running 8000");
       // console.log('Server running at http://${hostname}');
   return("anything");   
});

