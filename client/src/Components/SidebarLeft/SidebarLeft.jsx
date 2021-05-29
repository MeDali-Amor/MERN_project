import React from "react";
import "./SidebarLeft.css";
import { Ballot, Description, QuestionAnswer } from "@material-ui/icons";
const SidebarLeft = () => {
    return (
        <div className="side-left">
            <div className="left-wrapper">
                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <Ballot />
                        <div className="link">Feed</div>
                    </li>
                    <li className="sidebar-item">
                        <Description />
                        <div className="link">Publications</div>
                    </li>
                    <li className="sidebar-item">
                        <QuestionAnswer />
                        <div className="link">Questions</div>
                    </li>
                    <li className="sidebar-item"></li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarLeft;
