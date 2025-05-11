const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Name is required.'],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'Phone number is required.'],
    validate: {
      validator: function(v) {
        if ((v.match(/-/g) || []).length !== 1) {
          return false;
        }

        const parts = v.split('-');
        const part1 = parts[0];
        const part2 = parts[1];

        if (!((part1.length === 2 || part1.length === 3) && /^\d{2,3}$/.test(part1))) {
          return false;
        }

        if (!(part2.length > 0 && /^\d+$/.test(part2))) {
          return false;
        }

        if (part1.length + part2.length + 1 !== v.length) {
            return false;
        }

        return true;
      },
      message: props => `${props.value} is not a valid phone number!
        - Must be at least 8 characters long.
        - Must be in the format XX-YYYYYY or XXX-YYYYYY (e.g., 09-1234556 or 040-22334455).
        - The first part must have 2 or 3 digits.
        - The second part must consist of digits.`
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', personSchema)