import { Router } from 'express'
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { auth } from '../lib/auth.middleware.js'
import config from '../config.js'
import { isAdmin } from '../lib/admin.middleware.js'
import { v2 as cloudinary } from 'cloudinary'

const userRouter = Router()

// GET ALL USERS
// Route: /user
userRouter.get("/", auth, async (req, res, next) => {
  // we can access logged in users now anywhere
  // console.log("Authenticated user:", req.user._id)
  const usersAll = await User.find()
  res.json(usersAll)
})

userRouter.get("/admin", auth, isAdmin, async (req, res, next) => {
  const admins = await User.find({ role: "admin" }) // filter all admins
  res.json(admins)
})


// GET SINGLE USER
// Route /user/:id
userRouter.get("/:id", auth, async (req, res, next) => {

  // we can access logged in users now anywhere
  // console.log("Authenticated user:", req.user._id)
  const userSingle = await User.findById(req.params.id)
  res.json(userSingle)
})


// SIGNUP user
// Route POST /user
userRouter.post("/", async (req, res, next) => {

  const userData = req.body
  const { email} = userData

  const userExists = await User.findOne({ email })

  // we receive image as string from frontend
  const avatarImageStr = userData.avatar

  // if user already exists with that email => REJECT
  if(userExists) {
    return res.status(400).json({
      error: "We already got that user. But thank you!"
    })
  }

  // hash password BEFORE storing user in DB
  userData.password = bcrypt.hashSync(userData.password, 10)

  // store new user in dataase
  const user = await User.create(userData)
  res.json(user) // send response to frontend

  if(!avatarImageStr) return

  // upload image to cloudinary
  const resCloudinary = await cloudinary.uploader.upload(avatarImageStr)
  console.log(resCloudinary)

  // store received URL of image in database => user => avatar

  const avatarUrlCloudinary = resCloudinary.secure_url 
  const userUpdated = await User.findByIdAndUpdate(
    user._id, 
    { avatar: avatarUrlCloudinary }, 
    { new: true })
  console.log( userUpdated)
})

// LOGIN user
// Route: POST /user/login
userRouter.post("/login", async (req, res, next) => {
  // hello123 (Plain Password)
  // ah377370917310 (Hashed Password)

  // user has sent us plain password through a login form
  const passwordPlain = req.body.password

  // find user by email first
  const user = await User.findOne({ email: req.body.email })

  // user does not exist!
  if (!user) {
    return res.status(400).json({ error: "User does not exist" })
  }

  // compare now password plain given by user with HASH stored in database
  const matches = bcrypt.compareSync(passwordPlain, user.password)

  // if hashes dont match => reject!
  if (!matches) {
    return res.status(400).json({ error: "Password incorrect" })
  }

  // create JWT Token and send it together with the user
  // const tokenData = { _id: user._id, email: user.email }
  const userPublic = user.toJSON()
  const token = jwt.sign(
    userPublic,
    config.JWT_SECRET, // secret SIGNES token => kind of a watermark
    { expiresIn: config.JWT_EXPIRY } // expires in 4 hours
  )

  // combine user object with token
  res.json({ ...userPublic, token })
})


// Update user
// ROute: /user/:id
userRouter.patch("/:id", auth, async (req, res, next) => {

  const userUpdateData = req.body
  const userId = req.params.id

  // update user in database
  try {
    const userUpdated = await User.findByIdAndUpdate(userId, userUpdateData, { new: true})
    res.json(userUpdated)
  }
  catch(err) {
    next(err)
  }

})

userRouter.delete("/:id", auth, async (req, res, next) => {

  // findByIdandUpdate can crash our server
  // so catch it and prevent crash => just forward to error handler
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id)
    res.json(userDeleted)
  }
  catch(err) {
    next(next) 
  }

})



export default userRouter