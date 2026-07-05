const mongoose = require('mongoose')
if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://youssef8243_db_user:${password}@cluster0.oqtbuot.mongodb.net/appNote?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})
const Note = mongoose.model('Note', noteSchema)
/*
const note = new Note({
  content: 'moo moo moo',
  important: true,
})

note.save().then(result => {
  console.log('note saved')
  mongoose.connection.close()
})
*/
Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
