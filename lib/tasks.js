const debug = require('debug')('tasks');
const sendMessage = require('./send-message');
const users = require('./users');
const db = require('./db');

const types = {
  REPLY: 'REPLY',
};

const process = async task => {
  const { type } = task;
  debug('>>', type);

  switch (type) {
    case types.REPLY: {
      if (task.text === '/start') {
        const { message } = task.data;
        try {
          await users.create({ name: message.from.first_name, chatId: message.chat.id });
        } catch (e) {
          console.log('Error:', e);
        }

        return await sendMessage({ chatId: task.chatId, text: `Hi` });
      } else if (task.text.startsWith('define')) {
        const word = task.text.split(' ')[1];
        debug('word', word);
        const doc = await db.getDef(word);
        debug('doc', doc);
      }
      return await sendMessage({ chatId: task.chatId, text: `processed: ${task.text}` });
    }
    default: {
      debug('?', type);
      return;
    }
  }
};

module.exports.types = types;
module.exports.process = process;
