const express = require("express");
const connectToDatabase = require("./config/db");
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 8000 
const app = express();

app.use(express.json());
connectToDatabase();
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use(errorHandler);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))