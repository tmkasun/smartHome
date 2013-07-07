/**
 * 
 */

function logMeIn() {
	
	var username = $("#login").val();
	var password = $("#password").val();
	
	$.post("./php/signin.php", {
		"username" : username,
		"password" : password
	}).done(function(jsonReturn) {
		alert(jsonReturn);
		returnVal = $.parseJSON(jsonReturn);
		alert("ok");
		switch (returnVal.login) {
		case 1:
			window.location.replace("php/welcome.php");

			break;

		case 0:
			if (returnVal.errorCode != 0)
				alert(returnVal.errorCode);
			alert("Wrong Password");
			break;
		}

	});

}	