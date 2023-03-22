import express from 'express';
import projectsRouter from './routes/projects.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/' ,(req, res) => {
    res.render('index');
});

app.use('/projects', projectsRouter);
app.use(express.static('public')); // Static files (css, js, images)

app.listen(port, () =>{
    console.log(`Server is running on port http://127.0.0.1:${port}`)
});