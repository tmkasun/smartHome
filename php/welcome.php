<?php session_start();

?>
<html>
<head>
<title>
Welcome To Smart Home
</title>

<script type="text/javascript">

function loadIpCamPage() {
	window.location.replace("http://192.168.0.2:81");
	
}
function loadNasAdminPage() {
	window.location.replace("http://192.168.0.3");
	
}

function loadTorrentPage() {
	window.location.replace("http://192.168.0.3:9090/gui");
	
}

</script>
</head>
<body>
<button onclick="loadIpCamPage()" >IPCam page</button>
<button>Web Service</button>
<button onclick="loadNasAdminPage()">NAS Admin panel</button>
<button onclick="loadTorrentPage()" >Torrent Page</button>
</body>
</html>
<?php
?>