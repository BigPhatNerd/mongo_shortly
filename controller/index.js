const { Shorts } = require("../models");
const { check, validationResult } = require("express-validator");

const shortsController = {
  async getUrls(req, res) {
    try {
      const shortUrls = await Shorts.find();
      res.json(shortUrls);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  async createUrls(req, res) {
    try {
      const { full } = req.body;
	  console.log({full})
      const isValidUrl = (full) => {
        try {
          new URL(full);
        } catch (e) {
          console.error(e);
          return false;
        }
        return true;
      };
      if (!isValidUrl) {
        res.json("Please provide valid URL");
        return;
      }
      const newShort = await Shorts.create({full: full});
      
      res.json(newShort);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  async goToUrl(req, res){
	  try {
		  const { shortUrl } = req.params
		  const findShort = await ShortUrl.findOne({ short: shortUrl})
		  if(findShort === null) return res.sendStatus(404);
		  findShort.clicks++;
		  findShort.save();
		  res.redirect(shortUrl.full);
	  } catch(err) {
		  
		  console.error(err.message);
		  res.status(500).send('Server Error');
	  }
  }

};

module.exports = shortsController;
