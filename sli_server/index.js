/** @format */

var sqlite3 = require("sqlite3").verbose()
var express = require("express")
var http = require("http")

var app = express()
var server = http.createServer(app)
var db = new sqlite3.Database("./database/sli_db.db")

//creates table 'users' with columns 'id,name,username,email' if it doesn't exist
db.run(
	"CREATE TABLE IF NOT EXISTS users(id TEXT, name TEXT,username TEXT,email TEXT)"
)
//creates table 'albums' with columns 'albumId,userId,albumTitle' if it doesn't exist
db.run(
	"CREATE TABLE IF NOT EXISTS albums(albumId TEXT, userId TEXT,albumTitle TEXT)"
) //creates table 'photos' with columns 'photoId,albumId,photoTitle,imgURL' if it doesn't exist
db.run(
	"CREATE TABLE IF NOT EXISTS photos(photoId TEXT, albumId TEXT,photoTitle TEXT,imgUrl TEXT)"
)

app.get("/", function (req, res) {
	res.send(
		"<h3> Hi there, You are going to perform CRUD operations.............[CREATE] Please enter 'http://localhost:3000/add/(id number)/(name)' to add new employee to the database.........................[READ] 'http://localhost:3000/view/(id number)' to view an employee.........................[UPDATE] 'http://localhost:3000/update/(id number)/(new name)' to update an employee.....................[DELETE] 'http://localhost:3000/del/(id number)' to delete an employee...............................Before closing this window, kindly enter 'http://localhost:3000/close' to close the database connection <h3>"
	)
})

//function for performing crud operations on the users
//function to add a user
app.get("/api/users/add/:id/:name/:username/:email", function (req, res) {
	db.serialize(() => {
		db.run(
			"INSERT INTO users(id,name,username,email) VALUES(?,?,?,?)",
			[req.params.id, req.params.name, req.params.username, req.params.email],
			function (err) {
				if (err) {
					res.send(err.message)
					return console.log(err.message)
				}
				console.log("NEW EMPLOYEE ADDED")
				res.send(
					"New employee has been added into the database with the id=" +
						req.params.id +
						"name =" +
						req.params.name +
						"username =" +
						req.params.username +
						"email = " +
						req.params.email
				)
			}
		)
	})
})

//function to read a user
app.get("/api/users/view/:id", function (req, res) {
	db.serialize(() => {
		db.each(
			"SELECT id ID,name NAME,username USERNAME,email EMAIL FROM users WHERE id = ?",
			[req.params.id],
			function (err, row) {
				if (err) {
					res.send("Error encountered while fetching data ")
					return console.error(err.message)
				}
				res.send(
					`ID: ${row.ID}, NAME: ${row.NAME}, USERNAME: ${row.USERNAME}, EMAIL: ${row.EMAIL}`
				)
				console.log("entry fetched successfully")
			}
		)
	})
})

//function to update a user
app.get("/api/users/update/:id/:name/:username/:email", function (req, res) {
	db.serialize(() => {
		db.run(
			"UPDATE users SET name = ?,username = ?,email = ? WHERE id=?",
			[req.params.name, req.params.username, req.params.email, req.params.id],
			function (err, row) {
				if (err) {
					res.send("Error encountered while updating")
					return console.error(err.message)
				}
				res.send("Entry updated successfully")
				console.log("Entry updated successfully")
			}
		)
	})
})

//function to delete a user
app.get("/api/users/delete/:id", function (req, res) {
	db.serialize(() => {
		db.run("DELETE FROM users WHERE id=?", req.params.id, function (err) {
			if (err) {
				res.send("Error encountered while deleting")
				return console.error(err.message)
			}
			res.send("User deleted")
			console.log("User deleted")
		})
	})
})

//function for performing crud operations on the albums|
//function to add an album
app.get("/api/albums/add/:albumId/:userId/:albumTitle", function (req, res) {
	db.serialize(() => {
		db.run(
			"INSERT INTO albums(albumId,userId,albumTitle) VALUES(?,?,?)",
			[req.params.albumId, req.params.userId, req.params.albumTitle],
			function (err) {
				if (err) {
					res.send(err.message)
					return console.log(err.message)
				}
				console.log("album has been added")
				res.send(
					"New album has been added into the database with the id=" +
						req.params.albumId +
						"user id =" +
						req.params.userId +
						"albumTitle =" +
						req.params.albumTitle
				)
			}
		)
	})
})

