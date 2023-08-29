import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (_req, res) => {
    res.send('Server running')
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})