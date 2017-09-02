var user = {
	create : function(form) {

		var xhttp = new XMLHttpRequest();
		var formData = new FormData(form);

		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		       // Typical action to be performed when the document is ready:
		       document.getElementById("demo").innerHTML = xhttp.responseText;
		    }
		};

		xhttp.open("POST", "http://localhost:3000/post");
		xhttp.send(formData);
	},
	login: function(form) {

		var xhttp = new XMLHttpRequest();
		var formData = new FormData(form);

		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		       // Typical action to be performed when the document is ready:
		       document.getElementById("demo").innerHTML = xhttp.responseText;
		    }
		};

		xhttp.open("POST", "http://localhost:3000/post");
		xhttp.send(formData);


	}
}
