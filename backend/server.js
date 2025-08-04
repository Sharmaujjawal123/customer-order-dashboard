const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/', orderRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
