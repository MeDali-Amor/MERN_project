import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
    return (
        <div>
            <img src={user.profilePicture} alt="" />
            <div>
                {/* <Link to={`/profile/${user._id}`}> */}
                <span>{user.first_name}</span> <span>{user.last_name}</span>
                {/* </Link> */}
            </div>
        </div>
    );
};

export default UserCard;
