import express, { json } from 'express';
import corsMiddleware from './middleware/cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import recordRoutes from './routes/records'

const app = express()
const port = 5000

app.use(corsMiddleware);

app.use(json());4

// Mount auth routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

app.use('/users', userRoutes);
app.use('/records', recordRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
