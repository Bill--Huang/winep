<?php
	header("Access-Control-Allow-Origin: *");

	// for session
	$uid = uniqid("bill_", true);

	$servername = "localhost";
	$username = "root"; //"miugo";
	$password = "root"; //"5dmetp6B";
	$database = "winescore";

	$conn = new mysqli($servername, $username, $password, $database);

	if(insertData($conn, $username, $uid)){
		$arr = Array('uid' => $uid);
		echo json_encode($arr);
	}

	function insertData($c, $database, $ip) {

		$sql = "INSERT INTO ipscore (ip) VALUES ('$ip')";

		if ($c->query($sql) === true) {
		    // echo "New record created successfully";
		    return true;
		} else {
		    // echo "Error: " . $sql . "<br>" . $c->error;
		    return $c->error;
		    // return false;
		}
	}

	