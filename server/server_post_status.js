const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let count = 0;

app.get('/getCount', (req, res) => {
  try {
    res.status(200).send(JSON.stringify(count));
  }
  catch(error) {
    res.status(500).send('Something went wrong while getting the counter');
  }
})

app.post('/updateCount', (req, res) => {
  try {
    let incVal = req.body.number;
    count += incVal;
    res.status(200).send('Count updated successfully');
  }
  catch(error) {
    res.status(500).send('Count failed to update');
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})