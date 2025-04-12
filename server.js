const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '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'; // <-- La nueva Key protegida

app.post('/chat', async (req, res) => {
  const userMessages = req.body.messages;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: userMessages
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send({ error: 'Error interno' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor proxy funcionando en el puerto ${PORT}`));

