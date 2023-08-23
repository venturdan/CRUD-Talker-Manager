const fs = require('fs').promises;

const path = 'src/talker.json';

const readTalkers = async () => {
  try {
    const file = await fs.readFile(path, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    return `Couldn't read the file: ${error}`;
  }
};

const getTalkerById = async (id) => {
  const talkers = await readTalkers();
  return talkers.find((talker) => talker.id === id);
};

const updateFile = async (talker) => {
  await fs.writeFile(path, JSON.stringify(talker, null, 2));
};

const addTalker = async (talker) => {
  const talkers = await readTalkers();

  const lastId = talkers[talkers.length - 1].id;
  
  const newTalker = { id: lastId + 1, ...talker };
  const newTalkers = [...talkers, newTalker];

  await updateFile(newTalkers);
  return newTalker;
};

const updateTalker = async (talker, talkerId) => {
  const talkers = await readTalkers();
  const talkerToUpdate = talkers.find(({ id }) => id === talkerId);
  if (talkerToUpdate) {
    const index = talkers.findIndex(({ id }) => id === talkerId);
  
    const updatedTalker = { ...talkerToUpdate, ...talker };
  
    talkers.splice(index, 1, updatedTalker);
    await updateFile(talkers);
  
    return updatedTalker;
  }
  return false;
};

const deleteTalker = async (talkerId) => {
  const talkers = await readTalkers();
  if (talkers.find(({ id }) => id === talkerId)) {
    const newTalkers = talkers.filter(({ id }) => id !== talkerId);
  
    await updateFile(newTalkers);
  
    return true;
  }
  return false;
};

const updateRate = async (update, talkerId) => {
  const talkers = await readTalkers();
  const talkerToUpdate = talkers.find(({ id }) => id === talkerId);
  if (talkerToUpdate) {
    const updatedTalkers = talkers.map((talker) => {
      if (talker.id === talkerId) {
        const updatedTalker = talker;
        updatedTalker.talk.rate = update.rate;
        return updatedTalker;
      }
      return talker;
    });

    await updateFile(updatedTalkers);
  
    return true;
  }
  return false;
};

module.exports = {
  readTalkers,
  getTalkerById,
  addTalker,
  updateTalker,
  deleteTalker,
  updateRate,
};
