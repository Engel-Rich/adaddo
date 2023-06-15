// import logo from './logo.svg';
import "./App.css";
import { Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  RiseOutlined,
  ShopOutlined,
  RestOutlined,
  CarOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Login, SignOut } from "./pages/Login";
import { useEffect, useState } from "react";
import { authentication } from "./firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./Components/loading";
import RestaurentPage from "./pages/Restaurents";
import StorePage from "./pages/Store";

const items = [
  { label: "Home", icon:<HomeOutlined/>, key:'/'},
  { label: "Dashboard", icon: <DashboardOutlined />, key: "/Dashboard" },
  { label: "Restaurents", icon: <RestOutlined />, key: "/Restaurents" },
  { label: "Stores", icon: <ShopOutlined />, key: "/Stores" },
  { label: "Drivers", icon: <CarOutlined />, key: "/Drivers" },
  { label: "Users", icon: <UsergroupAddOutlined />, key: "/Users" },
  { label: "Orders", icon: <BookOutlined />, key: "/Orders" },
  { label: "Courses", icon: <RiseOutlined />, key: "/Courses" },
  { label: "SignOut", icon: <LogoutOutlined />, key: "/SignOut" },
];

function Content() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<div>Home</div>}></Route>
        <Route path="/Dashboard" element={<div>Dashboard</div>}></Route>
        <Route path="/Restaurents" element={<RestaurentPage />}></Route>
        <Route path="/Stores" element={<StorePage/>}></Route>
        <Route path="/Drivers" element={<div>Drivers</div>}></Route>
        <Route path="/Users" element={<div>Users</div>}></Route>
        <Route path="/Courses" element={<div>Courses</div>}></Route>
        <Route path="/Orders" element={<div>Orders</div>}></Route>
        <Route path="/SignOut" element={<SignOut />}></Route>
      </Routes>
    </div>
  );
}

function Main() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
      <Menu
        defaultSelectedKeys={[window.location.pathname]}
        items={items}
        onClick={({ key }) => {
          if (key === "SignOut") {
          } else {
            navigate(key);
          }
        }}
      ></Menu>
      <Content />
    </div>
  );
}

function Headers() {
  const [userinfos, setUserinfo] = useState({
    loading: true,
    user: { name: "", email: "", profile: "" },
  });

  useEffect(() => {
    setUserinfo({
      loading: false,
      user: {
        name: authentication.currentUser.displayName,
        email : authentication.currentUser.email,
        profile:authentication.currentUser.photoURL,
      },
    });
    return () => {};
  }, []);

  return (
    <div
      style={{
        height: 60,
        backgroundColor: "lightblue",
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
      }}
    >
    <span style={{float:'left'}} >Adaddo-Eats </span>
      <span style={{float:'right', fontSize:'22px' }} >
        {userinfos.user.email} | {userinfos.user.name}
      </span>
    </div>
  );
}

function Footer() {
  return (
    <div
      style={{
        height: 60,
        backgroundColor: "darkblue",
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
      }}
    >
      Adaddo-Eats
    </div>
  );
}

function App() {
  const [loged, setLoged] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = authentication;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoged(true);
      setLoading(false);
    } else {
      setLoged(false);
      setLoading(false);
    }
  });
  return loading ? (
    <div className="container p-5 m-5 d-flex justify-content-center min-vh-100 align-items-center">
      <Loader />
    </div>
  ) : !loged ? (
    <Login />
  ) : (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Headers />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
