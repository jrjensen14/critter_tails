const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

// petSchema
const petSchema = new Schema(
    {
        petUsername: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },  
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        petType: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String
        },
        age: {
            type: Number
        },
        sex: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        relationshipStatus: {
            type: String
        },
        tails: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tail'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Pet'
            }
        ]
    },
    {
        toJSON: {
          virtuals: true
        }
    }
);

petSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });

petSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

petSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  const Pet = model('Pet', petSchema);
  module.exports = Pet;
  
// petUsername {String, required, unique, trim}
// petType {String, required, trim}
// image {String}
// age {Number}
// sex {String, required}
// bio {string, required}
// humanStatus {string}
// posts [{ref Post}]
// friends [{ ref Pet}]
// include a virtual for friendCount see logic at the bottom of user in Deep-Thoughts

// see the logic in Deep-Thoughts for the password encryption logic