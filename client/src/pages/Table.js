
import React from 'react';

import MaterialTable from 'material-table';
import Axios from "axios";
import {useState,useEffect} from "react";
import MyDialog from './MyDialog';
import { Button, TextField, Paper } from "@material-ui/core";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Add as AddIcon } from "@material-ui/icons";
import { databases } from './DBs';


export const Reports = () => {

 

  const [isCheckAll, setIsCheckAll] = useState(false);

   const [checkedState, setCheckedState] = useState(
    new Array(databases.length).fill(false)
  );

  const [total, setTotal] = useState(0); 
  const [arr, setArr] = useState([]);
  const [connectionStr,setConnectionStr] = useState([])

 

  const handleCheckAll = () => {
    let updatedCheckedState = {}
    setIsCheckAll(!isCheckAll)
    if(isCheckAll){
    updatedCheckedState = checkedState.map((item, index) =>
      item === true ? !item : item
    );
    setCheckedState(updatedCheckedState); 
  }
  else{
    updatedCheckedState = checkedState.map((item, index) =>
      item === false ? !item : item
    );
    
    setCheckedState(updatedCheckedState); 
  }
     const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + databases[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  }; 
  const settingArray = async () => {
    console.log("in settingArray")
//eslint-disable-next-line
    await checkedState.map((item,index) => {
      if (item===true) {
	console.log("true element")
        arr.push(databases[index].name)
        connectionStr.push(databases[index].cnctn_str)
      }
    })
   
    await setArr(arr);
    await setConnectionStr(connectionStr)
  } 
  
  const handleOnChange = (e,position) => {
    console.log(position) 
    
    // arr.push(e.target.value)
    const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item  : item
    );
    setCheckedState(updatedCheckedState); 

     const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          
          console.log(e.target.value)
          
          return sum + databases[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  }; 

  const generateR = async () => {
    await settingArray()
    
    console.log("ingenerateR",arr)
    Axios.put('http://localhost:8000/generateSoxReport', { params:{arrayy: arr, cs: connectionStr}})
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log("error: ",err);
      });
      setArr([])
    alert("done danaa done....!!!")
  } 

  return(
    
    <div className='main'>
      <h3>Select Instances</h3>

      <label className='selectall'>Select All</label>
      <input 
          type="checkbox"
          value="Select All"
          checked={isCheckAll}
          onChange={handleCheckAll}
         />
         <div className = 'sox'>
         <table  >
           <thead>
           <tr >
             <th>App Name</th>
             <th>DB Name</th>
             <th>Instance Name</th>
             <th>Check/Uncheck</th>
           </tr>
           </thead>
          <tbody>
            {
              databases.map(({name,appName,dbname},index) => {
                return(
                <tr key={index} >
                  <td>{appName}</td>
                  <td>{dbname}</td>
                  <td>{name}</td>
                  <td>
                  <input type = "checkbox"
                     id={`custom-checkbox-${index}`}
                     name={name}
                     value={name}
                     checked={checkedState[index]}
                     onChange={(e) => handleOnChange(e,index)}
                    />
                  </td>
                </tr>
              );
              })
            }
          </tbody>

         </table>
        </div>
          <button onClick={generateR} className='button'>Generate Reports</button>
    </div>
    

  );

}






export const MysqlTable = () => {   
              
const columns = [

      {title:'Rdbms',field:'rdbms'},
 {title:'Host Name',field:'host_name'},
      {title:'Instance Name',field:'instance_name'},
      {title:'Port',field:'port'},
      {title:'DB Name',field:'db_name',cellStyle: {minWidth:300 },},
      {title:'Status',field:'status'},
      {title:'Distribution',field:'distribution'},
      {title:'Domain',field:'domain'},
      {title:'Environment',field:'environment'},
      {title:'Version',field:'version'},
      {title:'HA Role',field:'ha_role'},
      {title:'DB size',field:'db_size',cellStyle: {minWidth:300},},
      {title:'DB Replication Type',field:'db_replication_type',cellStyle: {  minWidth:300},},
      {title:'DBA Owner',field:'dba_sme',cellStyle:{minWidth:300}},
      {title:'Support Group',field:'sn_group',cellStyle: {minWidth:300},},
      {title:'Compliance',field:'compliance'},
      {title:'Comments',field:'comments'},
      {title:'Db Dfo',field:'db_dfo',cellStyle:{minWidth:300}},
      {title:'App Name',field:'app_name',cellStyle: {minWidth:300},},
     {title:'App Family',field:'app_family',cellStyle: {minWidth:300},},
     {title:'Location',field:'location'},

  ]

const [details,setDetails] = useState([]);
  useEffect(() => {    
                const getDetails = async () => { 
                  const result = await Axios(' http://localhost:8000/retrieve'); // http://10.105.64.12:3000
                  setDetails(result.data);
                } 
                getDetails();  
                console.log(details);
                // eslint-disable-next-line    
              },[]); // eslint-disable-next-line
 

 /*const deleteDetail = (id) => {
    Axios.delete(` http://localhost:8000/deleteMysql/${id}`).then((response) => {
      //setDetails(response.data)
      getDetails();
    });
    
  };*/


  const getDetails = () => {
      Axios.get(" http://localhost:8000/retrieve").then((response) => {
        setDetails(response.data)
      })
    }

    window.addEventListener("load", getDetails);   
    const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogid, setDialogid] = useState('');
   const [dialogrdbms, setDialogrdbms] = useState('');
   const [dialoginstance_name, setDialoginstance_name] = useState('');
   const [dialogport, setDialogport] = useState('');
   const [dialogdb_name,setDialogdb_name]=useState('');
   const [dialogstatus,setDialogstatus]=useState('');
   const [dialogdistribution,setDialogdistribution]=useState('');
   const [dialogdomain,setDialogdomain]=useState('');
   const [dialogenvironment,setDialogenvironment]=useState('');
   const [dialogversion,setDialogversion]=useState('');
   const [dialogha_role,setDialogha_role]=useState('');
   const [dialogdb_size,setDialogdb_size]=useState('');
   const [dialogdb_replication_type,setDialogdb_replication_type]=useState('');
   const [dialogdba_sme,setDialogdba_sme]=useState('');
   const [dialogsn_group,setDialogsn_group]=useState('');
   const [dialogcompliance,setDialogcompliance]=useState('');
   const [dialogcomments,setDialogcomments]=useState('');
   const [dialogdb_dfo,setDialogdb_dfo]=useState('');
   const [dialogapp_name,setDialogapp_name]=useState('');
   const [dialogapp_family,setDialogapp_family]=useState('');
   const [dialoghost_name,setDialoghost_name]=useState('');
   const [dialoglocation,setDialoglocation]=useState('');
   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }
   const handlerdbms = event => {
    setDialogrdbms(event.target.value);
  }
  const handleinstance_name= event => {
    setDialoginstance_name(event.target.value);
  }
  const handleport = event => {
    setDialogport(event.target.value);
  }
  const handledb_name = event => {
    setDialogdb_name(event.target.value);
  }
  const handlestatus = event => {
    setDialogstatus(event.target.value);
  }
  const handledistribution = event => {
    setDialogdistribution(event.target.value);
  }
  const handledomain = event => {
    setDialogdomain(event.target.value);
  }
  const handleenvironment = event => {
    setDialogenvironment(event.target.value);
  }
  const handleversion = event => {
    setDialogversion(event.target.value);
  }
  const handleha_role = event => {
    setDialogha_role(event.target.value);
  }
  const handledb_size = event => {
    setDialogdb_size(event.target.value);
  }
  const handledb_replication_type= event => {
    setDialogdb_replication_type(event.target.value);
  }
  const handledba_sme= event => {
    setDialogdba_sme(event.target.value);
  }
  const handlesn_group= event => {
    setDialogsn_group(event.target.value);
  }
  const handlecompliance= event => {
    setDialogcompliance(event.target.value);
  }
  const handlecomments= event => {
    setDialogcomments(event.target.value);
  }
  const handledb_dfo= event => {
    setDialogdb_dfo(event.target.value);
  }
  const handleapp_name= event => {
    setDialogapp_name(event.target.value);
  }
   const handleapp_family= event => {
    setDialogapp_family(event.target.value);
  }
  const handlehost_name= event => {
    setDialoghost_name(event.target.value);
  }

 const handlelocation= event => {
    setDialoglocation(event.target.value);
  }

  const refreshPage=()=>{
    window.location.reload();
  }
  const handleUpdateRow = event => {
    if(!dialogrdbms||!dialoginstance_name||!dialogport||!dialogdistribution||!dialogdomain||!dialogenvironment||!dialogversion||!dialogsn_group||!dialogapp_name||!dialoghost_name)
    {
      alert("Enter mandatory fields");
      return;
    }
    setDetails(
     // {...details,[ event.app_name]: dialogapp_name ,[event.app_key]:dialogapp_key}
      {...details,[event.target.name]:event.target.value},
     
      );
       Axios.put(' http://localhost:8000/updateMysql', { 
                id:dialogid,
                rdbms: dialogrdbms,
                instance_name: dialoginstance_name,
                port: dialogport,
                db_name: dialogdb_name,
                status: dialogstatus,
                distribution: dialogdistribution,
                domain: dialogdomain,
                environment: dialogenvironment,
                version: dialogversion,
                ha_role: dialogha_role,
                db_size: dialogdb_size,
                db_replication_type: dialogdb_replication_type,
                dba_sme: dialogdba_sme,
                sn_group: dialogsn_group,
                compliance: dialogcompliance,
                comments: dialogcomments,
                db_dfo: dialogdb_dfo,
                app_name: dialogapp_name,
                app_family: dialogapp_family,
                host_name: dialoghost_name,
		location: dialoglocation, 
              })
              refreshPage();
		alert("successfully Edited!");
            }
  const handleAddnewRow=event=>{
    if(!dialogrdbms||!dialoginstance_name||!dialogport||!dialogdistribution||!dialogdomain||!dialogenvironment||!dialogversion||!dialogsn_group||!dialogapp_name||!dialoghost_name)
    {
      alert("Enter mandatory fields");
      return;
    }
    Axios.post(' http://localhost:8000/createMysql',{
      
                rdbms: dialogrdbms,
                instance_name: dialoginstance_name,
                port: dialogport,
                db_name: dialogdb_name,
                status: dialogstatus,
                distribution: dialogdistribution,
                domain: dialogdomain,
                environment: dialogenvironment,
                version: dialogversion,
                ha_role: dialogha_role,
                db_size: dialogdb_size,
                db_replication_type: dialogdb_replication_type,
                dba_sme: dialogdba_sme,
                sn_group: dialogsn_group,
                compliance: dialogcompliance,
                comments: dialogcomments,
                db_dfo: dialogdb_dfo,
                app_name: dialogapp_name,
                app_family: dialogapp_family,
                host_name: dialoghost_name,
		location: dialoglocation, })
                setDetails(
                  //getDetails(); 
                  // Here you can add the new row to whatever index you want
                  //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
               {...details,[event.target.name]:event.target.value},
              
               );
               refreshPage();
               alert("successfully Added!"); 
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);
                            
  const initialset=(rowData)=>{
    setDialogid(rowData.id);
    if (!isDialogOpen1) {
      setDialogrdbms(rowData.rdbms);
      setDialoginstance_name(rowData.instance_name);
      setDialogport(rowData.port);
      setDialogdb_name(rowData.db_name);
      setDialogstatus(rowData.status);
      setDialogdistribution(rowData.distribution);
      setDialogdomain(rowData.domain);
      setDialogenvironment(rowData.environment);
      setDialogversion(rowData.version);
      setDialogha_role(rowData.ha_role);
      setDialogdb_size(rowData.db_size);
      setDialogdb_replication_type(rowData.db_replication_type);
      setDialogdba_sme(rowData.dba_sme);
      setDialogsn_group(rowData.sn_group);
      setDialogcompliance(rowData.compliance);
      setDialogcomments(rowData.commnets);
      setDialogdb_dfo(rowData.db_dfo);
      setDialogapp_name(rowData.app_name);
       setDialogapp_family(rowData.app_family);
      setDialoghost_name(rowData.host_name);
      setDialoglocation(rowData.location);
  
              }
            }
const initialset1=()=>{
setDialogid("-");
if (!isDialogOpen1) {
  setDialogrdbms("-");
  setDialoginstance_name("-");
  setDialogport("-");
  setDialogdb_name("-");
  setDialogstatus("-");
  setDialogdistribution("-");
  setDialogdomain("-");
  setDialogenvironment("-");
  setDialogversion("-");
  setDialogha_role("-");
  setDialogdb_size("-");
  setDialogdb_replication_type("-");
  setDialogdba_sme("-");
  setDialogsn_group("-");
  setDialogcompliance("-");
  setDialogcomments("-");
  setDialogdb_dfo("-");
  setDialogapp_name("-");
 setDialogapp_family("-");
  setDialoghost_name("-");
  setDialoglocation("-");

          }
        }
const actions = [
  {
    icon: () => <FaIcons.FaEdit/>,
    tooltip: 'Edit Details',
    //isFreeAction: true,
    onClick: (event, rowData) => {
  
      initialset(rowData);
      
      setIsDialogOpen1(true);
      
    },
  },
  {
    icon: () => <AddIcon />,
    tooltip: 'Add',
    isFreeAction: true,
    onClick: (event, rowData) => {
      initialset1();
      setIsDialogOpen2(true);
    },
  }
];
  return (
   
      <div>
     
          <MaterialTable title="Mysql data"
          data = {details}
          columns = {columns}
          actions={actions}
          options = {{
              filtering: true,
              pagesize:20,
		pageSizeOptions:[20,50,80,110],
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
                
                           },
                exportAllData: true,
exportButton: true,
columnsButton:true,
                        
               maxBodyHeight: '100vh',  
               addRowPosition: "first",
               grouping:true
          }}
          

          editable={{
         /* onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...details, newRow ]
            Axios.post(' http://localhost:8000/createMysql',{
              rdbms: newRow.rdbms,
              instance_name: newRow.instance_name,
              port: newRow.port,
              db_name: newRow.db_name,
              status: newRow.status,
              distribution: newRow.distribution,
              domain: newRow.domain,
              environment: newRow.environment,
              version: newRow.version,
              ha_role: newRow.ha_role,
              db_size: newRow.db_size,
              db_replication_type: newRow.db_replication_type,
              dba_sme: newRow.dba_sme,
              sn_group: newRow.sn_group,
              compliance: newRow.compliance,
              comments: newRow.comments,
              db_dfo: newRow.db_dfo,
              app_name: newRow.app_name,
              host_name: newRow.host_name,
	      location: newRow.location,
          })
          setTimeout(() => {
              setDetails(updatedRows)
              getDetails()
              resolve()
            }, 1000)
          }),*/
         /* onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const id = selectedRow.id;
            deleteDetail(id);
            setTimeout(() => {
              resolve()
            }, 1000)
          }),*/

          /*onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...details]
            updatedRows[index]=updatedRow
            console.log(oldRow)
            Axios.put(' http://localhost:8000/updateMysql', { 
                rdbms: updatedRow.rdbms,
                instance_name: updatedRow.instance_name,
                port: updatedRow.port,
                db_name: updatedRow.db_name,
                status: updatedRow.status,
                distribution: updatedRow.distribution,
                domain: updatedRow.domain,
                environment: updatedRow.environment,
                version: updatedRow.version,
                ha_role: updatedRow.ha_role,
                db_size: updatedRow.db_size,
                db_replication_type: updatedRow.db_replication_type,
                dba_sme: updatedRow.dba_sme,
                sn_group: updatedRow.sn_group,
                compliance: updatedRow.compliance,
                comments: updatedRow.comments,
                db_dfo: updatedRow.db_dfo,
                app_name: updatedRow.app_name,
                host_name: updatedRow.host_name,
	        location: updatedRow.location, 
                id: oldRow.id
              })
            setTimeout(() => {
              setDetails(updatedRows)
              resolve()
            }, 1000)
          })
*/
    
    
            }}
          
          />
<MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogrdbms} onInput={handlerdbms} label="RDBMS"  required/></div>
          <div><TextField value={dialoginstance_name} onInput={handleinstance_name}  label="Instance-Name" required/></div>
          <div><TextField value={dialogport} onInput={handleport} label="Port" required/></div>
          <div><TextField value={dialogdb_name} onInput={handledb_name} label="DB-Name" /></div>
          <div><TextField value={dialogstatus} onInput={handlestatus} label="Status" /></div>
          <div><TextField value={dialogdistribution} onInput={handledistribution} label="Distribution" required /></div>
          <div><TextField value={dialogdomain} onInput={handledomain} label="Domain" required /></div>
          <div><TextField value={dialogenvironment} onInput={handleenvironment} label="Environment" required/></div>
          <div><TextField value={dialogversion} onInput={handleversion} label="Version" required /></div>
          <div><TextField value={dialogha_role} onInput={handleha_role} label="HA-Role" /></div>
          <div><TextField value={dialogdb_size} onInput={handledb_size} label="DB-Size" /></div>
          <div><TextField value={dialogdb_replication_type} onInput={handledb_replication_type} label="DB-Replication-Type" /></div>
          <div><TextField value={dialogdba_sme} onInput={handledba_sme} label="DBA-SME" /></div>
          <div><TextField value={dialogsn_group} onInput={handlesn_group} label="SN-Group" required /></div>
          <div><TextField value={dialogcompliance} onInput={handlecompliance} label="Compliance" /></div>
          <div><TextField value={dialogcomments} onInput={handlecomments} label="Comments" /></div>
          <div><TextField value={dialogdb_dfo} onInput={handledb_dfo} label="DB-DFO" /></div>
          <div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" required /></div>
          <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
          <div><TextField value={dialoghost_name} onInput={handlehost_name} label="Host-Name" host_name required/></div>
	  <div><TextField value={dialoglocation} onInput={handlelocation} label="Location" location /></div>
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>   
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogrdbms} onInput={handlerdbms} label="RDBMS" /></div>
          <div><TextField value={dialoginstance_name} onInput={handleinstance_name}  label="Instance-Name" /></div>
          <div><TextField value={dialogport} onInput={handleport} label="Port" /></div>
          <div><TextField value={dialogdb_name} onInput={handledb_name} label="DB-Name" /></div>
          <div><TextField value={dialogstatus} onInput={handlestatus} label="Status" /></div>
          <div><TextField value={dialogdistribution} onInput={handledistribution} label="Distribution" /></div>
          <div><TextField value={dialogdomain} onInput={handledomain} label="Domain" /></div>
          <div><TextField value={dialogenvironment} onInput={handleenvironment} label="Environment" /></div>
          <div><TextField value={dialogversion} onInput={handleversion} label="Version" /></div>
          <div><TextField value={dialogha_role} onInput={handleha_role} label="HA-Role" /></div>
          <div><TextField value={dialogdb_size} onInput={handledb_size} label="DB-Size" /></div>
          <div><TextField value={dialogdb_replication_type} onInput={handledb_replication_type} label="DB-Replication-Type" /></div>
          <div><TextField value={dialogdba_sme} onInput={handledba_sme} label="DBA-SME" /></div>
          <div><TextField value={dialogsn_group} onInput={handlesn_group} label="SN-Group" /></div>
          <div><TextField value={dialogcompliance} onInput={handlecompliance} label="Compliance" /></div>
          <div><TextField value={dialogcomments} onInput={handlecomments} label="Comments" /></div>
          <div><TextField value={dialogdb_dfo} onInput={handledb_dfo} label="DB-DFO" /></div>
          <div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" /></div>
           <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
          <div><TextField value={dialoghost_name} onInput={handlehost_name} label="Host-Name" /></div>
	  <div><TextField value={dialoglocation} onInput={handlelocation} label="Location" /></div>
          <div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>   
      </div>
  )
}



export const MSsqlTable = () => {

  const columns = [
      {title:'Host Name',field:'host_name'},
    {title:'Instance Name',field:'instance_name',cellStyle: {minWidth:200 },},
     {title:'DB Name',field:'db_name'},
    {title:'Rdbms',field:'rdbms'},
    {title:'Port',field:'port'},
    {title:'Status',field:'status'},
    {title:'Domain',field:'domain'},
    {title:'Environment',field:'environment',cellStyle: {minWidth:200 },},
    {title:'Version',field:'version',cellStyle: {minWidth:200 },},
    {title:'Core Count',field:'core_count',cellStyle: {minWidth:200 },},
    {title:'HA Role',field:'ha_role',cellStyle: {minWidth:200 },},
    {title:'DB Size',field:'db_size',cellStyle: {minWidth:200 },},
    {title:'DB Replication Type',field:'db_replication_type',cellStyle: {minWidth:300 },},
    {title:'DBA Owner',field:'dba_sme',cellStyle: {minWidth:200 },},
    {title:'Support group',field:'sn_group',cellStyle: {minWidth:200 },},
    {title:'Location',field:'location',cellStyle: {minWidth:200 },},  
    {title:'Compliance',field:'compliance'},
    {title:'Comments',field:'comments'},
     {title:'App Name',field:'app_name',cellStyle: {minWidth:200 },},
   {title:'App Family',field:'app_family',cellStyle: {minWidth:200 },},
    {title:'Modified Date',field:'last_update',cellStyle: {minWidth:200 },}, 
 {title:'Application Owner',field:'app_vp_owner',cellStyle: {minWidth:200 },},
 {title:'PT Name',field:'pt_name',cellStyle: {minWidth:200 },},
 {title:'PT Contact',field:'pt_contact',cellStyle: {minWidth:300 },},
  {title:'VP Name',field:'VP_name',cellStyle: {minWidth:200 },},  
	  
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveMssql'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);  
       // eslint-disable-next-line 
    },[]);

    /*const deleteDetail = (id) => {
      Axios.delete(` http://localhost:8000/deleteMssql/${id}`).then((response) => {
        //setDetails(response.data)
        getDetails();
      });
    };*/
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveMssql").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

     // window.onload = getDetails();  
     window.addEventListener("load", getDetails);   
     const [isDialogOpen1, setIsDialogOpen1] = useState(false);
     const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogid, setDialogid] = useState('');
   const [dialogrdbms, setDialogrdbms] = useState('');
  
   const [dialoginstance_name, setDialoginstance_name] = useState('');
   const [dialogport, setDialogport] = useState('');
   const [dialogdb_name,setDialogdb_name]=useState('');
   const [dialogstatus,setDialogstatus]=useState('');
   const [dialogdomain,setDialogdomain]=useState('');
   const [dialogenvironment,setDialogenvironment]=useState('');
   const [dialogversion,setDialogversion]=useState('');
   const [dialogcore_count,setDialogcore_count]=useState('');
   
   const [dialogha_role,setDialogha_role]=useState('');
   const [dialogdb_size,setDialogdb_size]=useState('');
   const [dialogdb_replication_type,setDialogdb_replication_type]=useState('');
   const [dialogdba_sme,setDialogdba_sme]=useState('');
   const [dialogsn_group,setDialogsn_group]=useState('');
   const [dialogcompliance,setDialogcompliance]=useState('');
   const [dialogcomments,setDialogcomments]=useState('');
  
   const [dialogapp_name,setDialogapp_name]=useState('');
    const [dialogapp_family,setDialogapp_family]=useState('');
   const [dialoghost_name,setDialoghost_name]=useState('');
const [dialoglocation,setDialoglocation]=useState('');
const [dialogapp_vp_owner,setDialogapp_vp_owner]=useState('');
   const [dialogpt_name,setDialogpt_name]=useState(''); 
   const [dialogpt_contact, setDialogpt_contact] = useState('');
   const [dialogVP_name,setDialogVP_name]=useState('');
   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }
  const handlerdbms=event=>{
    setDialogrdbms(event.target.value);
  }
   const handleinstance_name= event => {
    setDialoginstance_name(event.target.value);
  }
  const handleport = event => {
    setDialogport(event.target.value);
  }
  const handledb_name = event => {
    setDialogdb_name(event.target.value);
  }
  const handlestatus = event => {
    setDialogstatus(event.target.value);
  }

  const handledomain = event => {
    setDialogdomain(event.target.value);
  }
  const handleenvironment = event => {
    setDialogenvironment(event.target.value);
  }
  const handleversion = event => {
    setDialogversion(event.target.value);
  }
const handlecore_count = event => {
    setDialogcore_count(event.target.value);
  }
  const handleha_role = event => {
    setDialogha_role(event.target.value);
  }
  const handledb_size = event => {
    setDialogdb_size(event.target.value);
  }
  const handledb_replication_type= event => {
    setDialogdb_replication_type(event.target.value);
  }
  const handledba_sme= event => {
    setDialogdba_sme(event.target.value);
  }
  const handlesn_group= event => {
    setDialogsn_group(event.target.value);
  }
  const handlecompliance= event => {
    setDialogcompliance(event.target.value);
  }
  const handlecomments= event => {
    setDialogcomments(event.target.value);
  }
   const handleapp_name= event => {
    setDialogapp_name(event.target.value);
  }
const handleapp_family= event => {
    setDialogapp_family(event.target.value);
  }
  const handlehost_name= event => {
    setDialoghost_name(event.target.value);
  }
const handlelocation= event => {
    setDialoglocation(event.target.value);
  }

 const handleapp_vp_owner= event => {
    setDialogapp_vp_owner(event.target.value);
  }
  const handlept_name= event => {
    setDialogpt_name(event.target.value);
  }
   const handlept_contact= event => {
    setDialogpt_contact(event.target.value);
  }
  
   const handleVP_name= event => {
    setDialogVP_name(event.target.value);
  }
  const refreshPage=()=>{
    window.location.reload();
  }
    
  const handleUpdateRow = event => {
    if(!dialoginstance_name||!dialogdb_name||!dialogenvironment||!dialogversion||!dialogdba_sme||!dialogsn_group||!dialoghost_name)
    {
      alert("Enter mandatory details");
      return;
    }
    setDetails(
     // {...details,[ event.app_name]: dialogapp_name ,[event.app_key]:dialogapp_key}
      {...details,[event.target.name]:event.target.value},
     
      );
       Axios.put(' http://localhost:8000/updateMssql', { 
                id:dialogid,
                rdbms: dialogrdbms,
                
                instance_name: dialoginstance_name,
                port: dialogport,
                db_name: dialogdb_name,
                status: dialogstatus,
                domain: dialogdomain,
                environment: dialogenvironment,
                version: dialogversion,
                core_count:dialogcore_count,
                ha_role: dialogha_role,
                db_size: dialogdb_size,
                db_replication_type: dialogdb_replication_type,
                dba_sme: dialogdba_sme,
                sn_group: dialogsn_group,
                compliance: dialogcompliance,
                comments: dialogcomments,
               
                app_name: dialogapp_name,
               app_family: dialogapp_family,
                host_name: dialoghost_name,
		location: dialoglocation, 
               app_vp_owner: dialogapp_vp_owner,
		pt_name: dialogpt_name,
		pt_contact: dialogpt_contact,
		VP_name: dialogVP_name,
              })
              refreshPage();
              alert("successfully Edited!");
            }
  const handleAddnewRow=event=>{ 
    if(!dialoginstance_name||!dialogdb_name||!dialogenvironment||!dialogversion||!dialogdba_sme||!dialogsn_group||!dialoghost_name)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.post(' http://localhost:8000/createMssql',{
      rdbms: dialogrdbms,
              
                instance_name: dialoginstance_name,
                port: dialogport,
                db_name: dialogdb_name,
                status: dialogstatus,
                domain: dialogdomain,
                environment: dialogenvironment,
                version: dialogversion,
                core_count:dialogcore_count,
                ha_role: dialogha_role,
                db_size: dialogdb_size,
                db_replication_type: dialogdb_replication_type,
                dba_sme: dialogdba_sme,
                sn_group: dialogsn_group,
                compliance: dialogcompliance,
                comments: dialogcomments,
              
                app_name: dialogapp_name,
                 app_family: dialogapp_family,
                host_name: dialoghost_name, 
		location: dialoglocation, 
               app_vp_owner: dialogapp_vp_owner,
		pt_name: dialogpt_name,
		pt_contact: dialogpt_contact,
		VP_name: dialogVP_name,
  })
  setDetails(
    //getDetails(); 
    // Here you can add the new row to whatever index you want
    //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
 {...details,[event.target.name]:event.target.value},

 );
 refreshPage();
 alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);
                            
  const initialset=(rowData)=>{
    setDialogid(rowData.id);
    if (!isDialogOpen1) {
      setDialogrdbms(rowData.rdbms);
    
      setDialoginstance_name(rowData.instance_name);
      setDialogport(rowData.port);
      setDialogdb_name(rowData.db_name);
      setDialogstatus(rowData.status);
      setDialogdomain(rowData.domain);
      setDialogenvironment(rowData.environment);
      setDialogversion(rowData.version);
      setDialogcore_count(rowData.core_count);
      setDialogha_role(rowData.ha_role);
      setDialogdb_size(rowData.db_size);
      setDialogdb_replication_type(rowData.db_replication_type);
      setDialogdba_sme(rowData.dba_sme);
      setDialogsn_group(rowData.sn_group);
      setDialogcompliance(rowData.compliance);
      setDialogcomments(rowData.commnets);
    
      setDialogapp_name(rowData.app_name);
      setDialogapp_family(rowData.app_family);
      setDialoghost_name(rowData.host_name);
      setDialoglocation(rowData.location);
      setDialogapp_vp_owner(rowData.app_vp_owner);
      setDialogpt_contact(rowData.pt_contact);
      setDialogpt_name(rowData.pt_name);
      setDialogVP_name(rowData.VP_name);
  
              }
            }
