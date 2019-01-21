const debug = require('debug')('index');
const TaskObserver = require('./lib/task-observer');
const { process } = require('./lib/tasks');
const tasks = new TaskObserver();

tasks.on('task', async msg => {
  debug({ msg });
  try {
    await process(msg);
  } catch (e) {
    debug('Error', e);
  }
});

tasks.start();
