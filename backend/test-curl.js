import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

async function test() {
  const token = jwt.sign({ userId: "6a02b41760be7c1dc81b8967", role: "AUTHOR" }, process.env.JWT_SECRET)
  
  try {
    const res = await fetch("http://127.0.0.1:4000/author-api/articles/", {
      headers: {
        Cookie: `token=${token}`
      }
    })
    console.log("Status:", res.status)
    const data = await res.json()
    console.log("Data:", data)
  } catch(e) {
    console.error("Error:", e)
  }
}
test()
