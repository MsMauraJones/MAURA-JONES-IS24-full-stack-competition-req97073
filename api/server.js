// server.js
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const newId = uuidv4();
const jsonString = fs.readFileSync('assignment.json', 'utf8');
const data = JSON.parse(jsonString);
const app = express();
const requiredFields = ['productName', 'productOwnerName', 'developers', 'scrumMasterName', 'startDate', 'methodology', 'status'];

// Enable CORS for all routes
app.use(cors());

// Use body-parser to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/api/assignment', (req, res) => {
  res.json(data); // Return all inventory items
});

app.get('/api/inventory/:id', (req, res) => {
  const id = req.params.id;
  const item = inventory.find(item => item.productId === Number(id));
  if (item) {
    res.json(item); // Return specific inventory item
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/api/create-product', (req, res) => {
  const missingFields = requiredFields.filter(field => !(field in req.body));
  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }

  const newId = uuidv4();

  const newProductToAdd = {
    productId: newId,
    productName: req.body.productName,
    productOwnerName: req.body.productOwnerName,
    developers: req.body.developers,
    scrumMasterName: req.body.scrumMasterName,
    startDate: req.body.startDate,
    methodology: req.body.methodology,
    status: req.body.status
  };
  data.push(newProductToAdd);

  fs.writeFile('assignment.json', JSON.stringify(data), err => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to write data to file' });
    } else {
      res.status(201).json(newProductToAdd);
    }
  });

});


app.put('/api/inventory/:id', (req, res) => {
  // Handle updating inventory item
});

app.delete('/api/inventory/:id', (req, res) => {
  // Handle deleting inventory item
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
