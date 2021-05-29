const mongoose = require("mongoose");

const { Schema } = mongoose;
const topicSchema = new Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        textContent: {
            type: String,
        },
        img: {
            type: String,
        },
        recommends: [],
        comments: [
            {
                commentBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                content: { type: String, required: true },
                recommends: [
                    {
                        recommendedBy: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User",
                        },
                    },
                ],
            },
            { timestamps: true },
        ],
    },
    { timestamps: true }
);

module.exports = Topic = mongoose.model("Topic", topicSchema);
