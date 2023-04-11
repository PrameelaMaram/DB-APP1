
import { BrowserRouter as Router, Switch,Route, } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';

import {Inventory,MYSQL,MSsql, MongoDB,Oracle,Postgresql,Application,Hosts,Redis,Report,Oracle_OCI,physical_vm,DB2,Informix,AIX_INV} from './pages/Inventory';

const refreshPage = ()=>{
  window.location.reload();
}
function App() {
  return (
    <div className="App">
    
     <Router>
      <Navbar/>  
      <Switch>
        <Route path='/home'  component={Home} exact />
        <Route exact path='/application'  component={Application}/>
         <Route exact path='/HostTable'  component={Hosts}/>
        <Route exact path='/inventory'  component={Inventory}/>
        <Route exact path='/inventory/MYSQL'  component={MYSQL} />
        <Route exact path='/inventory/MSsql'  component={MSsql} onClick={refreshPage}/>
        <Route exact path='/inventory/Oracle'  component={Oracle}/>
          <Route exact path='/inventory/Oracle/OCI'  component={Oracle_OCI}/>
          <Route exact path='/inventory/Oracle/AIX' component={AIX_INV}/>
        <Route exact path='/inventory/Oracle/physical_vm'  component={physical_vm}/>
        <Route exact path='/inventory/MongoDB'  component={MongoDB}/>
        <Route exact path='/inventory/Postgresql'  component={Postgresql}/>
         <Route exact path='/inventory/Redis'  component={Redis}/>
         <Route exact path='/inventory/db2'  component={DB2}/>
	<Route exact path='/generateReports'  component={Report}/>
          <Route exact path='/inventory/informix'  component={Informix}/>
        
      </Switch>
     </Router>

 
     
    </div>
  );
}

export default App;
