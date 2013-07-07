<?php 
if(!session_id())
	session_start();
//session start to identify login users and etc
/*
 * Message for developers:
*
* */

//null password or direct call to singup.php
error_reporting(E_ALL ^ E_NOTICE);
if (!$_POST["password"]){

	die("NULL_Password");
}

require_once '../php/configs/config.php';

$jasonReturn = new ArrayObject();
$jasonReturn["login"] = 0;
$jasonReturn["errorCode"] = 0;

/*
$connection = new ConnectDb();

if($connection->connect_errno>0){
	$jasonReturn["errorCode"] = $connection->connect_error;
}

$userName = $connection->real_escape_string($_POST["username"]);
*/

$userName = mysql_real_escape_string($_POST["username"]);
$password = md5($_POST["password"]);
$passwordCheckQuery = "select null from members where email_address = '$userName' and password = '$password' ";

/*
 * oop method
if(!($result = $connection->query("select null from members where email_address = '$userName' and password = '$password' "))){
	$jasonReturn["errorCode"] = $connection->connect_error;
}

if($result->num_rows > 0){
	$jasonReturn["login"] = 1;
	$_SESSION["member_email"] = $_POST["username"];

	$mysql_date_time = date("Y-m-d H:i:s");
	$host_name =  gethostbyaddr($_SERVER['REMOTE_ADDR']);
	$ip_address = get_real_up_address();
	$hit_count = "insert into track(email_address,date_time,ip_addr,host_name,browser_details) values('$_POST[username]','$mysql_date_time','$ip_address','$host_name','$_SERVER[HTTP_USER_AGENT]')";

	if(!$connection->query($hit_count)){
		$jasonReturn["errorCode"] = $connection->connect_error;
	}
	
}

*/

$returnSqlResult = mysql_query($passwordCheckQuery,$connection);

if(!$returnSqlResult)
	die(mysql_error($connection));

if(mysql_num_rows($returnSqlResult)>0){

	$jasonReturn["login"] = 1;
	$_SESSION["member_email"] = $_POST["username"];
	
	$mysql_date_time = date("Y-m-d H:i:s");
	$host_name =  gethostbyaddr($_SERVER['REMOTE_ADDR']);
	$ip_address = get_real_up_address();
	$hit_count = "insert into track(email_address,date_time,ip_addr,host_name,browser_details) values('$_POST[username]','$mysql_date_time','$ip_address','$host_name','$_SERVER[HTTP_USER_AGENT]')";
	if(!mysql_query($hit_count,$connection))
		$jasonReturn["errorCode"] = mysql_error($connection);
}



print json_encode($jasonReturn);

/*

else if($row["loginApprovalBit"] == "0" || $row["loginApprovalBit"] == "2" ){

	$_SESSION["computer_number"] = $_POST["username"];
	//administrator loging cheack
	$admin_chk = "select null from administrators where computer_number = '$_SESSION[computer_number]'";
	$admin_rs = mysql_query($admin_chk,$connection);
	$get = mysql_fetch_row($admin_rs);
	if($get){
		echo("Administrative account");
		$_SESSION["admin"] = true;
	}
	else
		$_SESSION["admin"] = false;

	//administrator cheack script end -
}

/*
 * A function to get the real IP address of the client even comming via proxy
* reffrence = http://www.kmbytes.com/how-to-get-clients-ip-of-the-users-that-visit-your-website/
* */

function get_real_up_address() {

	if (isset($_SERVER)) {
		if (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
			return $_SERVER["HTTP_X_FORWARDED_FOR"];
		if (isset($_SERVER["HTTP_CLIENT_IP"]))
			return $_SERVER["HTTP_CLIENT_IP"];
		return $_SERVER["REMOTE_ADDR"];
	}

	if (getenv(“HTTP_X_FORWARDED_FOR”))
		return getenv(“HTTP_X_FORWARDED_FOR”);
		if (getenv(“HTTP_CLIENT_IP”))
			return getenv(“HTTP_CLIENT_IP”);
			if (getenv(“REMOTE_ADDR”))
				return getenv(“REMOTE_ADDR”);

				return “UNKNOWN”;

}
?>

