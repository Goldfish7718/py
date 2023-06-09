import express from 'express';
import mongoose from 'mongoose';
import { PythonShell } from 'python-shell';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index.html');
})

app.post('/', (req, res) => {
    const { url } = req.body;

    const id = url.split('https://www.youtube.com/watch?v=')[1];

    let options = {
      args: [id]
    };

    const pyShell = new PythonShell('./scrap.py', options);

    pyShell.on('message', function (message) {
        const comments = JSON.parse(message)
        res.send(comments);
    });

      pyShell.on('error', function (err) {
        console.error(err);
    });

})

app.listen(3000, () => console.log('Server started at port 3000'));

