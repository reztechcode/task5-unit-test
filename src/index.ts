import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import bookRoutes from './routes/bookRoutes'
import authRoutes from './routes/authRoutes'
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerConfigurations';

const app: Application = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'your_mongo_uri_here';

app.use(express.json());

mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.log('MongoDB connection error:', error));

// Menggunakan Swagger UI
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
