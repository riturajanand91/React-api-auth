const mongoose = require('mongoose');
//configurations from config/dev.env
require('dotenv').config({ path: 'config/dev.env' })
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})