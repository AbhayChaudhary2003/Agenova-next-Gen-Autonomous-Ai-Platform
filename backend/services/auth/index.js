import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import router from "./routes/auth.route.js"
dotenv.config()

await connectDB()

const port = process.env.PORT 

const app = express()
app.use(express.json())
app.use("/",router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