//function to read album data
app.get("/api/albums/view/:albumId", function (req, res) {
	db.serialize(() => {
		db.each(
			"SELECT albumId ALBUMID,userId USERID,albumTitle ALBUMTITLE FROM albums WHERE albumId=?",
			[req.params.albumId],
			function (err, row) {
				if (err) {
					res.send("Error encountered while fetching data ")
					return console.error(err.message)
				}
				res.send(
					`ID: ${row.ALBUMID}, USERID: ${row.USERID}, ALBUMTITLE: ${row.ALBUMTITLE}`
				)
				console.log("entry fetched successfully")
			}
		)
	})
})
//function to update a album
app.get("/api/albums/update/:albumId/:albumTitle", function (req, res) {
	db.serialize(() => {
		db.run(
			"UPDATE albums SET albumTitle = ? WHERE albumId=?",
			[req.params.albumTitle, req.params.albumId],
			function (err, row) {
				if (err) {
					res.send("Error encountered while updating")
					return console.error(err.message)
				}
				res.send("Entry updated successfully")
				console.log("Entry updated successfully")
			}
		)
	})
})

//function to delete a album
app.get("/api/albums/delete/:albumId", function (req, res) {
	db.serialize(() => {
		db.run(
			"DELETE FROM albums WHERE albumId=?",
			req.params.albumId,
			function (err) {
				if (err) {
					res.send("Error encountered while deleting")
					return console.error(err.message)
				}
				res.send("album deleted")
				console.log("album deleted")
			}
		)
	})
})

//function for performing crud operations on the photo
//function to add an photo
app.get(
	"/api/photos/add/:photoId/:albumId/:photoTitle/:imgUrl",
	function (req, res) {
		db.serialize(() => {
			db.run(
				"INSERT INTO photos(photoId,albumId,photoTitle,imgUrl) VALUES(?,?,?,?)",
				[
					req.params.photoId,
					req.params.albumId,
					req.params.photoTitle,
					req.params.imgUrl,
				],
				function (err) {
					if (err) {
						res.send(err.message)
						return console.log(err.message)
					}
					console.log("album has been added")
					res.send(
						"New photo has been added into the database with the id=" +
							req.params.photoId +
							"album id =" +
							req.params.albumId +
							"photoTitle =" +
							req.params.photoTitle +
							"imgUrl" +
							req.params.imgUrl
					)
				}
			)
		})
	}
)

//function to read photo data
app.get("/photos/view/:photoId", function (req, res) {
	db.serialize(() => {
		db.each(
			"SELECT photoId PHOTOID,albumId ALBUMID,photoTitle PHOTOTITLE ,imgUrl IMGURL FROM photos WHERE photoId=?",
			[req.params.photoId],
			function (err, row) {
				if (err) {
					res.send("Error encountered while fetching data ")
					return console.error(err.message)
				}
				res.send(
					`ID: ${row.PHOTOID}, ALBUMID: ${row.ALBUMID}, PHOTOTITLE: ${row.PHOTOTITLE},IMGURL: ${row.IMGURL}`
				)
				console.log("entry fetched successfully")
			}
		)
	})
})
//function to update a photo
app.get("/api/photos/update/:photoId/:photoTitle/:imgUrl", function (req, res) {
	db.serialize(() => {
		db.run(
			"UPDATE photos SET photoTitle = ?,imgUrl=? WHERE photoId=?",
			[req.params.photoTitle, req.params.imgUrl, req.params.photoId],
			function (err) {
				if (err) {
					res.send("Error encountered while updating")
					return console.error(err.message)
				}
				res.send("Entry updated successfully")
				console.log("Entry updated successfully")
			}
		)
	})
})

//function to delete a photo
app.get("/api/photos/delete/:photoId", function (req, res) {
	db.serialize(() => {
		db.run(
			"DELETE FROM photos WHERE photoId=?",
			req.params.photoId,
			function (err) {
				if (err) {
					res.send("Error encountered while deleting")
					return console.error(err.message)
				}
				res.send("photo deleted")
				console.log("photo deleted")
			}
		)
	})
})

//function to close database function
app.get("/api/close", function (req, res) {
	db.close((err) => {
		if (err) {
			res.send("There is some error in closing the database")
			return console.error(err.message)
		}
		console.log("Closing the database connection.")
		res.send("Database connection successfully closed")
	})
})

server.listen(3000, function () {
	console.log("Server listening on port: 3000")
})
