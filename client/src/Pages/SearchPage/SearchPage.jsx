import { CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "../../Components/Post/Post";
import UserCard from "../../Components/UserCard/UserCard";

const SearchPage = () => {
    const isLoading = useSelector((state) => state.userReducer.load);
    const users = useSelector((state) => state.userReducer.users);
    const usersResult = useSelector((state) => state.userReducer.results);
    const topicsResult = useSelector((state) => state.topicReducer.results);
    const [clickedUser, setClickedUser] = useState(false);
    const [clickedTopic, setClickedTopic] = useState(false);
    // const [result, setResult] = useState([]);
    // useEffect(() => {
    //     setResult(users);
    // }, [][users]);
    const userClick = () => {
        setClickedUser(true);
        setClickedTopic(false);
    };
    const topicClick = () => {
        setClickedUser(false);
        setClickedTopic(true);
    };
    return (
        <div>
            <span>
                <button onClick={userClick}>Users</button>{" "}
                <button onClick={topicClick}>topics</button>
            </span>
            <h1>result page</h1>
            {isLoading && <CircularProgress />}

            {clickedTopic ? (
                topicsResult.length === 0 ? (
                    <h4>no topic was found</h4>
                ) : (
                    topicsResult.map((topic) => (
                        <Post key={topic._id} topic={topic} users={users} />
                        // <h1>{topic.textContent}</h1>
                    ))
                )
            ) : usersResult.length === 0 ? (
                <h4>no user was found</h4>
            ) : (
                usersResult.map((user) => (
                    <UserCard user={user} key={user._id} />
                ))
            )}
        </div>
    );
};

export default SearchPage;
