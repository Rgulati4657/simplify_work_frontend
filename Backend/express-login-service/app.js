const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({ origin: 'http://localhost:3000', // or whatever your React app URL is
  credentials: true, // if you're sending cookies/session (optional for JWT)
}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
