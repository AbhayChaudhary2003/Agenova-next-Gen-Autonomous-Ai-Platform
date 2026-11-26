import {getAuth} from "firebase-admin/auth"
import {app} from "../config/firebase.js"
export const login = async (req, res) => {
  try {
    const {token} = req.body
     const decoded = getAuth(app).verifyIdToken(token)
     const user = await User.findOne({firebaseId: decoded.uid})
     if (!user) {
       user = await User.create({
          firebaseId: decoded.uid,
          name: decoded.name,
          email: decoded.email,
          avatar: decoded.picture
       })
     }
     const sessionId = crypto.randomUUID()
     res.cookie("session", sessionId, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "strict",
       maxAge: 24 * 60 * 60 * 1000
     })
     return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Error occurred while logging in" })
  }
}
    