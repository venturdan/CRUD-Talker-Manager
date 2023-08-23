const tokenValidation = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (typeof authorization !== 'string' || authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  
    next();
  };
  
  const nameValidation = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    next();
  };
  
  const ageValidation = (req, res, next) => {
    const { age } = req.body;
  
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (!Number.isInteger(age) || age < 18) {
      return res.status(400)
        .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
  
    next();
  };
  
  const talkValidation = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
  
    const { watchedAt, rate } = talk;
  
    if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
  
    next();
  };
  
  const watchedValidation = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const formatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  
    if (!formatDate.test(watchedAt)) {
      return res.status(400).json({ message:
         'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    next();
  };
  
  const talkValidationRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
  
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
  
    next();
  };
  
  const rateValidation = (req, res, next) => {
    const { rate } = req.body;
  
    if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
  
    next();
  };
  
  const talkerValidation = [
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    watchedValidation,
    talkValidationRate,
  ];
  
  module.exports = {
    talkerValidation,
    tokenValidation,
    rateValidation,
  };  