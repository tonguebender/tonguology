const EventEmitter = require('events');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-2' });
AWS.config.setPromisesDependency(Promise);

const taskObserver = new AWS.SQS({ apiVersion: '2012-11-05' });
const TASK_Q = 'https://sqs.eu-west-2.amazonaws.com/035313854880/task';
const GET_MESSAGES_DELAY = 1000;

const params = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: ['All'],
  QueueUrl: TASK_Q,
  WaitTimeSeconds: 20,
};

class TaskObserver extends EventEmitter {
  constructor() {
    super();

    this.isReceiving = false;
  }

  start() {
    this.isReceiving = true;
    this.getMessages();
  }

  stop() {
    this.isReceiving = false;
  }

  async getMessages() {
    const data = await taskObserver.receiveMessage(params).promise();
    await Promise.all(
      (data.Messages || []).map(async message => {
        this.emit('task', JSON.parse(message.Body));

        const deleteParams = {
          QueueUrl: TASK_Q,
          ReceiptHandle: data.Messages[0].ReceiptHandle,
        };
        await taskObserver.deleteMessage(deleteParams).promise();
      }),
    );

    if (this.isReceiving) {
      setTimeout(() => this.getMessages(), GET_MESSAGES_DELAY);
    }
  }
}

module.exports = TaskObserver;