const initialset1=()=>{
  setDialogid("-");
  if (!isDialogOpen1) {
    setDialogrdbms("-");
   
    setDialoginstance_name("-");
    setDialogport("-");
    setDialogdb_name("-");
    setDialogstatus("-");
    setDialogdomain("-");
    setDialogenvironment("-");
    setDialogversion("-");
    setDialogcore_count("-");
    setDialogha_role("-");
    setDialogdb_size("-");
    setDialogdb_replication_type("-");
    setDialogdba_sme("-");
    setDialogsn_group("-");
    setDialogcompliance("-");
    setDialogcomments("-");
   
    setDialogapp_name("-");
     setDialogapp_family("-");
    setDialoghost_name("-");
    setDialoglocation("-");
    setDialogapp_vp_owner("-");
      setDialogpt_contact("-");
      setDialogpt_name("-");
      setDialogVP_name("-");

            }
          }
const actions = [
  {
    icon: () => <FaIcons.FaEdit/>,
    tooltip: 'Edit Details',
    //isFreeAction: true,
    onClick: (event, rowData) => {
  
      initialset(rowData);
      
      setIsDialogOpen1(true);
      
    },
  },
  {
    icon: () => <AddIcon />,
    tooltip: 'Add',
    isFreeAction: true,
    onClick: (event, rowData) => {
      initialset1();
      setIsDialogOpen2(true);
    },
  }
];
    return (
        <div> 
            <MaterialTable title="MSSQL Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{ filtering: true,
                  pageSize: 20,
             pageSizeOptions: [20,50,80,110],
               exportButton: true,
              exportAllData: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
              grouping:true,
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
		 height:30,
                width:700
                           },
                           
              actionsColumnIndex: 0, addRowPosition: "first"
             
          }}
          editable={{
           /* onRowAdd: (newRow) => new Promise((resolve, reject) => {
              const updatedRows = [...details, newRow ]
              Axios.post(' http://localhost:8000/createMssql',{
                rdbms: newRow.rdbms,
                sql_virtual_name: newRow.sql_virtual_name,
                instance_name: newRow.instance_name,
                port: newRow.port,
                db_name: newRow.db_name,
                status: newRow.status,
                domain: newRow.domain,
                environment: newRow.environment,
                version: newRow.version,
                ha_role: newRow.ha_role,
                db_size: newRow.db_size,
                db_replication_type: newRow.db_replication_type,
                dba_sme: newRow.dba_sme,
                sn_group: newRow.sn_group,
                compliance: newRow.compliance,
                comments: newRow.comments,
                db_dfo: newRow.db_dfo,
                app_name: newRow.app_name,
                host_name: newRow.host_name,
		location: newRow.location,
            })
            setTimeout(() => {
                setDetails(updatedRows)
                getDetails()
                resolve()
              }, 1000)
            }),*/

            /*onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/


           /* onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
              const index=oldRow.tableData.id;
              const updatedRows=[...details]
              updatedRows[index]=updatedRow
              Axios.put(` http://localhost:8000/updateMssql`, { 
                
                rdbms: updatedRow.rdbms,
                sql_virtual_name: updatedRow.sql_virtual_name,
                instance_name: updatedRow.instance_name,
                port: updatedRow.port,
                db_name: updatedRow.db_name,
                status: updatedRow.status,
                domain: updatedRow.domain,
                environment: updatedRow.environment,
                version: updatedRow.version,
                ha_role: updatedRow.ha_role,
                db_size: updatedRow.db_size,
                db_replication_type: updatedRow.db_replication_type,
                dba_sme: updatedRow.dba_sme,
                sn_group: updatedRow.sn_group,
                compliance: updatedRow.compliance,
                comments: updatedRow.comments,
                db_dfo: updatedRow.db_dfo,
                app_name: updatedRow.app_name,
                host_name: updatedRow.host_name,
		location: updatedRow.location, 
                id: oldRow.id
              })
              setTimeout(() => {
                setDetails(updatedRows)
                resolve()
              }, 1000)
            })*/
  
          }}
         
            />
        <MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogrdbms} onInput={handlerdbms} label="RDBMS" /></div>
   
          <div><TextField value={dialoginstance_name} onInput={handleinstance_name}  label="Instance-Name" required /></div>
          <div><TextField value={dialogport} onInput={handleport} label="Port" /></div>
          <div><TextField value={dialogdb_name} onInput={handledb_name} label="DB-Name" required/></div>
          <div><TextField value={dialogstatus} onInput={handlestatus} label="Status" /></div>
          <div><TextField value={dialogdomain} onInput={handledomain} label="Domain" /></div>
          <div><TextField value={dialogenvironment} onInput={handleenvironment} label="Environment" required /></div>
          <div><TextField value={dialogversion} onInput={handleversion} label="Version" required/></div>
          <div><TextField value={dialogcore_count} onInput={handlecore_count} label="Core Count"/></div>
          <div><TextField value={dialogha_role} onInput={handleha_role} label="HA-Role" /></div>
          <div><TextField value={dialogdb_size} onInput={handledb_size} label="DB-Size" /></div>
          <div><TextField value={dialogdb_replication_type} onInput={handledb_replication_type} label="DB-Replication-Type" /></div>
          <div><TextField value={dialogdba_sme} onInput={handledba_sme} label="DBA-SME" required/></div>
          <div><TextField value={dialogsn_group} onInput={handlesn_group} label="SN-Group" required/></div>
          <div><TextField value={dialogcompliance} onInput={handlecompliance} label="Compliance" /></div>
          <div><TextField value={dialogcomments} onInput={handlecomments} label="Comments" /></div>
          <div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" /></div>
          <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
           <div><TextField value={dialoghost_name} onInput={handlehost_name} label="Host-Name" required/></div>
	  <div><TextField value={dialoglocation} onInput={handlelocation} label="Location" /></div>
         <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner" /></div>
        <div><TextField value={dialogpt_contact} onInput={handlept_contact}  label="PT-Contact" /></div>
        <div><TextField value={dialogpt_name} onInput={handlept_name} label="PT-Name" /></div>
        <div><TextField value={dialogVP_name} onInput={handleVP_name} label="VP Name" /></div>
		
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>       
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogrdbms} onInput={handlerdbms} label="RDBMS" /></div>
     
          <div><TextField value={dialoginstance_name} onInput={handleinstance_name}  label="Instance-Name" required/></div>
          <div><TextField value={dialogport} onInput={handleport} label="Port" /></div>
          <div><TextField value={dialogdb_name} onInput={handledb_name} label="DB-Name" required /></div>
          <div><TextField value={dialogstatus} onInput={handlestatus} label="Status" /></div>
          <div><TextField value={dialogdomain} onInput={handledomain} label="Domain" /></div>
          <div><TextField value={dialogenvironment} onInput={handleenvironment} label="Environment" required/></div>
          <div><TextField value={dialogversion} onInput={handleversion} label="Version" required/></div>
          <div><TextField value={dialogcore_count} onInput={handlecore_count} label="Core Count"/></div>
          <div><TextField value={dialogha_role} onInput={handleha_role} label="HA-Role" /></div>
          <div><TextField value={dialogdb_size} onInput={handledb_size} label="DB-Size" /></div>
          <div><TextField value={dialogdb_replication_type} onInput={handledb_replication_type} label="DB-Replication-Type" /></div>
          <div><TextField value={dialogdba_sme} onInput={handledba_sme} label="DBA-SME" required/></div>
          <div><TextField value={dialogsn_group} onInput={handlesn_group} label="SN-Group" required/></div>
          <div><TextField value={dialogcompliance} onInput={handlecompliance} label="Compliance" /></div>
          <div><TextField value={dialogcomments} onInput={handlecomments} label="Comments" /></div>
          
          <div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" /></div>
          <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
          <div><TextField value={dialoghost_name} onInput={handlehost_name} label="Host-Name" required /></div>
	  <div><TextField value={dialoglocation} onInput={handlelocation} label="Location"  /></div>
         <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner" /></div>
       <div><TextField value={dialogpt_contact} onInput={handlept_contact}  label="PT-Contact" /></div>
        <div><TextField value={dialogpt_name} onInput={handlept_name} label="PT-Name" /></div>
        <div><TextField value={dialogVP_name} onInput={handleVP_name} label="VP Name" /></div>
		
          <div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>      
        </div>
    )
}






export const MongoTable = () => {

  const columns = [
  
   // {title:'Rdbms',field:'rdbms'},
    {title:'Instance Name',field:'instance_name'},
     {title:'Host Name',field:'host_name'},
    {title:'Port',field:'port'},
    {title:'Linux Version',field:'linux_version'},
    //{title:'DB Name',field:'db_name',cellStyle: {minWidth:200 },},
   // {title:'DB size',field:'db_size',cellStyle: {minWidth:200 },},
    {title:'Status',field:'status'},
    {title:'Distribution',field:'distribution'},
    {title:'Domain',field:'domain'},
    {title:'Environment',field:'environment'},
    {title:'Version',field:'version'},
    {title:'Tier',field:'tier'},
    {title:'RelicaSetName',field:'replica_set_name',cellStyle: {minWidth:200 },},
    {title:'HA Role',field:'ha_role',cellStyle: {minWidth:200 },},
   // {title:'DB size',field:'db_size',cellStyle: {minWidth:200 },},
  //  {title:'ReplicaSet Name',field:'db_replication_type',cellStyle: {minWidth:200 }},
    {title:'Ops Manager',field:'ops_manager',cellStyle: {minWidth:200 }},
    {title:'App Name',field:'app_name',cellStyle: {minWidth:200 }},
     {title:'App Family',field:'app_family',cellStyle: {minWidth:200 },},
    {title:'DBA Owner',field:'dba_sme',cellStyle: {minWidth:200 }},
    {title:'Support Group',field:'sn_group',cellStyle: {minWidth:200 },},
    {title:'Compliance',field:'compliance'},
    {title:'Comments',field:'comments'},
     {title:'Location',field:'location'},
    {title:'Application Owner',field:'app_vp_owner',cellStyle:{minWidth:300},},
    {title:'PT Contact',field:'pt_contact',cellStyle: {minWidth:300 },},
     {title:'PT Name',field:'pt_name',cellStyle: { minWidth:300 },},
     {title:'VP Name',field:'VP_name',cellStyle: { minWidth:300 },},

   // {title:'DB Dfo',field:'db_dfo',cellStyle: {minWidth:200 }},
    
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveMongo'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details); 
      // eslint-disable-next-line   
    },[]);
   /* const deleteDetail = (id) => {
      Axios.delete(` http://localhost:8000/deleteMongo/${id}`).then((response) => {
        //setDetails(response.data)
        getDetails();
      });
      
    };*/
    
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveMongo").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

      
    //window.onload = getDetails();  
   window.addEventListener("load", getDetails); 
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogId, setDialogId] = useState('');
  // const [dialogreplica_set_name,setDialogreplica_set_name] = useState('');
   const [dialoginstancename,setDialoginstancename] = useState('');
  const [dialoghostname,setDialoghostname] = useState('');
    const [dialogport,setDialogport] = useState('');
    const [dialoglinuxversion,setDialoglinuxversion] = useState('');
  // const [dialogdbname,setDialogdbname] = useState('');
  // const [dialogdbsize,setDialogdbsize] = useState('');
   const [dialogstatus,setDialogstatus] = useState('');
   const [dialogdistribution,setDialogdistribution] = useState('');
   const [dialogdomain,setDialogdomain] = useState('');
   const [dialogenvironment,setDialogenvironment] = useState('');
   const [dialogversion,setDialogversion] = useState('');
   const [dialogtier,setDialogtier] = useState('');
   const [dialogreplica_set_name,setDialogreplica_set_name] = useState('');
   const [dialogharole,setDialogharole] = useState('');
  // const [dialogdbsize,setDialogdbsize] = useState('');
  // const [dialogdbreplicationtype,setDialogdbreplicationtype] = useState('');
   const [dialogopsmanager,setDialogopsmanager] = useState('');
   const [dialogappname,setDialogappname] = useState(''); 
   const [dialogapp_family,setDialogapp_family]=useState('');
  const [dialogdbasme,setDialogdbasme] = useState('');
   const [dialogsngroup,setDialogsngroup] = useState('');
   const [dialogcompliance,setDialogcompliance] = useState('');
   const [dialogcomments,setDialogcomments] = useState('');
   const [dialoglocation,setDialoglocation] = useState('');
  const [dialogapp_vp_owner,setDialogapp_vp_owner]=useState('');
   const [dialogpt_contact, setDialogpt_contact] = useState('');
   const [dialogpt_name,setDialogpt_name]=useState('');
   const [dialogVP_name,setDialogVP_name]=useState('');
  // const [dialogopsmanager,setDialogopsmanager] = useState('');
 //  const [dialogdbdfo,setDialogdbdfo] = useState('');
  // const [dialogappname,setDialogappname] = useState('');
  // const [dialoghostname,setDialoghostname] = useState('');

   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }

   const handle_replica_set_name = event => {
     setDialogreplica_set_name(event.target.value);
   }

   const handle_instance_name = event => {
    setDialoginstancename(event.target.value);
  }

  const handle_port = event => {
    setDialogport(event.target.value);
  }

const handle_linuxversion = event => {
    setDialoglinuxversion(event.target.value);
  }


 // const handle_dbname = event => {
   // setDialogdbname(event.target.value);
  //}

  const handle_status = event => {
    setDialogstatus(event.target.value);
  }

  const handle_distribution = event => {
    setDialogdistribution(event.target.value);
  }

  const handle_domain = event => {
    setDialogdomain(event.target.value);
  }

  const handle_environment = event => {
    setDialogenvironment(event.target.value);
  }

  const handle_version = event => {
    setDialogversion(event.target.value);
  }
  
  const handle_tier = event => {
    setDialogtier(event.target.value);
  }

  const handle_ha_role = event => {
    setDialogharole(event.target.value);
  }

 // const handle_dbsize = event => {
   // setDialogdbsize(event.target.value);
  //}

  //const handle_db_replication_type = event => {
    //setDialogdbreplicationtype(event.target.value);
  //}

  const handle_dba_sme = event => {
    setDialogdbasme(event.target.value);
  }
  
  const handle_sn_group = event => {
    setDialogsngroup(event.target.value);
  }

  const handle_compliance = event => {
    setDialogcompliance(event.target.value);
  }

  const handle_comments = event => {
    setDialogcomments(event.target.value);
  }

  const handle_ops_manager = event => {
    setDialogopsmanager(event.target.value);
  }

  //const handle_db_dfo = event => {
    //setDialogdbdfo(event.target.value);
  //}

  const handle_app_name = event => {
    setDialogappname(event.target.value);
  }
const handleapp_family= event => {
    setDialogapp_family(event.target.value);
  }


  const handle_host_name = event => {
    setDialoghostname(event.target.value);
  }

 const handle_location = event => {
    setDialoglocation(event.target.value);
  }

const handleapp_vp_owner= event => {
    setDialogapp_vp_owner(event.target.value);
  }
   const handlept_contact= event => {
    setDialogpt_contact(event.target.value);
  }
  const handlept_name= event => {
    setDialogpt_name(event.target.value);
  }
  const handleVP_name= event => {
    setDialogVP_name(event.target.value);
  }

  const refreshPage=()=>{
    window.location.reload();
  }
  const handleUpdateRow = event => {
    if(!dialoginstancename||!dialogenvironment||!dialogversion||!dialogsngroup||!dialoghostname)
    {
      alert("Enter mandatory details");
      return;
    }
    setDetails(
      {...details,[event.target.name]:event.target.value},
    );
    
    Axios.put(` http://localhost:8000/updateMongo`, { 
             id: dialogId,
              instance_name: dialoginstancename,
              host_name: dialoghostname,
               port: dialogport,
               linux_version: dialoglinuxversion,
              //db_name: dialogdbname,
              //db_size: dialogdbsize,
              status: dialogstatus,
              distribution: dialogdistribution,
              domain: dialogdomain,
              environment: dialogenvironment,
              version: dialogversion,
              tier:dialogtier,
              replica_set_name: dialogreplica_set_name,
              ha_role: dialogharole,
               ops_manager: dialogopsmanager,
              dba_sme: dialogdbasme,
               app_name: dialogappname,
              app_family: dialogapp_family,
                sn_group: dialogsngroup,
              compliance: dialogcompliance,
              comments: dialogcomments,
	      location: dialoglocation,
            app_vp_owner:dialogapp_vp_owner,
           pt_contact:dialogpt_contact,
           pt_name:dialogpt_name,
          VP_name:dialogVP_name,   
            })
          refreshPage();
          alert("successfully Edited!");
  }

  const handleAddnewRow=event=>{
    if(!dialoginstancename||!dialogenvironment||!dialogversion||!dialogsngroup||!dialoghostname)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.post(' http://localhost:8000/createMongo',{
       instance_name: dialoginstancename,
              host_name: dialoghostname,
               port: dialogport,
               linux_version: dialoglinuxversion,
              //db_name: dialogdbname,
              //db_size: dialogdbsize,
              status: dialogstatus,
              distribution: dialogdistribution,
              domain: dialogdomain,
              environment: dialogenvironment,
              version: dialogversion,
              tier:dialogtier,
              replica_set_name: dialogreplica_set_name,
              ha_role: dialogharole,
               ops_manager: dialogopsmanager,
              dba_sme: dialogdbasme,
               app_name: dialogappname,
              app_family: dialogapp_family,
              sn_group: dialogsngroup,
              compliance: dialogcompliance,
              comments: dialogcomments,
	      location: dialoglocation,
              app_vp_owner:dialogapp_vp_owner,
             pt_contact:dialogpt_contact,
             pt_name:dialogpt_name,
             VP_name:dialogVP_name,   
     })
      setDetails(
        //getDetails(); 
        // Here you can add the new row to whatever index you want
        //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
     {...details,[event.target.name]:event.target.value},
    
     );
     refreshPage();
     alert("successfully Added!");
     }

useEffect(() => {
  // Closes dialog after saving
  if (isDialogOpen1) {
    setIsDialogOpen1(false);
  }
  if (isDialogOpen2) {
    setIsDialogOpen2(false);
  }
  // eslint-disable-next-line
}, [details]);
  const initialset = (rowData) => {
   setDialogId(rowData.id); 
   if(!isDialogOpen1) {
    
       setDialoginstancename(rowData.instance_name);
     setDialoghostname(rowData.host_name);
       setDialogport(rowData.port);
       setDialoglinuxversion(rowData.linux_version);
      //setDialogdbname(rowData.db_name);
      //setDialogdbsize(rowData.db_size);
      setDialogstatus(rowData.status);
      setDialogdistribution(rowData.distribution);
      setDialogdomain(rowData.domain);
      setDialogenvironment(rowData.environment);
      setDialogversion(rowData.version);
      setDialogtier(rowData.tier);
       setDialogreplica_set_name(rowData.replica_set_name);
      setDialogharole(rowData.ha_role);
       setDialogopsmanager(rowData.ops_manager);
      setDialogdbasme(rowData.dba_sme);
       setDialogappname(rowData.app_name);
     setDialogapp_family(rowData.app_family);
      setDialogsngroup(rowData.sn_group);
      setDialogcompliance(rowData.compliance);
      setDialogcomments(rowData.comments);
      setDialoglocation(rowData.location);
      setDialogapp_vp_owner("-");
      setDialogpt_contact("-");
       setDialogpt_name("-");
      setDialogVP_name("-");
 
    

    }
  }
  
  const initialset1 = () => {
  setDialogId("-");  
  if(!isDialogOpen1) {
      setDialoginstancename("-");
     setDialoghostname("-");
       setDialogport("-");
       setDialoglinuxversion("-");
      //setDialogdbname("-");
      //setDialogdbsize("-");
      setDialogstatus("-");
      setDialogdistribution("-");
      setDialogdomain("-");
      setDialogenvironment("-");
      setDialogversion("-");
      setDialogtier("-");
       setDialogreplica_set_name("-");
      setDialogharole("-");
       setDialogopsmanager("-");
      setDialogdbasme("-");
       setDialogappname("-");
      setDialogapp_family("-");
      setDialogsngroup("-");
      setDialogcompliance("-");
      setDialogcomments("-");
      setDialoglocation("-");
    setDialogapp_vp_owner("-");
      setDialogpt_contact("-");
       setDialogpt_name("-");
      setDialogVP_name("-"); 

    }
  }
  const actions = [
    {
      icon: () => <FaIcons.FaEdit/>,
      tooltip: 'Edit Details',
      //isFreeAction: true,
      onClick: (event, rowData) => {
    
        initialset(rowData);
        
        setIsDialogOpen1(true);
       
      },
    },
    {
      icon: () => <AddIcon />,
      tooltip: 'Add',
      isFreeAction: true,
      onClick: (event, rowData) => {
        initialset1();
        setIsDialogOpen2(true);
      },
    }
  ];

    return (
        <div> 
            <MaterialTable title="MongoDB Inventory"
            data = {details}
          columns = {columns}
          actions={actions}
          options = {{
              filtering: true,
              pagesize:20,
		pageSizeOptions:[20,50,80,110],
              exportButton: true,
              exportAllData: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
               grouping:true,
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',height:30,
                width:700
                           },
                          
              actionsColumnIndex: 0, addRowPosition: "first"
          }}
          editable={{
           /* onRowAdd: (newRow) => new Promise((resolve, reject) => {
              const updatedRows = [...details, newRow ]
              console.log(newRow)
              Axios.post(' http://localhost:8000/createMongo',{
                rdbms: newRow.rdbms,
                instance_name: newRow.instance_name,
                port: newRow.port,
                linux_version: newRow.linux_version,
                //db_name: newRow.db_name,
                status: newRow.status,
                distribution: newRow.distribution,
                domain: newRow.domain,
                environment: newRow.environment,
                version: newRow.version,
                tier:newRow.tier,
                ha_role: newRow.ha_role,
               // db_size: newRow.db_size,
                db_replication_type: newRow.db_replication_type,
                dba_sme: newRow.dba_sme,
                sn_group: newRow.sn_group,
                compliance: newRow.compliance,
                comments: newRow.comments,
                ops_manager: newRow.ops_manager,
                db_dfo: newRow.db_dfo,
                app_name: newRow.app_name,
                host_name: newRow.host_name,
 		location: newRow.location,
            })
            setTimeout(() => {
                setDetails(updatedRows)
                getDetails()
                resolve()
              }, 1000)
              
            }),*/

            /*onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/


           /* onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
              const index=oldRow.tableData.id;
              const updatedRows=[...details]
              updatedRows[index]=updatedRow
              console.log(oldRow)
              Axios.put(` http://localhost:8000/updateMongo`, { 
                rdbms: updatedRow.rdbms,
                instance_name: updatedRow.instance_name,
                port: updatedRow.port,
                db_name: updatedRow.db_name,
                status: updatedRow.status,
                distribution: updatedRow.distribution,
                domain: updatedRow.domain,
                environment: updatedRow.environment,
                version: updatedRow.version,
                tier:updatedRow.tier,
                ha_role: updatedRow.ha_role,
                db_size: updatedRow.db_size,
                db_replication_type: updatedRow.db_replication_type,
                dba_sme: updatedRow.dba_sme,
                sn_group: updatedRow.sn_group,
                compliance: updatedRow.compliance,
                comments: updatedRow.comments,
                ops_manager: updatedRow.ops_manager,
                db_dfo: updatedRow.db_dfo,
                app_name: updatedRow.app_name,
                host_name: updatedRow.host_name, 
                location: updatedRow.location,
                id: oldRow.id
              })
              setTimeout(() => {
                setDetails(updatedRows)
                resolve()
              }, 1000)
            })*/
  
          }}
         
            />
<MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialoginstancename} onInput={handle_instance_name}  label="instance_name" required/></div>
           <div><TextField value={dialoghostname} onInput={handle_host_name} label="host_name" required /></div>
		 <div><TextField value={dialogport} onInput={handle_port} label="port" /></div>
		 <div><TextField value={dialoglinuxversion} onInput={handle_linuxversion} label="linux_version" /></div>
                    <div><TextField value={dialogstatus} onInput={handle_status} label="status" /></div>
          <div><TextField value={dialogdistribution} onInput={handle_distribution} label="distribution" /></div>
          <div><TextField value={dialogdomain} onInput={handle_domain} label="domain" /></div>
          <div><TextField value={dialogenvironment} onInput={handle_environment} label="environment" required/></div>
          <div><TextField value={dialogversion} onInput={handle_version} label="version" required/></div>
          <div><TextField value={dialogtier} onInput={handle_tier} label="Tier" /></div>   
        <div><TextField value={dialogreplica_set_name} onInput={handle_replica_set_name} label="ReplicaSetName" /></div>  
        <div><TextField value={dialogharole} onInput={handle_ha_role} label="ha_role" /></div>
		<div><TextField value={dialogopsmanager} onInput={handle_ops_manager} label="ops_manager" /></div>
            <div><TextField value={dialogappname} onInput={handle_app_name} label="app_name" /></div>
          <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
            <div><TextField value={dialogdbasme} onInput={handle_dba_sme} label="dba_sme" /></div>
          <div><TextField value={dialogsngroup} onInput={handle_sn_group} label="sn_group" required/></div>
          <div><TextField value={dialogcompliance} onInput={handle_compliance} label="scompliance" /></div>
          <div><TextField value={dialogcomments} onInput={handle_comments} label="comments" /></div>
	  <div><TextField value={dialoglocation} onInput={handle_location} label="location" /></div>
         <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner"  /></div>
	 <div><TextField value={dialogpt_contact} onInput={handlept_contact} label="PT Contact" /></div>
              <div><TextField value={dialogpt_name} inputProps={{maxLength: 100}} onInput={handlept_name} label="PT Name" /></div>
              <div><TextField value={dialogVP_name} inputProps={{maxLength: 100}} onInput={handleVP_name} label="VP_name" /></div>
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialoginstancename} onInput={handle_instance_name}  label="instance_name" required/></div>
           <div><TextField value={dialoghostname} onInput={handle_host_name} label="host_name" required /></div>
		 <div><TextField value={dialogport} onInput={handle_port} label="port" /></div>
		 <div><TextField value={dialoglinuxversion} onInput={handle_linuxversion} label="linux_version" /></div>
                   <div><TextField value={dialogstatus} onInput={handle_status} label="status" /></div>
          <div><TextField value={dialogdistribution} onInput={handle_distribution} label="distribution" /></div>
          <div><TextField value={dialogdomain} onInput={handle_domain} label="domain" /></div>
          <div><TextField value={dialogenvironment} onInput={handle_environment} label="environment" required/></div>
          <div><TextField value={dialogversion} onInput={handle_version} label="version" required/></div>
     <div><TextField value={dialogtier} onInput={handle_tier} label="Tier" /></div>     
      <div><TextField value={dialogreplica_set_name} onInput={handle_replica_set_name} label="ReplicaSetName" /></div>  
        <div><TextField value={dialogharole} onInput={handle_ha_role} label="ha_role" /></div>
		<div><TextField value={dialogopsmanager} onInput={handle_ops_manager} label="ops_manager" /></div>
            <div><TextField value={dialogappname} onInput={handle_app_name} label="app_name" /></div>
           <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
          <div><TextField value={dialogdbasme} onInput={handle_dba_sme} label="dba_sme" /></div>
          <div><TextField value={dialogsngroup} onInput={handle_sn_group} label="sn_group" required/></div>
          <div><TextField value={dialogcompliance} onInput={handle_compliance} label="scompliance" /></div>
          <div><TextField value={dialogcomments} onInput={handle_comments} label="comments" /></div>
	  <div><TextField value={dialoglocation} onInput={handle_location} label="location" /></div>
         <div><TextField value={dialogpt_contact} onInput={handlept_contact} label="PT Contact" /></div>
              <div><TextField value={dialogpt_name} inputProps={{maxLength: 100}} onInput={handlept_name} label="PT Name" /></div>
              <div><TextField value={dialogVP_name} inputProps={{maxLength: 100}} onInput={handleVP_name} label="VP_name" /></div>

         
          <div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>

        </div>
    )
}



