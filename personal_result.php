<?php
	
	header("Access-Control-Allow-Origin: *");

	$dataArra = $_POST;

	// client ip is uid
	$client_ip = $dataArra["uid"];
	// $client_ip = $_SERVER["REMOTE_ADDR"];

	$servername = "localhost";
	$username = "root"; //"miugo";
	$password = "root"; //"5dmetp6B";
	$database = "winescore";

	$conn = new mysqli($servername, $username, $password, $database);

	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	getData($conn, $database, $client_ip);
	$conn->close();

	function getData($c, $database, $ip) {
		$resultArra = array();

		$sql = "SELECT * FROM ipscore WHERE ip = '" . $ip . "'";

		$result = $c->query($sql);

		if ($result->num_rows > 0) {
			$row = $result->fetch_array();

			if(isset($row['w1'])) {
				$resultArra['w1'] = $row['w1'];
			} else {
				$resultArra['w1'] = '5';
			}
			if(isset($row['w2'])) {
				$resultArra['w2'] = $row['w2'];
			} else {
				$resultArra['w2'] = 5;
			}
			if(isset($row['w3'])) {
				$resultArra['w3'] = $row['w3'];
			} else {
				$resultArra['w3'] = 5;
			}
			if(isset($row['w4'])) {
				$resultArra['w4'] = $row['w4'];
			} else {
				$resultArra['w4'] = 5;
			}
			if(isset($row['w5'])) {
				$resultArra['w5'] = $row['w5'];
			} else {
				$resultArra['w5'] = 5;
			}
		} else {
			$resultArra['result'] = 'failed';
			echo json_encode($resultArra);
		    return false;
		}

		$resultArra['result'] = 'success';
		// return json data
		echo json_encode($resultArra);

		return true;
	}
?>
