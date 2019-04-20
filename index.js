const express = require('express');
const redis = require('redis');

const app = express();
// const client = redis.createClient();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('현재 접속자 수는 ' + visits + ' 입니다.');
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
