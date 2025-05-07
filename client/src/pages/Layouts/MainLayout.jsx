import React from "react";
import "./mainLayout.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import SideBar from "../../components/sideBar/SideBar.jsx";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <div className="app">
        <SideBar />
        <div className="content">
          <SearchBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
