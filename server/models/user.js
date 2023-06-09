const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity");
const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

UserSchema.methods.generalAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})
    return token
};

const User = mongoose.model("user", UserSchema);
const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        password: passwordComplexity().string().required().label("Password")
    });
    return schema.validate(data)
}

module.exports = {User, validate};