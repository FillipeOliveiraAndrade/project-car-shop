import express from 'express';
import carsRoutes from './Routes/CarRoutes';
import motorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();

app.use(express.json());
app.use(carsRoutes);
app.use(motorcycleRoutes);

export default app;
