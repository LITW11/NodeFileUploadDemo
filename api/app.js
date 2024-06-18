const express = require('express');
const uploadRoutes = require('./routes/uploads');

const app = express();

app.use(express.json({limit: '50mb'}));

app.use('/api/fileupload', uploadRoutes);

app.listen(4000, () => console.log('server started'));