//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////js pour NB4.html/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function Clic()
 {
	if (System.Gadget.Flyout.show==false)
	 {
		System.Gadget.Flyout.file="Flyout.html";
		location.reload();
		System.Gadget.Flyout.show=true;
	 }
 	else
	 {
		System.Gadget.Flyout.show=false;
	 }
 }


function taille()
 {
    document.body.style.width =130;
    document.body.style.height=67;
    document.body.style.margin=0;
 }


///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////js pour Flyout.html////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


function Change_ip()
 {
		if ((System.Gadget.Settings.readString("WEBLOGIN") == "")||(System.Gadget.Settings.readString("WEBPASS") == ""))
		{
			System.Shell.execute("erreur.vbs", "", System.Gadget.path);
			return;
		}
		else
		{
			var WEBLOGIN = System.Gadget.Settings.readString("WEBLOGIN");
			var WEBPASS = System.Gadget.Settings.readString("WEBPASS");
			var IP = System.Gadget.Settings.readString("IP");
			var random = Math.floor(Math.random() * 99999)+1;
		}
	
	if (System.Gadget.Settings.readString("theme") == "nb6.png")
	{
		var Fonction="-q http://" + IP + "/login --referer=\"http://" + IP + "/login?page_ref=/network/wan\"  http://" + IP + "/network/wan --post-data=\"method=passwd&zsid=&login=" + WEBLOGIN + "&password=" + WEBPASS + "&submit_button&ppp_login=&ppp_password=" + random + "\" -O NUL:";
		System.Shell.execute("wget.exe", Fonction, System.Gadget.path);
	}
	else
	{
		var Fonction="-q http://" + IP + "/login --referer=\"http://" + IP + "/login?page_ref=/network/wan\"  http://" + IP + "/network/wan --post-data=\"method=passwd&zsid=&login=" + WEBLOGIN + "&password=" + WEBPASS + "&submit_button&ppp_login=&ppp_password=" + random + "\" -O NUL:";
		System.Shell.execute("wget.exe", Fonction, System.Gadget.path);
		var Fonction="-q http://" + IP + "/0_2 --referer=\"http://" + IP + "/0_2?page_ref=/2_1\"  http://" + IP + "/2_1 --post-data=\"method=passwd&web_challenge=&web_login=" + WEBLOGIN + "&web_password=" + WEBPASS + "&submit_button&net_infra=adsl&net_mode=router&ppp_login=&ppp_password=" + random + "\" -O NUL:";
		System.Shell.execute("wget.exe", Fonction, System.Gadget.path);
	}
	
	masquer()
 }


function IP() {
	TD = document.getElementById('ip_externe');
	TXT=document.createTextNode("Chargement...");
	TD.appendChild(TXT);
	document.getElementById('ip_externe').appendChild(TD);

	var IP = System.Gadget.Settings.readString("IP");
	var doc ="http://"+IP+"/api/?method=ppp.getInfo";
	var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async = false;
	if (xmlDoc.load(doc))
	 {
		var Results = xmlDoc.selectSingleNode("/rsp/ppp/@ip_addr").text;
		if (Results == "")
		 {
			var element = document.getElementById('ip_externe');
			while (element.firstChild) {element.removeChild(element.firstChild);}
			TD = document.getElementById('ip_externe');
			TXT=document.createTextNode("Pas de connexion");
			TD.appendChild(TXT);
			document.getElementById('ip_externe').appendChild(TD);
		 }
		else
		 {
			var element = document.getElementById('ip_externe');
			while (element.firstChild) {element.removeChild(element.firstChild);}
			TD = document.getElementById('ip_externe');
			TXT=document.createTextNode(Results);
			TD.appendChild(TXT);
			document.getElementById('ip_externe').appendChild(TD);
			CheckForUpdate()
		 }
	 }
	else
	 {
		var element = document.getElementById('ip_externe');
		while (element.firstChild) {element.removeChild(element.firstChild);}
		TD = document.getElementById('ip_externe');
		TXT=document.createTextNode("Pas de connexion");
		TD.appendChild(TXT);
		document.getElementById('ip_externe').appendChild(TD);
	 }
	xmlDoc=null;
}

