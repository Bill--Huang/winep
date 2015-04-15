var ServiceHelper = {

	getWindScoreRequest: function (jsonData, successCallback, errorCallback) {
		ServiceHelper.sendAjax('http://192.168.1.104:8080/', jsonData, successCallback, errorCallback);
	},

	sendSessionRequest: function (jsonData, successCallback, errorCallback) {
		ServiceHelper.sendAjax('http://192.168.1.104:8080/', jsonData, successCallback, errorCallback);
	},

	sendUpdateWineScore: function (jsonData, successCallback, errorCallback) {
		// body...
		ServiceHelper.sendAjax('http://192.168.1.104:8080/', jsonData, successCallback, errorCallback);
		
	},

	sendAjax: function(reqURL, jsonData, successCallback, errorCallback) {
		$.ajax({
			url: reqURL,
		    type:'post', 
		    data: jsonData,   
    		cache: true,    
    		dataType:'json', 

		    success: function(data, textStatus) {
		    	successCallback(data);
		    	console.log(textStatus);
	         	console.log(data);
		    },

		    error: function(XMLHttpRequest, textStatus, errorThrown) {    
	         	console.log(XMLHttpRequest); 
	         	console.log(textStatus);
	         	console.log(errorThrown);
	         	errorCallback();   
	    	}
		    
		});
	},

};