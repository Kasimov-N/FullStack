const express = require('express');
const app = express();
const data = require('./Data/data')
const cors = require('cors');

//Configuration
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/', require('./Routes/index'))
app.use('/teachers', require('./Routes/Teacher'))

//localhost
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})