const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
let notes = [
  {
    "id": "1",
    "content": "hello",
    "important": false
  },
  {
    "id": "2",
    "content": "mello",
    "important": false
  },
  {
    "id": "3",
    "content": "bello",
    "important": false
  },
  {
    "id": "4",
    "content": "bellow",
    "important": false
  },
  {
    "id": "5",
    "content": "shallow",
    "important": false
  },
  {
    "id": "6",
    "content": "Hello",
    "important": false
  },
  {
    "id": "7",
    "content": "this is awesome",
    "important": true
  },
  {
    "id": "8",
    "content": "i think",
    "important": true
  },
  {
    "id": "9",
    "content": "hoo hoo",
    "important": false
  },
  {
    "id": "10",
    "content": "hoo hoo hoo",
    "important": false
  },
  {
    "id": "11",
    "content": "moo moo moo",
    "important": false
  },
  {
    "id": "12",
    "content": "loo loo loo",
    "important": false
  },
  {
    "id": "13",
    "content": "count with me one two three",
    "important": true
  },
  {
    "id": "15",
    "content": "i want to test a very large note and see what will the result will look like i hope everything goes will and smooth",
    "important": true
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown end point' })
}
app.use(requestLogger)
const generateId = () => {
  maxId = notes.length > 0 ?
    Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}
app.get('/', (request, response) => {
  response.send("<h1 style='color: yellow;'>Hello World</h1>")
})
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})
app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    })
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }
  notes = notes.concat(note)
  response.json(note)
})
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`running app on port ${PORT}`)
})