export const OracleTable = () => {

  const columns = [
     {title:'Host Name',field:'host_name',cellStyle: {minWidth:200 }},
      {title:'CDB',field:'CDB'}, 
    {title:'Instance Name',field:'instance_name',cellStyle: {minWidth:200 }},
    {title:'DB/PDB Name',field:'db_name',cellStyle: {minWidth:200 }},
    {title:'Rdbms',field:'rdbms'},
    {title:'VM Cluster',field:'VM_Cluster',cellStyle: {minWidth:200 }},
    {title:'Physical VM',field:'Physical_VM',cellStyle: {minWidth:200 }},
    {title:'Status',field:'status',lookup: {ACTIVE: "ACTIVE", INACTIVE: "INACTIVE",DECOMMISSIONED:"DECOMMISSIONED"}},
    {title:'Domain',field:'domain',lookup: {CORP: "CORP",DC_ENABLEMENT:"DC ENABLEMENT", GID: "GID",OCI:"OCI"}},
    {title:'Environment',field:'environment'},
    {title:'Version',field:'version'},
    {title:'HA role',field:'ha_role'},
    {title:'Location',field:'location'},
    {title:'Oracle Home',field:'oracle_home',cellStyle: {minWidth:200 }},
    {title:'Port Number',field:'port_num',cellStyle: {minWidth:200 }},
    {title:'DB Size',field:'db_size',cellStyle: {minWidth:200 }},
    {title:'DBA Owner',field:'dba_sme',cellStyle: {minWidth:200 }},
    {title:'Support Group',field:'sn_group',cellStyle: {minWidth:200 }},
    {title:'Compliance',field:'compliance'},
    {title:'Comments',field:'comments'},
    {title:'App Name',field:'app_name'},
    {title:'App Family',field:'app_family',cellStyle: {minWidth:200 },},
    {title:'Application Owner',field:'app_vp_owner',cellStyle:{minWidth:300},},
    {title:'PT Contact',field:'pt_contact',cellStyle: {minWidth:300 },},
    {title:'PT Name',field:'pt_name',cellStyle: { minWidth:300 },},
    {title:'VP Name',field:'VP_name',cellStyle: { minWidth:300 },}
   
    ]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveOracle'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);    
      // eslint-disable-next-line
    },[]);
    
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveOracle").then((response) => {
          setDetails(response.data)
        })
      }

     /* const deleteDetail = (id) => {
        Axios.delete(` http://localhost:8000/deleteOracle/${id}`).then((response) => {
          //setDetails(response.data)
          getDetails();
        });
        
      };*/
   // window.onload = getDetails(); 
   window.addEventListener("load", getDetails); 
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogId, setDialogId] = useState('');
   const [dialoginstancename,setDialoginstancename] = useState('');
   const [dialogdbname,setDialogdbname] = useState('');
   const [dialogrdbms,setDialogrdbms] = useState('');
    const [dialogPhysical_VM,setDialogPhysical_VM] = useState('');
   const [dialogVM_Cluster,setDialogVM_Cluster] = useState('');
   const [dialogstatus,setDialogstatus] = useState('');
   const [dialogdomain,setDialogdomain] = useState('');
   const [dialogcdb,setDialogcdb] = useState('');
   const [dialogenvironment,setDialogenvironment] = useState('');
   const [dialogversion,setDialogversion] = useState('');
   const [dialogharole,setDialogharole] = useState('');
   const [dialoglocation,setDialoglocation] = useState('');
   const [dialogoraclehome,setDialogoraclehome] = useState('');
   const [dialogportnum,setDialogportnum] = useState('');
   const [dialogdbsize,setDialogdbsize] = useState('');
   const [dialogdbasme,setDialogdbasme] = useState('');
   const [dialogsngroup,setDialogsngroup] = useState('');
   const [dialogcompliance,setDialogcompliance] = useState('');
   const [dialogcomments,setDialogcomments] = useState('');
   const [dialogappname,setDialogappname] = useState('');
   const [dialogapp_family,setDialogapp_family]=useState('');
   const [dialoghostname,setDialoghostname] = useState('');
   const [dialogapp_vp_owner,setDialogapp_vp_owner]=useState('');
   const [dialogpt_contact, setDialogpt_contact] = useState('');
   const [dialogpt_name,setDialogpt_name]=useState('');
   const [dialogVP_name,setDialogVP_name]=useState('');

   
   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }
   const handle_rdbms = event => {
     setDialogrdbms(event.target.value);
   }

 const handleVM_Cluster = event => {
    setDialogVM_Cluster(event.target.value);
  }
  
  const handlePhysical_VM = event => {
    setDialogPhysical_VM(event.target.value);
  }
  
   const handle_instance_name = event => {
    setDialoginstancename(event.target.value);
  }

  const handle_port_num = event => {
    setDialogportnum(event.target.value);
  }

  const handle_dbname = event => {
    setDialogdbname(event.target.value);
  }

  const handle_status = event => {
    setDialogstatus(event.target.value);
  }

  const handle_domain = event => {
    setDialogdomain(event.target.value);
  }

  const handle_cdb = event => {
    setDialogcdb(event.target.value);
  }
  const handle_environment = event => {
    setDialogenvironment(event.target.value);
  }

  const handle_version = event => {
    setDialogversion(event.target.value);
  }

  const handle_ha_role = event => {
    setDialogharole(event.target.value);
  }

  const handle_oracle_home = event => {
    setDialogoraclehome(event.target.value);
  }

  const handle_dbsize = event => {
    setDialogdbsize(event.target.value);
  }

  const handle_dba_sme = event => {
    setDialogdbasme(event.target.value);
  }
  
  const handle_sn_group = event => {
    setDialogsngroup(event.target.value);
  }

  const handle_compliance = event => {
    setDialogcompliance(event.target.value);
  }

  const handle_comments = event => {
    setDialogcomments(event.target.value);
  }

  const handle_location = event => {
    setDialoglocation(event.target.value);
  }

  const handle_app_name = event => {
    setDialogappname(event.target.value);
  }

 const handleapp_family= event => {
    setDialogapp_family(event.target.value);
  }
  const handle_host_name = event => {
    setDialoghostname(event.target.value);
  }
  
const handleapp_vp_owner= event => {
    setDialogapp_vp_owner(event.target.value);
  }
   const handlept_contact= event => {
    setDialogpt_contact(event.target.value);
  }
  const handlept_name= event => {
    setDialogpt_name(event.target.value);
  }
  const handleVP_name= event => {
    setDialogVP_name(event.target.value);
  }

  const refreshPage=()=>{
    window.location.reload();
  }
  const handleUpdateRow = event => {
    
    if(!dialoginstancename||!dialogdbname||!dialogstatus||!dialogdomain||!dialogcdb||!dialogenvironment||!dialogversion||!dialoglocation)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.put(` http://localhost:8000/updateOracle`, { 
              id: dialogId,
              rdbms: dialogrdbms,
              Physical_VM:dialogPhysical_VM,
              VM_Cluster:dialogVM_Cluster,            
              instance_name: dialoginstancename,
              port_num: dialogportnum,
              oracle_home:dialogoraclehome,
              db_name: dialogdbname,
              status: dialogstatus,
              domain: dialogdomain,
              cdb:dialogcdb,
              environment: dialogenvironment,
              version: dialogversion,
              ha_role: dialogharole,
              db_size: dialogdbsize,
              dba_sme: dialogdbasme,
              sn_group: dialogsngroup,
              compliance: dialogcompliance,
              comments: dialogcomments,
              location: dialoglocation,
              app_name: dialogappname,
             app_family: dialogapp_family,
             host_name: dialoghostname ,
	     app_vp_owner:dialogapp_vp_owner,
             pt_contact:dialogpt_contact,
             pt_name:dialogpt_name,
             VP_name:dialogVP_name,
            })
            setDetails(
              {...details,[event.target.name]:event.target.value},
            );
          refreshPage();
          alert("successfully Edited!");

  }
  const handleAddnewRow=event=>{
    
    if(!dialoginstancename||!dialogdbname||!dialogstatus||!dialogdomain||!dialogcdb||!dialogenvironment||!dialogversion||!dialoglocation)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.post(' http://localhost:8000/createOracle',{
      rdbms: dialogrdbms,
      Physical_VM:dialogPhysical_VM,
      VM_Cluster:dialogVM_Cluster,
              instance_name: dialoginstancename,
              port_num: dialogportnum,
              oracle_home:dialogoraclehome,
              db_name: dialogdbname,
              status: dialogstatus,
              domain: dialogdomain,
               cdb:dialogcdb,
              environment: dialogenvironment,
              version: dialogversion,
              ha_role: dialogharole,
              db_size: dialogdbsize,
              dba_sme: dialogdbasme,
              sn_group: dialogsngroup,
              compliance: dialogcompliance,
              comments: dialogcomments,
              location: dialoglocation,
              app_name: dialogappname,
              app_family: dialogapp_family,
              host_name: dialoghostname ,
             app_vp_owner:dialogapp_vp_owner,
	     pt_contact:dialogpt_contact,
             pt_name:dialogpt_name,
	     VP_name:dialogVP_name,

	                   
            })
            setDetails(
              //getDetails(); 
              // Here you can add the new row to whatever index you want
              //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
           {...details,[event.target.name]:event.target.value},
          
           );
           refreshPage();
           alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);

  const initialset = (rowData) => {
    if(!isDialogOpen1) {
      setDialogId(rowData.id);
      setDialogrdbms(rowData.rdbms);
      setDialogPhysical_VM(rowData.Physical_VM);
      setDialogVM_Cluster(rowData.VM_Cluster);
      setDialogoraclehome(rowData.oracle_home);
      setDialoginstancename(rowData.instance_name);
      setDialogportnum(rowData.port_num);
      setDialogdbname(rowData.db_name);
      setDialogstatus(rowData.status);
      setDialogdomain(rowData.domain);
       setDialogcdb(rowData.CDB);
      setDialogenvironment(rowData.environment);
      setDialogversion(rowData.version);
      setDialogharole(rowData.ha_role);
      setDialogdbsize(rowData.db_size);
      setDialogdbasme(rowData.dba_sme);
      setDialogsngroup(rowData.sn_group);
      setDialogcompliance(rowData.compliance);
      setDialogcomments(rowData.comments);
      setDialoglocation(rowData.location);
      setDialogappname(rowData.app_name);
      setDialogapp_family(rowData.app_family);
      setDialoghostname(rowData.host_name);
      setDialogapp_vp_owner(rowData.app_vp_owner);
      setDialogpt_contact(rowData.pt_contact);
      setDialogpt_name(rowData.pt_name);
      setDialogVP_name(rowData.VP_name);
      

    }
  }
  const initialset1 = () => {
    if(!isDialogOpen1) {
      setDialogId("-");
      setDialogrdbms("-");
        setDialogPhysical_VM("-");
      setDialogVM_Cluster("-");
      setDialogoraclehome("-");
      setDialoginstancename("-");
      setDialogportnum("-");
      setDialogdbname("-");
      setDialogstatus("-");
      setDialogdomain("-");
       setDialogcdb("-")
      setDialogenvironment("-");
      setDialogversion("-");
      setDialogharole("-");
      setDialogdbsize("-");
      setDialogdbasme("-");
      setDialogsngroup("-");
      setDialogcompliance("-");
      setDialogcomments("-");
      setDialoglocation("-");
      setDialogappname("-");
       setDialogapp_family("-");
      setDialoghostname("-");
      setDialogapp_vp_owner("-");
      setDialogpt_contact("-");
      setDialogpt_name("-");
      setDialogVP_name("-");
     

    }
  } 

  const actions = [
    {
      icon: () => <FaIcons.FaEdit/>,
      tooltip: 'Edit Details',
      //isFreeAction: true,
      onClick: (event, rowData) => {
    
        initialset(rowData);
        
        setIsDialogOpen1(true);
       
      },
    },
    {
      icon: () => <AddIcon />,
      tooltip: 'Add',
      isFreeAction: true,
      onClick: (event, rowData) => {
        initialset1();
        setIsDialogOpen2(true);
      },
    }
  ];
    return (
        <div> 
            <MaterialTable title="Oracle Inventory"
            data = {details}
          columns = {columns}
          actions={actions}
          options = {{
              filtering: true,
              pagesize:20,
		pageSizeOptions:[20,50,80,110],
              exportButton: true,
              exportAllData: true,
              columnsButton:true,
              grouping:true,
              maxBodyHeight: '100vh',
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
	height:30,
                width:700 
                           },
                           
              actionsColumnIndex: 0, addRowPosition: "first"
          }}
          editable={{
          /*  onRowAdd: (newRow) => new Promise((resolve, reject) => {
              const updatedRows = [...details, newRow ]
              console.log(newRow)
              Axios.post(' http://localhost:8000/createOracle',{
                instance_name:newRow.instance_name,
                db_name:newRow.db_name,
                rdbms:newRow.rdbms,
                status:newRow.status,
                domain:newRow.domain,
               
                environment:newRow.environment,
                version:newRow.version,
                ha_role:newRow.ha_role,
               location:newRow.location,
                oracle_home:newRow.oracle_home,
                port_num:newRow.port_num,
                db_size:newRow.db_size,
                dba_sme:newRow.dba_sme,
                sn_group:newRow.sn_group,
                compliance:newRow.compliance,
                comments:newRow.comments,
                app_name:newRow.app_name,
                host_name:newRow.host_name,
		
            })
            setTimeout(() => {
                setDetails(updatedRows)
                getDetails()
                resolve()
              }, 1000)
            }),*/

           /* onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/


           /* onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
              const index=oldRow.tableData.id;
              const updatedRows=[...details]
              updatedRows[index]=updatedRow
              Axios.put(` http://localhost:8000/updateOracle`, { 
                id: oldRow.id,
                instance_name: updatedRow.instance_name,
                db_name: updatedRow.db_name,
                rdbms: updatedRow.rdbms,
                status: updatedRow.status,
                domain: updatedRow.domain,
                environment: updatedRow.environment,
                version: updatedRow.version,
                ha_role: updatedRow.ha_role,
               location: updatedRow.location,
                oracle_home: updatedRow.oracle_home,
                port_num: updatedRow.port_num,
                db_size: updatedRow.db_size,
                dba_sme: updatedRow.dba_sme,
                sn_group: updatedRow.sn_group,
                compliance: updatedRow.compliance,
                comments: updatedRow.comments,
                app_name: updatedRow.app_name,
                host_name: updatedRow.host_name,
              })
              setTimeout(() => {
                setDetails(updatedRows)
                resolve()
              }, 1000)
            })*/
/* onBulkUpdate:selectedRows=>new Promise((resolve,reject)=>{
              const rows=Object.values(selectedRows)
              const updatedRows=[...details]
              let index;
              rows.map(emp=>{index=emp.oldData.tableData.id
              updatedRows[index]=emp.newData})
              setTimeout(()=>{
                setDetails(updatedRows)
                resolve()
              },2000)
            })
  */
          }}
          
            />
            <MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
          
          <div><TextField value={dialoginstancename} onInput={handle_instance_name}  label="instance_name" required/></div>
          <div><TextField value={dialogdbname} onInput={handle_dbname} label="db_name" required/></div>
          <div><TextField value={dialogrdbms} onInput={handle_rdbms} label="rdbms" required/></div>
            <div><TextField value={dialogPhysical_VM} onInput={handlePhysical_VM} label="Physical VM" /></div>
          <div><TextField value={dialogVM_Cluster} onInput={handleVM_Cluster} label="VM Cluster" /></div>
          <div><TextField value={dialogstatus} onInput={handle_status} label="status" required/></div>
          <div><TextField value={dialogdomain} onInput={handle_domain} label="domain" required/></div>
          <div><TextField value={dialogcdb} onInput={handle_cdb} label="CDB" required/></div>
          <div><TextField value={dialogenvironment} onInput={handle_environment} label="environment" required/></div>
          <div><TextField value={dialogversion} onInput={handle_version} label="version" required /></div>
          <div><TextField value={dialogharole} onInput={handle_ha_role} label="ha_role" /></div>
          <div><TextField value={dialoglocation} onInput={handle_location} label="Location" required/></div>
          <div><TextField value={dialogoraclehome} onInput={handle_oracle_home} label="oracle_home" /></div>
          <div><TextField value={dialogportnum} onInput={handle_port_num} label="port_num" /></div>
          <div><TextField value={dialogdbsize} onInput={handle_dbsize} label="db_size" /></div>
          <div><TextField value={dialogdbasme} onInput={handle_dba_sme} label="dba_sme" /></div>
          <div><TextField value={dialogsngroup} onInput={handle_sn_group} label="sn_group" /></div>
          <div><TextField value={dialogcompliance} onInput={handle_compliance} label="scompliance" /></div>
          <div><TextField value={dialogcomments} onInput={handle_comments} label="comments" /></div>
          <div><TextField value={dialogappname} onInput={handle_app_name} label="app_name" /></div>
          <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
          <div><TextField value={dialoghostname} onInput={handle_host_name} label="host_name" /></div>
          <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner"  /></div>
	  <div><TextField value={dialogpt_contact} onInput={handlept_contact} label="PT Contact" /></div>
          <div><TextField value={dialogpt_name} inputProps={{maxLength: 100}} onInput={handlept_name} label="PT Name" /></div>
          <div><TextField value={dialogVP_name} inputProps={{maxLength: 100}} onInput={handleVP_name} label="VP_name" /></div>
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
          
          <div><TextField value={dialoginstancename} onInput={handle_instance_name}  label="instance_name" required /></div>
          <div><TextField value={dialogdbname} onInput={handle_dbname} label="db_name" required /></div>
          <div><TextField value={dialogrdbms} onInput={handle_rdbms} label="rdbms" required /></div>
           <div><TextField value={dialogPhysical_VM} onInput={handlePhysical_VM} label="Physical VM" /></div>
          <div><TextField value={dialogVM_Cluster} onInput={handleVM_Cluster} label="VM Cluster" /></div>
          <div><TextField value={dialogstatus} onInput={handle_status} label="status" required/></div>
          <div><TextField value={dialogdomain} onInput={handle_domain} label="domain" required/></div>
          <div><TextField value={dialogcdb} onInput={handle_cdb} label="CDB" required/></div>
           <div><TextField value={dialogenvironment} onInput={handle_environment} label="environment" required /></div>
          <div><TextField value={dialogversion} onInput={handle_version} label="version" required/></div>
          <div><TextField value={dialogharole} onInput={handle_ha_role} label="ha_role" /></div>
          <div><TextField value={dialoglocation} onInput={handle_location} label="Location" required /></div>
          <div><TextField value={dialogoraclehome} onInput={handle_oracle_home} label="oracle_home" /></div>
          <div><TextField value={dialogportnum} onInput={handle_port_num} label="port_num" /></div>
          <div><TextField value={dialogdbsize} onInput={handle_dbsize} label="db_size" /></div>
          <div><TextField value={dialogdbasme} onInput={handle_dba_sme} label="dba_sme" /></div>
          <div><TextField value={dialogsngroup} onInput={handle_sn_group} label="sn_group" /></div>
          <div><TextField value={dialogcompliance} onInput={handle_compliance} label="scompliance" /></div>
          <div><TextField value={dialogcomments} onInput={handle_comments} label="comments" /></div>
          <div><TextField value={dialogappname} onInput={handle_app_name} label="app_name" /></div>
         <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
         <div><TextField value={dialoghostname} onInput={handle_host_name} label="host_name" /></div>
         <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner"  /></div>
	 <div><TextField value={dialogpt_contact} onInput={handlept_contact} label="PT Contact" /></div>
         <div><TextField value={dialogpt_name} inputProps={{maxLength: 100}} onInput={handlept_name} label="PT Name" /></div>
         <div><TextField value={dialogVP_name} inputProps={{maxLength: 100}} onInput={handleVP_name} label="VP_name" /></div>
         
          <div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>
        </div>
    )
}








export const PostgresTable = () => {

  const columns = [
    {title:'Rdbms',field:'rdbms'},
    {title:'Host Name',field:'host_name',cellStyle: {minWidth:200 }},
    {title:'Instance Name',field:'instance_name'},
    {title:'Port',field:'port'},
    {title:'DB Name',field:'db_name'},
    {title:'Status',field:'status'},
    {title:'Domain',field:'domain'},
    {title:'Environment',field:'environment'},
    {title:'Version',field:'version'},
    {title:'HA role',field:'ha_role',cellStyle: {minWidth:200 }},
    {title:'DB Size',field:'db_size',cellStyle: {minWidth:200 }},
    {title:'DB Replication Type',field:'db_replication_type',cellStyle: {minWidth:200 }},
    {title:'DBA Owner',field:'dba_sme',cellStyle: {minWidth:200 }},
    {title:'Support Group',field:'sn_group',cellStyle: {minWidth:200 }},
    {title:'Compliance',field:'compliance'},
    {title:'Comments',field:'comments'},
    {title:'Location',field:'location'},
    {title:'App Name',field:'app_name',cellStyle: {minWidth:200 }},
 {title:'App Family',field:'app_family',cellStyle: {minWidth:200 },},
    {title:'Load Balancer',field:'distribution'}
    
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrievePostgres'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);  
      // eslint-disable-next-line  
    },[]);
    
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrievePostgres").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

      /*const deleteDetail = (id) => {
        
        Axios.delete(` http://localhost:8000/deletePostgres/${id}`).then((response) => {
         // setDetails(response.data)
          getDetails();
        });
        
      };*/
    //window.onload = getDetails(); 
    window.addEventListener("load", getDetails);  
    const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
    const [dialogId, setDialogId] = useState('');
    const [dialoginstancename,setDialoginstancename] = useState('');
    const [dialogdbname,setDialogdbname] = useState('');
    const [dialogrdbms,setDialogrdbms] = useState('');
    const [dialogstatus,setDialogstatus] = useState('');
    const [dialogdomain,setDialogdomain] = useState('');
    const [dialogenvironment,setDialogenvironment] = useState('');
    const [dialogversion,setDialogversion] = useState('');
    const [dialogharole,setDialogharole] = useState('');
    const [dialoglocation,setDialoglocation] = useState('');
    const [dialogport,setDialogport] = useState('');
    const [dialogdbsize,setDialogdbsize] = useState('');
    const [dialogdbreplicationtype,setDialogdbreplicationtype] = useState('');
    const [dialogdbasme,setDialogdbasme] = useState('');
    const [dialogsngroup,setDialogsngroup] = useState('');
    const [dialogcompliance,setDialogcompliance] = useState('');
    const [dialogcomments,setDialogcomments] = useState('');
    const [dialogappname,setDialogappname] = useState('');
 const [dialogapp_family,setDialogapp_family]=useState('');
    const [dialoghostname,setDialoghostname] = useState('');
    const [dialogdistribution,setDialogdistribution] = useState('');
    

    const handleDialogClose1 = event => {
      setIsDialogOpen1(false);
    }
  
    const handleDialogClose2 = event => {
      setIsDialogOpen2(false);
    }
    const handle_rdbms = event => {
      setDialogrdbms(event.target.value);
    }

    const handle_db_replication_type = event => {
     setDialogdbreplicationtype(event.target.value);
   }

    const handle_instance_name = event => {
     setDialoginstancename(event.target.value);
   }

   const handle_port = event => {
     setDialogport(event.target.value);
   }

   const handle_distribution = event => {
     setDialogdistribution(event.target.value);
   }

   const handle_dbname = event => {
     setDialogdbname(event.target.value);
   }

   const handle_status = event => {
     setDialogstatus(event.target.value);
   }

   const handle_domain = event => {
     setDialogdomain(event.target.value);
   }

   const handle_environment = event => {
     setDialogenvironment(event.target.value);
   }

   const handle_version = event => {
     setDialogversion(event.target.value);
   }

   const handle_ha_role = event => {
     setDialogharole(event.target.value);
   }

   const handle_dbsize = event => {
     setDialogdbsize(event.target.value);
   }

   const handle_dba_sme = event => {
     setDialogdbasme(event.target.value);
   }
   
   const handle_sn_group = event => {
     setDialogsngroup(event.target.value);
   }

   const handle_compliance = event => {
     setDialogcompliance(event.target.value);
   }

   const handle_comments = event => {
     setDialogcomments(event.target.value);
   }


   const handle_app_name = event => {
     setDialogappname(event.target.value);
   }
const handleapp_family= event => {
    setDialogapp_family(event.target.value);
  }
   const handle_host_name = event => {
     setDialoghostname(event.target.value);
   }

   const handle_location = event => {
     setDialoglocation(event.target.value);
   }

   const refreshPage=()=>{
    window.location.reload();
  }
  const handleUpdateRow = event => {
    if(!dialogrdbms||!dialoginstancename||!dialogport||!dialogdbname||!dialogversion||!dialogharole||!dialogdbsize||!dialoghostname)
    {
      alert("Enter mandatory details");
      return;
    }
     setDetails(
       {...details,[event.target.name]:event.target.value},
     );
     
     Axios.put(` http://localhost:8000/updatePostgres`, { 
               id: dialogId,
               rdbms: dialogrdbms,
               instance_name: dialoginstancename,
               port: dialogport,
               distribution: dialogdistribution,
               db_name: dialogdbname,
               status: dialogstatus,
               domain: dialogdomain,
               environment: dialogenvironment,
               db_replication_type: dialogdbreplicationtype,
               version: dialogversion,
               ha_role: dialogharole,
               db_size: dialogdbsize,
               dba_sme: dialogdbasme,
               sn_group: dialogsngroup,
               compliance: dialogcompliance,
               comments: dialogcomments,
               location: dialoglocation,
               app_name: dialogappname,
                app_family: dialogapp_family,
               host_name: dialoghostname ,
               
               
             })
           refreshPage();
		 alert("successfully Edited!");

   }
   const handleAddnewRow=event=>{
      if(!dialogrdbms||!dialoginstancename||!dialogport||!dialogdbname||!dialogversion||!dialogharole||!dialogdbsize||!dialoghostname)
      {
        alert("Enter mandatory details");
        return;
      }
    Axios.post(' http://localhost:8000/createPostgres',{
      rdbms: dialogrdbms,
      instance_name: dialoginstancename,
      port: dialogport,
      distribution: dialogdistribution,
      db_name: dialogdbname,
      status: dialogstatus,
      domain: dialogdomain,
      environment: dialogenvironment,
      db_replication_type: dialogdbreplicationtype,
      version: dialogversion,
      ha_role: dialogharole,
      db_size: dialogdbsize,
      dba_sme: dialogdbasme,
      sn_group: dialogsngroup,
      compliance: dialogcompliance,
      comments: dialogcomments,
      location: dialoglocation,
      app_name: dialogappname,
       app_family: dialogapp_family,
      host_name: dialoghostname,
      
   })
   setDetails(
    //getDetails(); 
    // Here you can add the new row to whatever index you want
    //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
 {...details,[event.target.name]:event.target.value},

 );
 refreshPage();
 alert("successfully Added!");
   }
