const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let count = 0;

app.get('/getCount', (req, res) => {
  res.send(JSON.stringify(count));
})

app.post('/updateCount', (req, res) => {
  let incVal = req.body.number;
  count += incVal;
  res.send('Count Updated Successfully');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
