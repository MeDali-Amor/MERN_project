const Topic = require("../models/Topic");
const User = require("../models/User");
const router = require("../routes/topic");

// // test
// exports.gettest = (req, res) => {
//     res.send("testing");
// };
// Get all topics
exports.allTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.status(200).send(topics);
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can't fetch topics" }] });
    }
};
// most recommended topics
exports.mostRecommendedTopics = async (req, res) => {
    try {
        const topics = await Topic.find().sort({ recommends: -1 });
        res.status(200).send(topics);
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can't fetch topics" }] });
    }
};
// most recent
exports.mostRecentTopics = async (req, res) => {
    try {
        const topics = await Topic.find().sort({ createdAt: -1 });
        res.status(200).send(topics);
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can't fetch topics" }] });
    }
};
// get One topic
exports.getOneTopic = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.topic_id);
        res.status(200).send(topic);
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can't fetch topic1111" }] });
    }
};
//get user  profile topics
exports.userTopics = async (req, res) => {
    try {
        const topics = await Topic.find({ postedBy: req.params.user_id }).sort({
            createdAt: -1,
        });
        res.status(200).send(topics);
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can't fetch topic0000" }] });
    }
};
//get current user profile topics
exports.currentUserTopics = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).send({ msg: "user not found" });

        const topics = await Topic.find({ postedBy: user._id }).sort({
            createdAt: -1,
        });
        res.status(200).send(topics);
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can't fetch topics" }] });
    }
};
// get timeline topics
exports.timelineTopics = async (req, res) => {
    // let postArray = [];
    try {
        const currentUser = await User.findById(req.user.id).select(
            "-password"
        );
        if (!currentUser)
            return res.status(404).send({ msg: "user not found" });
        const userTopics = await Topic.find({ postedBy: currentUser._id });
        const friendsTopics = await Promise.all(
            currentUser.following.map((friendId) => {
                return Topic.find({ postedBy: friendId });
            })
        );
        res.status(200).send(
            userTopics.concat(...friendsTopics).sort((a, b) => {
                return b.createdAt - a.createdAt;
            })
        );
    } catch (error) {
        res.status(500).send(error);
    }
};
//create a topic
exports.createTopic = async (req, res) => {
    try {
        // const { textContent, img } = { ...req.body };
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).send({ msg: "user not found" });
        const newTopic = await new Topic({
            ...req.body,
            postedBy: req.user.id,
        });
        // newTopic.postedBy = req.user.id;
        await newTopic.save();
        res.status(200).send({ msg: "Topic is created", newTopic });
    } catch (error) {
        res.status(500).send(error);
    }
};
// saerch Topics
exports.searchTopic = async (req, res) => {
    try {
        const { searchInput } = req.body;
        const topics = await Topic.find({
            textContent: { $exists: true, $ne: "" },
        });
        const searchedTopics = topics.filter(
            (topic) =>
                topic.textContent
                    .toString()
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(
                        searchInput.toString().toLowerCase().split(" ").join("")
                    )
            //||
            // topic.last_name
            //     .toString()
            //     .toLowerCase()
            //     .split(" ")
            //     .join("")
            //     .includes(
            //         searchInput.toString().toLowerCase().split(" ").join("")
            // )
        );
        if (searchedTopics.length === 0) {
            return res.status(404).send({ msg: "no result is found" });
        }
        return res.status(200).send(searchedTopics);
    } catch (error) {
        res.status(500).send(error);
    }
};
// recommend a topic
exports.recommendTopic = async (req, res) => {
    try {
        // let topic_id = req.params;
        const topic = await Topic.findById(req.params.topic_id);
        const currentUser = await User.findById(req.user.id);
        if (!topic.recommends.includes(req.user.id)) {
            await topic.updateOne({ $push: { recommends: req.user.id } });

            res.status(200).send("you recommended this topic");
        } else {
            await topic.updateOne({ $pull: { recommends: req.user.id } });
            res.status(200).send("you don't recommend  this topic");
        }
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "error: you can't recommend this topic" }],
        });
        console.log(error);
    }
};
// comment a post
exports.commentTopic = async (req, res) => {
    try {
        const { commentInput } = req.body;
        const topic = await Topic.findById(req.params.topic_id);
        if (!topic) return res.status(404).send("topic not found");
        const currentUser = await User.findById(req.user.id).select(
            "-password"
        );
        if (!currentUser) return res.status(404).send("user not found");
        const newComment = {
            content: commentInput,
            commentBy: req.user.id,
        };
        topic.comments.unshift(newComment);
        await topic.save();
        res.status(200).send("comment added");
    } catch (error) {
        res.status(500).send(error);
    }
};
// delete a topic
exports.deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.topic_id);
        if (topic.postedBy == req.user.id) {
            await topic.deleteOne();
            res.status(200).send({ msg: "topic deleted" });
        } else {
            return res.status(403).send("you can only delete your topics");
        }
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "topic is not deleted" }] });
    }
};
