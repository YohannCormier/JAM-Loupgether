const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jam')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    id: Number
});

const User = mongoose.model('user', userSchema);

async function createUser() {
    const user = new User({
        name: 'Yohann',
        email: 'epitech@gmail.com',
        password: 'azertyui',
        id: (await getUsers()).length + 1
    });
    const result = await user.save();
    console.log(result);
}

async function getUsers() {
    const users = await User.find();
    console.log(users);
    return (users);
}

createUser();
getUsers();