useEffect(() => {
// Closes dialog after saving
if (isDialogOpen1) {
  setIsDialogOpen1(false);
}
if (isDialogOpen2) {
  setIsDialogOpen2(false);
}
// eslint-disable-next-line
}, [details]);

   const initialset = (rowData) => {
     if(!isDialogOpen1) {
       setDialogId(rowData.id);
       setDialogrdbms(rowData.rdbms);
       setDialogdistribution(rowData.distribution);
       setDialoginstancename(rowData.instance_name);
       setDialogport(rowData.port);
       setDialogdbname(rowData.db_name);
       setDialogstatus(rowData.status);
       setDialogdomain(rowData.domain);
       setDialogenvironment(rowData.environment);
       setDialogversion(rowData.version);
       setDialogharole(rowData.ha_role);
       setDialogdbsize(rowData.db_size);
       setDialogdbreplicationtype(rowData.db_replication_type);
       setDialogdbasme(rowData.dba_sme);
       setDialogsngroup(rowData.sn_group);
       setDialogcompliance(rowData.compliance);
       setDialogcomments(rowData.comments);
         setDialoglocation(rowData.location);
       setDialogappname(rowData.app_name);
        setDialogapp_family(rowData.app_family);
       setDialoghostname(rowData.host_name);
     

     }
   }
   const initialset1 = () => {
    if(!isDialogOpen1) {
      setDialogId("-");
      setDialogrdbms("-");
      setDialogdistribution("-");
      setDialoginstancename("-");
      setDialogport("-");
      setDialogdbname("-");
      setDialogstatus("-");
      setDialogdomain("-");
      setDialogenvironment("-");
      setDialogversion("-");
      setDialogharole("-");
      setDialogdbsize("-");
      setDialogdbreplicationtype("-");
      setDialogdbasme("-");
      setDialogsngroup("-");
      setDialogcompliance("-");
      setDialogcomments("-");
      setDialoglocation("-");
      setDialogappname("-");
      setDialogapp_family("-");
      setDialoghostname("-");
     



    }
  }   

   const actions = [
    {
      icon: () => <FaIcons.FaEdit/>,
      tooltip: 'Edit Details',
      //isFreeAction: true,
      onClick: (event, rowData) => {
    
        initialset(rowData);
        
        setIsDialogOpen1(true);
       
      },
    },
    {
      icon: () => <AddIcon />,
      tooltip: 'Add',
      isFreeAction: true,
      onClick: (event, rowData) => {
        initialset1();
        setIsDialogOpen2(true);
      },
    }
  ];



    return (
        <div> 
            <MaterialTable title="DB_Inv_Postgresql"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{
            
              filtering: true,
              pagesize:20,
 	      pageSizeOptions:[20,50,80,110],
		exportButton:true,
              exportAllData: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
     		grouping:true,        
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
			 height:30,
                width:700
                           },
             
              
              actionsColumnIndex: 0, addRowPosition: "first"
          }}
          editable={{
           /* onRowAdd: (newRow) => new Promise((resolve, reject) => {
              const updatedRows = [...details, newRow ]
              console.log(newRow)
              Axios.post(' http://localhost:8000/createPostgres',{
                rdbms: newRow.rdbms,
                instance_name: newRow.instance_name,
                port: newRow.port,
                db_name: newRow.db_name,
                status: newRow.status,
                domain: newRow.domain,
                environment: newRow.environment,
                version: newRow.version,
                ha_role: newRow.ha_role,
                db_size: newRow.db_size,
                db_replication_type: newRow.db_replication_type,
                dba_sme: newRow.dba_sme,
                sn_group: newRow.sn_group,
                compliance: newRow.compliance,
                comments: newRow.comments,
                location: newRow.location,
                app_name: newRow.app_name,
                host_name: newRow.host_name,
                distribution: newRow.distribution,
                
            })
            setTimeout(() => {
                setDetails(updatedRows)
                getDetails()
                resolve()
              }, 1000)
              
            }),*/

           /* onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/


          /*  onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
              const index=oldRow.tableData.id;
              const updatedRows=[...details]
              updatedRows[index]=updatedRow
              Axios.put(` http://localhost:8000/updatePostgres`, {  
                id: oldRow.id,
                rdbms: updatedRow.rdbms,
                instance_name: updatedRow.instance_name,
                port: updatedRow.port,
                db_name: updatedRow.db_name,
                status: updatedRow.status,
                domain: updatedRow.domain,
                environment: updatedRow.environment,
                version: updatedRow.version,
                ha_role: updatedRow.ha_role,
                db_size: updatedRow.db_size,
                db_replication_type: updatedRow.db_replication_type,
                dba_sme: updatedRow.dba_sme,
                sn_group: updatedRow.sn_group,
                compliance: updatedRow.compliance,
                comments: updatedRow.comments,
                location: updatedRow.location,
                app_name: updatedRow.app_name,
                host_name: updatedRow.host_name,
                distribution: updatedRow.distribution,
                
              })
              setTimeout(() => {
                setDetails(updatedRows)
                resolve()
              }, 1000)
            })*/
  
          }}
        
            />

<MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
        <div><TextField value={dialogrdbms} onInput={handle_rdbms} label="rdbms" required/></div>
          <div><TextField value={dialoginstancename} onInput={handle_instance_name}  label="instance_name" required/></div>
          <div><TextField value={dialogport} onInput={handle_port} label="port" required/></div>
          <div><TextField value={dialogdbname} onInput={handle_dbname} label="db_name" required/></div>
          <div><TextField value={dialogstatus} onInput={handle_status} label="status" /></div>
          <div><TextField value={dialogdomain} onInput={handle_domain} label="domain" /></div>
          <div><TextField value={dialogenvironment} onInput={handle_environment} label="environment" /></div>
          <div><TextField value={dialogversion} onInput={handle_version} label="version" required/></div>
          <div><TextField value={dialogharole} onInput={handle_ha_role} label="ha_role" required/></div>
          <div><TextField value={dialogdbsize} onInput={handle_dbsize} label="db_size" required/></div>
          <div><TextField value={dialogdbreplicationtype} onInput={handle_db_replication_type} label="db_replication_type" /></div>
          <div><TextField value={dialogdbasme} onInput={handle_dba_sme} label="dba_sme" /></div>
          <div><TextField value={dialogsngroup} onInput={handle_sn_group} label="sn_group" /></div>
          <div><TextField value={dialogcompliance} onInput={handle_compliance} label="scompliance" required/></div>
          <div><TextField value={dialogcomments} onInput={handle_comments} label="comments" /></div>
           <div><TextField value={dialoglocation} onInput={handle_location} label="location" /></div>
          <div><TextField value={dialogappname} onInput={handle_app_name} label="app_name" /></div>
         <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
           <div><TextField value={dialoghostname} onInput={handle_host_name} label="host_name" required/></div>
          <div><TextField value={dialogdistribution} onInput={handle_distribution} label="distribution" required/></div>
         
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
        <div><TextField value={dialogrdbms} onInput={handle_rdbms} label="rdbms" required/></div>
          <div><TextField value={dialoginstancename} onInput={handle_instance_name}  label="instance_name" required/></div>
          <div><TextField value={dialogport} onInput={handle_port} label="port" required/></div>
          <div><TextField value={dialogdbname} onInput={handle_dbname} label="db_name" required/></div>
          <div><TextField value={dialogstatus} onInput={handle_status} label="status" /></div>
          <div><TextField value={dialogdomain} onInput={handle_domain} label="domain" /></div>
          <div><TextField value={dialogenvironment} onInput={handle_environment} label="environment" /></div>
          <div><TextField value={dialogversion} onInput={handle_version} label="version" required/></div>
          <div><TextField value={dialogharole} onInput={handle_ha_role} label="ha_role" required/></div>
          <div><TextField value={dialogdbsize} onInput={handle_dbsize} label="db_size" required/></div>
          <div><TextField value={dialogdbreplicationtype} onInput={handle_db_replication_type} label="db_replication_type" /></div>
          <div><TextField value={dialogdbasme} onInput={handle_dba_sme} label="dba_sme" /></div>
          <div><TextField value={dialogsngroup} onInput={handle_sn_group} label="sn_group" /></div>
          <div><TextField value={dialogcompliance} onInput={handle_compliance} label="scompliance" required/></div>
          <div><TextField value={dialogcomments} onInput={handle_comments} label="comments" /></div>
          <div><TextField value={dialoglocation} onInput={handle_location} label="location" /></div>
          <div><TextField value={dialogappname} onInput={handle_app_name} label="app_name" /></div>
          <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
          <div><TextField value={dialoghostname} onInput={handle_host_name} label="host_name" required/></div>
          <div><TextField value={dialogdistribution} onInput={handle_distribution} label="distribution" required /></div>
 
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>

        </div>
    )
}



export const AppTable1 = () => {

  const columns = [
    {title:'App Name',field:'app_name',cellStyle: {
     
     minWidth:300
      },},
 {title:'App Family',field:'app_family',cellStyle: {minWidth:200 },},
    
    {title:'Application Status',field:'current_state',cellStyle: {
     
     minWidth:300
      },},
    {title:'Reporting Name',field:'reporting_name',cellStyle: {
     
     minWidth:300
      },},
    {title:'Brief Functionality',field:'brief_func',cellStyle: {
     
     minWidth:300
      },},
    {title:'APM Owner',field:'apm_owner',cellStyle: {
     
     minWidth:300
      },},
    {title:'App Type',field:'app_type',cellStyle: {
     
     minWidth:300
      },},
    {title:'Technology Used',field:'app_tech',cellStyle: {
     
     minWidth:300
      },},
    {title:'DB Flavor',field:'db_tech',cellStyle: {
     
     minWidth:300
      },},
    {title:'Number of Users',field:'no_users',cellStyle: {
     
     minWidth:300
      },},
    {title:'Availability',field:'availability'},
    {title:'Operational Impact',field:'oper_impact',cellStyle: {
     
     minWidth:300
      },},
    {title:'Revenue Impact',field:'revenue_impact',cellStyle: {
     
     minWidth:300
      },},
    {title:'Stores Or Customer Impact',field:'stores_or_custimpact',cellStyle: {
     
     minWidth:300
      },},
   
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveApp'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);    
      // eslint-disable-next-line
    },[]);
    
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveApp").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

     /* const deleteDetail = (app_name) => {
        Axios.delete(` http://localhost:8000/deleteApp/${app_name}`).then((response) => {
          //setDetails(response.data)
          getDetails();
        });
        
      };*/
   // window.onload = getDetails();  
   window.addEventListener("load", getDetails);   
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const[dialogoldapp_name,setDialogoldapp_name]=useState('');
   const [dialogapp_name, setDialogapp_name] = useState('');
  const [dialogapp_family,setDialogapp_family]=useState('');
  const [dialogcurrent_state, setDialogcurrent_state] = useState('');
  const [dialogreporting_name, setDialogreporting_name] = useState('');
  const [dialogbrief_func,setDialogbrief_func]=useState('');
  const [dialogapm_owner,setDialogapm_owner]=useState('');
  const [dialogapp_type,setDialogapp_type]=useState('');
  const [dialogapp_tech,setDialogapp_tech]=useState('');
  const [dialogdb_tech,setDialogdb_tech]=useState('');
  const [dialogno_users,setDialogno_users]=useState('');
  const [dialogavailability,setDialogavailability]=useState('');
  const [dialogoper_imapct,setDialogoper_impact]=useState('');
  const [dialogrevenue_impact,setDialogrevenue_impact]=useState('');
  const [dialogstores_or_custimpact,setDialogstores_or_custimpact]=useState('');
  const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }


  const handleapp_name = event => {
    setDialogapp_name(event.target.value);
  }
 
const handleapp_family= event => {
    setDialogapp_family(event.target.value);
  }
  const handlecurrent_state= event => {
    setDialogcurrent_state(event.target.value);
  }
  const handlereporting_name= event => {
    setDialogreporting_name(event.target.value);
  }
  const handlerebrief_func= event => {
    setDialogbrief_func(event.target.value);
  }
  const handleapm_owner= event => {
    setDialogapm_owner(event.target.value);
  }
  const handleapp_type= event => {
    setDialogapp_type(event.target.value);
  }
  const handleapp_tech= event => {
    setDialogapp_tech(event.target.value);
  }
  const handledb_tech= event => {
    setDialogdb_tech(event.target.value);
  }
  const handleno_users= event => {
    setDialogno_users(event.target.value);
  }
  const handleavailability= event => {
    setDialogavailability(event.target.value);
  }
  const handleoper_impact= event => {
    setDialogoper_impact(event.target.value);
  }
  const handlerevenue_impact= event => {
    setDialogrevenue_impact(event.target.value);
  }
  const handlestores_or_custimpact= event => {
    setDialogstores_or_custimpact(event.target.value);
  }
  const refreshPage=()=>{
    window.location.reload();
  }
  const handleUpdateRow = event => {
    if (!dialogapp_name||!dialogcurrent_state||!dialogreporting_name||!dialogapm_owner||!dialogapp_type)
     {
      alert("Enter mandatory fields");
      return;}
    // if (!dialogId || !dialogapp_name||!dialogcurrent_state||!dialogreporting_name) return;
    setDetails(
      // {...details,[ event.app_name]: dialogapp_name }
       {...details,[event.target.name]:event.target.value},
      
       );
     Axios.put(' http://localhost:8000/updateApp',{
                 oldapp_name:dialogoldapp_name,
                 newapp_name:dialogapp_name,
                 app_family: dialogapp_family,
                 current_state: dialogcurrent_state,
                 reporting_name:dialogreporting_name,
                 brief_func: dialogbrief_func,
                 apm_owner:dialogapm_owner,
                 app_type:dialogapp_type,
                 app_tech:dialogapp_tech,
                 db_tech: dialogdb_tech,
                 no_users:dialogno_users,
                 availability:dialogavailability,
                 oper_impact: dialogoper_imapct,
                 revenue_impact: dialogrevenue_impact,
                 stores_or_custimpact: dialogstores_or_custimpact
             })
            
             refreshPage();
             alert("successfully Edited!");
         
 
          
   }


   const handleAddnewRow=event=>{
    if (!dialogapp_name||!dialogcurrent_state||!dialogreporting_name||!dialogapm_owner||!dialogapp_type) 
    {
      alert("Enter mandatory fields");
      return;}
    Axios.post(' http://localhost:8000/createApp',{
      app_name:dialogapp_name,
     app_family: dialogapp_family,
      current_state: dialogcurrent_state,//newRow.current_state,
      reporting_name:dialogreporting_name,// newRow.reporting_name,
      brief_func: dialogbrief_func,//newRow.brief_func,
      apm_owner:dialogapm_owner,//newRow.apm_owner,
      app_type:dialogapp_type,// newRow.app_type,
      app_tech:dialogapp_tech,// newRow.app_tech,
      db_tech: dialogdb_tech,//newRow.db_tech,
      no_users:dialogno_users,// newRow.no_users,
      availability:dialogavailability,// newRow.availability,
      oper_impact: dialogoper_imapct,//newRow.oper_impact,
      revenue_impact: dialogrevenue_impact,//newRow.revenue_impact,
      stores_or_custimpact: dialogstores_or_custimpact,
            }) 
            setDetails(
              //getDetails(); 
              // Here you can add the new row to whatever index you want
              //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
           {...details,[event.target.name]:event.target.value},
          
           );
           refreshPage();
           alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);

  const initialset=(rowData)=>{
    setDialogoldapp_name(rowData.app_name);
    if (!isDialogOpen1) {
      setDialogapp_name(rowData.app_name);
     setDialogapp_family(rowData.app_family);
      setDialogcurrent_state(rowData.current_state);
      setDialogreporting_name(rowData.reporting_name);
      setDialogbrief_func(rowData.brief_func);
      setDialogapm_owner(rowData.apm_owner);
      setDialogapp_type(rowData.app_type);
      setDialogapp_tech(rowData.app_tech);
      setDialogdb_tech(rowData.db_tech);
      setDialogno_users(rowData.no_users);
      setDialogavailability(rowData.availability);
      setDialogoper_impact(rowData.oper_impact);
      setDialogrevenue_impact(rowData.revenue_impact);
      setDialogstores_or_custimpact(rowData.stores_or_custimpact);
  
    }
  }

  const initialset1=()=>{
    setDialogoldapp_name("-");
    if (!isDialogOpen1) {
      setDialogapp_name("-");
     setDialogapp_family("-");
      setDialogcurrent_state("-");
      setDialogreporting_name("-");
      setDialogbrief_func("-");
      setDialogapm_owner("-");
      setDialogapp_type("-");
      setDialogapp_tech("-");
      setDialogdb_tech("-");
      setDialogno_users("-");
      setDialogavailability("-");
      setDialogoper_impact("-");
      setDialogrevenue_impact("-");
      setDialogstores_or_custimpact("-");
  
    }
  }

  const actions = [
    {
      icon: () => <FaIcons.FaEdit/>,
      tooltip: 'Edit Details',
      //isFreeAction: true,
      onClick: (event, rowData) => {
    
        initialset(rowData);
        
        setIsDialogOpen1(true);
       
      },
    },
    {
      icon: () => <AddIcon />,
      tooltip: 'Add',
      isFreeAction: true,
      onClick: (event, rowData) => {
        initialset1();
        setIsDialogOpen2(true);
      },
    }
  ];

    return (
        <div> 
            <MaterialTable title="Application Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{
              filtering: true,
              pagesize:20,
              pageSizeOptions:[20,50,80,110],
             exportButton: true,            
                exportAllData: true,
             
              columnsButton:true,
             grouping:true,
		 maxBodyHeight: '100vh',
             
		headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
                height:30,
                width:700
                           },
	actionsColumnIndex: 0,addRowPosition: "first",
          }}
          editable={{
           /* onRowAdd: (newRow) => new Promise((resolve, reject) => {
              const updatedRows = [...details, newRow ]
              Axios.post(' http://localhost:8000/createApp',{
                app_name:newRow.app_name,
               
                current_state: newRow.current_state,
                reporting_name: newRow.reporting_name,
                brief_func: newRow.brief_func,
                apm_owner: newRow.apm_owner,
                app_type: newRow.app_type,
                app_tech: newRow.app_tech,
                db_tech: newRow.db_tech,
                no_users: newRow.no_users,
                availability: newRow.availability,
                oper_impact: newRow.oper_impact,
                revenue_impact: newRow.revenue_impact,
                stores_or_custimpact: newRow.stores_or_custimpact
            })
            setTimeout(() => {
                setDetails(updatedRows)
                getDetails()
                resolve()
              }, 1000)
            }),*/

           /* onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const app_name = selectedRow.app_name;
              deleteDetail(app_name);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/


           /* onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
              const index=oldRow.tableData.app_name;
              const updatedRows=[...details]
              updatedRows[index]=updatedRow  //index---
              //console.log(oldRow)
              Axios.put(` http://localhost:8000/updateApp`, { 
                
               
                current_state: updatedRow.current_state,
                reporting_name: updatedRow.reporting_name,
                brief_func: updatedRow.brief_func,
                apm_owner: updatedRow.apm_owner,
                app_type: updatedRow.app_type,
                app_tech: updatedRow.app_tech,
                db_tech: updatedRow.db_tech,
                no_users: updatedRow.no_users,
                availability: updatedRow.availability,
                oper_impact: updatedRow.oper_impact,
                revenue_impact: updatedRow.revenue_impact,
                stores_or_custimpact: updatedRow.stores_or_custimpact,
                old_app_name:oldRow.app_name,
                new_app_name: updatedRow.app_name
                })
              setTimeout(() => {
                setDetails(updatedRows)
                getDetails() ///---extra
                resolve()
              }, 1000)
            })*/
  
          }}
         
            />
<MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
            <Paper style={{ padding: '2em' }}>
              <div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" required  /></div>
              <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
              <div><TextField value={dialogcurrent_state} onInput={handlecurrent_state} label="Current-state" required/></div>
              <div><TextField value={dialogreporting_name} onInput={handlereporting_name} label="Reporting-name" required /></div>
              <div><TextField value={dialogbrief_func} inputProps={{maxLength: 100}} onInput={handlerebrief_func} label="Brief-Function" /></div>
              <div><TextField value={dialogapm_owner} onInput={handleapm_owner} label="Apm-Owner" required /></div>
              <div><TextField value={dialogapp_type} onInput={handleapp_type} label="App-Type" required /></div>
              <div><TextField value={dialogapp_tech} onInput={handleapp_tech} label="App-Tech" /></div>
              <div><TextField value={dialogdb_tech} onInput={handledb_tech} label="DB-Tech" /></div>
              <div><TextField value={dialogno_users} onInput={handleno_users} label="No-Users" /></div>
              <div><TextField value={dialogavailability} onInput={handleavailability} label="Availability" /></div>
              <div><TextField value={dialogoper_imapct} onInput={handleoper_impact} label="Oper-Impact" /></div>
              <div><TextField value={dialogrevenue_impact} onInput={handlerevenue_impact} label="Revenue-Impact" /></div>
              <div><TextField value={dialogstores_or_custimpact} onInput={handlestores_or_custimpact} label="Stores-or-Custimpact" /></div>
              <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
              <div style={{ marginTop: '3em' }}>
                <Button onClick={handleUpdateRow}>Save</Button>
                <Button onClick={handleDialogClose1}>Cancel</Button>
              </div>
            </Paper>
          </MyDialog>
          <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
            <Paper style={{ padding: '2em' }}>
              <div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" required/></div>
              <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
              <div><TextField value={dialogcurrent_state} onInput={handlecurrent_state} label="Currnt-state" required  /></div>
              <div><TextField value={dialogreporting_name} onInput={handlereporting_name} label="Reporting-name" required /></div>
              <div><TextField value={dialogbrief_func} onInput={handlerebrief_func} label="Brief-Func" /></div>
              <div><TextField value={dialogapm_owner} onInput={handleapm_owner} label="Apm-Owner" required  /></div>
              <div><TextField value={dialogapp_type} onInput={handleapp_type} label="App-Type" required  /></div>
              <div><TextField value={dialogapp_tech} onInput={handleapp_tech} label="App-Tech" /></div>
              <div><TextField value={dialogdb_tech} onInput={handledb_tech} label="DB-Tech" /></div>
              <div><TextField value={dialogno_users} onInput={handleno_users} label="No-Users" /></div>
              <div><TextField value={dialogavailability} onInput={handleavailability} label="Availability" /></div>
              <div><TextField value={dialogoper_imapct} onInput={handleoper_impact} label="Oper-Impact" /></div>
              <div><TextField value={dialogrevenue_impact} onInput={handlerevenue_impact} label="Revenue-Impact" /></div>
              <div><TextField value={dialogstores_or_custimpact} onInput={handlestores_or_custimpact} label="Stores-or-Custimpact" /></div>
             <div><pre>           </pre></div>
          
               <div className="h3color">
               
               <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
               <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4>
               
            
            </div>
              <div style={{ marginTop: '3em' }}>
                <Button onClick={handleAddnewRow}>Save</Button>
                <Button onClick={handleDialogClose2}>Cancel</Button>
              </div>
            </Paper>
          </MyDialog>          
        </div>
    )
}




export const AppTable = () => {

  const columns = [
    {title:'App Name',field:'app_name',cellStyle: {
     
     minWidth:300
      },},
     {title:'App Family',field:'app_family',cellStyle: {minWidth:200 },},
    {title:'Application Owner',field:'app_vp_owner',cellStyle: {
     
     minWidth:300
      },},
    {title:'App Business Type',field:'app_business_type',cellStyle: {
     
     minWidth:300
      },},
    {title:'Brief Functionality',field:'brief_func',cellStyle: {
     
     minWidth:300
      },},
    {title:'Current State',field:'current_state',cellStyle: {
     
     minWidth:300
      },},
    {title:'PT Contact',field:'pt_contact',cellStyle: {
     
     minWidth:300
      },},
    {title:'PT Name',field:'pt_name',cellStyle: {
     
     minWidth:300
      },},
{title:'VP Name',field:'VP_name',cellStyle: {

     minWidth:300
      },},    
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveApp1'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);    
      // eslint-disable-next-line
    },[]);
    
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveApp1").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

     /* const deleteDetail = (app_name) => {
        Axios.delete(` http://localhost:8000/deleteApp1/${app_name}`).then((response) => {
          //setDetails(response.data)
          getDetails();
        });
        
      };*/
   // window.onload = getDetails();  
   window.addEventListener("load", getDetails);   
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const[dialogoldapp_name,setDialogoldapp_name]=useState('');
  const [dialogapp_family,setDialogapp_family]=useState('');
   const [dialogapp_name, setDialogapp_name] = useState('');
   const [dialogapp_vp_owner,setDialogapp_vp_owner]=useState('');
   const [dialogapp_business_type,setDialogapp_business_type]=useState('');
   const [dialogbrief_func,setDialogbrief_func]=useState('');
   const [dialogcurrent_state, setDialogcurrent_state] = useState('');
   const [dialogpt_contact, setDialogpt_contact] = useState('');
   const [dialogpt_name,setDialogpt_name]=useState('');
   const [dialogVP_name,setDialogVP_name]=useState('');
  
  const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }


  const handleapp_name = event => {
    setDialogapp_name(event.target.value);
  }
