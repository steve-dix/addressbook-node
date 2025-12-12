
var mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const {body, validationResult} = require ('express-validator');
const PAGELENGTH = 12;
var app = express();
const port = 3000;

app.use(express.json());	//json middleware

var db = mysql.createConnection({
	host: 'db',
	user: 'myuser',
	password: 'mypassword',
	database: 'addressbook'
});

// open a connection to keepalive during run.
db.connect(function(err) {
	if(err) {
		console.log("Error connecting to mysql db ",err);
		throw(err);
	}
	d = Date();
	console.log("Mysql connected on "+d.toString());

});

process.on('exit', function() {
	db.end();  // terminate mysql connection on exit
	d = Date();
	console.log("Mysql connection terminated on "+d.toString());
});

const formValidator = [
	body('name','Name field should not be empty').trim().isLength({min: 3, max: 30}).escape(),
	body('email','Email field is not a valid email').isEmail().normalizeEmail(),
	body('address','address field should not be empty').trim().isLength({min: 5, max: 255}).escape(),
	body('phone','phone field should be valid phone number').trim().isMobilePhone().escape()
	];

app.use(express.static('public'));  // serve Http and associated files from public subdirectory

// api methods

// get all addresses, order by surname
// Note : Deprecated for editor client usage, but left in as a way to dump all data.
app.get('/address', (req,res) => {
	db.query("select * from address order by SUBSTR(name, INSTR(name, ' '))", 
		(err,result) => {
			if(err) 
				throw err;
			for(ptr=0;ptr<result.length;ptr++) {
				result[ptr].address = result[ptr].address.replaceAll('\n','<br />');
			}
			res.json(result);
		}
	);
});

// get the number of addresses in the database
app.get('/address/count', (req,res) => {
	db.query("select count(*) as cnt from address", 
		(err,result) => {
			if(err) 
				throw err;
			console.log(result);
			res.json(result[0]);
		}
	);
});

// get a page of addresses
app.get('/address/pg/:page', (req,res) => {
	console.log(req.params);
	page = parseInt(req.params.page);
	start = (page - 1) * PAGELENGTH;
	console.log("page "+page+" start "+start);
	db.query("select * from address order by SUBSTR(name, INSTR(name, ' ')) limit "+start+","+PAGELENGTH, 
		(err,result) => {
			if(err) 
				throw err;
			for(ptr=0;ptr<result.length;ptr++) {
				result[ptr].address = result[ptr].address.replaceAll('\n','<br />');
			}
			console.log(result);
			res.json(result);
		}
	);
});

// get an individual address by addressID
app.get('/address/:id', (req,res) => {
	db.query("select * from address where addressID =" + parseInt(req.params.id), 
		(err,result) => {
			if(err) 
				throw err;
			res.json(result);
		}
	);
});

// post : create new Address
app.post('/address',formValidator,
	(req,result) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return result.status(201).json({errors: errors.array()});
		}
		db.query("insert into address set ?", req.body,
			(err,res) => {
				if(err)
					throw err;
				result.status(201).json(req.body);
			}
		);
	}
);

// put an updated address
app.put('/address/:id', formValidator,	
	(req,result) => {
		const errors = validationResult(req);
		console.log(errors);
		if(!errors.isEmpty()) {
			return result.status(201).json({errors: errors.array()});
		}
		
		db.query("select * from address where addressID =" + parseInt(req.params.id),
			(err,res) => {
				if(err)
					throw err;
				if(!res)
					return result.status(201).send('User not found');	
				
				db.query("update address set name=?, address=?, phone=?, email=? where addressID = ?",
					[req.body.name,req.body.address,req.body.phone,req.body.email,parseInt(req.params.id)],
					(err,res) => {
						if(err)
							throw err;
						result.status(201).json(req.body);
					}
				);
			}
		);		
	}
);

//delete existing user
app.delete('/address/:id', (req,result) => {

		db.query("delete from address where addressID =" + parseInt(req.params.id),
			(err,res) => {
			if(err)
				throw err;
			});

	result.status(204).send();
});

app.listen(port, () => {
	console.log(`REST API server listening at http://localhost:${port}`);
});