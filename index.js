'use strict';
require('dotenv').config();
const { sendRecord } = require('./utils');
const zlib = require('zlib');

exports.handler = async (event, done) => {
  if (event.awslogs.data) {
    const logRecord = zlib
      .gunzipSync(Buffer.from(event.awslogs.data, 'base64'))
      .toString('utf8');

    // send file
    try {
      await sendRecord(JSON.parse(logRecord).logEvents[0].message);
    } catch (err) {
      console.log(err);
    }
    return done;
  } else {
    throw new Error('Method not supported', event);
  }
};
