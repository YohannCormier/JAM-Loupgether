const express = require ('express')
const mongoose = require ('mongoose')

const app = express();
app.use(express.json())
app.use(express.static('.'))
app.use(express.urlencoded({ extended:true}))

mongoose.connect('mongodb://localhost/jam', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', () => console.log("error in connecting to db"))
db.once('open', () => console.log("connected to db"))

app.post("/fr/forum.html", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const emailExist = await db.collection('users').findOne({email: email});
    if (emailExist) return (res.status(400).send('Email already exist'));
    const data = {
        "name" : name,
        "email": email,
        "password":password
    }
    db.collection('users').insertOne(data,(err, collection) => {
        if (err) {
            throw err;
        }
        console.log('Record succesfully')
    });
    return res.redirect('/fr/forum.html')
});

app.post("/co", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email === 'Nyan@cat.fr' && password === 'nyancat') return res.redirect('/fr/nyancat.html')

    const emailExist = await db.collection('users').findOne({email: email});
    const passExist = await db.collection('users').findOne({password: password});
    if (!emailExist || !passExist) return (res.status(400).send('wrong mail or password'));
    return res.redirect('/fr/forum.html')
});

app.post("/en/forum.html", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const data = {
        "name" : name,
        "email": email,
        "password":password
    }
    db.collection('users').insertOne(data,(err, collection) => {
        if (err) {
            throw err;
        }
        console.log('Record succesfully')
    });
    return res.redirect('')
});

app.post("/esp/forum.html", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const data = {
        "name" : name,
        "email": email,
        "password":password
    }
    db.collection('users').insertOne(data,(err, collection) => {
        if (err) {
            throw err;
        }
        console.log('Record succesfully')
    });
    return res.redirect('/esp/forum.html')
});

app.get("/esp/esp-index.html", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('esp/esp-index.html')
})

app.get("/en/en-index.html", (req, res) => {
    console.log('test')
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('en/en-index.html')
})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('fr/fr-index.html')
})

app.listen(3000, () => 
console.log('listen on 3000')
)