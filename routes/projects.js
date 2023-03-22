import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('projects');
});

router.get('/:name', (req, res) => {
    res.send(`Hier komt pagina ${req.params.name}`);
});

export default router;