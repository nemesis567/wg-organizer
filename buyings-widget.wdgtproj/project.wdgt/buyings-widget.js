// This file was generated by Dashcode from Apple Inc.
// You may edit this file to customize your Dashboard widget.

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    setupParts();
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    loadPreferences();
	
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
	savePreferences();
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}



function savePreferences() {
	widget.setPreferenceForKey(prefServer.value, widget.identifier + "-server");
	widget.setPreferenceForKey(prefUsername.value, widget.identifier + "-username" );
	widget.setPreferenceForKey(prefPassword.value, widget.identifier + "-password" );
}

function loadPreferences() {
	prefServer.value = get_preference("server");
	prefUsername.value = get_preference("username");
	prefPassword.value = get_preference("password");
}

function get_preference(key) {
	value = widget.preferenceForKey(widget.identifier + "-" + key);
	if ( value ) return value;
	else return "";
}


function submit_buyings(event)
{
	loadPreferences();
	
    var feedURL = prefServer.value + "/api/buyings/create";
	var onloadHandler = function() { xmlLoaded(xmlRequest); };	

    // XMLHttpRequest setup code
	var xmlRequest = new XMLHttpRequest();
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("POST", feedURL);
	xmlRequest.setRequestHeader("Cache-Control", "no-cache");
	xmlRequest.send(null);

	
}

// Called when an XMLHttpRequest loads a feed; works with the XMLHttpRequest setup snippet
function xmlLoaded(xmlRequest) 
{
	if (xmlRequest.status == 200) {
		// Parse and interpret results
		// XML results found in xmlRequest.responseXML
		// Text results found in xmlRequest.reponseText
		alert("OK");
	}
	else {
		alert("Error fetching data: HTTP status " + xmlRequest.status);
	}
}


function openProjectHomepage(event)
{
    // Values you provide
	var websiteURL = "http://www.github.com/velrok/wg-organizer";	
	widget.openURL(websiteURL);
}
