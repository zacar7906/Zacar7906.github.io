// Importamos las dependencias
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// Inicializamos Express
const app = express();
app.use(cors());
app.use(express.json());

// Configura tu API KEY de OpenAI aquí
const OPENAI_API_KEY = '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';

// Ruta POST /chat
app.post('/chat', async (req, res) => {
  console.log('Mensaje recibido en /chat:', req.body);

  const userMessages = req.body.messages;

  if (!userMessages || !Array.isArray(userMessages)) {
    return res.status(400).json({ error: 'Formato de mensaje incorrecto. Se esperaba un array de mensajes.' });
  }

  try {
    // Llamada a OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',   // Puedes cambiar a gpt-3.5-turbo si quieres ahorrar
        messages: userMessages
      })
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error('Error en respuesta OpenAI:', errorResponse);
      return res.status(500).json({ error: 'Error al conectar con OpenAI.' });
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content.trim();
    
    console.log('Respuesta generada por OpenAI:', botResponse);

    // Devolver la respuesta al navegador
    res.json({ respuesta: botResponse });

  } catch (error) {
    console.error('Error general del servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Inicializamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor proxy funcionando en el puerto ${PORT}`);
});
