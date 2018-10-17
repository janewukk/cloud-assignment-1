function sendMessage()
{
	var msg = $('#msg_input').val();
	var outHtml = '<div class="outgoing_msg"><div class="sent_msg"><div class="sent_msg"><p>'+msg+'</p></div></div></div>'
	$('#msg_hist').append(outHtml);

	var apigClient = apigClientFactory.newClient({
	  apiKey: 'Wjuixivtg57BT2XHNP4jZ9KHb0zWIsI0lsjCGab0'
	});
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