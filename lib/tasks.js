const debug = require('debug')('tasks');
const sendMessage = require('./send-message');

const types = {
  REPLY: 'REPLY',
};

const process = async task => {
  const { type } = task;
  debug('>>', type);

  switch (type) {
    case types.REPLY: {
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
