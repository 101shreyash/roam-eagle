import express from "express"
import "dotenv/config"
import { Request , Response } from "express";
import AuthRoute from "./routes/authRoute.js"


const app = express();
const PORT = process.env.SERVER_PORT

app.use("/auth" , AuthRoute)


app.listen(PORT , () => {

console.log(`Server is listening at port ${PORT}`);

})
