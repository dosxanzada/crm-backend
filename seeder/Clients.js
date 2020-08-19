const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/diplom')

const Clients = require('../models/Clients')

const clientsCollection = [
  {
    fullname: 'Арман Жандос',
    company: 'AJ',
    email: 'arman.jandos@mail.kz',
    phone: '87055543211'
  },
  {
    fullname: 'Даулет Айдос',
    company: 'da',
    email: 'daulet.aidos@mail.kz',
    phone: '87477895521'
  },
  {
    fullname: 'Бакдаулет Айгерим',
    company: 'BA',
    email: 'bakdaulet.aigerim@mail.kz',
    phone: '87761254984'
  },
  {
    fullname: 'Аманжолов Нурсултан',
    company: 'AN',
    email: 'amanjolov.nursultan@mail.kz',
    phone: '87074652214'
  },
  {
    fullname: 'Байболсынов Асхат',
    company: 'BA',
    email: 'baibolsynov.askhat@mail.kz',
    phone: '87016532498'
  }
]

clientsCollection.forEach((client, index) => {
  Clients.create(client, (err, client) => {
    console.log(`${client.fullname} saved`)
    if (clientsCollection.length === index + 1) mongoose.disconnect()
  })
})
