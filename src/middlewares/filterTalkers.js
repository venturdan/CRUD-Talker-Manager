const { readTalkers } = require('../utils/talkers');

const filterByQuery = async (req, res, next) => {
  const { q } = req.query;
  const allTalkers = await readTalkers();
  const talkers = q
    ? allTalkers.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()))
    : allTalkers;
  req.talkers = talkers;
  next();
};

const verifyRate = (req, res, next) => {
  const { rate } = req.query;
  const numRate = Number(rate);
  const invalidRate = rate && (!Number.isInteger(numRate) || numRate < 1 || numRate > 5);

  if (invalidRate) {
    return res.status(400).json({ message:
       'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

const filterByRate = (req, res, next) => {
  const { rate } = req.query;

  if (rate) {
    const filteredTalkers = req.talkers.filter(({ talk }) => talk.rate === Number(rate));
    req.talkers = filteredTalkers;
  }

  next();
};

const verifyDate = (req, res, next) => {
  const { date } = req.query;
  const formatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (date && !formatDate.test(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const filterByDate = (req, res, next) => {
  const { date } = req.query;

  if (date) {
    const filteredTalkers = req.talkers.filter(({ talk }) => talk.watchedAt === date);
    req.talkers = filteredTalkers;
  }

  next();
};

const filterTalkers = [
  filterByQuery,
  verifyRate,
  filterByRate,
  verifyDate,
  filterByDate,
];

module.exports = filterTalkers;
