const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

// ===== CRUD API =====
let items = [];
let id = 1;

// Add item (Створити)
app.post('/api/items', (req, res) => {
    const newItem = { id: id++, ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Get all items (Отримати всі)
app.get('/api/items', (req, res) => res.json(items));

// Get one item by id (Отримати один)
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ message: 'Not found' });
});

// Update item (Оновити)
app.put('/api/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });
    
    items[index] = { id: Number(req.params.id), ...req.body };
    res.json(items[index]);
});

// Delete item (Видалити)
app.delete('/api/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });
    
    const deleted = items.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));