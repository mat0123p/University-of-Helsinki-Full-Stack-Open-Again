const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const password = process.env.MONGODB_PASSWORD

mongoose.set('strictQuery', false);

const url = `mongodb+srv://mat0123p:${password}@cluster0.ebmwd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url).then(result => {
    console.log("connected to MongoDB")
}).catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
})

const personSchema = new mongoose.Schema({ 
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{5,}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
})

module.exports = mongoose.model('Person', personSchema)

