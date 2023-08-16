const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define user schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// GET /usuarios: Devuelve la lista completa de usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /usuarios/:id: Devuelve los detalles de un usuario específico según su ID
app.get('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /usuarios: Crea un nuevo usuario con la información proporcionada
app.post('/usuarios', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const newUser = await User.create({ name });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /usuarios/:id: Actualiza la información de un usuario específico según su ID
app.put('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /usuarios/:id: Elimina un usuario específico según su ID
app.delete('/usuarios/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
