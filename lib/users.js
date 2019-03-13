const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-2' });
AWS.config.setPromisesDependency(Promise);

const docClient = new AWS.DynamoDB.DocumentClient();

const create = async ({ name, chatId }) => {
  await docClient.put({
    TableName: 'users',
    Item: {
      id: 'tg_' + chatId,
      name,
      chatId
    }
  }).promise();
};

module.exports = {
  create,
};
