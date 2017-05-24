const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const DB = require('../db.js');
const Joi = require('joi');

const reservationsSchema = Joi.object().keys({
	fromTime: Joi.number().min(1495645010237).max(2095645010237),
	toTime: Joi.number().min(1495645010237).max(2095645010237)
});

router.get('/reservations', (req, res) => {
  	Joi.validate(req.query, reservationsSchema, function (err, value){
		if (err !== null) {
			res.status(400).json(err);
		} else {
			res.status(200).json(DB.reservations(req.query.fromTime, req.query.toTime));
		}		
	});
});

const reserveSchema = Joi.object().keys({
	fromTime: Joi.number().min(1495645010237).max(2095645010237),
	toTime: Joi.number().min(1495645010237).max(2095645010237),
	name: Joi.string(),
	contactPhone: Joi.string(),
	table: Joi.number().min(0).max(25)
});

router.post('/reserve', (req, res) => {
	Joi.validate(req.body, reserveSchema, function (err, value){
		if (err !== null) {
			res.status(400).json(err);
		} else {
			DB.reserve({
					name: req.body.name,
					contactPhone: req.body.contactPhone,
					table: req.body.table,
					startTime: req.body.fromTime,
					endTime: req.body.toTime,
			})
			res.status(200).json('');
		}		
	});
});

// Get all reservations
// router.get('/reservations', (req, res) => {
//   // Get reservations from the mock api
//   // This should ideally be replaced with a service that connects to MongoDB
//   axios.get(`${API}/posts`)
//     .then(reservations => {
//       res.status(200).json(reservations.data);
//     })
//     .catch(error => {
//       res.status(500).send(error)
//     });
// });

module.exports = router;