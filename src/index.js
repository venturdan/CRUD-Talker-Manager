const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';

const talkerData = JSON.parse(fs.readFileSync('talker.json'));

app.get('/talker', (_request, response) => {
  response.status(HTTP_OK_STATUS).json(talkerData);
});

app.get('/talker/:id', (request, response) => {
  const talkerId = parseInt(request.params.id, 10);
  const talker = talkerData.find((t) => t.id === talkerId);

  if (talker) {
    response.status(HTTP_OK_STATUS).json(talker);
  } else {
    response.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
