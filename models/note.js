const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log('connecting to mongo')
mongoose.connect(url, { family: 4 }).then(result => {
  console.log('connected to mongo success')
}).catch(error => {
  console.log('error connecting to mongodb:', error.message)
})
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})
noteSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Note', noteSchema)
