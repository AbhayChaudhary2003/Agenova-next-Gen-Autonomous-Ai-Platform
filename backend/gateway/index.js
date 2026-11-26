import express from "express"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 3000

const app = express()
app.use("/auth", proxy(process.env.AUTH_SERVICE_URL))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})