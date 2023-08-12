
// global.foodData = require('./db')(function call(err, data, CatData) {
//   // console.log(data)
//   if(err) console.log(err);
//   global.foodData = data;
//   global.foodCategory = CatData;
// })

// const express = require('express')
// const app = express()
// const port = 5000
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use('/api/auth', require('./Routes/Auth'));

// app.listen(port, () => {
//   console.log(`Example app listening on http://localhost:${port}`)
// })


const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 5000

const mongoURL = 'mongodb+srv://proteiners:tejasvi@cluster0.ts1lmyi.mongodb.net/proteiners?retryWrites=true&w=majority' 
// Move the data fetching logic to a function
async function fetchDataFromDB() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    });
    
    console.log('connected')
    const fetched_data = await mongoose.connection.db.collection("food_items");
    console.log('connectedd')
    const data = await fetched_data.find({}).toArray();
    console.log("CONNECTED")


    if(data.length === 0){
      console.log("NO DATA")
    }
    else{
      console.log("DATA",data);
    }

    global.foodData = data;
    const foodCategory = await mongoose.connection.db.collection("food_category"); 
    // console.log(global.food_items);
    const DATA = await foodCategory.find({}).toArray()
    global.foodCategory = DATA;
  } 
   catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Call the function to fetch data once the server starts
fetchDataFromDB();


app.use((req , res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()
})

app.use(express.json())
app.use('/api/auth', require('./Routes/Auth'));
// app.use('/api',require("./routes/getfooditems"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})