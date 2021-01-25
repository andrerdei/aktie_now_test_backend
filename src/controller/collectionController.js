const express = require('express');
const authMiddleware = require('../middleware/auth');

const Collection = require('../model/collection');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const collectionList = await Collection.find();

        return res.send({
            collectionList
        });

    } catch (err){
        res.status(400).send({
            error: err
        });
    }
});

router.get('/:collectionId', async (req, res) => {
    try {
        const collectionBook = await Collection.findById(req.params.collectionId);

        if (!collectionBook) {
            throw error
        }

        return res.send({
            collectionBook
        });

    } catch (err){
        res.status(400).send({
            error: err
        });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;

    console.log()
    try {
        const collectionBook = await Collection.create(req.body);

        return res.send({
            collectionBook
        });

    } catch (err){
        if(await Collection.findOne({ name })) {
            return res.status(400).send({
                error: err
            });
        }

        res.status(400).send({
            error: err
        });
    }
});

router.put('/:collectionId', async (req, res) => {
    const { title, genre, description } = req.body;

    try {
        const collectionBook = await Collection.findByIdAndUpdate(req.params.collectionId, { title, genre, description }, { new: true });

        if (!title || !genre || !description) {
            throw error
        }

        return res.send({
            collectionBook
        });

    } catch (err){
        res.status(400).send({
            error: err
        });
    }
});

router.delete('/:collectionId', async (req, res) => {

    try {
        await Collection.findByIdAndRemove(req.params.collectionId);

        return res.send();

    } catch (err){
        res.status(400).send({
            error: err
        });
    }
});

module.exports = (app) => app.use('/collection', router);