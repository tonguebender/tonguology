const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-2' });
AWS.config.setPromisesDependency(Promise);

const QUEUE_URL = 'https://sqs.eu-west-2.amazonaws.com/035313854880/msg';

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const sendMessage = async ({ chatId, text }) => {
  await sqs
    .sendMessage({
      MessageAttributes: {},
      MessageBody: JSON.stringify(
        {
          chatId,
          text,
        },
        null,
        '',
      ),
      QueueUrl: QUEUE_URL,
    })
    .promise();
};

module.exports = sendMessage;
