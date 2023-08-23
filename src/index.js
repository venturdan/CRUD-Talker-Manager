const express = require('express');
const { readTalkers, getTalkerById, addTalker, updateTalker,
  deleteTalker,
  updateRate } = require('./utils/talkers');
const generateToken = require('./utils/generateToken');
const loginValidation = require('./middlewares/loginValidation');
const { talkerValidation } = require('./middlewares/talkerValidation');
const { tokenValidation, rateValidation } = require('./middlewares/talkerValidation');
const filterTalkers = require('./middlewares/filterTalkers');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.post('/login', loginValidation, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkers();
  res.status(200).json(talkers);
});

app.post('/talker', talkerValidation, async (req, res) => {
  const talker = await addTalker(req.body);
  res.status(201).json(talker);
});

app.get('/talker/search', tokenValidation, filterTalkers, (req, res) => {
  res.status(200).json(req.talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.put('/talker/:id', talkerValidation, async (req, res) => {
  const { id } = req.params;
  const talker = await updateTalker(req.body, Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteTalker(Number(id));
  if (!deleted) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(204).end();
});

app.patch('/talker/rate/:id', tokenValidation, rateValidation, async (req, res) => {
  const { id } = req.params;
  const updated = await updateRate(req.body, Number(id));
  if (!updated) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(204).end();
});

module.exports = app;