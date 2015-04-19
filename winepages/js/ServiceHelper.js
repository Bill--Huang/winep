var ServiceHelper = {

	sendURL: 'http://' + document.domain + ':8080/vote.php',
	getURL1: 'http://' + document.domain + ':8080/personal_result.php',
	getURL: 'http://' + document.domain + ':8080/average_result.php',
	
	sessionURL: 'http://' + document.domain + ':8080/get_session.php',
	getWineScoreRequest: function (jsonData, successCallback, errorCallback) {
		ServiceHelper.sendAjax(ServiceHelper.getURL, jsonData, successCallback, errorCallback);
	},

	getPersonalWineScoreRequest: function (jsonData, successCallback, errorCallback) {
		ServiceHelper.sendAjax(ServiceHelper.getURL1, jsonData, successCallback, errorCallback);
	},

	sendSessionRequest: function (jsonData, successCallback, errorCallback) {
		// must be sync
		ServiceHelper.sendSyncAjax(ServiceHelper.sessionURL, jsonData, successCallback, errorCallback);
	},

	sendUpdateWineScore: function (jsonData, successCallback, errorCallback) {
		// body...
		ServiceHelper.sendAjax(ServiceHelper.sendURL, jsonData, successCallback, errorCallback);
		
	},

	sendSyncAjax: function(reqURL, jsonData, successCallback, errorCallback) {
		// alert(jsonData);
		$.ajax({
			url: reqURL,
		    type:'post', 
		    data: jsonData,   
    		cache: true,    
    		dataType:'json', 
    		async:false,
		    success: function(data, textStatus) {
		    	successCallback(data);
		    	// console.log(textStatus);
	         	// console.log(data);
		    },

		    error: function(XMLHttpRequest, textStatus, errorThrown) {    
	         	// console.log(XMLHttpRequest); 
	         	// console.log(textStatus);
	         	// console.log(errorThrown);
	         	errorCallback();   
	    	}
		});
	},

	sendAjax: function(reqURL, jsonData, successCallback, errorCallback) {
		// alert(jsonData);
		$.ajax({
			url: reqURL,
		    type:'post', 
		    data: jsonData,   
    		cache: true,    
    		dataType:'json', 

		    success: function(data, textStatus) {
		    	successCallback(data);
		    	// console.log(textStatus);
	         	// console.log(data);
		    },

		    error: function(XMLHttpRequest, textStatus, errorThrown) {    
	         	// console.log(XMLHttpRequest); 
	         	// console.log(textStatus);
	         	// console.log(errorThrown);
	         	errorCallback();   
	    	}
		});
	},

	decimal: function(num,v){
		var vv = Math.pow(10,v);
		return Math.round(num*vv)/vv;
	},

};