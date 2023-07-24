
var passwords = [];

// Values from password page
var websiteInp = document.getElementById("website");
var usernameInp = document.getElementById("username");
var passwordInp = document.getElementById("password");

const api_url = "http://localhost:3000/passwords/";

async function getApi(url) {
	const res = await fetch(url);
	var data = await res.json();
	// console.log(data);
	passwords = data;
	displayPasswords();
}

async function postApi(data) {
	try {
		const res = await fetch(api_url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const result = await res.json();
		console.log(result);
	}
	catch (error) {
		console.error("Error:", error);
	}
	getApi(api_url);
}

async function deleteApi(id) {
	try {
		const res = await fetch(api_url + id, {
			method: "DELETE"
		});
		const result = await res.json();
		console.log(result);
		getApi(api_url);
	}catch(error) {
		console.error("Error:", error);
	}
}

async function putApi(id, data) {
	try {
		const res = await fetch(api_url + id, {
			method: "PUT",
			headers : {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const result = await res.json();
		console.log(result);
		getApi(api_url);
	} catch(error) {
		console.log("Error:", error);
	}
}

function savePassword() {

	var website = websiteInp.value;
	var username = usernameInp.value;
	var password = passwordInp.value;
	
	var encryptedPassword = CryptoJS.AES.encrypt(password, "root").toString();
	console.log(encryptedPassword);
	// var decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, "root");
	// console.log(decryptedPassword.toString(CryptoJS.enc.Utf8));

	var passwordItem = {
		website: website,
		username: username,
		password: encryptedPassword
	};

	// console.log(passwordItem);
	postApi(passwordItem);

	// passwords.push(passwordItem);

	// displayPasswords();

	websiteInp.value="";
	usernameInp.value="";
	passwordInp.value="";
}

function displayPasswords() {
	var passwordList = document.getElementById("passwordList");
	passwordList.innerHTML = "";
	
	// console.log(passwords);
	for(var i = 0; i < passwords.length; i++){
		var passwordItem = passwords[i];
		console.log(passwordItem);

		var decryptedPassword = CryptoJS.AES.decrypt(passwordItem.password, "root").toString(CryptoJS.enc.Utf8);

		console.log(decryptedPassword);

		var listItem = document.createElement("li");
		listItem.className = "password-item";
		listItem.innerHTML = "<strong>Website:</strong>" + passwordItem.website + ", <strong>Username:</strong>" + passwordItem.username + ", <strong>Password:</strong>" + decryptedPassword;

		var deleteButton = document.createElement("button");
		deleteButton.innerHTML = "Delete";
		deleteButton.className = "btn";
		deleteButton.setAttribute("data-index", passwordItem.id);
		deleteButton.onclick = deletePassword;
		listItem.appendChild(deleteButton);

		var editButton = document.createElement("button");
		editButton.innerHTML = "Edit";
		editButton.className = "btn";
		editButton.setAttribute("data-id", passwordItem.id);
		editButton.onclick = editPassword;
		listItem.appendChild(editButton);

		passwordList.appendChild(listItem);
		// console.log(passwordItem.id);

	}
}

function deletePassword() {
	var id = this.getAttribute("data-index");
	deleteApi(id);
}

function editPassword() {
	var website = websiteInp.value;
	var username = usernameInp.value;
	var password = passwordInp.value;

	if (website == "" || username == "" || password == "") {
		alert("Nothing typed to update");
		return;
	}
	else {
		var id = this.getAttribute("data-id");
		var newPasswordItem = {
			website : website,
			username: username,
			password: password
		};

		putApi(id, newPasswordItem);
	}
}

let generatePassword = () => {
	var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var passwordLength = 8;
	var generatedPassword = "";
	for(var i = 0; i <= passwordLength; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length);
		generatedPassword += chars.substring(randomNumber, randomNumber + 1);
	}
	passwordInp.value = generatedPassword;
}

let login = () => {

	var user_name = document.getElementById("login_username").value;
	var pass = document.getElementById("login_password").value;

	if(user_name == "root" && pass == "root") {
		alert("Login success full");
		window.location.href = "password.html";
	} else {
		alert("Login credentials wrong");
		return;
	}
}

getApi(api_url);
