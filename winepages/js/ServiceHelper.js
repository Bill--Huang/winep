var ServiceHelper = {

	sendURL: 'http://' + window.location.host + '/vote.php',
	getURL1: 'http://' + window.location.host + '/personal_result.php',
	getURL: 'http://' + window.location.host + '/average_result.php',
	
	getWineScoreRequest: function (jsonData, successCallback, errorCallback) {
		ServiceHelper.sendAjax(ServiceHelper.getURL, jsonData, successCallback, errorCallback);
	},

	getPersonalWineScoreRequest: function (jsonData, successCallback, errorCallback) {
		ServiceHelper.sendAjax(ServiceHelper.getURL1, jsonData, successCallback, errorCallback);
	},

	sendSessionRequest: function (jsonData, successCallback, errorCallback) {
		// ServiceHelper.sendAjax(ServiceHelper.url, jsonData, successCallback, errorCallback);
	},

	sendUpdateWineScore: function (jsonData, successCallback, errorCallback) {
		// body...
		ServiceHelper.sendAjax(ServiceHelper.sendURL, jsonData, successCallback, errorCallback);
		
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
	         	// console.log(XMLHttpRequest); 
	         	console.log(textStatus);
	         	console.log(errorThrown);
	         	errorCallback();   
	    	}
		    
		});
	},

	decimal: function(num,v){
		var vv = Math.pow(10,v);
		return Math.round(num*vv)/vv;
	},

};