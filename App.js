import express from "express";
import bodyParser from "body-parser";
import { getRecords, getIndivdualRecord, creatRecord, deletRecord, updateRecord } from './db.js'
import { getPost, getPosts, updatePost } from './blogpost.js'
const port = process.env.PORT || 1990;
const app = express();
import cors from 'cors'
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// let sessionStore = new mysqlStore({})
// app.use(session({
//     saveUninitialized: true,
//     key: "cat",
//     store: sessionStore,
//     resave: false,
//     secret: "coolCat",
// }));


app.get('/', async (req, res) => {
    res.json({ message: 'hello world' })
    // const users = await getRecords()
    // res.status(200).send(users);
});


app.get('/blog/posts', async (req, res) => {
    const posts = await getPosts()
    res.status(200).send(posts)
});

app.get('/blog/posts/:id', async (req, res) => {
    const id = req.params.id
    const post = await getPost(id);
    res.status(200).send(post)
});


app.patch('/blog/posts', async (req, res) => {
    const { id, title } = req.body
    const data = await updatePost(title, id)
    res.status(301).send(data)
})



app.get('/:id', async (req, res) => {
    const userId = req.params.id
    const user = await getIndivdualRecord(userId)
    res.status(200).send(user);
});



app.delete('/task/:id', async (req, res) => {
    const id = req.params.id;
    await deletRecord(id)
    res.send('task ' + id + ' deleted')
})

app.post('/task', async (req, res) => {
    const { title, reminder } = req.body
    let data = await creatRecord(title, reminder);
    res.send(data)

})



app.listen(port, () => { console.log(`Server connected on port ${port}`) })