const { Shorts } = require("../models");
const { check, validationResult } = require("express-validator");

const shortsController = {
  async getUrls(req, res) {
    try {
      const shortUrls = await Shorts.find().sort({ 'date': -1 });
      res.json(shortUrls);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  async createUrls(req, res) {
    try {
      const { full } = req.body;
let exists = await Shorts.findOne({ full });

if(exists){
  return res.json({error: "URL has already been shortly-d"})
}
      const isValidUrl = (url) => {
        try {
          new URL(url);
        } catch (e) {
          console.error(e);
          return false;
        }
        return true;
      };
      
      const authenticateUrl = isValidUrl(req.body.full);
      if (!authenticateUrl) {
        res.json({ error: "Please provide valid URL"});
        return;
      }
      const newShort = await Shorts.create(req.body);
      
      res.json(newShort);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  async goToUrl(req, res){
	  try {
const { shortUrl } = req.params
		  const findShort = await Shorts.findOne({ short: shortUrl})
		  if(findShort === null) return res.sendStatus(404);
		  findShort.clicks++;
		  findShort.save();
		  res.json(findShort.full);
	  } catch(err) {
		  
		  console.error(err.message);
		  res.status(500).send('Server Error');
	  }
  }

};

module.exports = shortsController;
