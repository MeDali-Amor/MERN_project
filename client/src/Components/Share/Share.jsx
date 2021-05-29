import React, { useState } from "react";
import "./Share.css";
import axios from "axios";
import { PhotoLibrary, PictureAsPdf } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { userReducer } from "../../Redux/reducer/user";
import { createTopic } from "../../Redux/actions/topic";

const Share = () => {
    const [textInput, setTextInput] = useState("");
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const user = useSelector((state) => state.userReducer.user);
    const handleChange = (e) => {
        setTextInput(e.target.value);
    };
    const handleSubmit = (e) => {
        if (textInput !== "" && textInput !== null) {
            const topic = {
                postedBy: user._id,
                textContent: textInput,
            };
            // if (file) {
            //     let data = new FormData();
            //     const filename = Date.now() + file.name;
            //     data.append("file", file);
            //     data.append("name", filename);
            //     topic.img = filename;
            //     try {
            //         axios.post("http://localhost:5000/api/upload", data);
            //     } catch (error) {
            //         console.log(error);
            //     }
            // }
            dispatch(createTopic(topic));
            setTextInput("");
        } else e.preventDefault();
    };
    return (
        <div className="share">
            <form className="share-wrapper" onSubmit={handleSubmit}>
                <div className="share-top">
                    <img
                        src={user.profilePicture}
                        alt=""
                        className="user-pic"
                    />
                    <input
                        placeholder="Share your thoughts with like minded people"
                        className="share-input"
                        value={textInput}
                        onChange={handleChange}
                    />
                </div>
                {/* <hr className="share-hr" /> */}
                <div className="share-bottom">
                    <label htmlFor="file">
                        <PhotoLibrary className="share-icon" />
                        <p>Photo</p>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    <div>
                        <PictureAsPdf className="share-icon" />
                        <p>File</p>
                    </div>
                    <button
                        className="share-btn"
                        type="submit"
                        onSubmit={handleSubmit}
                    >
                        Share
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Share;
