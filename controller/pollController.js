const pollModel = require('../models/pollModel')


module.exports.allPolls = async function(req,res){
    try{
        const polls = await pollModel.find({});
        res.status(200).json({
            message: "Success",
            polls: polls
        });
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.createPoll = async function(req,res){
    try{
        let {question, options} = req.body;
        if(!question || !options){
            throw new Error("Missing question or options");
        }
        let votes = new Array(options.length);
        votes.fill(0);
        const poll = await pollModel.create({question,options,votes});
        res.status(200).json({
            message: "Success",
            poll: poll
        });
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.addVote = async function(req,res){
    try{
        let {id, option} = req.body;
        console.log(id, option);
        if(!id || option==undefined){
            throw new Error("Missing fields");
        }
        const poll = await pollModel.findById(id);
        if(!poll){
            throw new Error("Poll not found");
        }
        const index = option;
        poll.votes[index]++;
        poll.totalVotes++;
        poll.save();

        let arr = [];
        poll.options.map((option,index) => {
            arr.push({
                [option]: ((poll.votes[index]/poll.totalVotes)*100) + "%"
            })
        })

        res.status(200).json({
            message: "Success",
            votes: arr
        });
    }catch(err){
        res.status(500).json({message: err.message})
    }
}