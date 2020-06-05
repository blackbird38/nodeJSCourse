const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, select: false},
    name: {type: String, required: true},
    following: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    console.log(salt);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return hash;
}

UserSchema.methods.validPassword = async(candidatePassword, realPassword) => {
    const result = await bcrypt.compare(candidatePassword, realPassword);
    console.log(result);
    return result;
};

module.exports = mongoose.model('User', UserSchema);