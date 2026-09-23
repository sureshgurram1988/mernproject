import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotEnv from "dotenv"
import dns from "node:dns/promises";
import employeeRoutes from "./routes/employeeRoutes.js"
const app = express()
app.use(express.json())
dotEnv.config()
app.use(cors({origin:"*"}))
dns.setServers(["1.1.1.1"]);
const PORT = process.env.PORT || 4000
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err))
app.get("/", (req, res) => {
    res.send('welcome to project')
})
app.use("/users", employeeRoutes)
app.listen(PORT, () => console.log(`Server running with ${PORT}`))
