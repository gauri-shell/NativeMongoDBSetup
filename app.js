const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./models/db"); 
const productRoutes = require("./routes/productroutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
 app.use("/", productRoutes);
 

 // method 1
 async function startServer(){
  try{
    const client=await connectDB();
    console.log("connected to database");

    app.listen(8888,()=>{
      console.log("server started on port 1111")
    });

    // graceFul shutDown
    process.on("SIGINT",async()=>{
      await client.close();
      console.log('mongoDB connection closed')
      process.exit(0);
    });
  }catch(err){
    console.error("failed to start server",err);
  }
 }



 // method 2
// async function startServer() {
//   try {
//     await connectDB();
//     app.listen(8000, () => {
//       console.log("Server started on port 8000");
//     });
//   } catch (error) { 
//     console.error("Failed to start server:", error);
//   }
// }
// startServer();
