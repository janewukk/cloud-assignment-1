$(document).ready(function(){
	if (window.location.href.indexOf("id_token") >= 0) {
		var urlParams = new URLSearchParams(window.location.href.split("#")[1]);
		id_token = urlParams.get("id_token");
		// Set the region where your identity pool exists (us-east-1, eu-west-1)
		AWS.config.region = 'us-east-2';

		// Configure the credentials provider to use your identity pool
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		    IdentityPoolId: 'us-east-2:dc0f3c05-7dd8-4289-baae-093a3f04f607',
		    Logins: {
				'cognito-idp.us-east-2.amazonaws.com/us-east-2_BTOeq2G7d': id_token
			}
		});
		AWS.config.credentials.get(function(){
			// Credentials will be available when this function is called.
		    var accessKeyId = AWS.config.credentials.accessKeyId;
		    var secretAccessKey = AWS.config.credentials.secretAccessKey;
		    var sessionToken = AWS.config.credentials.sessionToken;
		    apigClient = apigClientFactory.newClient({
				apiKey: 'Wjuixivtg57BT2XHNP4jZ9KHb0zWIsI0lsjCGab0',
				accessKey: accessKeyId,
				secretKey: secretAccessKey,
				sessionToken: sessionToken
			});
		    console.log(accessKeyId);
		    console.log(secretAccessKey);
		    console.log(sessionToken);
		});
	}
	else if(window.location.href.indexOf("code") >= 0){ // Signed in using code: we need to go to oauth2/token to exchange the code for the token
		var urlParams = new URLSearchParams(window.location.search);
		code = urlParams.get("code");
		requestbody = "grant_type=authorization_code&client_id=6tt7bq2ovm0d2vv54ig3rt9om5&code=" + code + "&redirect_uri=https://s3.us-east-2.amazonaws.com/chatboxbj/index.html";
		$.ajax({
			url:"https://chatbotlex.auth.us-east-2.amazoncognito.com/oauth2/token",
			method:"POST",
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: requestbody,

			success:function(data){
				access_token = data['access_token'];
				id_token = data['id_token'];
				refresh_token = data['refresh_token'];
				var urlParams = new URLSearchParams(window.location.href.split("#")[1]);
				// Set the region where your identity pool exists (us-east-1, eu-west-1)
				AWS.config.region = 'us-east-2';

				// Configure the credentials provider to use your identity pool
				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				    IdentityPoolId: 'us-east-2:dc0f3c05-7dd8-4289-baae-093a3f04f607',
				    Logins: {
						'cognito-idp.us-east-2.amazonaws.com/us-east-2_BTOeq2G7d': id_token
					}
				});
				AWS.config.credentials.get(function(){
					// Credentials will be available when this function is called.
				    var accessKeyId = AWS.config.credentials.accessKeyId;
				    var secretAccessKey = AWS.config.credentials.secretAccessKey;
				    var sessionToken = AWS.config.credentials.sessionToken;
				    apigClient = apigClientFactory.newClient({
						apiKey: 'Wjuixivtg57BT2XHNP4jZ9KHb0zWIsI0lsjCGab0',
						accessKey: accessKeyId,
						secretKey: secretAccessKey,
						sessionToken: sessionToken
					});
				    console.log(accessKeyId);
				    console.log(secretAccessKey);
				    console.log(sessionToken);
				});
			}
		});
	}
	else {
		window.location.href = "https://chatbotlex.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=6tt7bq2ovm0d2vv54ig3rt9om5&redirect_uri=https://s3.us-east-2.amazonaws.com/chatboxbj/index.html";
	}
});

function sendMessage() {
	var msg = $('#msg_input').val();
	var outHtml = '<div class="outgoing_msg"><div class="sent_msg"><div class="sent_msg"><p>'+msg+'</p></div></div></div>'
	$('#msg_hist').append(outHtml);

	var body = {
	  "msg": msg,
	};
	console.log(body);

	apigClient.chatbotPost(null, body)
	    .then(function(result){
	    	$('#msg_input').val("");
	    	console.log(result["data"]["body"])
	    	var response = result["data"]["body"];
			var html = '<div class="incoming_msg"><div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">'
			html += '</div><div class="received_msg"><div class="received_withd_msg"><p>'+response+'</p></div></div></div>'
			$('#msg_hist').append(html);
	      // Add success callback code here.
	    })
	    .catch( function(result){
	    	console.log(result);
	      // Add error callback code here.
	      var html = '<div class="incoming_msg"><div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">'
			html += '</div><div class="received_msg"><div class="received_withd_msg"><p>Some Error happen. Please try again later.</p></div></div></div>'
	      	$('#msg_hist').append(html);
	    });	
}