const handleapp_family= event => {
    setDialogapp_family(event.target.value);
  }
  const handleapp_vp_owner= event => {
    setDialogapp_vp_owner(event.target.value);
  }
  const handleapp_business_type= event => {
    setDialogapp_business_type(event.target.value);
  }
  const handlerebrief_func= event => {
    setDialogbrief_func(event.target.value);
  }
  const handlecurrent_state= event => {
    setDialogcurrent_state(event.target.value);
  }
  const handlept_contact= event => {
    setDialogpt_contact(event.target.value);
  }
  const handlerept_name= event => {
    setDialogpt_name(event.target.value);
  }
 const handleVP_name= event => {
    setDialogVP_name(event.target.value);
  }
  
  const refreshPage=()=>{
    window.location.reload();
  }
  const handleUpdateRow = event => {
    if (!dialogapp_name||!dialogapp_vp_owner||!dialogapp_business_type||!dialogbrief_func||!dialogcurrent_state||!dialogpt_contact||!dialogpt_name)
     {
      alert("Enter mandatory fields");
      return;}
    // if (!dialogId || !dialogapp_name||!dialogcurrent_state||!dialogreporting_name) return;
    setDetails(
      // {...details,[ event.app_name]: dialogapp_name }
       {...details,[event.target.name]:event.target.value},
      
       );
     Axios.put(' http://localhost:8000/updateApp1',{
                 oldapp_name:dialogoldapp_name,
                 newapp_name:dialogapp_name,
                 app_family: dialogapp_family,
                 app_vp_owner:dialogapp_vp_owner,
                 app_business_type:dialogapp_business_type,
                 brief_func: dialogbrief_func,
                 current_state: dialogcurrent_state,
                 pt_contact:dialogpt_contact,
                 pt_name:dialogpt_name,
                 VP_name:dialogVP_name,
            
             })
            
             refreshPage();
             alert("successfully Edited!");
         
 
          
   }


   const handleAddnewRow=event=>{
    if (!dialogapp_name||!dialogapp_vp_owner||!dialogapp_business_type||!dialogbrief_func||!dialogcurrent_state||!dialogpt_contact||!dialogpt_name)
    {
      alert("Enter mandatory fields");
      return;}
    Axios.post(' http://localhost:8000/createApp1',{
      app_name:dialogapp_name,
      app_family: dialogapp_family,
      app_vp_owner:dialogapp_vp_owner,//newRow.apm_owner,
      app_business_type:dialogapp_business_type,// newRow.app_type,
      brief_func: dialogbrief_func,//newRow.brief_func,
      current_state: dialogcurrent_state,//newRow.current_state,
      pt_contact:dialogpt_contact,//,
      pt_name:dialogpt_name,//,
      VP_name:dialogVP_name,
      }) 
            setDetails(
              //getDetails(); 
              // Here you can add the new row to whatever index you want
              //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
           {...details,[event.target.name]:event.target.value},
          
           );
           refreshPage();
           alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);

  const initialset=(rowData)=>{
    setDialogoldapp_name(rowData.app_name);
    if (!isDialogOpen1) {
      setDialogapp_name(rowData.app_name);
      setDialogapp_family(rowData.app_family);
      setDialogapp_vp_owner(rowData.app_vp_owner);
      setDialogapp_business_type(rowData.app_business_type);
      setDialogbrief_func(rowData.brief_func);
      setDialogcurrent_state(rowData.current_state);
      setDialogpt_contact(rowData.pt_contact);
      setDialogpt_name(rowData.pt_name);
      setDialogVP_name(rowData.VP_name);
    }
  }

  const initialset1=()=>{
    setDialogoldapp_name("-");
    if (!isDialogOpen1) {
      setDialogapp_name("-");
      setDialogapp_family("-");
      setDialogapp_vp_owner("-");
      setDialogapp_business_type("-");
      setDialogbrief_func("-");
      setDialogcurrent_state("-");
      setDialogpt_contact("-");
      setDialogpt_name("-");
      setDialogVP_name("-");
  
    }
  }

  const actions = [
    {
      icon: () => <FaIcons.FaEdit/>,
      tooltip: 'Edit Details',
      //isFreeAction: true,
      onClick: (event, rowData) => {
    
        initialset(rowData);
        
        setIsDialogOpen1(true);
       
      },
    },
    {
      icon: () => <AddIcon />,
      tooltip: 'Add',
      isFreeAction: true,
      onClick: (event, rowData) => {
        initialset1();
        setIsDialogOpen2(true);
      },
    }
  ];

    return (
        <div> 
            <MaterialTable title="Application Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{
              filtering: true,
              pagesize:20,
              pageSizeOptions:[20,50,80,110],
             exportButton: true,            
                exportAllData: true,
             
              columnsButton:true,
             grouping:true,
		 maxBodyHeight: '100vh',
             
		headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
                height:30,
                width:700
                           },
	actionsColumnIndex: 0,addRowPosition: "first",
          }}
          editable={{
           
           /* onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const app_name = selectedRow.app_name;
              deleteDetail(app_name);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/


           
          }}
         
            />
<MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
            <Paper style={{ padding: '2em' }}>
              <div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" required  /></div>
              <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
               <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner" required /></div>
              <div><TextField value={dialogapp_business_type} onInput={handleapp_business_type} label="App Business Type" required /></div>
              <div><TextField value={dialogcurrent_state} onInput={handlecurrent_state} label="Current-state" required/></div>
              <div><TextField value={dialogbrief_func} inputProps={{maxLength: 100}} onInput={handlerebrief_func} label="Brief-Function" required /></div>
              <div><TextField value={dialogpt_contact} onInput={handlept_contact} label="PT Contact" required /></div>
              <div><TextField value={dialogpt_name} inputProps={{maxLength: 100}} onInput={handlerept_name} label="PT Name" required /></div>
             <div><TextField value={dialogVP_name} inputProps={{maxLength: 100}} onInput={handleVP_name} label="VP Name" /></div>
              <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
              <div style={{ marginTop: '3em' }}>
                <Button onClick={handleUpdateRow}>Save</Button>
                <Button onClick={handleDialogClose1}>Cancel</Button>
              </div>
            </Paper>
          </MyDialog>
          <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
            <Paper style={{ padding: '2em' }}>
            <div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" required  /></div>
             <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
              <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner" required /></div>
              <div><TextField value={dialogapp_business_type} onInput={handleapp_business_type} label="App Business Type" required /></div>
              <div><TextField value={dialogcurrent_state} onInput={handlecurrent_state} label="Current-state" required/></div>
              <div><TextField value={dialogbrief_func} inputProps={{maxLength: 100}} onInput={handlerebrief_func} label="Brief-Function" required /></div>
              <div><TextField value={dialogpt_contact} onInput={handlept_contact} label="PT Contact" required /></div>
              <div><TextField value={dialogpt_name} inputProps={{maxLength: 100}} onInput={handlerept_name} label="PT Name"  required/></div>
             <div><TextField value={dialogVP_name} inputProps={{maxLength: 100}} onInput={handleVP_name} label="VP Name" /></div>
             <div><pre>           </pre></div>
          
               <div className="h3color">
               
               <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
               <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4>
               
            
            </div>
              <div style={{ marginTop: '3em' }}>
                <Button onClick={handleAddnewRow}>Save</Button>
                <Button onClick={handleDialogClose2}>Cancel</Button>
              </div>
            </Paper>
          </MyDialog>          
        </div>
    )
}




export const HostTable = () => {

  const columns = [
    {title:'Host name',field:'host_name',cellStyle: {
     
     minWidth:300
       },},
    {title:'Host name 2',field:'host_name_2',cellStyle: {
     
      minWidth:300
       },},
    {title:'Tier',field:'tier'},
    {title:'Type',field:'type'},
    {title:'IP Address',field:'ip_addr',cellStyle: { minWidth:300},},
    {title:'Machine Serial',field:'machine_serial',cellStyle: { minWidth:300},},
    {title:'OS',field:'os'},
    {title:'Processor Type',field:'processor_type',cellStyle: { minWidth:300},},
    {title:'VM',field:'vm'},
    {title:'OS Version',field:'os_version',cellStyle: { minWidth:300},},
    {title:'HA Role',field:'ha_role'},
    {title:'Validated Date',field:'validated_date',cellStyle: { minWidth:300}},
     {title:'Capped',field:'capped'},
    {title:'CPU usage mean',field:'cpu_usage_mean',cellStyle: { minWidth:300}},
    {title:'CPU usage max',field:'cpu_usage_max',cellStyle: { minWidth:300}},
    {title:'No. of cores',field:'no_of_cores',cellStyle: { minWidth:300}},
    {title:'Licenses',field:'licenses'},
    {title:'V CPU',field:'v_cpu',cellStyle: { minWidth:200}},
    {title:'Core Multiplier',field:'core_multiplier',cellStyle: { minWidth:200}},
    {title:'App',field:'app',cellStyle: { minWidth:300},},
    {title:'NIS UDS',field:'nis_uds',cellStyle: { minWidth:200}},
    {title:'Decommission',field:'decommission'},
    {title:'Compliance',field:'compliance'},
    {title:'Comments',field:'comments',cellStyle: { minWidth:300},},
   
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveHost'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);    
      // eslint-disable-next-line
    },[]);
    
    const getDetails = () => {
        Axios.get("  http://localhost:8000/retrieveHost").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

      /*const deleteDetail = (host_name) => {
        Axios.delete(`  http://localhost:8000/deleteHost/${host_name}`).then((response) => {
          //setDetails(response.data)
          getDetails();
        });
        
      };*/
   // window.onload = getDetails();  
   window.addEventListener("load", getDetails);   
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const[dialogoldhost_name,setDialogoldhost_name]=useState('');
   const [dialoghost_name, setDialoghost_name] = useState('');
  const [dialogtier, setDialogtier] = useState('');
  const [dialogcompliance, setDialogcompliance] = useState('');
  const [dialogcomments, setDialogcomments] = useState('');
  const [dialogdecommission,setDialogdecommission]=useState('');
  const [dialogtype,setDialogtype]=useState('');
  const [dialoghost_name_2,setDialoghost_name_2]=useState('');
  const [dialogos_version,setDialogos_version]=useState('');
  const [dialogha_role,setDialogha_role]=useState('');
  const [dialogvalidated_date,setDialogvalidated_date]=useState('');
  const [dialogip_addr,setDialogip_addr]=useState('');
  const [dialogmachine_serial,setDialogmachine_serial]=useState('');
  const [dialogos,setDialogos]=useState('');
  const [dialogvm,setDialogvm]=useState('');
  const [dialogcapped,setDialogcapped]=useState('');
  const [dialogprocessor_type,setDialogprocessor_type]=useState('');
  const [dialogcpu_usage_mean,setDialogcpu_usage_mean]=useState('');
  const [dialogcpu_usage_max,setDialogcpu_usage_max]=useState('');
  const [dialogno_of_cores,setDialogno_of_cores]=useState('');
  const [dialoglicenses,setDialoglicenses]=useState('');
  const [dialogv_cpu,setDialogv_cpu]=useState('');
  const [dialogcore_multiplier,setDialogcore_multiplier]=useState('');
  const [dialogapp,setDialogapp]=useState('');
  const [dialognis_uds,setDialognis_uds]=useState('');
  const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }

  const handlehost_name = event => {
    setDialoghost_name(event.target.value);
  }
  const handletier= event => {
    setDialogtier(event.target.value);
  }
  const handlecompliance= event => {
    setDialogcompliance(event.target.value);
  }
 const handlecomments= event => {
    setDialogcomments(event.target.value);
  }
  const handledecommission= event => {
    setDialogdecommission(event.target.value);
  }
  const handletype= event => {
    setDialogtype(event.target.value);
  }
  const handlehost_name_2= event => {
    setDialoghost_name_2(event.target.value);
  }
  const handleos_version= event => {
    setDialogos_version(event.target.value);
  }
  const handleha_role= event => {
    setDialogha_role(event.target.value);
  }
  const handlevalidated_date= event => {
    setDialogvalidated_date(event.target.value);
  }
  const handleip_addr= event => {
    setDialogip_addr(event.target.value);
  }
  const handlemachine_serial= event => {
    setDialogmachine_serial(event.target.value);
  }
  const handleos= event => {
    setDialogos(event.target.value);
  }
  const handlevm= event => {
    setDialogvm(event.target.value);
  }
  const handlecapped= event => {
    setDialogcapped(event.target.value);
  }
  const handleprocessor_type= event => {
    setDialogprocessor_type(event.target.value);
  }
  const handlecpu_usage_mean= event => {
    setDialogcpu_usage_mean(event.target.value);
  }
  const handlecpu_usage_max= event => {
    setDialogcpu_usage_max(event.target.value);
  }
  const handleno_of_cores= event => {
    setDialogno_of_cores(event.target.value);
  }
  const handlelicenses= event => {
    setDialoglicenses(event.target.value);
  }
  const handlev_cpu= event => {
    setDialogv_cpu(event.target.value);
  }
  const handlecore_multipier= event => {
    setDialogcore_multiplier(event.target.value);
  }
  const handleapp= event => {
    setDialogapp(event.target.value);
  }
  const handlenis_uds= event => {
    setDialognis_uds(event.target.value);
  }
  const refreshPage=()=>{
    window.location.reload();
  }
  const handleUpdateRow = event => {
    if (!dialoghost_name||!dialogtier||!dialoghost_name_2||!dialogip_addr||!dialogcpu_usage_mean||!dialogcpu_usage_max)
     {
      alert("Enter mandatory fields");
      return;}
    // if (!dialogId || !dialogapp_name||!dialogcurrent_state||!dialogreporting_name) return;
    setDetails(
      // {...details,[ event.app_name]: dialogapp_name ,[event.app_key]:dialogapp_key}
       {...details,[event.target.name]:event.target.value},
      
       );
     Axios.put('  http://localhost:8000/updateHost',{
                 oldhost_name:dialogoldhost_name,
                 newhost_name:dialoghost_name,
                 tier: dialogtier,
                 compliance: dialogcompliance,
                 comments:dialogcomments,
                 decommission: dialogdecommission,
                 type:dialogtype,
                 host_name_2:dialoghost_name_2,
                 os_version:dialogos_version,
                 ha_role: dialogha_role,
                 validated_date:dialogvalidated_date,
                 ip_addr:dialogip_addr,
                 machine_serial: dialogmachine_serial,
                 os: dialogos,
                 vm: dialogvm,
                 capped:dialogcapped,
                 processor_type:dialogprocessor_type,
                 cpu_usage_mean:dialogcpu_usage_mean,
                 cpu_usage_max: dialogcpu_usage_max,
                 no_of_cores: dialogno_of_cores,
                 licenses: dialoglicenses,
                 v_cpu: dialogv_cpu,
                 core_multiplier: dialogcore_multiplier,
                 app: dialogapp,
                 nis_uds: dialognis_uds
             })
            
             refreshPage();
             alert("successfully Edited!");
         
 
          
   }

   const handleAddnewRow=event=>{
    if (!dialoghost_name||!dialogtier||!dialoghost_name_2||!dialogip_addr||!dialogcpu_usage_mean||!dialogcpu_usage_max)
     {
      alert("Enter mandatory fields");
      return;}
    Axios.post(' http://localhost:8000/createHost',{
                 host_name:dialoghost_name,
                 tier: dialogtier,
                 compliance: dialogcompliance,
                 comments:dialogcomments,
                 decommission: dialogdecommission,
                 type:dialogtype,
                 host_name_2:dialoghost_name_2,
                 os_version:dialogos_version,
                 ha_role: dialogha_role,
                 validated_date:dialogvalidated_date,
                 ip_addr:dialogip_addr,
                 machine_serial: dialogmachine_serial,
                 os: dialogos,
                 vm: dialogvm,
                 capped:dialogcapped,
                 processor_type:dialogprocessor_type,
                 cpu_usage_mean:dialogcpu_usage_mean,
                 cpu_usage_max: dialogcpu_usage_max,
                 no_of_cores: dialogno_of_cores,
                 licenses: dialoglicenses,
                 v_cpu: dialogv_cpu,
                 core_multiplier: dialogcore_multiplier,
                 app: dialogapp,
                 nis_uds: dialognis_uds
            }) 
            setDetails(
              //getDetails(); 
              // Here you can add the new row to whatever index you want
              //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
           {...details,[event.target.name]:event.target.value},
          
           );
           refreshPage();
           alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);

  const initialset=(rowData)=>{
    setDialogoldhost_name(rowData.host_name);
    if (!isDialogOpen1) {
      setDialoghost_name(rowData.host_name);
      setDialogtier(rowData.tier);
      setDialogcompliance(rowData.compliance);
      setDialogcomments(rowData.comments);
      setDialogdecommission(rowData.decommission);
      setDialogtype(rowData.type);
      setDialoghost_name_2(rowData.host_name_2);
      setDialogos_version(rowData.os_version);
      setDialogha_role(rowData.ha_role);
      setDialogvalidated_date(rowData.validated_date);
      setDialogip_addr(rowData.ip_addr);
      setDialogmachine_serial(rowData.machine_serial);
      setDialogos(rowData.os);
      setDialogvm(rowData.vm);
      setDialogcapped(rowData.capped);
      setDialogprocessor_type(rowData.processor_type);
      setDialogcpu_usage_mean(rowData.cpu_usage_mean);
      setDialogcpu_usage_max(rowData.cpu_usage_max);
      setDialogno_of_cores(rowData.no_of_cores);
      setDialoglicenses(rowData.licenses);
      setDialogv_cpu(rowData.v_cpu);
      setDialogcore_multiplier(rowData.core_multiplier);
      setDialogapp(rowData.app);
      setDialognis_uds(rowData.nis_uds);
  
    }
  }

  const initialset1=()=>{
    setDialogoldhost_name("-");
    if (!isDialogOpen1) {
      setDialoghost_name("-");
      setDialogtier("-");
      setDialogcompliance("-");
      setDialogcomments("-");
      setDialogdecommission("-");
      setDialogtype("-");
      setDialoghost_name_2("-");
      setDialogos_version("-");
      setDialogha_role("-");
      setDialogvalidated_date("-");
      setDialogip_addr("-");
      setDialogmachine_serial("-");
      setDialogos("-");
      setDialogvm("-");
      setDialogcapped("-");
      setDialogprocessor_type("-");
      setDialogcpu_usage_mean("-");
      setDialogcpu_usage_max("-");
      setDialogno_of_cores("-");
      setDialoglicenses("-");
      setDialogv_cpu("-");
      setDialogcore_multiplier("-");
      setDialogapp("-");
      setDialognis_uds("-");
  
    }
  }

  const actions = [
    {
      icon: () => <FaIcons.FaEdit/>,
      tooltip: 'Edit Details',
      //isFreeAction: true,
      onClick: (event, rowData) => {
    
        initialset(rowData);
        
        setIsDialogOpen1(true);
       
      },
    },
    {
      icon: () => <AddIcon />,
      tooltip: 'Add',
      isFreeAction: true,
      onClick: (event, rowData) => {
        initialset1();
        setIsDialogOpen2(true);
      },
    }
  ];

    return (
        <div> 
            <MaterialTable title="Host Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{
              filtering: true,
              pageSize: 20,
              pageSizeOptions: [20, 40, 80, 100],
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF'
                           },
                         
                exportAllData: true,
              exportButton: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
              addRowPosition: "first",
              grouping:true
          }}
          editable={{
          /*  onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const host_name = selectedRow.host_name;
              deleteDetail(host_name);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/
            }}
         
            />
<MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
            <Paper style={{ padding: '2em' }}>
              <div><TextField value={dialoghost_name} onInput={handlehost_name} label="Host-Name" required  /></div>
              <div><TextField value={dialoghost_name_2} onInput={handlehost_name_2} label="Host-Name-2" required /></div>
              <div><TextField value={dialogtier} onInput={handletier}  label="Tier" required/></div>
              <div><TextField value={dialogtype} onInput={handletype} label="Type" required /></div>
              <div><TextField value={dialogip_addr} onInput={handleip_addr} label="IP-Address" /></div>
              <div><TextField value={dialogmachine_serial} onInput={handlemachine_serial} label="Machine-Serial" /></div>
              <div><TextField value={dialogos} onInput={handleos} label="OS" /></div>
              <div><TextField value={dialogprocessor_type} onInput={handleprocessor_type} label="Processor-Type" /></div>
              <div><TextField value={dialogvm} onInput={handlevm} label="VM" /></div>
              <div><TextField value={dialogos_version} onInput={handleos_version} label="OS-Version" /></div>
              <div><TextField value={dialogha_role} onInput={handleha_role} label="HA-Role" /></div>
              <div><TextField value={dialogvalidated_date} onInput={handlevalidated_date} label="Validated-Date" /></div>
              <div><TextField value={dialogcapped} onInput={handlecapped} label="Capped" /></div>
              <div><TextField value={dialogcpu_usage_mean} onInput={handlecpu_usage_mean} label="CPU-usage-mean" /></div>
              <div><TextField value={dialogcpu_usage_max} onInput={handlecpu_usage_max} label="CPU-usage-max" /></div>
              <div><TextField value={dialogno_of_cores} onInput={handleno_of_cores} label="no-of-cores" /></div>
              <div><TextField value={dialoglicenses} onInput={handlelicenses} label="licenses" /></div>
              <div><TextField value={dialogv_cpu} onInput={handlev_cpu} label="v_cpu" /></div>
              <div><TextField value={dialogcore_multiplier} onInput={handlecore_multipier} label="Core-Multiplier" /></div>
              <div><TextField value={dialogapp} onInput={handleapp} label="app" /></div>
              <div><TextField value={dialognis_uds} onInput={handlenis_uds} label="NIS-UDS" /></div>
              <div><TextField value={dialogcomments} onInput={handlecomments} label="Comments" required /></div>
             <div><TextField value={dialogdecommission} inputProps={{maxLength: 100}} onInput={handledecommission} label="Decommision" /></div>
             <div><TextField value={dialogcompliance} onInput={handlecompliance} label="Compliance" required/></div>
              
              <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
              <div style={{ marginTop: '3em' }}>
                <Button onClick={handleUpdateRow}>Save</Button>
                <Button onClick={handleDialogClose1}>Cancel</Button>
              </div>
            </Paper>
          </MyDialog>
          <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
            <Paper style={{ padding: '2em' }}>
            <div><TextField value={dialoghost_name} onInput={handlehost_name} label="Host-Name" required  /></div>
              <div><TextField value={dialoghost_name_2} onInput={handlehost_name_2} label="Host-Name-2" required /></div>
              <div><TextField value={dialogtier} onInput={handletier}  label="Tier" required/></div>
              <div><TextField value={dialogtype} onInput={handletype} label="Type" required /></div>
              <div><TextField value={dialogip_addr} onInput={handleip_addr} label="IP-Address" /></div>
              <div><TextField value={dialogmachine_serial} onInput={handlemachine_serial} label="Machine-Serial" /></div>
              <div><TextField value={dialogos} onInput={handleos} label="OS" /></div>
              <div><TextField value={dialogprocessor_type} onInput={handleprocessor_type} label="Processor-Type" /></div>
              <div><TextField value={dialogvm} onInput={handlevm} label="VM" /></div>
              <div><TextField value={dialogos_version} onInput={handleos_version} label="OS-Version" /></div>
              <div><TextField value={dialogha_role} onInput={handleha_role} label="HA-Role" /></div>
              <div><TextField value={dialogvalidated_date} onInput={handlevalidated_date} label="Validated-Date" /></div>
              <div><TextField value={dialogcapped} onInput={handlecapped} label="Capped" /></div>
              <div><TextField value={dialogcpu_usage_mean} onInput={handlecpu_usage_mean} label="CPU-usage-mean" /></div>
              <div><TextField value={dialogcpu_usage_max} onInput={handlecpu_usage_max} label="CPU-usage-max" /></div>
              <div><TextField value={dialogno_of_cores} onInput={handleno_of_cores} label="no-of-cores" /></div>
              <div><TextField value={dialoglicenses} onInput={handlelicenses} label="licenses" /></div>
              <div><TextField value={dialogv_cpu} onInput={handlev_cpu} label="v_cpu" /></div>
              <div><TextField value={dialogcore_multiplier} onInput={handlecore_multipier} label="Core-Multiplier" /></div>
              <div><TextField value={dialogapp} onInput={handleapp} label="app" /></div>
              <div><TextField value={dialognis_uds} onInput={handlenis_uds} label="NIS-UDS" /></div>
              <div><TextField value={dialogcomments} onInput={handlecomments} label="Comments" required /></div>
             <div><TextField value={dialogdecommission} inputProps={{maxLength: 100}} onInput={handledecommission} label="Decommision" /></div>
             <div><TextField value={dialogcompliance} onInput={handlecompliance} label="Compliance" required/></div>
              
             <div><pre>           </pre></div>
          
               <div className="h3color">
               
               <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
               <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4>
               
            
            </div>
              <div style={{ marginTop: '3em' }}>
                <Button onClick={handleAddnewRow}>Save</Button>
                <Button onClick={handleDialogClose2}>Cancel</Button>
              </div>
            </Paper>
          </MyDialog>          
        </div>
    )
}


export const RedisTable = () => {

  const columns = [
     {title:'HostName',field:'host_name'}, 
        {title:'DB Name',field:'db_name',cellStyle: {minWidth:300},}, 
        {title:'Cluster Web UI',field:'clusterwebui',cellStyle: {minWidth:300},},
        {title:'Cluster',field:'cluster',cellStyle: {minWidth:300},},
        {title:'DBEndpoint',field:'dbendpoint',cellStyle: {minWidth:300},},
        {title:'DBConfig',field:'dbConfig'},
        {title:'Shards',field:'shards',cellStyle: {minWidth:300},},
        {title:'Cloud Configuration',field:'cloudconfiguration',cellStyle: {minWidth:300},},
        {title:'Persistence',field:'persistence'},
        {title:'Rack Zone Awareness',field:'rack_zone_awareness',cellStyle: {minWidth:300},},
        {title:'RDBMS',field:'rdbms'},
       {title:'Status',field:'status'},
       {title:'Domain',field:'domain',cellStyle:{minWidth:300}},
       {title:'Environment',field:'environment'},
       {title:'Redis Version',field:'Redis_version',cellStyle: {minWidth:300},},
       {title:'Redis DB Version',field:'Redis_db_version',cellStyle: {minWidth:300},},
       {title:'HA Role',field:'ha_role',cellStyle:{minWidth:300}},
       {title:'Location',field:'location',cellStyle: {minWidth:300},},
       {title:'Port Number',field:'port_num',cellStyle: {minWidth:300},},
       {title:'Product Team Distro',field:'Product_Team_Distro',cellStyle: {minWidth:300},},
       {title:'DB Size',field:'db_size',cellStyle: {minWidth:300},},
       {title:'DBA Owner',field:'dba_owner',cellStyle: {minWidth:300},},
       {title:'Support Group',field:'sn_group',cellStyle: {minWidth:300},},
       {title:'Compliance',field:'compliance'}, 
       {title:'Comments',field:'comments'},
       {title:'App Name',field:'app_name',cellStyle: {minWidth:300},},
       {title:'App Family',field:'app_family',cellStyle: {minWidth:300},},
       {title:'Application Owner',field:'app_vp_owner',cellStyle:{minWidth:300},},
      {title:'PT Contact',field:'pt_contact',cellStyle: {minWidth:300 },},
      {title:'PT Name',field:'pt_name',cellStyle: { minWidth:300 },},
      {title:'VP Name',field:'VP_name',cellStyle: { minWidth:300 },}
     
    ]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios('http://localhost:8000/retrieveRedis'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);    
      // eslint-disable-next-line
    },[]);
    
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveRedis").then((response) => {
          setDetails(response.data)
        })
      }

     /* const deleteDetail = (id) => {
        Axios.delete(`http://localhost:8000/DeleteRedis/${id}`).then((response) => {
          //setDetails(response.data)
          getDetails();
        });
        
      };*/
   // window.onload = getDetails(); 
   window.addEventListener("load", getDetails); 
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
      const [isDialogOpen2, setIsDialogOpen2] = useState(false);
      const [dialogId, setDialogId] = useState('');
      const [dialoghost_name,setDialoghost_name] = useState('');
      const [dialogdb_name,setDialogdb_name] = useState('');
      const [dialogclusterwebui,setDialogclusterwebui] = useState('');
      const [dialogcluster,setDialogcluster] = useState('p');
      const [dialogdbendpoint,setDialogdbendpoint] = useState('');
      const [dialogdbConfig,setDialogdbConfig] = useState('');
      const [dialogshards,setDialogshards] = useState('');
      const [dialogcloudconfiguration,setDialogcloudconfiguration] = useState('');
      const [dialogpersistence,setDialogpersistence] = useState('');
      const [dialograck_zone_awareness,setDialograck_zone_awareness] = useState('');
      const [dialogrdbms,setDialogrdbms] = useState('');
      const [dialogstatus,setDialogstatus] = useState('');
      const [dialogdomain,setDialogdomain] = useState('');
      const [dialogenvironment,setDialogenvironment] = useState('');
      const [dialogRedis_version,setDialogRedis_version] = useState('');
      const [dialogRedis_db_version,setDialogRedis_db_version] = useState('');
      const [dialogha_role,setDialogha_role] = useState('');
      const [dialoglocation,setDialoglocation] = useState('');
      const [dialogport_num,setDialogport_num] = useState('');
      const [dialogProduct_Team_Distro,setDialogProduct_Team_Distro] = useState('');
      const [dialogdb_size,setDialogdb_size] = useState('');
      const [dialogdba_owner,setDialogdba_owner] = useState('');
      const [dialogsn_group,setDialogsn_group] = useState('');
      const [dialogcompliance,setDialogcompliance] = useState('');
      const [dialogcomments,setDialogcomments] = useState('');
      const [dialogapp_name,setDialogapp_name] = useState('');
      const [dialogapp_family,setDialogapp_family]=useState('');
      const [dialogapp_vp_owner,setDialogapp_vp_owner]=useState('');
      const [dialogpt_contact, setDialogpt_contact] = useState('');
      const [dialogpt_name,setDialogpt_name]=useState('');
      const [dialogVP_name,setDialogVP_name]=useState('');
   

   
   const handleDialogClose1 = event => {
       setIsDialogOpen1(false);
     }
   
     const handleDialogClose2 = event => {
       setIsDialogOpen2(false);
     }
     
   const handle_host_name = event => {
       setDialoghost_name(event.target.value);
     }
   
     const handle_db_name = event => {
       setDialogdb_name(event.target.value);
     }
     const handleclusterwebui = event => {
       setDialogclusterwebui(event.target.value);
     }
     const handlecluster = event => {
      setDialogcluster(event.target.value);
    }
     const handledbendpoint = event => {
       setDialogdbendpoint(event.target.value);
     }
      
     const handledbConfig = event => {
       setDialogdbConfig(event.target.value);
     }
      
     const handleshards = event => {
       setDialogshards(event.target.value);
     }
      
    const handlecloudconfiguration = event => {
       setDialogcloudconfiguration(event.target.value);
     }
      
   const handlepersistence = event => {
       setDialogpersistence(event.target.value);
     }
    
   const handlerack_zone_awareness = event => {
       setDialograck_zone_awareness(event.target.value);
     }
    
    const handle_rdbms = event => {
        setDialogrdbms(event.target.value);
      }
      
    const handle_status = event => {
       setDialogstatus(event.target.value);
     }
   
     const handle_domain = event => {
       setDialogdomain(event.target.value);
     }
     
      const handle_environment = event => {
       setDialogenvironment(event.target.value);
     }
      
     const handleRedis_version = event => {
       setDialogRedis_version(event.target.value);
     }
     const handleRedis_db_version = event => {
       setDialogRedis_db_version(event.target.value);
     }
     const handle_ha_role = event => {
       setDialogha_role(event.target.value);
     }
     const handle_location = event => {
       setDialoglocation(event.target.value);
     }
     const handle_port_num = event => {
       setDialogport_num(event.target.value);
     }
      const handleProduct_Team_Distro = event => {
       setDialogProduct_Team_Distro(event.target.value);
     }
     const handle_db_size = event => {
      setDialogdb_size(event.target.value);
    }
     const handledba_owner = event => {
       setDialogdba_owner(event.target.value);
     }
     
     const handle_sn_group = event => {
       setDialogsn_group(event.target.value);
     }
   
     const handle_compliance = event => {
       setDialogcompliance(event.target.value);
     }
     const handle_comments = event => {
       setDialogcomments(event.target.value);
     }
     const handle_app_name = event => {
       setDialogapp_name(event.target.value);
     }
     const handleapp_family= event => {
       setDialogapp_family(event.target.value);
     }
     const handleapp_vp_owner= event => {
       setDialogapp_vp_owner(event.target.value);
     }
      const handlept_contact= event => {
       setDialogpt_contact(event.target.value);
     }
     const handlept_name= event => {
       setDialogpt_name(event.target.value);
     }
     const handleVP_name= event => {
       setDialogVP_name(event.target.value);
     }
     const refreshPage=()=>{
       window.location.reload();
     }
  const handleUpdateRow = event => {
    
     if(!dialogdb_name||!dialogstatus||!dialogdomain||!dialogenvironment||!dialogRedis_version)
       {
         alert("Enter mandatory details");
         return;
       }
     Axios.put(` http://localhost:8000/updateRedis`, { 
                 id: dialogId,
                 host_name:dialoghost_name,
                 db_name: dialogdb_name,
                 clusterwebui:dialogclusterwebui,
                 cluster:dialogcluster,
                 dbendpoint:dialogdbendpoint,
                 dbConfig:dialogdbConfig,
                 shards:dialogshards,
                 cloudconfiguration:dialogcloudconfiguration,
                 persistence:dialogpersistence,
                 rack_zone_awareness:dialograck_zone_awareness,
                 rdbms: dialogrdbms,
                 status: dialogstatus,
                 domain: dialogdomain,
                 environment: dialogenvironment,
                 Redis_version: dialogRedis_version,
                 Redis_db_version:dialogRedis_db_version,
                 ha_role: dialogha_role,
                 location: dialoglocation,
                 port_num: dialogport_num,
                 Product_Team_Distro:dialogProduct_Team_Distro,
                 db_size: dialogdb_size,
                 dba_owner: dialogdba_owner,
                 sn_group: dialogsn_group,
                 compliance: dialogcompliance,
                 comments: dialogcomments,
                 app_name: dialogapp_name,
                 app_family: dialogapp_family,
                 app_vp_owner:dialogapp_vp_owner,
                 pt_contact:dialogpt_contact,
                 pt_name:dialogpt_name,
                 VP_name:dialogVP_name
          
               })
               setDetails(
                 {...details,[event.target.name]:event.target.value},
               );
             refreshPage();
             alert("successfully Edited!");
   
     }
  const handleAddnewRow=event=>{
    
     if(!dialogdb_name||!dialogstatus||!dialogdomain||!dialogenvironment||!dialogRedis_version)
      {
        alert("Enter mandatory details");
        return;
      }
    Axios.post(' http://localhost:8000/createRedis',{
        host_name:dialoghost_name,
                   db_name: dialogdb_name,
                   clusterwebui:dialogclusterwebui,
                   cluster:dialogcluster,
                   dbendpoint:dialogdbendpoint,
                   dbConfig:dialogdbConfig,
                   shards:dialogshards,
                   cloudconfiguration:dialogcloudconfiguration,
                   persistence:dialogpersistence,
                   rack_zone_awareness:dialograck_zone_awareness,
                   rdbms: dialogrdbms,
                   status: dialogstatus,
                   domain: dialogdomain,
                   environment: dialogenvironment,
                   Redis_version: dialogRedis_version,
                   Redis_db_version:dialogRedis_db_version,
                   ha_role: dialogha_role,
                   location: dialoglocation,
                   port_num: dialogport_num,
                   Product_Team_Distro:dialogProduct_Team_Distro,
                   db_size: dialogdb_size,
                   dba_owner: dialogdba_owner,
                   sn_group: dialogsn_group,
                   compliance: dialogcompliance,
                   comments: dialogcomments,
                   app_name: dialogapp_name,
                   app_family: dialogapp_family,
                   app_vp_owner:dialogapp_vp_owner,
                   pt_contact:dialogpt_contact,
                   pt_name:dialogpt_name,
                   VP_name:dialogVP_name
  
                       
              })
              setDetails(
             {...details,[event.target.name]:event.target.value},
            
             );
             refreshPage();
             alert("successfully Added!");
    }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);

  const initialset = (rowData) => {
    if(!isDialogOpen1) {
      console.log("edit")
      setDialogId(rowData.id);
      setDialoghost_name(rowData.host_name);
      setDialogdb_name(rowData.db_name);
      setDialogclusterwebui(rowData.clusterwebui);
      setDialogcluster(rowData.cluster);
      setDialogdbendpoint(rowData.dbendpoint);
      setDialogdbConfig(rowData.dbConfig);
      setDialogshards(rowData.shards);
      setDialogcloudconfiguration(rowData.cloudconfiguration);
      setDialogpersistence(rowData.persistence);
      setDialograck_zone_awareness(rowData.rack_zone_awareness);
      setDialogrdbms(rowData.rdbms);
      setDialogstatus(rowData.status);
      setDialogdomain(rowData.domain);
      setDialogenvironment(rowData.environment);
      setDialogRedis_version(rowData.Redis_version);
      setDialogRedis_db_version(rowData.Redis_db_version);
      setDialogha_role(rowData.ha_role);
      setDialoglocation(rowData.location);
      setDialogport_num(rowData.port_num);
      setDialogProduct_Team_Distro(rowData.Product_Team_Distro);
      setDialogdb_size(rowData.db_size);
      setDialogdba_owner(rowData.dba_owner);
      setDialogsn_group(rowData.sn_group);
      setDialogcompliance(rowData.compliance);
      setDialogcomments(rowData.comments);
      setDialogapp_name(rowData.app_name);
      setDialogapp_family(rowData.app_family);
      setDialogapp_vp_owner(rowData.app_vp_owner);
      setDialogpt_contact(rowData.pt_contact);
      setDialogpt_name(rowData.pt_name);
      setDialogVP_name(rowData.VP_name);
        
      

    }
  }
  const initialset1 = () => {
    if(!isDialogOpen1) {
      setDialogId("-");
      setDialoghost_name("-"); 
      setDialogdb_name("-"); 
      setDialogclusterwebui("-"); 
      setDialogcluster("-"); 
      setDialogdbendpoint("-"); 
      setDialogdbConfig("-"); 
      setDialogshards("-"); 
      setDialogcloudconfiguration("-"); 
      setDialogpersistence("-"); 
      setDialograck_zone_awareness("-"); 
      setDialogrdbms("-"); 
      setDialogstatus("-"); 
      setDialogdomain("-"); 
      setDialogenvironment("-"); 
      setDialogRedis_version("-"); 
      setDialogRedis_db_version("-"); 
      setDialogha_role("-"); 
      setDialoglocation("-"); 
      setDialogport_num("-"); 
      setDialogProduct_Team_Distro("-"); 
      setDialogdb_size("-"); 
      setDialogdba_owner("-"); 
      setDialogsn_group("-"); 
      setDialogcompliance("-"); 
      setDialogcomments("-"); 
      setDialogapp_name("-"); 
      setDialogapp_family("-"); 
      setDialogapp_vp_owner("-"); 
      setDialogpt_contact("-"); 
      setDialogpt_name("-"); 
      setDialogVP_name("-"); 
     

    }
  } 

  const actions = [
    {
      icon: () => <FaIcons.FaEdit/>,
      tooltip: 'Edit Details',
      //isFreeAction: true,
      onClick: (event, rowData) => {
    
        initialset(rowData);
        
        setIsDialogOpen1(true);
       
      },
    },
    {
      icon: () => <AddIcon />,
      tooltip: 'Add',
      isFreeAction: true,
      onClick: (event, rowData) => {
        initialset1();
        setIsDialogOpen2(true);
      },
    }
  ];
    return (
        <div> 
            <MaterialTable title="Redis Inventory"
            data = {details}
          columns = {columns}
          actions={actions}
          options = {{
              filtering: true,
              pagesize:20,
		          pageSizeOptions:[20,50,80,110],
              exportButton: true,
              exportAllData: true,
              columnsButton:true,
              grouping:true,
              maxBodyHeight: '100vh',
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
	               height:30,
                 width:700 
                           },
                           
              actionsColumnIndex: 0, addRowPosition: "first"
          }}
          
          
            />
           <MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
          
		  <div><TextField value={dialoghost_name} onInput={handle_host_name} label="host_name" /></div>
		  <div><TextField value={dialogdb_name} onInput={handle_db_name} label="db_name" required/></div>
      <div><TextField value={dialogclusterwebui} onInput={handleclusterwebui} label="clusterwebui" /></div> 
      <div><TextField value={dialogcluster} onInput={handlecluster} label="cluster" /></div>
      <div><TextField value={dialogdbendpoint} onInput={handledbendpoint} label="DB EndPoint" /></div>
      <div><TextField value={dialogdbConfig} onInput={handledbConfig} label="DB Config" /></div>
      <div><TextField value={dialogshards} onInput={handleshards} label="shards" /></div>
      <div><TextField value={dialogcloudconfiguration} onInput={handlecloudconfiguration} label="cloud configuration" /></div>
      <div><TextField value={dialogpersistence} onInput={handlepersistence} label="Persistence" /></div>
      <div><TextField value={dialograck_zone_awareness} onInput={handlerack_zone_awareness} label=" Rack Zone Awareness" /></div>
       <div><TextField value={dialogrdbms} onInput={handle_rdbms} label="rdbms" /></div>
          <div><TextField value={dialogstatus} onInput={handle_status} label="status" required/></div>
          <div><TextField value={dialogdomain} onInput={handle_domain} label="domain" required/></div>
          <div><TextField value={dialogenvironment} onInput={handle_environment} label="environment" required/></div>
          <div><TextField value={dialogRedis_version} onInput={handleRedis_version} label="Redis_version" required /></div>
          <div><TextField value={dialogRedis_db_version} onInput={handleRedis_db_version} label="Redis_db_version"  /></div>
		  <div><TextField value={dialogha_role} onInput={handle_ha_role} label="ha_role" /></div>
          <div><TextField value={dialoglocation} onInput={handle_location} label="Location" /></div>
		  <div><TextField value={dialogport_num} onInput={handle_port_num} label="port_num" /></div>
		  <div><TextField value={dialogProduct_Team_Distro} onInput={handleProduct_Team_Distro} label="Product_Team_Distro" /></div>
          <div><TextField value={dialogdb_size} onInput={handle_db_size} label="db_size" /></div>
		  <div><TextField value={dialogdba_owner} onInput={handledba_owner} label="dba owner" /></div>
          <div><TextField value={dialogsn_group} onInput={handle_sn_group} label="sn_group" /></div>
          <div><TextField value={dialogcompliance} onInput={handle_compliance} label="scompliance" /></div>
          <div><TextField value={dialogcomments} onInput={handle_comments} label="comments" /></div>
          <div><TextField value={dialogapp_name} onInput={handle_app_name} label="app_name" /></div>
          <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
          <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner"  /></div>
	      <div><TextField value={dialogpt_contact} onInput={handlept_contact} label="PT Contact" /></div>
          <div><TextField value={dialogpt_name} inputProps={{maxLength: 100}} onInput={handlept_name} label="PT Name" /></div>
          <div><TextField value={dialogVP_name} inputProps={{maxLength: 100}} onInput={handleVP_name} label="VP_name" /></div>
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
          
           <div><TextField value={dialoghost_name} onInput={handle_host_name} label="host_name" /></div>
		  <div><TextField value={dialogdb_name} onInput={handle_db_name} label="db_name" required/></div>
      <div><TextField value={dialogclusterwebui} onInput={handleclusterwebui} label="clusterwebui" /></div> 
      <div><TextField value={dialogcluster} onInput={handlecluster} label="cluster" /></div>
      <div><TextField value={dialogdbendpoint} onInput={handledbendpoint} label="DB EndPoint" /></div>
      <div><TextField value={dialogdbConfig} onInput={handledbConfig} label="DB Config" /></div>
      <div><TextField value={dialogshards} onInput={handleshards} label="shards" /></div>
      <div><TextField value={dialogcloudconfiguration} onInput={handlecloudconfiguration} label="cloud configuration" /></div>
      <div><TextField value={dialogpersistence} onInput={handlepersistence} label="Persistence" /></div>
      <div><TextField value={dialograck_zone_awareness} onInput={handlerack_zone_awareness} label="Rack Zone Awareness" /></div>
       <div><TextField value={dialogrdbms} onInput={handle_rdbms} label="rdbms" /></div>
          <div><TextField value={dialogstatus} onInput={handle_status} label="status" required/></div>
          <div><TextField value={dialogdomain} onInput={handle_domain} label="domain" required/></div>
          <div><TextField value={dialogenvironment} onInput={handle_environment} label="environment" required/></div>
          <div><TextField value={dialogRedis_version} onInput={handleRedis_version} label="Redis_version" required /></div>
          <div><TextField value={dialogRedis_db_version} onInput={handleRedis_db_version} label="Redis_db_version"  /></div>
		  <div><TextField value={dialogha_role} onInput={handle_ha_role} label="ha_role" /></div>
          <div><TextField value={dialoglocation} onInput={handle_location} label="Location" /></div>
		  <div><TextField value={dialogport_num} onInput={handle_port_num} label="port_num" /></div>
		  <div><TextField value={dialogProduct_Team_Distro} onInput={handleProduct_Team_Distro} label="Product_Team_Distro" /></div>
          <div><TextField value={dialogdb_size} onInput={handle_db_size} label="db_size" /></div>
		  <div><TextField value={dialogdba_owner} onInput={handledba_owner} label="dba owner" /></div>
          <div><TextField value={dialogsn_group} onInput={handle_sn_group} label="sn_group" /></div>
          <div><TextField value={dialogcompliance} onInput={handle_compliance} label="scompliance" /></div>
          <div><TextField value={dialogcomments} onInput={handle_comments} label="comments" /></div>
          <div><TextField value={dialogapp_name} onInput={handle_app_name} label="app_name" /></div>
          <div><TextField value={dialogapp_family} onInput={handleapp_family} label="App-Family" /></div>
          <div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner"  /></div>
	      <div><TextField value={dialogpt_contact} onInput={handlept_contact} label="PT Contact" /></div>
          <div><TextField value={dialogpt_name} inputProps={{maxLength: 100}} onInput={handlept_name} label="PT Name" /></div>
          <div><TextField value={dialogVP_name} inputProps={{maxLength: 100}} onInput={handleVP_name} label="VP_name" /></div>
          <div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>
        </div>
    )
}



