import React from "react";
import "./Home.css";
import Feed from "../../Components/Feed/Feed";
import SidebarLeft from "../../Components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../Components/SidebarRight/SidebarRight";

const Home = () => {
    return (
        <div className="home-container">
            <SidebarLeft className="home-left" />
            <Feed className="home-feed" />
            <SidebarRight className="home-right" />
        </div>
    );
};

export default Home;
