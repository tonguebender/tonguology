const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-2' });
AWS.config.setPromisesDependency(Promise);

const docClient = new AWS.DynamoDB.DocumentClient();

const getDef = async (word) => {
  return await docClient.get({
    TableName: 'en-gb-def',
    Key: {
      word: 'burn'
    }
  }).promise();
};

module.exports = {
  getDef,
};
