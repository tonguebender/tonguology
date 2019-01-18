const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const params = {};

sqs.listQueues(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrls);
  }
});