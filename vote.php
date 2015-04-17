<?php
	
	// header('Content-type:application/json; charset=UTF-8');

	$client_ip = $_SERVER["REMOTE_ADDR"];
	// $client_ip = "1.1.1.2";
	// echo $client_ip;
	// echo "1";
	// get post json
	$dataArra = $_POST;
	// echo json_encode($dataArra);

	$servername = "localhost";
	$username = "root";
	$password = "root";
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
		// echo "<br>";
		$sql = "UPDATE ipscore SET $wineIndexName = '$score' WHERE ip = '$ip'";
		// $sql = "INSERT INTO (ip, " . $wineIndexName . ") VALUES ('$ip', '$score')";
		// echo $sql;
		// echo "<br>";
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
		// echo "<br>";
		$sql = "INSERT INTO ipscore (ip, $wineIndexName) VALUES ('$ip', '$score')";
		// $sql = "INSERT INTO (ip, " . $wineIndexName . ") VALUES ('$ip', '$score')";
		// echo $sql;
		// echo "<br>";
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





	////////////////////////////
	// $arr = Array('1'=>'one', '2'=>'two', '3'=>'three');
	// echo json_encode($_POST);
	// $arr[$key] = $val;
	// array_key_exists(key, search);

	
	// echo json_encode($arr);


	// $servername = "192.168.31.190:8889";
	// $username = "admin";
	// $password = "admin";
	// $database = "winescore";
	// // 创建连接
	// $conn = mysql_connect($servername, $username, $password);
	// mysql_select_db($database, $con);

	// if (!$con) {
	// 	die('Could not connect: ' . mysql_error());
	// }
	// $result = mysql_query("SELECT * FROM ipscore");

	// while($row = mysql_fetch_array($result)) {
	// 	echo $row['ip'] . " " . $row['w1'] . " " . $row['w2'] . " " . $row['w3'] . " " . $row['w4'] . " " . $row['w5'];
	// 	echo "<br />";
	// }

	// mysql_close($con);
?>
