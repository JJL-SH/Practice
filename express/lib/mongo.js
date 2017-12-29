const config = require('config-lite')(__dirname)
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.mongodb, {useMongoClient: true})
