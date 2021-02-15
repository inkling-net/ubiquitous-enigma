
$(document).ready(function() {

	console.log("Initiatilizing timeline...");
	initTimeline();	
	
	console.log("Building timeline markup...");
	buildTimeline();
	
	console.log("Creating mission log...");
	getNewMission();
	
	console.log("Binding timeline events...");
	$('div#timeline ul li').bind("click", displayMore);		
	
	console.log("Binding Mission navigation tab...");
	$('div#navi_tabs li[name="missions"]').bind("click", showMissions);
	
	console.log("Binding Cards navigation tab...");
	$('div#navi_tabs li[name="cards"]').bind("click", showCards);
	
	console.log("Highlighting civilians...");
	highlightCivilians();	
	
	console.log("Dealing cards...");
	dealCards(7);
	
});
