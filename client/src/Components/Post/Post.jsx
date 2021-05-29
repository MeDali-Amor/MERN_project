import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Post.css";
import { MoreVert, ThumbUpAlt } from "@material-ui/icons";
import { getOneUser, getAllUsers } from "../../Redux/actions/user";
import { CircularProgress } from "@material-ui/core";
import {
    recommendTopic,
    deleteTopic,
    commentTopic,
} from "../../Redux/actions/topic";
const Post = ({ topic, users, key }) => {
    const [user, setUser] = useState({});
    const [commentInput, setCommentInput] = useState("");
    const currentUser = useSelector((state) => state.userReducer.user);
    const isloading = useSelector((state) => state.topicReducer.load);
    const dispatch = useDispatch();
    useEffect(() => {
        const all = users.filter((u) => u._id == topic.postedBy);

        setUser(all[0]);
    }, [topic.postedBy]);
    const addRecommend = () => {
        let topic_id = topic._id;
        let user_id = currentUser._id;
        dispatch(recommendTopic(topic_id, user_id));
    };
    const addComment = (e) => {
        if (commentInput !== "") {
            e.preventDefault();
            let topic_id = topic._id;
            dispatch(commentTopic({ commentInput }, topic_id));
            setCommentInput("");
        } else e.preventDefault();
    };
    // useEffect(() => {
    //     let topic_id = topic._id;
    //     dispatch(getOneTopic(topic_id));
    // }, [topic.recommends]);
    return (
        <div>
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left">
                        <Link
                            exact
                            className="post-top-left-link"
                            to={`/profile/${topic.postedBy}`}
                        >
                            <img
                                className="post-userpic"
                                src={user.profilePicture}
                                alt=""
                            />
                            <span className="post-username">
                                {user.first_name}
                            </span>
                        </Link>
                        {/* <span className="post-date">
                            {moment().format(topic.createdAt)}
                        </span> */}
                    </div>

                    <div className="post-top-right">
                        <MoreVert />
                    </div>
                </div>
                <div className="post-center">
                    {user.first_name}
                    <div className="post-text">{topic.textContent}</div>
                    <img src={topic.img} alt="" className="post-pic" />
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-left">
                        <ThumbUpAlt
                            className="post-like"
                            onClick={addRecommend}
                        />
                        <span className="like-counter">
                            {topic.recommends.length === 0 ? (
                                <p> be the first to recommend this post</p>
                            ) : topic.recommends.length === 1 ? (
                                <p>one person recommend this post</p>
                            ) : (
                                <p>
                                    {topic.recommends.length} people recommended
                                    this post
                                </p>
                            )}{" "}
                        </span>
                    </div>
                    <div className="post-bottom-right">
                        <span className="comment-counter">9 comments</span>
                    </div>
                    <form onSubmit={addComment}>
                        <input
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Post;