export const OCI = () => {

  const columns = [
    {title:'Parent Compartment Name',field:'Parent_Compartment_Name',cellStyle: {minWidth:300 }},
    {title:'Compartment Name',field:'Compartment_Name',cellStyle: {minWidth:300 }},
    {title:'Logical DB Display Name',field:'Logical_DB_Display_name',cellStyle: {minWidth:200 }},
    {title:'Licence Model',field:'Licence_Model',cellStyle: {minWidth:200 },},
    {title:'CPU Core Count',field:'CPU_Core_Count',cellStyle: {minWidth:200 }},
    {title:'Lifecycle State',field:'Lifecycle_State',cellStyle: {minWidth:200 }},
    {title:'Machine Shape',field:'Machine_Shape',cellStyle: {minWidth:200 }},
    {title:'EXA VM',field:'EXA_VM',cellStyle: {minWidth:200 },lookup: {Exa: "Exa", 'Non-Exa': "Non-Exa"}},
    {title:'Node Count',field:'Node_Count',cellStyle: {minWidth:200 }},
    {title:'RAC/NON-RAC',field:'RAC_NON_RAC',cellStyle: {minWidth:200 },lookup: {RAC: "RAC", 'Non-RAC': "Non-RAC"}},
    {title:'DB Edition',field:'DB_Edition',cellStyle: {minWidth:200 }},
    
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieve_oci'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);  
       // eslint-disable-next-line 
    },[]);

   /* const deleteDetail = (id) => {
      Axios.delete(` http://localhost:8000/delete_oci/${id}`).then((response) => {
        //setDetails(response.data)
        getDetails();
      });
    };*/
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieve_oci").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }
 
     window.addEventListener("load", getDetails);   
     const [isDialogOpen1, setIsDialogOpen1] = useState(false);
     const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogid, setDialogid] = useState('');
   const [dialogParent_Compartment_Name, setDialogParent_Compartment_Name] = useState('');
   const [dialogCompartment_Name, setDialogCompartment_Name] = useState('');
   const [dialogLogical_DB_Display_name, setDialogLogical_DB_Display_name] = useState('');
   const [dialogLicence_Model, setDialogLicence_Model] = useState('');
   const [dialogCPU_Core_Count,setDialogCPU_Core_Count]=useState('');
   const [dialogLifecycle_State,setDialogLifecycle_State]=useState('');
   const [dialogMachine_Shape,setDialogMachine_Shape]=useState('');
   const [dialogEXA_VM,setDialogEXA_VM]=useState('');
   const [dialogNode_Count,setDialogNode_Count]=useState('');
   const [dialogRAC_NON_RAC,setDialogRAC_NON_RAC]=useState('');
   const [dialogDB_Edition,setDialogDB_Edition]=useState('');
  
   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }
  const handleParent_Compartment_Name=event=>{
    setDialogParent_Compartment_Name(event.target.value);
  }
  const handleCompartment_Name= event => {
    setDialogCompartment_Name(event.target.value);
  }
  const handleLogical_DB_Display_name= event => {
    setDialogLogical_DB_Display_name(event.target.value);
  }
  const handleLicence_Model = event => {
    setDialogLicence_Model(event.target.value);
  }
  const handleCPU_Core_Count = event => {
    setDialogCPU_Core_Count(event.target.value);
  }
  const handleLifecycle_State = event => {
    setDialogLifecycle_State(event.target.value);
  }

  const handleMachine_Shape = event => {
    setDialogMachine_Shape(event.target.value);
  }
  const handleEXA_VM = event => {
    setDialogEXA_VM(event.target.value);
  }
  const handleNode_Count = event => {
    setDialogNode_Count(event.target.value);
  }
  const handleRAC_NON_RAC = event => {
    setDialogRAC_NON_RAC(event.target.value);
  }
  const handleDB_Edition = event => {
    setDialogDB_Edition(event.target.value);
  }
 
 

  const refreshPage=()=>{
    window.location.reload();
  }
    
  const handleUpdateRow = event => {
    if(!dialogLogical_DB_Display_name||!dialogParent_Compartment_Name||!dialogEXA_VM||!dialogCompartment_Name)
    {
      alert("Enter mandatory details");
      return;
    }
    setDetails(
     // {...details,[ event.app_name]: dialogapp_name ,[event.app_key]:dialogapp_key}
      {...details,[event.target.name]:event.target.value},
     
      );
       Axios.put(' http://localhost:8000/update_oci', { 
                id:dialogid,
                Parent_Compartment_Name: dialogParent_Compartment_Name,
                Compartment_Name: dialogCompartment_Name,
                Logical_DB_Display_name: dialogLogical_DB_Display_name,
                Licence_Model: dialogLicence_Model,
                CPU_Core_Count: dialogCPU_Core_Count,
                Lifecycle_State: dialogLifecycle_State,
                Machine_Shape: dialogMachine_Shape,
                EXA_VM: dialogEXA_VM,
                Node_Count: dialogNode_Count,
                RAC_NON_RAC: dialogRAC_NON_RAC,
                DB_Edition: dialogDB_Edition,
              })
              refreshPage();
              alert("successfully Edited!");
            }
  const handleAddnewRow=event=>{ 
    if(!dialogLogical_DB_Display_name||!dialogParent_Compartment_Name||!dialogEXA_VM||!dialogCompartment_Name)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.post(' http://localhost:8000/create_oci',{
      Parent_Compartment_Name: dialogParent_Compartment_Name,
                Compartment_Name: dialogCompartment_Name,
                Logical_DB_Display_name: dialogLogical_DB_Display_name,
                Licence_Model: dialogLicence_Model,
                CPU_Core_Count: dialogCPU_Core_Count,
                Lifecycle_State: dialogLifecycle_State,
                Machine_Shape: dialogMachine_Shape,
                EXA_VM: dialogEXA_VM,
                Node_Count: dialogNode_Count,
                RAC_NON_RAC: dialogRAC_NON_RAC,
                DB_Edition: dialogDB_Edition,
              
  })
  setDetails(
    //getDetails(); 
    // Here you can add the new row to whatever index you want
    //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
 {...details,[event.target.name]:event.target.value},

 );
 refreshPage();
 alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);
                            
  const initialset=(rowData)=>{
    setDialogid(rowData.id);
    if (!isDialogOpen1) {
      setDialogParent_Compartment_Name(rowData.Parent_Compartment_Name);
      setDialogCompartment_Name(rowData.Compartment_Name);
      setDialogLogical_DB_Display_name(rowData.Logical_DB_Display_name);
      setDialogLicence_Model(rowData.Licence_Model);
      setDialogCPU_Core_Count(rowData.CPU_Core_Count);
      setDialogLifecycle_State(rowData.Lifecycle_State);
      setDialogMachine_Shape(rowData.Machine_Shape);
      setDialogEXA_VM(rowData.EXA_VM);
      setDialogNode_Count(rowData.Node_Count);
      setDialogRAC_NON_RAC(rowData.RAC_NON_RAC);
      setDialogDB_Edition(rowData.DB_Edition);
     }
            }
const initialset1=()=>{
  setDialogid();
  if (!isDialogOpen1) {
    setDialogParent_Compartment_Name("-");
    setDialogCompartment_Name("-");
    setDialogLogical_DB_Display_name("-");
    setDialogLicence_Model("-");
    setDialogCPU_Core_Count("-");
    setDialogLifecycle_State("-");
    setDialogMachine_Shape("-");
    setDialogEXA_VM("-");
    setDialogNode_Count("-");
    setDialogRAC_NON_RAC("-");
    setDialogDB_Edition("-");

            }
          }
const actions = [
  {
    icon: () => <FaIcons.FaEdit/>,
    tooltip: 'Edit Details',
    //isFreeAction: true,
    onClick: (event, rowData) => {
  
      initialset(rowData);
      
      setIsDialogOpen1(true);
      
    },
  },
  {
    icon: () => <AddIcon />,
    tooltip: 'Add',
    isFreeAction: true,
    onClick: (event, rowData) => {
      initialset1();
      setIsDialogOpen2(true);
    },
  }
];
    return (
        <div> 
            <MaterialTable title="OCI Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{ filtering: true,
              pageSize: 50,
             pageSizeOptions: [50, 100, 200],
              exportButton: true,
              
              exportAllData: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
              grouping:true,
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
            height:30,width:700
                
                        },
                          
              actionsColumnIndex: 0, addRowPosition: "first"
             
          }}
          editable={{

           /* onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),  */
  
          }}
         
            />
        <MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogParent_Compartment_Name} onInput={handleParent_Compartment_Name} label="Parent Compartment Name" required/></div>
          <div><TextField value={dialogCompartment_Name} onInput={handleCompartment_Name}  label="Compartment Name" required /></div>
          <div><TextField value={dialogLogical_DB_Display_name} onInput={handleLogical_DB_Display_name}  label="Logical DB Display Name" required /></div>
          <div><TextField value={dialogLicence_Model} onInput={handleLicence_Model} label="Licence Model" /></div>
          <div><TextField value={dialogCPU_Core_Count} onInput={handleCPU_Core_Count} label="CPU Core Count" /></div>
          <div><TextField value={dialogLifecycle_State} onInput={handleLifecycle_State} label="Lifecycle State" /></div>
          <div><TextField value={dialogMachine_Shape} onInput={handleMachine_Shape} label="Machine Shape" /></div>
          <div><TextField value={dialogEXA_VM} onInput={handleEXA_VM} label="EXA VM" required /></div>
          <div><TextField value={dialogNode_Count} onInput={handleNode_Count} label="Node Count" /></div>
          <div><TextField value={dialogRAC_NON_RAC} onInput={handleRAC_NON_RAC} label="RAC/NON_RAC" /></div>
          <div><TextField value={dialogDB_Edition} onInput={handleDB_Edition} label="DB Edition" /></div>
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>       
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogParent_Compartment_Name} onInput={handleParent_Compartment_Name} label="Parent Compartment Name" required/></div>
          <div><TextField value={dialogCompartment_Name} onInput={handleCompartment_Name}  label="Compartment Name" /></div>
          <div><TextField value={dialogLogical_DB_Display_name} onInput={handleLogical_DB_Display_name}  label="Logical DB Display Name" required/></div>
          <div><TextField value={dialogLicence_Model} onInput={handleLicence_Model} label="Licence Model" required/></div>
          <div><TextField value={dialogCPU_Core_Count} onInput={handleCPU_Core_Count} label="CPU Core Count"  /></div>
          <div><TextField value={dialogLifecycle_State} onInput={handleLifecycle_State} label="Lifecycle State" /></div>
          <div><TextField value={dialogMachine_Shape} onInput={handleMachine_Shape} label="Machine Shape" /></div>
          <div><TextField value={dialogEXA_VM} onInput={handleEXA_VM} label="EXA VM" required/></div>
          <div><TextField value={dialogNode_Count} onInput={handleNode_Count} label="Node Count"/></div>
          <div><TextField value={dialogRAC_NON_RAC} onInput={handleRAC_NON_RAC} label="RAC/NON_RAC" /></div>
          <div><TextField value={dialogDB_Edition} onInput={handleDB_Edition} label="DB Edition" /></div>
          <div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>      
        </div>
    )
}


