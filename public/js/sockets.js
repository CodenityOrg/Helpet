document.addEventListener('onready',function() {

	var ws = new WebSocket("ws://localhost:8080/", "protocolOne");

	ws.onmessage = function(event) {

		var msg = JSON.parse(event.data);
		var notification = document.getElementById("notification").contentDocument;

		switch(msg.type){

			case "post":
				var marker = new google.maps.Marker({
					position: {
						latitude : msg.latitude,
						longitude : msg.longitude
					},
					map: map,
					title: 'Se busca'
				});

				break;
		}
		if (text.lenth) {
			notification.write(text);
		}
	}

})
