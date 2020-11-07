const express = require('express');
const path = require('path');
const router = express.Router();

const NoteModel = require('./noteSchema');
const ObjectId = require('mongoose').Types.ObjectId;

router.group('/api', (app) => {
    app.post('/create', async (req, res, next) => {
        if (req.body.content) {
            const row = new NoteModel({ content: req.body.content });
            await row.save();

            return res.status(200).send({ success: true, _id: row._id });
        }
        return next("Content Required");
    });
    app.get('/note/:noteId', async (req, res, next) => {
        const noteId = req.params && req.params.noteId;

        if (noteId && ObjectId.isValid(noteId)) {
            const content = await NoteModel.findOne({ _id: ObjectId(noteId) }).catch(e => null);

            if (!content) return next("Invalid URL");

            return res.status(200).send({ success: true, data: content.content });
        }

        return next("Invalid URL");
    });
});

// React dashboard view route
router.get('*.*', express.static(path.join(__dirname, 'public')));
router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/build/index.html'));
});

module.exports = router;