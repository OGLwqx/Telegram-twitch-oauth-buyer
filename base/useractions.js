const { Users } = require('./models')

const user = {
    get: (id, payload) => Users.findOne({ id }, payload).lean(),
    create: async (id) => {
        const account = new Users({ id })
        account.save().then()
    },

    set: (id, name, value) => { 
        Users.findOneAndUpdate({ id }, {
            $set: {
                [name]: value
            }
        }).then()
    },

    inc: (id, name, value) => { 
        Users.findOneAndUpdate({ id }, {
            $inc: {
                [name]: value
            }
        }).then()
    }
}

module.exports = user