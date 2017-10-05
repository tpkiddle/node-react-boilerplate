// load the things we need
const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

/**
 * Define the user schema. In here we store client
 * specific settings.
 */
const schema = new mongoose.Schema({
  auth: {
    active: {
      type: Boolean,
      default: false
    },
    verification: {
      verified: {
        type: Boolean,
        default: false,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      default: true
    },
    password: {
      type: String,
      required: true
    }
  },

  /**
   * User account information
   */

  account: {
    type: {
      type: String,
      enum: ['individual', 'charity', 'company'],
      required: false
    },

    /**
     * Verified accounts are reserved for users
     * such as charitys, companys and celebritys
     */

    isVerified: {
      type: Boolean,
      default: false
    },

    /**
     * Hides the users personal information
     */

    isAnonymous: {
      type: Boolean,
      default: false
    }
  },
  profile: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    username: {
      type: String,
      required: true
    },
    picture: {
      type: Number
    }
  },
  firstLogin: {
    type: Date,
    default: new Date()
  },
  lastLogin: {
    type: Date,
    default: new Date()
  },
  loginCount: {
    type: Number,
    default: 1
  }
}, { minimize: false });

// Generating a hash
schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.auth.password);
};

// create the model for users and expose it to our app
const User = mongoose.model('User', schema, 'users');
module.exports = User;