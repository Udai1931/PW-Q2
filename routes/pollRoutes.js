const express = require('express')
const { allPolls, createPoll, addVote } = require('../controller/pollController')
const router = express.Router()

router.route("/")
.get(allPolls)
.post(createPoll)
.patch(addVote)

module.exports = router