const express = require('express');
const app = express();
const port = 3000;
let counter = 0;

app.use('/', express.static('../client/counter_display'));

app.get('/getCount', (req, res) => {
  res.send(JSON.stringify(counter));
  counter++;
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
