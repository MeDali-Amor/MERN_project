import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard/UserCard";
const UsersList = () => {
    const users = useSelector((state) => state.userReducer.users);
    return (
        <div>
            <div className="contact-list">
                {users.map((user) => (
                    <UserCard user={user} key={user._id} />
                ))}
            </div>
        </div>
    );
};

export default UsersList;