export const Physical_VM = () => {

  const columns = [
    {title:'VIP Hostname',field:'VIP_Hostname',cellStyle: {minWidth:200 }},
    {title:'Hostname',field:'Hostname',cellStyle: {minWidth:200 }},
    {title:'OS Type',field:'Os_Type',cellStyle: {minWidth:200 }},
    {title:'Memory',field:'Memory',cellStyle: {minWidth:200 },},
    {title:'CPU',field:'CPU'},
    {title:'Processor Type',field:'Processor_Type'},
    {title:'Total Cores',field:'Total_Cores',cellStyle: {minWidth:200 }},
    {title:'License Counted',field:'License_Counted'},
    {title:'Machine Serial',field:'Machine_Serial'},
    {title:'RAC/NON-RAC',field:'RAC_NON_RAC',lookup: {RAC: "RAC", 'Non-RAC': "Non-RAC"}},
    {title:'Env Type',field:'Env_Type',cellStyle: {minWidth:200 }},
	{title:'Domain',field:'Corp_Gid',cellStyle: {minWidth:200 }},
	{title:'Version',field:'Version',cellStyle: {minWidth:200 }},
	{title:'Status',field:'Status',cellStyle: {minWidth:200 }},
	{title:'Physical VM',field:'Physical_VM',cellStyle: {minWidth:200 }},
    
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieve_physical_vm'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);  
       // eslint-disable-next-line 
    },[]);

  /*  const deleteDetail = (id) => {
      Axios.delete(` http://localhost:8000/delete_physical_vm/${id}`).then((response) => {
        //setDetails(response.data)
        getDetails();
      });
    };*/
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieve_physical_vm").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }
 
     window.addEventListener("load", getDetails);   
     const [isDialogOpen1, setIsDialogOpen1] = useState(false);
     const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogid, setDialogid] = useState('');
   const [dialogVIP_Hostname, setDialogVIP_Hostname] = useState('');
   const [dialogHostname, setDialogHostname] = useState('');
   const [dialogOs_Type, setDialogOs_Type] = useState('');
   const [dialogMemory, setDialogMemory] = useState('');
   const [dialogCPU,setDialogCPU]=useState('');
   const [dialogProcessor_Type,setDialogProcessor_Type]=useState('');
   const [dialogTotal_Cores,setDialogTotal_Cores]=useState('');
   const [dialogLicense_Counted,setDialogLicense_Counted]=useState('');
   const [dialogMachine_Serial,setDialogMachine_Serial]=useState('');
   const [dialogRAC_NON_RAC,setDialogRAC_NON_RAC]=useState('');
   const [dialogEnv_Type,setDialogEnv_Type]=useState('');
   const [dialogCorp_Gid,setDialogCorp_Gid]=useState('');
   const [dialogVersion,setDialogVersion]=useState('');
   const [dialogStatus,setDialogStatus]=useState('');
   const [dialogPhysical_VM,setDialogPhysical_VM]=useState('');
  
   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }
  const handleVIP_Hostname=event=>{
    setDialogVIP_Hostname(event.target.value);
  }
  const handleHostname= event => {
    setDialogHostname(event.target.value);
  }
  const handleOs_Type= event => {
    setDialogOs_Type(event.target.value);
  }
  const handleMemory = event => {
    setDialogMemory(event.target.value);
  }
  const handleCPU = event => {
    setDialogCPU(event.target.value);
  }
  const handleProcessor_Type = event => {
    setDialogProcessor_Type(event.target.value);
  }

  const handleTotal_Cores = event => {
    setDialogTotal_Cores(event.target.value);
  }
  const handleLicense_Counted = event => {
    setDialogLicense_Counted(event.target.value);
  }
  const handleMachine_Serial = event => {
    setDialogMachine_Serial(event.target.value);
  }
  const handleRAC_NON_RAC = event => {
    setDialogRAC_NON_RAC(event.target.value);
  }
  const handleEnv_Type = event => {
    setDialogEnv_Type(event.target.value);
  }
   const handleCorp_Gid = event => {
    setDialogCorp_Gid(event.target.value);
  }
   const handleVersion = event => {
    setDialogVersion(event.target.value);
  }
   const handleStatus = event => {
    setDialogStatus(event.target.value);
  }
   const handlePhysical_VM = event => {
    setDialogPhysical_VM(event.target.value);
  }
 
 

  const refreshPage=()=>{
    window.location.reload();
  }
    
  const handleUpdateRow = event => {
    if(!dialogOs_Type||!dialogCPU||!dialogLicense_Counted||!dialogMachine_Serial)
    {
      alert("Enter mandatory details");
      return;
    }
    setDetails(
     // {...details,[ event.app_name]: dialogapp_name ,[event.app_key]:dialogapp_key}
      {...details,[event.target.name]:event.target.value},
     
      );
       Axios.put(' http://localhost:8000/update_physical_vm', { 
                id:dialogid,
                VIP_Hostname: dialogVIP_Hostname,
                Hostname: dialogHostname,
                Os_Type: dialogOs_Type,
                Memory: dialogMemory,
                CPU: dialogCPU,
                Processor_Type: dialogProcessor_Type,
                Total_Cores: dialogTotal_Cores,
                License_Counted: dialogLicense_Counted,
                Machine_Serial: dialogMachine_Serial,
                RAC_NON_RAC: dialogRAC_NON_RAC,
                Env_Type: dialogEnv_Type,
				Corp_Gid: dialogCorp_Gid,
				Version: dialogVersion,
				Status: dialogStatus,
				Physical_VM: dialogPhysical_VM,
              })
              refreshPage();
              alert("successfully Edited!");
            }
  const handleAddnewRow=event=>{ 
    if(!dialogOs_Type||!dialogCPU||!dialogLicense_Counted||!dialogMachine_Serial)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.post(' http://localhost:8000/create_physical_vm',{
      VIP_Hostname: dialogVIP_Hostname,
                Hostname: dialogHostname,
                Os_Type: dialogOs_Type,
                Memory: dialogMemory,
                CPU: dialogCPU,
                Processor_Type: dialogProcessor_Type,
                Total_Cores: dialogTotal_Cores,
                License_Counted: dialogLicense_Counted,
                Machine_Serial: dialogMachine_Serial,
                RAC_NON_RAC: dialogRAC_NON_RAC,
                Env_Type: dialogEnv_Type,
				Corp_Gid: dialogCorp_Gid,
				Version: dialogVersion,
				Status: dialogStatus,
				Physical_VM: dialogPhysical_VM,
              
  })
  setDetails(
    //getDetails(); 
    // Here you can add the new row to whatever index you want
    //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
 {...details,[event.target.name]:event.target.value},

 );
 refreshPage();
 alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);
                            
  const initialset=(rowData)=>{
    setDialogid(rowData.id);
    if (!isDialogOpen1) {
      setDialogVIP_Hostname(rowData.VIP_Hostname);
      setDialogHostname(rowData.Hostname);
      setDialogOs_Type(rowData.Os_Type);
      setDialogMemory(rowData.Memory);
      setDialogCPU(rowData.CPU);
      setDialogProcessor_Type(rowData.Processor_Type);
      setDialogTotal_Cores(rowData.Total_Cores);
      setDialogLicense_Counted(rowData.License_Counted);
      setDialogMachine_Serial(rowData.Machine_Serial);
      setDialogRAC_NON_RAC(rowData.RAC_NON_RAC);
      setDialogEnv_Type(rowData.Env_Type);
	  setDialogCorp_Gid(rowData.Corp_Gid);
	  setDialogVersion(rowData.Version);
	  setDialogStatus(rowData.Status);
	  setDialogPhysical_VM(rowData.Physical_VM);
     }
            }
const initialset1=()=>{
  setDialogid();
  if (!isDialogOpen1) {
    setDialogVIP_Hostname("-");
    setDialogHostname("-");
    setDialogOs_Type("-");
    setDialogMemory("-");
    setDialogCPU("-");
    setDialogProcessor_Type("-");
    setDialogTotal_Cores("-");
    setDialogLicense_Counted("-");
    setDialogMachine_Serial("-");
    setDialogRAC_NON_RAC("-");
    setDialogEnv_Type("-");
	setDialogCorp_Gid("-");
	setDialogVersion("-");
	setDialogStatus("-");
	setDialogPhysical_VM("-");

            }
          }
const actions = [
  {
    icon: () => <FaIcons.FaEdit/>,
    tooltip: 'Edit Details',
    //isFreeAction: true,
    onClick: (event, rowData) => {
  
      initialset(rowData);
      
      setIsDialogOpen1(true);
      
    },
  },
  {
    icon: () => <AddIcon />,
    tooltip: 'Add',
    isFreeAction: true,
    onClick: (event, rowData) => {
      initialset1();
      setIsDialogOpen2(true);
    },
  }
];
    return (
        <div> 
            <MaterialTable title="Physical/VM Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{ filtering: true,
              pageSize: 50,
             pageSizeOptions: [50, 100, 200],
              exportButton: true,
              
              exportAllData: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
              grouping:true,
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
            height:30,width:700
                
                        },
                          
              actionsColumnIndex: 0, addRowPosition: "first"
             
          }}
          editable={{

           /* onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/
  
          }}
         
            />
        <MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogVIP_Hostname} onInput={handleVIP_Hostname} label="VIP Hostname" /></div>
          <div><TextField value={dialogHostname} onInput={handleHostname}  label="Hostname" /></div>
          <div><TextField value={dialogOs_Type} onInput={handleOs_Type}  label="Os_Type" required /></div>
          <div><TextField value={dialogMemory} onInput={handleMemory} label="Memory" /></div>
          <div><TextField value={dialogCPU} onInput={handleCPU} label="CPU" required/></div>
          <div><TextField value={dialogProcessor_Type} onInput={handleProcessor_Type} label="Processor_Type" /></div>
          <div><TextField value={dialogTotal_Cores} onInput={handleTotal_Cores} label="Total Cores" /></div>
          <div><TextField value={dialogLicense_Counted} onInput={handleLicense_Counted} label="License Counted" required /></div>
          <div><TextField value={dialogMachine_Serial} onInput={handleMachine_Serial} label="Machine Serial" required/></div>
          <div><TextField value={dialogRAC_NON_RAC} onInput={handleRAC_NON_RAC} label="RAC/NON-RAC" /></div>
          <div><TextField value={dialogEnv_Type} onInput={handleEnv_Type} label="Env Type" /></div>
		  <div><TextField value={dialogCorp_Gid} onInput={handleCorp_Gid} label="Corp Gid" /></div>
		  <div><TextField value={dialogVersion} onInput={handleVersion} label="Version" /></div>
		  <div><TextField value={dialogStatus} onInput={handleStatus} label="Status" /></div>
		  <div><TextField value={dialogPhysical_VM} onInput={handlePhysical_VM} label="Physical VM" /></div>
          <div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>       
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogVIP_Hostname} onInput={handleVIP_Hostname} label="VIP Hostname" /></div>
          <div><TextField value={dialogHostname} onInput={handleHostname}  label="Hostname" /></div>
          <div><TextField value={dialogOs_Type} onInput={handleOs_Type}  label="Os_Type" required/></div>
          <div><TextField value={dialogMemory} onInput={handleMemory} label="Memory" /></div>
          <div><TextField value={dialogCPU} onInput={handleCPU} label="CPU" required /></div>
          <div><TextField value={dialogProcessor_Type} onInput={handleProcessor_Type} label="Processor_Type" /></div>
          <div><TextField value={dialogTotal_Cores} onInput={handleTotal_Cores} label="Total Cores" /></div>
          <div><TextField value={dialogLicense_Counted} onInput={handleLicense_Counted} label="License Counted" required/></div>
          <div><TextField value={dialogMachine_Serial} onInput={handleMachine_Serial} label="Machine Serial" required/></div>
          <div><TextField value={dialogRAC_NON_RAC} onInput={handleRAC_NON_RAC} label="RAC/NON-RAC" /></div>
          <div><TextField value={dialogEnv_Type} onInput={handleEnv_Type} label="Env Type" /></div>
		  <div><TextField value={dialogCorp_Gid} onInput={handleCorp_Gid} label="Corp Gid" /></div>
		  <div><TextField value={dialogVersion} onInput={handleVersion} label="Version" /></div>
		  <div><TextField value={dialogStatus} onInput={handleStatus} label="Status" /></div>
		  <div><TextField value={dialogPhysical_VM} onInput={handlePhysical_VM} label="Physical VM" /></div>
          <div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>      
        </div>
    )
}


export const DB2Table = () => {

  const columns = [
      {title:'Environment',field:'environment',cellStyle: {minWidth:200 },},
      {title:'Host Name1',field:'host_name1',cellStyle: {minWidth:200 },},
	  {title:'Host Name2',field:'host_name2',cellStyle: {minWidth:200 },},
	  {title:'VIP Name',field:'vip_name',cellStyle: {minWidth:200 },},
	  {title:'DB Version',field:'db_version',cellStyle: {minWidth:200 },},
      {title:'Instance Name',field:'instance_name',cellStyle: {minWidth:200 },},
	  {title:'Port',field:'port'},
      {title:'DB Name',field:'db_name',cellStyle: {minWidth:200 },},
	  {title:'HA Type',field:'ha_type',cellStyle: {minWidth:200 },},
      {title:'server cores',field:'core_srvr',cellStyle: {minWidth:200 },},
      {title:'Total cores',field:'Total_cores',cellStyle: {minWidth:200 },},
      {title:'Processor Type',field:'Processor_Type',cellStyle: {minWidth:200 },},
      {title:'OS Version',field:'OS_version',cellStyle: {minWidth:200 },},
      {title:'Product Name',field:'Product_name',cellStyle: {minWidth:300 }},
      {title:'Rdbms',field:'rdbms'},
      {title:'Status',field:'status'},
      {title:'Location',field:'location',cellStyle: {minWidth:200 },},
      {title:'DBA Owner',field:'dba_sme',cellStyle: {minWidth:200 },}, 
      {title:'Support group',field:'sn_group',cellStyle: {minWidth:300 },},
      {title:'Compliance',field:'compliance'},
      {title:'Comments',field:'comments'},
	  {title:'App Name',field:'app_name',cellStyle: {minWidth:200 },},
      {title:'Application Owner',field:'app_vp_owner',cellStyle: {minWidth:200 },},
      {title:'PT Contact',field:'pt_contact',cellStyle: {minWidth:300 },},
	  {title:'PT Name',field:'pt_name',cellStyle: {minWidth:200 },},
	  {title:'VP Name',field:'VP_name',cellStyle: {minWidth:200 },},
	
     
	   
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveDB2'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);  
       // eslint-disable-next-line 
    },[]);

   /* const deleteDetail = (id) => {
      Axios.delete(` http://localhost:8000/deleteDB2/${id}`).then((response) => {
        //setDetails(response.data)
        getDetails();
      });
    };*/
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveDB2").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

     // window.onload = getDetails();  
     window.addEventListener("load", getDetails);   
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogid, setDialogid] = useState('');
   const [dialogenvironment,setDialogenvironment]=useState('');
   const [dialoghost_name1,setDialoghost_name1]=useState('');
   const [dialoghost_name2,setDialoghost_name2]=useState('');
   const [dialogvip_name,setDialogvip_name]=useState('');
   const [dialogdb_version,setDialogdb_version]=useState('');
   const [dialoginstance_name, setDialoginstance_name] = useState('');
   const [dialogdb_name,setDialogdb_name]=useState('');
   const [dialogport, setDialogport] = useState('');
   const [dialogha_type,setDialogha_type]=useState('');
   const [dialogcore_srvr,setDialogcore_srvr]=useState('');
   const [dialogTotal_cores,setDialogTotal_cores]=useState('');
   const [dialogProcessor_Type,setDialogProcessor_Type]=useState('');
   const [dialogOS_version,setDialogOS_version]=useState('');
   const [dialogProduct_name,setDialogProduct_name]=useState('');
   const [dialogrdbms, setDialogrdbms] = useState('');
   const [dialogstatus,setDialogstatus]=useState('');
   const [dialoglocation,setDialoglocation]=useState('');
   const [dialogdba_sme,setDialogdba_sme]=useState('');
   const [dialogsn_group,setDialogsn_group]=useState('');
   const [dialogcompliance,setDialogcompliance]=useState('');
   const [dialogcomments,setDialogcomments]=useState('');
   const [dialogapp_name,setDialogapp_name]=useState('');
   const [dialogapp_vp_owner,setDialogapp_vp_owner]=useState('');
   const [dialogpt_contact, setDialogpt_contact] = useState('');
   const [dialogpt_name,setDialogpt_name]=useState('');
   const [dialogVP_name,setDialogVP_name]=useState('');
  
 
   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }
  const handleenvironment=event=>{
    setDialogenvironment(event.target.value);
  }
  const handlehost_name1= event => {
    setDialoghost_name1(event.target.value);
  }
  const handlehost_name2= event => {
    setDialoghost_name2(event.target.value);
  }
  const handlevip_name = event => {
    setDialogvip_name(event.target.value);
  }
  const handledb_version = event => {
    setDialogdb_version(event.target.value);
  }
  const handleinstance_name = event => {
    setDialoginstance_name(event.target.value);
  }

  const handleport = event => {
    setDialogport(event.target.value);
  }
  const handledb_name = event => {
    setDialogdb_name(event.target.value);
  }
  const handleha_type = event => {
    setDialogha_type(event.target.value);
  }
  const handlecore_srvr = event => {
    setDialogcore_srvr(event.target.value);
  }
  const handleTotal_cores= event => {
    setDialogTotal_cores(event.target.value);
  }
  const handleProcessor_Type= event => {
    setDialogProcessor_Type(event.target.value);
  }
  const handleOS_version= event => {
    setDialogOS_version(event.target.value);
  }
  const handleProduct_name= event => {
    setDialogProduct_name(event.target.value);
  }
  const handlerdbms= event => {
    setDialogrdbms(event.target.value);
  }
  const handlestatus= event => {
    setDialogstatus(event.target.value);
  }
  const handlelocation= event => {
    setDialoglocation(event.target.value);
  }
  const handledba_sme= event => {
    setDialogdba_sme(event.target.value);
  }
  const handlecompliance= event => {
    setDialogcompliance(event.target.value);
  }
   const handlecomments= event => {
    setDialogcomments(event.target.value);
  }
   const handleapp_name= event => {
    setDialogapp_name(event.target.value);
  }
  const handlesn_group= event => {
    setDialogsn_group(event.target.value);
  }
   const handleapp_vp_owner= event => {
    setDialogapp_vp_owner(event.target.value);
  }
   const handlept_contact= event => {
    setDialogpt_contact(event.target.value);
  }
   const handlept_name= event => {
    setDialogpt_name(event.target.value);
  }
   const handleVP_name= event => {
    setDialogVP_name(event.target.value);
  }

  const refreshPage=()=>{
    window.location.reload();
  }
    
  const handleUpdateRow = event => {
    if(!dialoginstance_name||!dialogdb_name||!dialogenvironment||!dialogdba_sme||!dialogsn_group||!dialoghost_name1)
    {
      alert("Enter mandatory details");
      return;
    }
    setDetails(
     // {...details,[ event.app_name]: dialogapp_name ,[event.app_key]:dialogapp_key}
      {...details,[event.target.name]:event.target.value},
     
      );
       Axios.put(' http://localhost:8000/updateDB2', { 
                id:dialogid,
				environment: dialogenvironment,
				host_name1: dialoghost_name1,
				host_name2: dialoghost_name2,
				vip_name: dialogvip_name,
				db_version: dialogdb_version,
				instance_name: dialoginstance_name,
				port: dialogport,
				db_name: dialogdb_name,
				ha_type: dialogha_type,
				core_srvr: dialogcore_srvr,
				Total_cores: dialogTotal_cores,
				Processor_Type: dialogProcessor_Type,
				OS_version: dialogOS_version,
				Product_name: dialogProduct_name,
                rdbms: dialogrdbms,
                status: dialogstatus,
				location: dialoglocation,
				dba_sme: dialogdba_sme,
				sn_group: dialogsn_group,
				compliance: dialogcompliance,
                comments: dialogcomments,
                app_name: dialogapp_name,
				app_vp_owner: dialogapp_vp_owner,
                pt_contact: dialogpt_contact,
                pt_name: dialogpt_name,
                VP_name: dialogVP_name,
               
		 
              })
              refreshPage();
              alert("successfully Edited!");
            }
  const handleAddnewRow=event=>{ 
    if(!dialoginstance_name||!dialogdb_name||!dialogenvironment||!dialogdba_sme||!dialogsn_group||!dialoghost_name1)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.post(' http://localhost:8000/createDB2',{
                
				environment: dialogenvironment,
				host_name1: dialoghost_name1,
				host_name2: dialoghost_name2,
				vip_name: dialogvip_name,
				db_version: dialogdb_version,
				instance_name: dialoginstance_name,
				port: dialogport,
				db_name: dialogdb_name,
				ha_type: dialogha_type,
				core_srvr: dialogcore_srvr,
				Total_cores: dialogTotal_cores,
				Processor_Type: dialogProcessor_Type,
				OS_version: dialogOS_version,
				Product_name: dialogProduct_name,
         rdbms: dialogrdbms,
         status: dialogstatus,
				location: dialoglocation,
				dba_sme: dialogdba_sme,
				sn_group: dialogsn_group,
				compliance: dialogcompliance,
                comments: dialogcomments,
                app_name: dialogapp_name,
				app_vp_owner: dialogapp_vp_owner,
                pt_contact: dialogpt_contact,
                pt_name: dialogpt_name,
                VP_name: dialogVP_name,
  })
  setDetails(
    //getDetails(); 
    // Here you can add the new row to whatever index you want
    //[{ id: dialogId, app_name: dialogapp_name ,app_key:dialogapp_key}, ...details]
 {...details,[event.target.name]:event.target.value},

 );
 refreshPage();
 alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    } 
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);
                            
  const initialset=(rowData)=>{
    setDialogid(rowData.id);
    if (!isDialogOpen1) {
	  setDialogenvironment(rowData.environment);
	  setDialoghost_name1(rowData.host_name1);
	  setDialoghost_name2(rowData.host_name2);
	  setDialogvip_name(rowData.vip_name);
	  setDialogdb_version(rowData.db_version);
	  setDialoginstance_name(rowData.instance_name);
	  setDialogport(rowData.port);
	  setDialogdb_name(rowData.db_name);
	  setDialogha_type(rowData.ha_type);
	  setDialogcore_srvr(rowData.core_srvr);
	  setDialogTotal_cores(rowData.Total_cores);
	  setDialogProcessor_Type(rowData.Processor_Type);
	  setDialogOS_version(rowData.OS_version);
	  setDialogProduct_name(rowData.Product_name);
	  setDialogrdbms(rowData.rdbms);
	  setDialogstatus(rowData.status);
	  setDialoglocation(rowData.location);
	  setDialogdba_sme(rowData.dba_sme); 
    setDialogsn_group(rowData.sn_group);
	  setDialogcompliance(rowData.compliance);
      setDialogcomments(rowData.commnets);
	  setDialogapp_name(rowData.app_name);
	  setDialogapp_vp_owner(rowData.app_vp_owner);
      setDialogpt_contact(rowData.pt_contact);
      setDialogpt_name(rowData.pt_name);
      setDialogVP_name(rowData.VP_name);
     
  
              }
            }
const initialset1=()=>{
  setDialogid("-");
  if (!isDialogOpen1) {
    setDialogenvironment("-");
	  setDialoghost_name1("-");
	  setDialoghost_name2("-");
	  setDialogvip_name("-");
	  setDialogdb_version("-");
	  setDialoginstance_name("-");
	  setDialogport("-");
	  setDialogdb_name("-");
	  setDialogha_type("-");
	  setDialogcore_srvr("-");
	  setDialogTotal_cores("-");
	  setDialogProcessor_Type("-");
	  setDialogOS_version("-");
	  setDialogProduct_name("-");
	  setDialogrdbms("-");
	  setDialogstatus("-");
	  setDialoglocation("-");
	  setDialogdba_sme("-"); 
	  setDialogsn_group("-");
	  setDialogcompliance("-");
      setDialogcomments("-");
	  setDialogapp_name("-");
	  setDialogapp_vp_owner("-");
      setDialogpt_contact("-");
      setDialogpt_name("-");
      setDialogVP_name("-");

            }
          }
