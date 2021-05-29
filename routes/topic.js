const express = require("express");
const router = express.Router();
const {
    gettest,
    allTopics,
    mostRecommendedTopics,
    mostRecentTopics,
    getOneTopic,
    userTopics,
    currentUserTopics,
    timelineTopics,
    createTopic,
    searchTopic,
    recommendTopic,
    commentTopic,
    deleteTopic,
} = require("../controllers/topic.controllers");
const isAuth = require("../middlewear/isAuth");
const {
    searchValidator,
    validation,
} = require("../middlewear/searchValidator");
const { commentValidator } = require("../middlewear/topicValidator");

//
router.get("/", allTopics);
router.get("/recommended", mostRecommendedTopics);
router.get("/recent", mostRecentTopics);
router.get("/one_topic/:topic_id", getOneTopic);
router.get("/user_topics/:user_id", userTopics);
router.get("/current", isAuth, currentUserTopics);
router.get("/timeline_topics", isAuth, timelineTopics);
router.post("/create_topic", isAuth, createTopic);
router.put("/search_topic", searchValidator(), validation, searchTopic);
router.put("/recommend/:topic_id", isAuth, recommendTopic);
router.put(
    "/comment/:topic_id",
    isAuth,
    commentValidator(),
    validation,
    commentTopic
);
router.delete("/delete/:topic_id", isAuth, deleteTopic);
module.exports = router;
