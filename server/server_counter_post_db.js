const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let db;

app.use('/', express.static('../client/counter_display_post'));

app.get('/getCount', async (req, res) => {
  try {
    const collection = db.collection('counter');
    const counterData = await collection.findOne();

    res.status(200).send(JSON.stringify(counterData.value));
  }
  catch(error) {
    console.log(error);
    res.status(500).send('Something went wrong while getting the counter');
  }
})

app.post('/updateCount', async (req, res) => {
  try {
    let incVal = req.body.number;
    const collection = db.collection('counter');
    
    const counterData = await collection.findOne();
    let counterValue = counterData.value;
    counterValue += incVal;

    const options = {
      upsert: true,
    };

    const result = await collection.replaceOne({_id: {$eq: counterData._id}}, {value: counterValue}, options);

    if (counterValue > 20){
      res.status(500).send('Count exceeded 20, rejecting');
    } else {
      res.status(200).send('Count updated successfully');
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).send('Count failed to update');
  }
})




MongoClient.connect('mongodb://gueabetmongotst07.skybet.net:27017', function(error, client) {
  if (error) {
    console.log(error);
    return;
  }
  db = client.db('graduate-demo-can-delete');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
});
