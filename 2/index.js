const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');


app.get('/numbers',async (req, res) => {
  const queryParams = req.query; 
  const urls=queryParams["url"];

  const allResponses = await Promise.all(urls.map(url => fetchData(url)));
  console.log(allResponses);
  let li=[];
  allResponses.forEach((item)=> li=li.concat(item["numbers"]));
  li.sort((a,b)=>a-b);
  res.json(li);


});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

async function fetchData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error.message}`);
      return [];
    }
  }
  