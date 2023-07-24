const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "password_manager"
});

connection.connect((err) => {
	if (err) {
		console.error("Error connceting to the database: ", err);
		return;
	}
	console.log("Connected to the database! ");
});

app.get("/passwords", (req, res) => {
	const sql = "SELECT * FROM passwords";
	connection.query(sql, (err, results) => {
		if (err) {
			console.error("Error retrieving passwords:", err);
			res.status(500).json({ error: "Failed to retrive passwords:" });
			return;
		}
		res.json(results);
	});
});

app.post("/passwords", (req, res) => {
	const { website, username, password } = req.body;
	if(!website || !username || !password) {
		res.status(400).json({ error: "Please provide website, username and password" });
		return;
	}

	const sql = "INSERT INTO passwords (website, username, password) VALUES (?, ?, ?)";
	connection.query(sql, [website, username, password], (err) => {
		if (err) {
			console.error("Error saving password:", err);
			res.status(500).json({ error: "Failed to save password" });
			return;
		}
		res.json({ message: "Password save successfully" });
	});
});

app.put("/passwords/:id", (req, res) => {
	const id = req.params.id;
	const { website, username, password } = req.body;
	if (!website || !username || !password) {
		res.status(400).json({error: "Please provide website, username and password"});
		return;
	}
	const sql = "UPDATE passwords SET website = ?, username = ?, password = ? WHERE id = ?";
	connection.query(sql, [website, username, password, id], (err) => {
		if (err) {
			console.error("Error updating password:", err);
			res.status(500).json({ error: "Failed to update the password" });
			return;
		}
		res.json({ message: "Password updated successfully" });
	});
});

app.delete("/passwords/:id", (req, res) => {
	const id = req.params.id;
	const sql = "DELETE FROM passwords WHERE id = ?";
	connection.query(sql, [id], (err) => {
		if (err) {
			console.error("Error deleting password:", err);
			res.status(500).json({ error: "Failed to delete the password" });
			return;
		}
		res.json({ message: "Password deleted successfully" });
	});
});

const port = 3000;
app.listen(port, () => {
	console.log("Server is running on port 3000");
});

