import express, { json } from 'express';
import corsMiddleware from './middleware/cors.js';
import authRoutes from './routes/auth.js';

const app = express()
const port = 3000

app.use(corsMiddleware);

app.use(json());

// Mount auth routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
