import dotenv from "dotenv"
const env = dotenv.config()

// ALTERNATIVE: 
// Load ENV variables into a config object and export it
// This way we get AUTOCOMPLETION in all our code for the env variables!

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
}
console.log("Loaded config: ", config)
export default config

