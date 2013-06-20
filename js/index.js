/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var isConnected = false;
var isHighSpeed = false;
var isPhoneGapReady = false;
 
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		 $('#btn001').click(function() {
				alert("Handler for .click() called.");
		});
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('load', this.onLoad, false);
		document.addEventListener('offline', this.onOffline, false);
		document.addEventListener('online', this.onOnline, false);
		
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    onLoad: function() {
        app.receivedEvent('load');
    },

    onOffline: function() {
        app.receivedEvent('offline');
    },

	onOnline: function() {
        app.receivedEvent('online');
    },

	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
   
		switch (id) {
			case 'deviceready':
				onDeviceReady();
				displayPhoneStatus();
			case 'load':
				console.log('receivedEvent  ' + id);
				displayPhoneStatus();
			case 'offline':
				console.log('receivedEvent  ' + id);
				onOffline();
				displayPhoneStatus();
			case 'online':
				console.log('receivedEvent  ' + id);
				onOnline();
				displayPhoneStatus();
			break;
			default:
				console.log('receivedEvent unhandled! ' + id);
			break;
		}
		
         console.log('Received Event:(' + id + ')');
		
    }
	
}




function onOnline() {
	// set status
	console.log('onOnline ...');
	networkDetection();
	isConnected = true;
}
function onOffline() {
	// set status
	console.log('onOffline ...');
	networkDetection();
	isConnected = false;
}

function networkDetection() {
	
	

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
	
	
	if (isPhoneGapReady) {

		isConnected = false;
		isHighSpeed = false;

		var networkState = navigator.network.connection.type;
	
	
		// determine if this connection is high speed or not
		switch (networkState) {
			case Connection.NONE:
				console.log('sw0');
				isConnected = false;
				isHighSpeed = false;
			case Connection.ETHERNET:
			case Connection.WIFI:
			case Connection.CELL_3G:
			case Connection.CELL_4G:
				console.log('sw1');
				isConnected = true;
				isHighSpeed = true;
			case Connection.CELL_2G:
				console.log('sw3');
				isConnected = true;
				isHighSpeed = false;
			break;
		}

		console.log('networkDetection ... ' + states[networkState] + ' ' + isConnected + ' ' + isHighSpeed );
	}
}

function onDeviceReady() {
	console.log('onDeviceReady...');
	// set to true
	isPhoneGapReady = true;
	// detect for network access
	networkDetection();
}

function displayPhoneStatus() {

console.log('displayPhoneStatus ...');

var element = document.getElementById('deviceProperties');

var time_stamp = new Date().getTime();

element.innerHTML = 
							'Time: ' + time_stamp + '<br />' + 
							'Device Name: '     + device.name     + '<br />' + 
                            'Device Cordova: '  + device.cordova  + '<br />' + 
                            'Device Platform: ' + device.platform + '<br />' + 
                            'Device UUID: '     + device.uuid     + '<br />' + 
                            'Device Version: '  + device.version  + '<br />' +
							'isConnected: '  + isConnected  + '<br />' +
							'isHighSpeed: '  + isHighSpeed  + '<br />' +
							'isPhoneGapReady: '  + isPhoneGapReady  + '<br />';

	
}

  // alert dialog dismissed
    function alertDismissed() {
        // do something
    }


 function showAlert() {
        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
 }
 
 
