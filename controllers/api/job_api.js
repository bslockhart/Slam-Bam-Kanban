const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();
router.post("/", async (req, res) => {
  try {
    const options = {
      method: "POST",
      url: "https://linkedin-jobs-search.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": `${process.env.API_KEY}`,
        "X-RapidAPI-Host": "linkedin-jobs-search.p.rapidapi.com",
      },
      data: `{"search_terms":"${req.body.search_terms}","location":"${req.body.location}","page":"1"}`,
    };

    const response = await axios.request(options);

    res.status(200).json(response.data);
    console.log(response.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
