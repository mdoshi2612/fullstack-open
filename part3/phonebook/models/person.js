const mongoose = require('mongoose')

const url = process.env.MONGO_DB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    validate: [
      {
        validator: (value) => value.length >= 8,
        message: 'number must be at least 8 characters long',
      },
      {
        validator: (value) => /^\d{2,3}-\d+$/.test(value),
        message:
          'number must be in format XX-XXXXXXX or XXX-XXXXXXXX (e.g. 09-1234556)',
      },
    ],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
