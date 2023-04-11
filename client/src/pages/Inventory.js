import React from 'react';
//import { MySqlTable, MsSqlTable, MongoTable, OracleTable, PostgresTable,AppTable} from './Table';

import { MysqlTable,MSsqlTable,MongoTable,OracleTable,PostgresTable,AppTable,HostTable,RedisTable,Reports,OCI,Physical_VM,DB2Table,InformixTable,AIX} from './Table';

import mongodb from './images/mongodb.jpg';
import mysql from './images/mysql.jpg';
import mssql from './images/mssql.jpg';
import postgresql from './images/postgresql.jpg';
import application from './images/application.png';
import oracle from './images/oracle.png';
import bg from './images/background1.jpg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Content = styled.div`
    border: 1px solid #000;
    background-image:  url(${bg});
    width: 100vw;
    height: 100vh;
`
export const Inventory = () => {
    return (
      

	 <Content>
  <div className='row'>
      <div className="column">
      <Link to={"/inventory/mongodb"}>
              <img src={mongodb} alt="img" title='MongoDB'  style={{width:'100%'}} />
      </Link>
      </div>
      <div className="column">
       <Link to={"/inventory/mysql"}>
              <img src={mysql} alt="img" title='MySQL'  style={{width:'100%'}}/>
       </Link>
      </div>
      <div className="column">
      <Link to={"/inventory/mssql"}>
              <img src={mssql} alt="img" title='MsSQL'  style={{width:'100%'}} />
       </Link>
      </div>
      </div> 
      <div className='row'>
      <div className="column">
      <Link to={"/application"}>
              <img src={application} alt="img" title='Application Inventory'  style={{width:'100%'}} />
       </Link>
      </div>
      <div className="column">
      <Link to={"/inventory/postgresql"}>
              <img src={postgresql} alt="img" title='PostgresSQL'  style={{width:'60%'}} />
       </Link>
      </div>
      <div className="column">
      <Link to={"/inventory/oracle"}>
              <img src={oracle} alt="img" title='Oracle' style={{width:'150%'}} />
      </Link>
      </div>
       <div className="column">
      <Link to={"/inventory/oracle/OCI"}>
              
      </Link>
      </div>
      <div className="column">
      <Link to={"/inventory/oracle/physical_vm"}>
              
      </Link>
      </div>
      <div className="column">
      <Link to={"/inventory/db2"}>
              
      </Link>
      </div>

      </div>
</Content>

    );
  };



 export const Report = () => {
    return (
      <div>
        <Reports/>
      </div>
    );
  };

  
  export const Application = () => {
    return (
      <div>
        <AppTable />
      </div>
    );
  };

  export const MYSQL = () => {
    return (
      <div>
        <MysqlTable/>
      </div>
    );
  };
  export const MSsql = () => {
    return (
      <div >
        <MSsqlTable />
      </div>
    );
  };
  
  export const MongoDB = () => {
    return (
      <div >
        <MongoTable />
      </div>
    );
    };
  
  export const Oracle = () => {
    return (
      <div >
        <OracleTable/>
      </div>
    );
  };


  export const Postgresql = () => {
    return (
      <div >
        <PostgresTable/>
      </div>
    );
};

export const Hosts = () => {
  return (
    <div >
      <HostTable/>
    </div>
  );
};
export const Redis = () => {
  return (
    <div >
      <RedisTable/>
    </div>
  );
};

 export const Oracle_OCI = () => {
    return (
      <div >
        <OCI/>
      </div>
    );
  };
  export const physical_vm = () => {
    return (
      <div >
// eslint-disable-next-line
        <Physical_VM/>
      </div>
    );
  };
export const DB2=()=>{
  return(
    <div>
      <DB2Table/>
    </div>
  )
}

export const Informix=()=>{
  return(
    <div>
      <InformixTable/>
    </div>
  )
}
export const AIX_INV=()=>{
  return(
    <div>
      <AIX/>
    </div>
  )
}

