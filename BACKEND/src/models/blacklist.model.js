import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
    {
        token:{
            type: String,
            required: [true,"Token is required"],
        }
    },{
        timestamps: true
    }
)

const Blacklist = mongoose.model("BlacklistTokens", blacklistSchema)

export default Blacklist;