function CheckForUpdate()
{
if (System.Gadget.Settings.readString("update")!= "False")
	{
		var doc ="http://nbreboot.sylvainmenu.com/version.php";
		var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.onreadystatechange = function() {
		if(xmlDoc.readyState == 4 && xmlDoc.status==200){}};
			if(xmlDoc.load(doc))
			 {
				var Results = xmlDoc.selectSingleNode("/gadget/@version").text;
				xmlDoc=null;

				if(Results > System.Gadget.version)
					 {
						var element = document.getElementById('ip_externe');
						while (element.firstChild) {element.removeChild(element.firstChild);}
						TD = document.getElementById('ip_externe');
						TXT=document.createTextNode("Mise à jour disponible");
						TD.appendChild(TXT);
						document.getElementById('ip_externe').replaceChild(TD);
					 }
			 }
	}
}
function CheckForUpdate2(){
	var xhr = getXhr()
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var xmlDoc = xhr.responseXML;
			var Results = xmlDoc.selectSingleNode("/gadget/@version").text;
				if(Results > System.Gadget.version)
					 {
						var element = document.getElementById('ip_externe');
						while (element.firstChild) {element.removeChild(element.firstChild);}
						TD = document.getElementById('ip_externe');
						TXT=document.createTextNode("Mise à jour disponible");
						TD.appendChild(TXT);
						document.getElementById('ip_externe').replaceChild(TD);
					 }
		}
	}
	xhr.open("GET","http://nbreboot.sylvainmenu.com/version.php" ,true);
	//xhr.open("GET","gadget.xml" ,true);
	xhr.send(null);
}

function site()
 {
	if(ip_externe.innerText == "Mise à jour disponible")
	 {
		System.Shell.execute("http://nbreboot.sylvainmenu.com/");
	 }
	else
	 {
		if (System.Gadget.Settings.readString("IP") == "")
		 {
			var IP="192.168.1.1";
		 }
		else
		 {
			var IP = System.Gadget.Settings.readString("IP");
		 }	
		System.Shell.execute("http://" + IP);
	 }
 }


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////js pour settings.html///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


function init()
 {
	var temp = System.Gadget.Settings.readString("WEBLOGIN");
	if (temp  != "") {Weblogin.innerText = temp ;}
	else Weblogin.innerText = "admin"

	var temp = System.Gadget.Settings.readString("WEBPASS");
	if (temp  != "") {Webpass.innerText = temp ;}

	var temp = System.Gadget.Settings.readString("IP");
	if (temp  != "") {Ip.innerText = temp ;}
	else Ip.innerText = "192.168.1.1"

	Themes.value = System.Gadget.Settings.read("theme");
	displayTheme2()
	
	var up = System.Gadget.Settings.readString("update");
	if ((up  != "True")&&(up  != "False")) {autoupdate.checked = true}
	if (up  == "True") {autoupdate.checked = true}
	if (up  == "False") {autoupdate.checked = false}
 }



function Save() 
 {
	System.Gadget.Settings.writeString("WEBLOGIN", Weblogin.value);
	System.Gadget.Settings.writeString("WEBPASS", Webpass.value);
	System.Gadget.Settings.writeString("IP", Ip.value);
	System.Gadget.Settings.writeString("theme", Themes.value);
	System.Gadget.Settings.writeString("update", autoupdate.checked);
 }

System.Gadget.onSettingsClosing = SettingsClosing;

function SettingsClosing(event)
{
	if (event.closeAction == event.Action.commit) {Save();}
	event.cancel = false;
}


 function change_onglet(name)
{
	document.getElementById('onglet_'+anc_onglet).className = 'onglet_0 onglet';
	document.getElementById('onglet_'+name).className = 'onglet_1 onglet';
	document.getElementById('contenu_onglet_'+anc_onglet).style.display = 'none';
	document.getElementById('contenu_onglet_'+name).style.display = 'block';
	anc_onglet = name;
}


function displayTheme()
{
 		if(System.Gadget.Settings.readString("theme") == "")
		{
			System.Gadget.Settings.writeString("theme", "sfr.png");
		}
	imgBackground.src = "images/" + System.Gadget.Settings.readString("theme");
}


function displayTheme2()
{
	imgBackground.src = "images/" + Themes.value;
}
