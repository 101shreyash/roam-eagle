import express from "express"
import "dotenv/config"
import cors from "cors"

import AuthRoute from "./routes/authRoute.js"
import InfoRoute from "./routes/infoRoute.js"
import SettingRoutes from "./routes/settingRoute.js"

import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.SERVER_PORT

app.use(cors({

  origin : "http://localhost:5173",
  credentials : true,

}))

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(cookieParser())

app.use("/auth" , AuthRoute)
app.use("/api" , InfoRoute)
app.use("/api/settings" , SettingRoutes)



app.listen(PORT , () => {

console.log(`Server is listening at port ${PORT}`);

})
