import logo from './logo.svg';
import './App.css';
import { Menu } from 'antd';
import { Route, Routes, useNavigate,} from 'react-router-dom';
import {DashboardOutlined,RiseOutlined, HomeOutlined, ShopOutlined,RestOutlined,CarOutlined,UsergroupAddOutlined,BookOutlined,LogoutOutlined} from '@ant-design/icons'
import Login from './pages/Login';
import { useState } from 'react';
import { authentication } from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';


const items = [
  { label: "Home", icon:<HomeOutlined/>, key:'/'},
  { label: "Dashboard", icon:<DashboardOutlined/>, key:'/Dashboard' },
  { label: "Restaurents", icon:<RestOutlined />, key:'/Restaurents'  },
  { label: "Stores", icon:<ShopOutlined />, key:'/Stores' },
  { label: "Drivers", icon:<CarOutlined /> , key:'/Drivers'},
  { label: "Users", icon: <UsergroupAddOutlined />, key:'/Users' },
  { label: "Orders", icon: <BookOutlined /> , key:'/Orders'},
  { label: "Courses", icon:<RiseOutlined /> , key:'/Courses'},
  { label: "SignOut", icon: <LogoutOutlined />, key:'/SignOut' },
];


function  Content() {
  return <div>
    <Routes>
      <Route path='/' element={<div>Home</div>}></Route>
      <Route path='/Dashboard' element={<div>Dashboard</div>} ></Route>
      <Route path='/Restaurents' element={<div>Restaurents</div>} ></Route>
      <Route path='/Stores' element={<div>Stores</div>} ></Route>
      <Route path='/Drivers' element= {<div>Drivers</div>}  ></Route>
      <Route path='/Users' element ={<div>Users</div>} ></Route>
      <Route path='/Courses' element ={<div>Courses</div>} ></Route>
      <Route path='/Orders' element= {<div>Orders</div>} ></Route>
    </Routes>
  </div>
}

function Main() {
  const navigate  = useNavigate()
 return  <div style={{ display: 'flex', flexDirection: 'row', flex:1}}>
        <Menu
          defaultSelectedKeys={[window.location.pathname]}
          items={items}
          onClick={({key})=>{
            if (key==="SignOut") {              
            } else {
              navigate(key)   
            }
            } } 
          >
            
         </Menu>
        <Content />
      </div>
}

function Headers() {
  return <div style={{height:60, backgroundColor:'lightblue', color:'white', fontSize:30, fontWeight:'bold' }}>  
    Adaddo-Eats    
  </div>
}


function Footer() {
  return <div style={{height:60, backgroundColor:'darkblue', color:'white', fontSize:30, fontWeight:'bold' }}>  
    Adaddo-Eats    
  </div>
}

function App() {

  const [loged, setLoged]= useState(false);
  const auth= authentication;
  onAuthStateChanged(auth,(user) => {
      if(user){
        setLoged(true);
      }else{
        setLoged(false)
      }
  });
  return !loged ?(
    <Login/>
  ):
  (
  <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
    <Headers/>  
    <Main/>
    <Footer/>
  </div>
    
  );
}

export default App;
