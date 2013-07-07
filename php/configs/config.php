<?php session_start();

/*
 * Message for developers:
*develop using object oriented PHP
*
*
*
*
* */
/*
class ConnectDb extends mysqli{
	public $mysqliObject; //make it private to disallow access to connection object by outsiders
	var $hostName = "127.0.0.1";
	var $dbUser = "root";
	var $dbPass = "kasun123";
	var $dbName = "SMART_HOME";
	
	function __construct(){
		parent::mysqli($this->hostName,$this->dbUser, $this->dbPass, $this->dbName);
	}

}


*/

$connection = mysql_connect("127.0.0.1","root","kasun123");

mysql_select_db("SMART_HOME",$connection);


?>
