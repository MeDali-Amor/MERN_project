import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./UserTopics.css";
import {
    currentUserTopics,
    getAllTopics,
    getUserTopics,
    timelineTopics,
} from "../../Redux/actions/topic";
import { getOneUser, getAllUsers } from "../../Redux/actions/user";
import { CircularProgress } from "@material-ui/core";

const UserTopics = ({ user }) => {
    const userTopics = useSelector((state) => state.topicReducer.topics);
    const users = useSelector((state) => state.userReducer.users);
    // const user = useSelector((state) => state.userReducer.otherUser);
    const isloading = useSelector((state) => state.topicReducer.load);
    const [topics, setTopics] = useState([]);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     // dispatch(currentUserTopics());
    //     // dispatch(getAllUsers());
    //     let user_id = user._id;
    //     dispatch(getUserTopics(user_id));
    // }, [user._id]);
    // useEffect(() => {
    //     setTopics(userTopics);
    // }, [userTopics]);
    // useEffect(() => {
    //     dispatch(getAllTopics());
    // });
    useEffect(() => {
        // dispatch(getAllTopics());
        const all = userTopics.filter((t) => t.postedBy == user._id);
        setTopics(all);
    }, []);
    return (
        <div className="feed">
            <div className="feed-wrapper">
                <Share />
                {isloading && <CircularProgress />}
                {topics.map((topic) => (
                    <Post key={topic._id} topic={topic} users={users} />
                ))}
            </div>
        </div>
    );
};

export default UserTopics;
