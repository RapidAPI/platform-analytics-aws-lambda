const axios = require('axios');

// send record to analytics api
async function sendRecord(logRecord) {
  console.log('logRecord', logRecord);
  const url = process.env.RAPID_PLATFORM_ANALYTICS_URL;

  const headers = {
    'X-RapidAPI-Key': process.env.RAPID_CONSUMER_KEY,
    'X-RapidAPI-Host': process.env.RAPID_PLATFORM_ANALYTICS_HOST,
    'Content-Type': 'application/json',
  };

  try {
    const message = JSON.parse(logRecord);

    const bodyData = [
      {
        apiBaseUrl: 'https://' + message.host,
        endpoint: message.resourcePath,
        status: Number(message.status),
        timestamp: Math.round(message.requestTime / 1000),
        originIp: message.ip,
        method: message.httpMethod,
      },
    ];

    console.log('bodyData', bodyData);

    const response = await axios
      .post(`${url}`, bodyData, {
        headers,
      })
      .catch(function (error) {
        if (error) {
          console.log(`sendRecord: ${error}`);
        }
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendRecord,
};
