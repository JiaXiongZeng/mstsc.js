/*
 * Copyright (c) 2015 Sylvain Peyrefitte
 *
 * This file is part of mstsc.js.
 *
 * mstsc.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express');
var http = require('http');
var engine = require('ejs-locals');

var app = express();

app.engine('ejs', engine);
app.set("views", __dirname + "/server/views");
app.set("view engine", "ejs");

app.use(express.json({ extended: true }));       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {	
	res.render("index", { 
		"fields": {
			ip: req.query.ip,
			domain: req.query.domain,
			userName: req.query.userName,
			password: req.query.password
		}
	});
});

app.post('/', function (req, res) {
	res.render("index", {
		"fields": {
			ip: req.body.ip,
			domain: req.body.domain,
			userName: req.body.userName,
			password: req.body.password
		}
	});
});

var server = http.createServer(app).listen(process.env.PORT || 9250);

require('./server/mstsc')(server);