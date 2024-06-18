const router = require('express').Router();
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs').promises;
const db = require('../db');

async function writeBase64ToFile(base64String) {
    const commaIndex = base64String.indexOf(',');
    const base64Data = base64String.substring(commaIndex + 1);
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${uuidv4()}.jpg`;
    const filePath = path.join('images', fileName);
    await fs.writeFile(filePath, buffer);
    return fileName;
}

router.post('/upload', async (req, res) => {
    const { title, base64data} = req.body;
    const fileName = await writeBase64ToFile(base64data);
    await db.addImage({title, name: fileName});
    res.json({status: 'ok'});
});

router.get('/getall', async (req, res) => {
    res.json(await db.getAll());
});

router.get('/image/:name', async (req, res) => {
    const fileName = req.params.name;
    const filePath = path.join(__dirname, '../images', fileName);
    res.sendFile(filePath);
});

module.exports = router;