const actions = [
  {
    icon: () => <FaIcons.FaEdit/>,
    tooltip: 'Edit Details',
    //isFreeAction: true,
    onClick: (event, rowData) => {
  
      initialset(rowData);
      
      setIsDialogOpen1(true);
      
    },
  },
  {
    icon: () => <AddIcon />,
    tooltip: 'Add',
    isFreeAction: true,
    onClick: (event, rowData) => {
      initialset1();
      setIsDialogOpen2(true);
    },
  }
];
    return (
        <div> 
            <MaterialTable title="DB2 Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{ filtering: true,
                  pageSize: 20,
             pageSizeOptions: [20,50,80,110],
               exportButton: true,
              exportAllData: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
              grouping:true,
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
		 height:30,
                width:700
                           },
                           
              actionsColumnIndex: 0, addRowPosition: "first"
             
          }}
          editable={{
          
           /* onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/

  
          }}
         
            />
        <MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
		
		<div><TextField value={dialogenvironment} onInput={handleenvironment} label="Environment" required /></div>
		
		 <div><TextField value={dialoghost_name1} onInput={handlehost_name1} label="Host-Name1" required/></div>
		
		 <div><TextField value={dialoghost_name2} onInput={handlehost_name2} label="Host-Name2"/></div>
		 
		  <div><TextField value={dialogvip_name} onInput={handlevip_name} label="VIP Name" /></div>
		  
		  <div><TextField value={dialogdb_version} onInput={handledb_version} label="DB Version" /></div>
		  
		  <div><TextField value={dialogOS_version} onInput={handleOS_version} label="OS Version" /></div>
		
		 <div><TextField value={dialoginstance_name} onInput={handleinstance_name}  label="Instance-Name" required /></div>
		 
		  <div><TextField value={dialogport} onInput={handleport} label="Port" /></div>
		 
		  <div><TextField value={dialogdb_name} onInput={handledb_name} label="DB-Name" required/></div>
		  
		  <div><TextField value={dialogha_type} onInput={handleha_type} label="HA-Type" /></div>
		 
		  <div><TextField value={dialogcore_srvr} onInput={handlecore_srvr} label="Server cores" /></div>
		  
		  <div><TextField value={dialogTotal_cores} onInput={handleTotal_cores} label="Total_cores" /></div>
		  
		  <div><TextField value={dialogProcessor_Type} onInput={handleProcessor_Type} label="Processor Type" /></div>
		  
		  <div><TextField value={dialogProduct_name} onInput={handleProduct_name}  label="Product-Name"  /></div>
		  
          <div><TextField value={dialogrdbms} onInput={handlerdbms} label="RDBMS" /></div>
		  
		   <div><TextField value={dialogstatus} onInput={handlestatus} label="Status" /></div>
		   
		  <div><TextField value={dialoglocation} onInput={handlelocation} label="Location" /></div>
			
		<div><TextField value={dialogdba_sme} onInput={handledba_sme} label="DBA-SME" required/></div>
         
        <div><TextField value={dialogsn_group} onInput={handlesn_group} label="SN-Group" required/></div>
      
       <div><TextField value={dialogcompliance} onInput={handlecompliance} label="Compliance" /></div>
        
	<div><TextField value={dialogcomments} onInput={handlecomments} label="Comments" /></div>
		  
	<div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" /></div>
	
	<div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner" /></div>
	
	 <div><TextField value={dialogpt_contact} onInput={handlept_contact}  label="PT-Contact" /></div>
          
     <div><TextField value={dialogpt_name} onInput={handlept_name} label="PT-Name" /></div>
          
     <div><TextField value={dialogVP_name} onInput={handleVP_name} label="VP Name" /></div>
         
	<div><pre>           </pre></div>
          
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>       
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
          <div><TextField value={dialogenvironment} onInput={handleenvironment} label="Environment" required /></div>
		
		 <div><TextField value={dialoghost_name1} onInput={handlehost_name1} label="Host-Name1" required/></div>
		
		 <div><TextField value={dialoghost_name2} onInput={handlehost_name2} label="Host-Name2"/></div>
		 
		  <div><TextField value={dialogvip_name} onInput={handlevip_name} label="VIP Name" /></div>
		  
		  <div><TextField value={dialogdb_version} onInput={handledb_version} label="DB Version" /></div>
		  
		  <div><TextField value={dialogOS_version} onInput={handleOS_version} label="OS Version" /></div>
		
		 <div><TextField value={dialoginstance_name} onInput={handleinstance_name}  label="Instance-Name" required /></div>
		 
		  <div><TextField value={dialogport} onInput={handleport} label="Port" /></div>
		 
		  <div><TextField value={dialogdb_name} onInput={handledb_name} label="DB-Name" required/></div>
		  
		  <div><TextField value={dialogha_type} onInput={handleha_type} label="HA-Type" /></div>
		 
		  <div><TextField value={dialogcore_srvr} onInput={handlecore_srvr} label="Server cores" /></div>
		  
		  <div><TextField value={dialogTotal_cores} onInput={handleTotal_cores} label="Total_cores" /></div>
		  
		  <div><TextField value={dialogProcessor_Type} onInput={handleProcessor_Type} label="Processor Type" /></div>
		  
		  <div><TextField value={dialogProduct_name} onInput={handleProduct_name}  label="Product-Name"  /></div>
		  
          <div><TextField value={dialogrdbms} onInput={handlerdbms} label="RDBMS" /></div>
		  
		   <div><TextField value={dialogstatus} onInput={handlestatus} label="Status" /></div>
		   
		  <div><TextField value={dialoglocation} onInput={handlelocation} label="Location" /></div>
			
		<div><TextField value={dialogdba_sme} onInput={handledba_sme} label="DBA-SME" required/></div>
         
        <div><TextField value={dialogsn_group} onInput={handlesn_group} label="SN-Group" required/></div>
      
       <div><TextField value={dialogcompliance} onInput={handlecompliance} label="Compliance" /></div>
        
	<div><TextField value={dialogcomments} onInput={handlecomments} label="Comments" /></div>
		  
	<div><TextField value={dialogapp_name} onInput={handleapp_name} label="App-Name" /></div>
	
	<div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner" /></div>
	
	 <div><TextField value={dialogpt_contact} onInput={handlept_contact}  label="PT-Contact" /></div>
          
     <div><TextField value={dialogpt_name} onInput={handlept_name} label="PT-Name" /></div>
          
     <div><TextField value={dialogVP_name} onInput={handleVP_name} label="VP Name" /></div>
        
          <div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>      
        </div>
    )
}



export const InformixTable = () => {
  const columns = [
      {title:'Environment',field:'environment',cellStyle: {minWidth:200 },},
	  {title:'Rdbms',field:'rdbms'},
      {title:'Host Name',field:'host_name',cellStyle: {minWidth:200 },},
	  {title:'VIP Name',field:'vip_name',cellStyle: {minWidth:200 },},
	  {title:'DB Version',field:'db_version',cellStyle: {minWidth:200 },},
	  {title:'DB Name',field:'db_name',cellStyle: {minWidth:200 },},
	  {title:'DB Config',field:'db_config',cellStyle: {minWidth:200 },},
	  {title:'OS Version',field:'os_version',cellStyle: {minWidth:200 },},
	  {title:'App Name',field:'application',cellStyle: {minWidth:200 },},
	  {title:'Port',field:'tier'},
	  {title:'DBA Owner',field:'dba_sme',cellStyle: {minWidth:200 },},
	  {title:'Location',field:'location',cellStyle: {minWidth:200 },},
	  {title:'Application Owner',field:'app_vp_owner',cellStyle: {minWidth:200 },},
	  {title:'PT Name',field:'pt_name',cellStyle: {minWidth:200 },},
	  {title:'PT Contact',field:'pt_contact',cellStyle: {minWidth:300 },},
	  {title:'VP Name',field:'VP_name',cellStyle: {minWidth:200 },},     
	   
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveInformix'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);  
       // eslint-disable-next-line 
    },[]);

   /* const deleteDetail = (id) => {
      Axios.delete(` http://localhost:8000/deleteInformix/${id}`).then((response) => {
        //setDetails(response.data)
        getDetails();
      });
    };*/
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveInformix").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

     // window.onload = getDetails();  
     window.addEventListener("load", getDetails);   
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogid, setDialogid] = useState('');
   const [dialogenvironment,setDialogenvironment]=useState('');
   const [dialogrdbms, setDialogrdbms] = useState('');
   const [dialoghost_name,setDialoghost_name]=useState('');
   const [dialogvip_name,setDialogvip_name]=useState('');
   const [dialogdb_version,setDialogdb_version]=useState('');
   const [dialogdb_name,setDialogdb_name]=useState('');
   const [dialogdb_config, setDialogdb_config] = useState('');
   const [dialogos_version,setDialogos_version]=useState('');
   const [dialogapplication,setDialogapplication]=useState('');
   const [dialogtier, setDialogtier] = useState('');
   const [dialogdba_sme,setDialogdba_sme]=useState('');
   const [dialoglocation,setDialoglocation]=useState('');
   const [dialogapp_vp_owner,setDialogapp_vp_owner]=useState('');
   const [dialogpt_name,setDialogpt_name]=useState(''); 
   const [dialogpt_contact, setDialogpt_contact] = useState('');
   const [dialogVP_name,setDialogVP_name]=useState('');
  
   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }
  const handleenvironment=event=>{
    setDialogenvironment(event.target.value);
  }
   const handlerdbms= event => {
    setDialogrdbms(event.target.value);
  }
  
  const handlehost_name= event => {
    setDialoghost_name(event.target.value);
  }
  
  const handlevip_name = event => {
    setDialogvip_name(event.target.value);
  }
  const handledb_version = event => {
    setDialogdb_version(event.target.value);
  }
  const handledb_name = event => {
    setDialogdb_name(event.target.value);
  }
  const handledb_config = event => {
    setDialogdb_config(event.target.value);
  }
  const handleos_version= event => {
    setDialogos_version(event.target.value);
  }
  const handleapplication= event => {
    setDialogapplication(event.target.value);
  }
  const handletier = event => {
    setDialogtier(event.target.value);
  }
   const handledba_sme= event => {
    setDialogdba_sme(event.target.value);
  }
    const handlelocation= event => {
    setDialoglocation(event.target.value);
  }
   const handleapp_vp_owner= event => {
    setDialogapp_vp_owner(event.target.value);
  }
  const handlept_name= event => {
    setDialogpt_name(event.target.value);
  }
   const handlept_contact= event => {
    setDialogpt_contact(event.target.value);
  }
  
   const handleVP_name= event => {
    setDialogVP_name(event.target.value);
  }
  
  const refreshPage=()=>{
    window.location.reload();
  }
    
  const handleUpdateRow = event => {
    if(!dialogdb_config||!dialogdb_name||!dialogenvironment||!dialogdba_sme||!dialoghost_name)
    {
      alert("Enter mandatory details");
      return;
    }
    setDetails(
     // {...details,[ event.application]: dialogapplication ,[event.app_key]:dialogapp_key}
      {...details,[event.target.name]:event.target.value},
     
      );
       Axios.put(' http://localhost:8000/updateInformix', { 
                id:dialogid,
				environment: dialogenvironment,
				rdbms: dialogrdbms,
				host_name: dialoghost_name,
			    vip_name: dialogvip_name,
				db_version: dialogdb_version,
				db_name: dialogdb_name,
				db_config: dialogdb_config,
				os_version: dialogos_version,
				application: dialogapplication,
				tier: dialogtier,
				dba_sme: dialogdba_sme,
				location: dialoglocation,
				app_vp_owner: dialogapp_vp_owner,
				pt_name: dialogpt_name,
				pt_contact: dialogpt_contact,
				VP_name: dialogVP_name,
		 
              })
              refreshPage();
              alert("successfully Edited!");
            }
  const handleAddnewRow=event=>{ 
    if(!dialogdb_config||!dialogdb_name||!dialogenvironment||!dialogdba_sme||!dialoghost_name)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.post(' http://localhost:8000/createInformix',{
                
				environment: dialogenvironment,
				rdbms: dialogrdbms,
				host_name: dialoghost_name,
			    vip_name: dialogvip_name,
				db_version: dialogdb_version,
				db_name: dialogdb_name,
				db_config: dialogdb_config,
				os_version: dialogos_version,
				application: dialogapplication,
				tier: dialogtier,
				dba_sme: dialogdba_sme,
				location: dialoglocation,
				app_vp_owner: dialogapp_vp_owner,
				pt_name: dialogpt_name,
				pt_contact: dialogpt_contact,
				VP_name: dialogVP_name,
  })
  setDetails(
    //getDetails(); 
    // Here you can add the new row to whatever index you want
    //[{ id: dialogId, application: dialogapplication ,app_key:dialogapp_key}, ...details]
 {...details,[event.target.name]:event.target.value},

 );
 refreshPage();
 alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);
                            
  const initialset=(rowData)=>{
    setDialogid(rowData.id);
    if (!isDialogOpen1) {
	  setDialogenvironment(rowData.environment);
	  setDialogrdbms(rowData.rdbms);
	  setDialoghost_name(rowData.host_name);
	  setDialogvip_name(rowData.vip_name);
	  setDialogdb_version(rowData.db_version);
	  setDialogdb_name(rowData.db_name);
	  setDialogos_version(rowData.os_version);
	  setDialogdb_config(rowData.db_config);
	  setDialogapplication(rowData.application);
	  setDialogtier(rowData.tier);
	  setDialoglocation(rowData.location);
	  setDialogdba_sme(rowData.dba_sme); 
	  setDialogapp_vp_owner(rowData.app_vp_owner);
      setDialogpt_contact(rowData.pt_contact);
      setDialogpt_name(rowData.pt_name);
      setDialogVP_name(rowData.VP_name);
              }
            }
const initialset1=()=>{
  setDialogid("-");
  if (!isDialogOpen1) {
    setDialogenvironment("-");
	  setDialoghost_name("-");
	  setDialogvip_name("-");
	  setDialogdb_version("-");
	  setDialogdb_config("-");
	  setDialogtier("-");
	  setDialogdb_name("-");
	  setDialogos_version("-");
	  setDialogrdbms("-");
	  setDialoglocation("-");
	  setDialogdba_sme("-"); 
	  setDialogapplication("-");
	  setDialogapp_vp_owner("-");
      setDialogpt_contact("-");
      setDialogpt_name("-");
      setDialogVP_name("-");

            }
          }
const actions = [
  {
    icon: () => <FaIcons.FaEdit/>,
    tooltip: 'Edit Details',
    //isFreeAction: true,
    onClick: (event, rowData) => {
  
      initialset(rowData);
      
      setIsDialogOpen1(true);
      
    },
  },
  {
    icon: () => <AddIcon />,
    tooltip: 'Add',
    isFreeAction: true,
    onClick: (event, rowData) => {
      initialset1();
      setIsDialogOpen2(true);
    },
  }
];
    return (
        <div> 
            <MaterialTable title="Informix Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{ filtering: true,
                  pageSize: 20,
             pageSizeOptions: [20,50,80,110],
               extierButton: true,
              extierAllData: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
              grouping:true,
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
		 height:30,
                width:700
                           },
                           
              actionsColumnIndex: 0, addRowPosition: "first"
             
          }}
          editable={{
          
          /*  onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/

  
          }}
         
            />
        <MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
		
		<div><TextField value={dialogenvironment} onInput={handleenvironment} label="Environment" required /></div>
		<div><TextField value={dialogrdbms} onInput={handlerdbms} label="RDBMS" /></div>
		<div><TextField value={dialoghost_name} onInput={handlehost_name} label="Host-Name1" required/></div>
		<div><TextField value={dialogvip_name} onInput={handlevip_name} label="VIP Name" /></div>
		<div><TextField value={dialogdb_version} onInput={handledb_version} label="DB Version" /></div>
		<div><TextField value={dialogdb_name} onInput={handledb_name} label="DB-Name" required/></div>
		<div><TextField value={dialogdb_config} onInput={handledb_config}  label="Instance-Name" required /></div>
	     <div><TextField value={dialogos_version} onInput={handleos_version} label="OS Version" /></div>
		<div><TextField value={dialogapplication} onInput={handleapplication} label="App-Name" /></div>
		<div><TextField value={dialogtier} onInput={handletier} label="Port" /></div>
		<div><TextField value={dialogdba_sme} onInput={handledba_sme} label="DBA-SME" required/></div>
		<div><TextField value={dialoglocation} onInput={handlelocation} label="Location" /></div>
		<div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner" /></div>
	    <div><TextField value={dialogpt_contact} onInput={handlept_contact}  label="PT-Contact" /></div>
        <div><TextField value={dialogpt_name} onInput={handlept_name} label="PT-Name" /></div>
        <div><TextField value={dialogVP_name} onInput={handleVP_name} label="VP Name" /></div>
		<div><pre>           </pre></div>
        <div className="h3color">
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>       
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
         <div><TextField value={dialogenvironment} onInput={handleenvironment} label="Environment" required /></div>
		<div><TextField value={dialogrdbms} onInput={handlerdbms} label="RDBMS" /></div>
		<div><TextField value={dialoghost_name} onInput={handlehost_name} label="Host-Name1" required/></div>
		<div><TextField value={dialogvip_name} onInput={handlevip_name} label="VIP Name" /></div>
		<div><TextField value={dialogdb_version} onInput={handledb_version} label="DB Version" /></div>
		<div><TextField value={dialogdb_name} onInput={handledb_name} label="DB-Name" required/></div>
		<div><TextField value={dialogdb_config} onInput={handledb_config}  label="Instance-Name" required /></div>
	     <div><TextField value={dialogos_version} onInput={handleos_version} label="OS Version" /></div>
		<div><TextField value={dialogapplication} onInput={handleapplication} label="App-Name" /></div>
		<div><TextField value={dialogtier} onInput={handletier} label="Port" /></div>
		<div><TextField value={dialogdba_sme} onInput={handledba_sme} label="DBA-SME" required/></div>
		<div><TextField value={dialoglocation} onInput={handlelocation} label="Location" /></div>
		<div><TextField value={dialogapp_vp_owner} onInput={handleapp_vp_owner} label="App Owner" /></div>
	    <div><TextField value={dialogpt_contact} onInput={handlept_contact}  label="PT-Contact" /></div>
        <div><TextField value={dialogpt_name} onInput={handlept_name} label="PT-Name" /></div>
        <div><TextField value={dialogVP_name} onInput={handleVP_name} label="VP Name" /></div>
		<div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>      
        </div>
    )
}
export const AIX = () => {
  const columns = [
      {title:'Location',field:'Location',cellStyle: {minWidth:200 },},
	  {title:'HMC',field:'HMC'},
      {title:'Managed System Name',field:'Managed_System_Name',cellStyle: {minWidth:200 },},
	  {title:'Managed System Serial',field:'Managed_System_Serial',cellStyle: {minWidth:200 },},
	  {title:'Name',field:'Name',cellStyle: {minWidth:200 },},
	  {title:'OS',field:'OS',cellStyle: {minWidth:200 },},
	  {title:'IP_Address',field:'OS_Version',cellStyle: {minWidth:200 },},
	  {title:'IP Address',field:'IP_Address',cellStyle: {minWidth:200 },},
	  {title:'APP/DB',field:'APP$DB',cellStyle: {minWidth:200 },},
	  {title:'Environment',field:'Environment',cellStyle: {minWidth:200 },},
	  {title:'Business Contacts',field:'Business_Contacts',cellStyle: {minWidth:200 },},
	  {title:'Comments',field:'Comments',cellStyle: {minWidth:200 },},
	  {title:'Propose_Decommission/Migration',field:'Propose_Decommission$Migration',cellStyle: {minWidth:200 },},
	  {title:'DG_Details',field:'DG_Details',cellStyle: {minWidth:300 },},
	  {title:'Alias_Name',field:'Alias_Name',cellStyle: {minWidth:200 },},     
	   {title:'Alias IP Address',field:'Alias_IP_Address',cellStyle: {minWidth:200 },},
]

    const [details,setDetails] = useState([]);
    useEffect(() => {    
      const getDetails = async () => { 
        const result = await Axios(' http://localhost:8000/retrieveAIX'); 
        setDetails(result.data);
      } 
      getDetails();  
      console.log(details);  
       // eslint-disable-next-line 
    },[]);

    /*const deleteDetail = (id) => {
      Axios.delete(` http://localhost:8000/deleteAIX/${id}`).then((response) => {
        //setDetails(response.data)
        getDetails();
      });
    };*/
    const getDetails = () => {
        Axios.get(" http://localhost:8000/retrieveAIX").then((response) => {
          setDetails(response.data)
          console.log(response.data)
        })
      }

     // window.onload = getDetails();  
     window.addEventListener("load", getDetails);   
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
   const [isDialogOpen2, setIsDialogOpen2] = useState(false);
   const [dialogid, setDialogid] = useState('');
   const [dialogLocation,setDialogLocation]=useState('');
   const [dialogHMC, setDialogHMC] = useState('');
   const [dialogManaged_System_Name,setDialogManaged_System_Name]=useState('');
   const [dialogManaged_System_Serial,setDialogManaged_System_Serial]=useState('');
   const [dialogName,setDialogName]=useState('');
   const [dialogOS,setDialogOS]=useState('');
   const [dialogOS_Version, setDialogOS_Version] = useState('');
   const [dialogIP_Address,setDialogIP_Address]=useState('');
   const [dialogAPP$DB,setDialogAPP$DB]=useState('');
   const [dialogEnvironment,setDialogEnvironment]=useState('');
   const [dialogBusiness_Contacts,setDialogBusiness_Contacts]=useState('');
   const [dialogComments,setDialogComments]=useState('');
   const [dialogPropose_Decommission$Migration,setDialogPropose_Decommission$Migration]=useState(''); 
   const [dialogDG_Details, setDialogDG_Details] = useState('');
   const [dialogAlias_Name,setDialogAlias_Name]=useState('');
   const [dialogAlias_IP_Address,setDialogAlias_IP_Address]=useState('');
   const handleDialogClose1 = event => {
    setIsDialogOpen1(false);
  }

  const handleDialogClose2 = event => {
    setIsDialogOpen2(false);
  }
  const handleLocation=event=>{
    setDialogLocation(event.target.value);
  }
   const handleHMC= event => {
    setDialogHMC(event.target.value);
  }
  
  const handleManaged_System_Name= event => {
    setDialogManaged_System_Name(event.target.value);
  }
  
  const handleManaged_System_Serial = event => {
    setDialogManaged_System_Serial(event.target.value);
  }
  const handleName = event => {
    setDialogName(event.target.value);
  }
  const handleOS = event => {
    setDialogOS(event.target.value);
  }
  const handleOS_Version = event => {
    setDialogOS_Version(event.target.value);
  }
  const handleIP_Address= event => {
    setDialogIP_Address(event.target.value);
  }
  const handleAPP$DB= event => {
    setDialogAPP$DB(event.target.value);
  }
   const handleEnvironment= event => {
    setDialogEnvironment(event.target.value);
  }
    const handleBusiness_Contacts= event => {
    setDialogBusiness_Contacts(event.target.value);
  }
   const handleComments= event => {
    setDialogComments(event.target.value);
  }
  const handlePropose_Decommission$Migration= event => {
    setDialogPropose_Decommission$Migration(event.target.value);
  }
   const handleDG_Details= event => {
    setDialogDG_Details(event.target.value);
  }
  
   const handleAlias_Name= event => {
    setDialogAlias_Name(event.target.value);
  }
  
  const handleAlias_IP_Address= event => {
    setDialogAlias_IP_Address(event.target.value);
  }
  const refreshPage=()=>{
    window.Business_Contacts.reload();
  }
    
  const handleUpdateRow = event => {
    if(!dialogOS_Version||!dialogOS||!dialogLocation||!dialogEnvironment||!dialogManaged_System_Name)
    {
      alert("Enter mandatory details");
      return;
    }
    setDetails(
     // {...details,[ event.APP$DB]: dialogAPP$DB ,[event.app_key]:dialogapp_key}
      {...details,[event.target.name]:event.target.value},
     
      );
       Axios.put(' http://localhost:8000/updateAIX', { 
                id:dialogid,
				Location: dialogLocation,
				HMC: dialogHMC,
				Managed_System_Name: dialogManaged_System_Name,
			        Managed_System_Serial: dialogManaged_System_Serial,
				Name: dialogName,
				OS: dialogOS,
				OS_Version: dialogOS_Version,
				IP_Address: dialogIP_Address,
				APP$DB: dialogAPP$DB,
				Environment: dialogEnvironment,
				Business_Contacts: dialogBusiness_Contacts,
				Comments: dialogComments,
				Propose_Decommission$Migration: dialogPropose_Decommission$Migration,
				DG_Details: dialogDG_Details,
				Alias_Name: dialogAlias_Name,
				Alias_IP_Address:dialogAlias_IP_Address
		 
              })
              refreshPage();
              alert("successfully Edited!");
            }
  const handleAddnewRow=event=>{ 
    if(!dialogOS_Version||!dialogOS||!dialogLocation||!dialogEnvironment||!dialogManaged_System_Name)
    {
      alert("Enter mandatory details");
      return;
    }
    Axios.post(' http://localhost:8000/createAIX',{
                
				Location: dialogLocation,
				HMC: dialogHMC,
				Managed_System_Name: dialogManaged_System_Name,
			        Managed_System_Serial: dialogManaged_System_Serial,
				Name: dialogName,
				OS: dialogOS,
				OS_Version: dialogOS_Version,
				IP_Address: dialogIP_Address,
				APP$DB: dialogAPP$DB,
				Environment: dialogEnvironment,
				Business_Contacts: dialogBusiness_Contacts,
				Comments: dialogComments,
				Propose_Decommission$Migration: dialogPropose_Decommission$Migration,
				DG_Details: dialogDG_Details,
				Alias_Name: dialogAlias_Name,
				Alias_IP_Address:dialogAlias_IP_Address
  })
  setDetails(
    //getDetails(); 
    // Here you can add the new row to whatever index you want
    //[{ id: dialogId, APP$DB: dialogAPP$DB ,app_key:dialogapp_key}, ...details]
 {...details,[event.target.name]:event.target.value},

 );
 refreshPage();
 alert("successfully Added!");
  }
  useEffect(() => {
    // Closes dialog after saving
    if (isDialogOpen1) {
      setIsDialogOpen1(false);
    }
    if (isDialogOpen2) {
      setIsDialogOpen2(false);
    }
    // eslint-disable-next-line
  }, [details]);
                            
  const initialset=(rowData)=>{
    setDialogid(rowData.id);
    if (!isDialogOpen1) {
	  setDialogLocation(rowData.Location);
	  setDialogHMC(rowData.HMC);
	  setDialogManaged_System_Name(rowData.Managed_System_Name);
	  setDialogManaged_System_Serial(rowData.Managed_System_Serial);
	  setDialogName(rowData.Name);
	  setDialogOS(rowData.OS);
	  setDialogIP_Address(rowData.IP_Address);
	  setDialogOS_Version(rowData.OS_Version);
	  setDialogAPP$DB(rowData.APP$DB);
	  setDialogBusiness_Contacts(rowData.Business_Contacts);
	  setDialogEnvironment(rowData.Environment); 
	  setDialogComments(rowData.Comments);
      setDialogDG_Details(rowData.DG_Details);
      setDialogPropose_Decommission$Migration(rowData.Propose_Decommission$Migration);
      setDialogAlias_Name(rowData.Alias_Name);
	  setDialogAlias_IP_Address(rowData.Alias_IP_Address);
              }
            }
const initialset1=()=>{
  setDialogid("-");
  if (!isDialogOpen1) {
    setDialogLocation("-");
	  setDialogManaged_System_Name("-");
	  setDialogManaged_System_Serial("-");
	  setDialogName("-");
	  setDialogOS_Version("-");
	  setDialogOS("-");
	  setDialogIP_Address("-");
	  setDialogHMC("-");
	  setDialogBusiness_Contacts("-");
	  setDialogEnvironment("-"); 
	  setDialogAPP$DB("-");
	  setDialogComments("-");
          setDialogDG_Details("-");
          setDialogPropose_Decommission$Migration("-");
          setDialogAlias_Name("-");
	  setDialogAlias_IP_Address("-");

            }
          }
const actions = [
  {
    icon: () => <FaIcons.FaEdit/>,
    tooltip: 'Edit Details',
    //isFreeAction: true,
    onClick: (event, rowData) => {
  
      initialset(rowData);
      
      setIsDialogOpen1(true);
      
    },
  },
  {
    icon: () => <AddIcon />,
    tooltip: 'Add',
    isFreeAction: true,
    onClick: (event, rowData) => {
      initialset1();
      setIsDialogOpen2(true);
    },
  }
];
    return (
        <div> 
            <MaterialTable title="AIX Inventory"
            data = {details}
            columns = {columns}
            actions={actions}
            options = {{ filtering: true,
                  pageSize: 20,
             pageSizeOptions: [20,50,80,110],
               exportButton: true,
              exportAllData: true,
              columnsButton:true,
              maxBodyHeight: '100vh',
              grouping:true,
              headerStyle: {
                backgroundColor: '#01579b',
                 color: '#FFF',
		 height:30,
                width:700
                           },
                           
              actionsColumnIndex: 0, addRowPosition: "first"
             
          }}
          editable={{
          
          /*  onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              const id = selectedRow.id;
              deleteDetail(id);
              setTimeout(() => {
                resolve()
              }, 1000)
            }),*/

  
          }}
         
            />
        <MyDialog title="Edit Details" isOpen={isDialogOpen1} onClose={handleDialogClose1}>
        <Paper style={{ padding: '2em' }}>
		
		<div><TextField value={dialogLocation} onInput={handleLocation} label="Location" required /></div>
		<div><TextField value={dialogHMC} onInput={handleHMC} label="HMC" /></div>
		<div><TextField value={dialogManaged_System_Name} onInput={handleManaged_System_Name} label="Managed_System_Name" required/></div>
		<div><TextField value={dialogManaged_System_Serial} onInput={handleManaged_System_Serial} label="Managed_System_Serial" /></div>
		<div><TextField value={dialogName} onInput={handleName} label="Name" /></div>
		<div><TextField value={dialogOS} onInput={handleOS} label="OS" required/></div>
		<div><TextField value={dialogOS_Version} onInput={handleOS_Version}  label="OS_Version" required /></div>
	     <div><TextField value={dialogIP_Address} onInput={handleIP_Address} label="IP_Address" /></div>
		<div><TextField value={dialogAPP$DB} onInput={handleAPP$DB} label="APP$DB" /></div>
		<div><TextField value={dialogEnvironment} onInput={handleEnvironment} label="Environment" required/></div>
		<div><TextField value={dialogBusiness_Contacts} onInput={handleBusiness_Contacts} label="Business_Contacts" /></div>
		<div><TextField value={dialogComments} onInput={handleComments} label="Comments" /></div>
                <div><TextField value={dialogPropose_Decommission$Migration} onInput={handlePropose_Decommission$Migration} label="Propose_Decommission/Migration" /></div>

	    <div><TextField value={dialogDG_Details} onInput={handleDG_Details}  label="DG_Details" /></div>
        <div><TextField value={dialogAlias_Name} onInput={handleAlias_Name} label="Alias_Name" /></div>
		<div><TextField value={dialogAlias_IP_Address} onInput={handleAlias_IP_Address} label="Alias_IP_Address"/></div>
		<div><pre>           </pre></div>
        <div className="h3color">
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
          <h4>mandatory fields </h4>
          
       
       </div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleUpdateRow}>Save</Button>
            <Button onClick={handleDialogClose1}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>       
      <MyDialog title="Add Details" isOpen={isDialogOpen2} onClose={handleDialogClose2}>
        <Paper style={{ padding: '2em' }}>
         <div><TextField value={dialogLocation} onInput={handleLocation} label="Location" required /></div>
		<div><TextField value={dialogHMC} onInput={handleHMC} label="HMC" /></div>
		<div><TextField value={dialogManaged_System_Name} onInput={handleManaged_System_Name} label="Managed_System_Name" required/></div>
		<div><TextField value={dialogManaged_System_Serial} onInput={handleManaged_System_Serial} label="Managed_System_Serial" /></div>
		<div><TextField value={dialogName} onInput={handleName} label="Name" /></div>
		<div><TextField value={dialogOS} onInput={handleOS} label="OS" required/></div>
		<div><TextField value={dialogOS_Version} onInput={handleOS_Version}  label="OS_Version" required /></div>
	     <div><TextField value={dialogIP_Address} onInput={handleIP_Address} label="IP_Address" /></div>
		<div><TextField value={dialogAPP$DB} onInput={handleAPP$DB} label="APP$DB" /></div>
		<div><TextField value={dialogEnvironment} onInput={handleEnvironment} label="Environment" required/></div>
		<div><TextField value={dialogBusiness_Contacts} onInput={handleBusiness_Contacts} label="Location" /></div>
		<div><TextField value={dialogComments} onInput={handleComments} label="Comments" /></div>
               <div><TextField value={dialogPropose_Decommission$Migration} onInput={handlePropose_Decommission$Migration} label="Propose_Decommission/Migration" /></div>
	    <div><TextField value={dialogDG_Details} onInput={handleDG_Details}  label="DG_Details" /></div>
        <div><TextField value={dialogAlias_Name} onInput={handleAlias_Name} label="Alias_IP_Address" /></div>
		<div><TextField value={dialogAlias_IP_Address} onInput={handleAlias_IP_Address} label="Alias_IP_Address"/></div>
		<div><pre>           </pre></div>
          <div className="h3color">
          
          <h4><AiIcons.AiFillWarning/> please put '-' if </h4>
          <h4>there's nothing to enter in </h4>
               <h4>mandatory fields </h4></div>
          <div style={{ marginTop: '3em' }}>
            <Button onClick={handleAddnewRow}>Save</Button>
            <Button onClick={handleDialogClose2}>Cancel</Button>
          </div>
        </Paper>
      </MyDialog>      
        </div>
    )
}
