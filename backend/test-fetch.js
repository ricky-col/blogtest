import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { ArticleModel } from './Models/ArticleModel.js'
import { UserTypeModel } from './Models/UserModel.js'
import { config } from 'dotenv'

config()

async function test() {
  await mongoose.connect(process.env.DB_URL)
  const token = jwt.sign({ userId: "6a02b41760be7c1dc81b8967", role: "AUTHOR" }, process.env.JWT_SECRET)
  
  const aid = "6a02b41760be7c1dc81b8967"
  const articles = await ArticleModel.find({author: aid, isArticleActive: true}).populate("author","firstName email")
  console.log("Found articles:", articles.length)
  console.log(articles)
  process.exit(0)
}
test()
