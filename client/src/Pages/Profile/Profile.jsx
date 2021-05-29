import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import Feed from "../../Components/Feed/Feed";
import UserTopics from "../../Components/UserTopics/UserTopics";
import SidebarLeft from "../../Components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../Components/SidebarRight/SidebarRight";
import { useEffect } from "react";
import { getOneUser } from "../../Redux/actions/user";
import { useState } from "react";

const Profile = () => {
    const currentUser = useSelector((state) => state.userReducer.user);
    const otherUser = useSelector((state) => state.userReducer.otherUser);
    const [user, setUser] = useState({});
    const id = useParams().id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneUser(id));
        // if (id !== currentUser._id) return setUser(otherUser);
        // else;
    }, [id]);
    useEffect(() => {
        if (id !== currentUser._id) return setUser(otherUser);
        else;
        setUser(currentUser);
    }, [otherUser]);
    return (
        <div className="profile">
            <SidebarLeft className="home-left" />
            <div className="profile-right">
                <div className="profile-right-top">
                    <div className="profile-pic-container">
                        <img
                            className="profile-pic"
                            src={user.profilePicture}
                            alt=""
                        />
                        <div className="profile-about">
                            <div className="username">
                                {user && user.first_name}{" "}
                                {user && user.last_name}
                            </div>
                            <div className="user-degree">PhD in Physics</div>
                            <div className="about">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aliquam corporis perferendis
                                consequuntur magni fugiat? Ducimus deserunt, a
                                animi aliquid, recusandae earum qui culpa,
                                voluptatem veniam eius est alias odio
                                exercitationem.
                            </div>
                        </div>
                        <div className="follow-btn">Follow</div>
                    </div>
                </div>
                <div className="profile-right-bottom">
                    <UserTopics className="userTopics" user={user} />
                    {/* <Feed className="home-feed" /> */}

                    <SidebarRight className="home-right" profile />
                </div>
            </div>
        </div>
    );
};

export default Profile;
