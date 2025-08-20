const express = require('express'); 
const connectDB = require('./services/db/mongo');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const routes= require('./Routes/main')
const app = express(); 
app.use(express.json()); 
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT"],
    credentials: true
}));

dotenv.config();
(async () => {
    await connectDB();
    app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });
  })();
app.get('/', (req, res)=>{
    res.send("Welcome from backend")
})

app.use('/', routes);
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});

