<?php

	header("Access-Control-Allow-Origin: *");

	$servername = "localhost";
	$username = "root"; //"miugo";
	$password = "root"; //"5dmetp6B";
	$database = "winescore";

	$conn = new mysqli($servername, $username, $password, $database);

	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	getData($conn, $database);
	$conn->close();

	function getData($c, $database) {
		$resultArra = array();
		$scoreArra1 = array();
		$scoreArra2 = array();
		$scoreArra3 = array();
		$scoreArra4 = array();
		$scoreArra5 = array();

		$sql = "SELECT * FROM ipscore";

		$result = $c->query($sql);

		if ($result->num_rows > 0) {
			while($row = $result->fetch_array()) {
				// echo "length: " . count($row);
				// echo var_dump($row);

				// 获取数据库数据，统计，并返回 json 数据
				if(isset($row['w1'])) {
					array_push($scoreArra1, $row['w1']);
				}
				if(isset($row['w2'])) {
					array_push($scoreArra2, $row['w2']);
				}
				if(isset($row['w3'])) {
					array_push($scoreArra3, $row['w3']);
				}
				if(isset($row['w4'])) {
					array_push($scoreArra4, $row['w4']);
				}
				if(isset($row['w5'])) {
					array_push($scoreArra5, $row['w5']);
				}
            }
		} else {
			$resultArra['result'] = 'failed';
			echo json_encode($resultArra);
		    return false;
		}

		$total = array($scoreArra1, $scoreArra2, $scoreArra3, $scoreArra4, $scoreArra5);

		for ($i=0; $i < count($total); $i++) { 
			$tempS = 0;
			
			for ($j = 0; $j < count($total[$i]); $j++) { 
				$tempS += $total[$i][$j];
			}

			// array_push($resultArra, $tempS / count($total[$i]));
			$resultArra["w".($i + 1)] = $tempS / count($total[$i]);
		}

		$resultArra['result'] = 'success';
		// return json data
		echo json_encode($resultArra);

		return true;
	}
?>
