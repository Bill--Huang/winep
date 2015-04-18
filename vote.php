<?php
	
	header("Access-Control-Allow-Origin: *");

	$client_ip = $_SERVER["REMOTE_ADDR"];

	$dataArra = $_POST;

	$servername = "localhost";
	$username = "root"; //"miugo";
	$password = "root"; //"5dmetp6B";
	$database = "winescore";

	$conn = new mysqli($servername, $username, $password, $database);

	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	if(isIPExist($conn, $client_ip)) {

		// update
		$result = updateData($conn, $database, $client_ip, $dataArra["wineIndex"], $dataArra["wineScore"]);
		if($result === true) {
			//
			$arr = Array('result' => 'success');
			echo json_encode($arr);
		} else {
			//
			$arr = Array('result' => 'failed', 'data' => $result);
			echo json_encode($arr);
		}

	} else {

		// insert
		$result = insertData($conn, $database, $client_ip, $dataArra["wineIndex"], $dataArra["wineScore"]);
		if($result === true) {
			//
			$arr = Array('result' => 'success');
			echo json_encode($arr);

		} else {
			//
			$arr = Array('result' => 'failed', 'data' => $result);
			echo json_encode($arr);
		}
	}

	$conn->close();

	function updateData($c, $database, $ip, $index, $score) {
		$wineIndexName = "w" . ($index + 1);
		$sql = "UPDATE ipscore SET $wineIndexName = '$score' WHERE ip = '$ip'";
		// $sql = "INSERT INTO (ip, " . $wineIndexName . ") VALUES ('$ip', '$score')";
		
		if ($c->query($sql) === true) {
		    // echo "Update record successfully";
		    return true;
		} else {
		    // echo "Error: " . $sql . "<br>" . $c->error;
		    return $c->error;
		    // return false;
		}
	}

	function insertData($c, $database, $ip, $index, $score) {
		$wineIndexName = "w" . ($index + 1);
		$sql = "INSERT INTO ipscore (ip, $wineIndexName) VALUES ('$ip', '$score')";
		// $sql = "INSERT INTO (ip, " . $wineIndexName . ") VALUES ('$ip', '$score')";

		if ($c->query($sql) === true) {
		    // echo "New record created successfully";
		    return true;
		} else {
		    // echo "Error: " . $sql . "<br>" . $c->error;
		    return $c->error;
		    // return false;
		}
	}

	function isIPExist($c, $ip) {
		$sql = "SELECT * FROM ipscore WHERE ip = '" . $ip . "'";
		// echo $sql;
		$result = $c->query($sql);

		if ($result->num_rows > 0) {
		    return true;
		} else {
		    return false;
		}
	}
?>
