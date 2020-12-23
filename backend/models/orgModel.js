import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const contactSchema = mongoose.Schema({
  firstname: {
    type: String,
},
  lastname: {
      type: String,
      required: function() { return this.firstname === ' '; }
  },
  address: {
    type: String,
  },
town: {
    type: String,
  },
country: {
    type: String,
  },
email: {
  type: String,
},
phone: {
  type: String,
},
designation: {
  type: String,
}
}, {
  timestamps: true
})

const orgSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
        type: String,
      },
    town: {
        type: String,
      },
    country: {
        type: String,
      },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    segment: {
      type: String,
    },
    orgtype: {
      type: String,
    },
    size: {
      type: Number,
    },
    rating: {
      type: Number,
    },

    contacts: [contactSchema],
       
  },
  {
    timestamps: true,
  }
)


const Organisation = mongoose.model('Organisation', orgSchema)

export default Organisation