var passwords = [];

function savePassword() {
	var websiteInp = document.getElementById("website");
	var usernameInp = document.getElementById("username");
	var passwordInp = document.getElementById("password");

	var website = websiteInp.value;
	var username = usernameInp.value;
	var password = passwordInp.value;

	// var passwordItem = document.createElement("li");
	// passwordItem.innerHTML = "<strng>Wbesite:</strong>" + website + ", <strong>Username:</strong>" + username + ", <strong>Password:</strong>" + password;
	// document.getElementById("passwordList").appendChild(passwordItem);

	var passwordItem = {
		website: website,
		username: username,
		password: password
	};

	passwords.push(passwordItem);

	displayPasswords();

	websiteInp.value="";
	usernameInp.value="";
	passwordInp.value="";
}

function displayPasswords() {
	var passwordList = document.getElementById("passwordList");
	passwordList.innerHTML = "";

	for(var i = 0; i < passwords.length; i++){
		var passwordItem = passwords[i];

		var listItem = document.createElement("li");
		listItem.className = "password-item";
		listItem.innerHTML = "<strong>Website:</strong>" + passwordItem.website + ", <strong>Username:</strong>" + passwordItem.username + ", <strong>Password:</strong>" + passwordItem.password;

		var deleteButton = document.createElement("button");
		deleteButton.innerHTML = "Delete";
		deleteButton.className = "btn";
		deleteButton.setAttribute("data-index", i);
		deleteButton.onclick = deletePassword;
		listItem.appendChild(deleteButton);
		passwordList.appendChild(listItem);

	}
}

function deletePassword() {
	var index = this.getAttribute("data-index");
	passwords.splice(index, 1);

	displayPasswords();
}