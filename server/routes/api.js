const express = require('express');
const router = express.Router();
const path = require('path');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const DB = require('../db.js');
const Joi = require('joi');
const fs = require('fs');
const _ = require('lodash');

const tablesJSON = JSON.parse(fs.readFileSync(path.join(__dirname + '/../assets/tables.json'), 'utf8'));
const tablesSchema = Joi.object().keys({
	at: Joi.number(),//.min(1495645010237).max(2095645010237),
});

router.get('/tables', (req, res) => {
	Joi.validate(req.query, tablesSchema, function (err, value){
		var reservations = DB.reservationsAt(req.query.at)
			.reduce((aggregate, value) => { aggregate[value.table] = value; return aggregate; }, {});
		res.status(200).json({
			reservations: reservations,
			tables: tablesJSON
		});
	});	
});

router.post('/cleanup', (req, res) => {
	DB.cleanup();
	res.status(200).json('');
});

const reservationsSchema = Joi.object().keys({
	fromTime: Joi.number(),//.min(1495645010237).max(2095645010237),
	toTime: Joi.number(),//.min(1495645010237).max(2095645010237)
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
	fromTime: Joi.number(),//.min(1495645010237).max(2095645010237),
	toTime: Joi.number(),//.min(1495645010237).max(2095645010237),
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

const removeSchema = Joi.object().keys({
	startTime: Joi.number(),//.min(1495645010237).max(2095645010237),
	table: Joi.number().min(0).max(25)
});

router.post('/cancel', (req, res) => {
	Joi.validate(req.body, removeSchema, function (err, value){
		if (err !== null) {
			res.status(400).json(err);
		} else {
			console.log(req.body);
			DB.remove(req.body.startTime, req.body.table)
			res.status(200).json('');
		}		
	});
});

module.exports = router;