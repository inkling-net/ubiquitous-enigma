
function showMissions() {
	$('div#missions').fadeIn();
	$('div#navi_tabs li[name="missions"]').removeClass("inactive");
	
	$('div#cards').hide();
	$('div#navi_tabs li[name="cards"]').addClass("inactive");
}

function incrementCounter() {	
	var count = $('h2#counter span').html();
	var countAsInt = parseInt(count, 10);
	countAsInt++;
	
	$('h2#counter span').html(countAsInt);
}

function getNewMission() {
	$('div#missions').empty();	

	var missionsDiv = $('div#missions');
	var missionList = $('<ul>');
	
	var civiliansCopy = civilians.slice();
	for (var i = 0; i < 4; i++) {					// 4 per mission
		var random = Math.floor(Math.random() * civiliansCopy.length);	
		var civilian = makeCivilianMarkup(civiliansCopy[random]);
		missionList.append(civilian);		
		civiliansCopy.splice(random, 1);
	}
	
	missionsDiv.append(missionList);
	$('div#missions ul li.civilian li').bind("click", switchTo);
	highlightCivilians();
	
	resetMissionStatus();
}

function resetMissionStatus() {
	var missionStatus = $('<div>');
	missionStatus.attr("id", "status");
	missionStatus.append('<h2>Greetings, Time Agent! Use items to change history and send these lost civilians home to their proper alternate reality!</h2>');
	
	var counter = $('<h2>');
	counter.attr("id", "counter");
	counter.html('Events flipped: <span>0</span>');
	missionStatus.append(counter);
	
	$('div#missions').append(missionStatus);
}

function triggerMore() {
	var year = $(this).attr("name");
	var timelineSelector = $('div#timeline ul li[name=' + year + ']');
	
	timelineSelector.trigger("click");
}

function makeCivilianMarkup(civilian) {
	var liItem = $('<li>');
	liItem.addClass("civilian");
	liItem.addClass("lost");
	
	var civilianName = $('<h1>');
	civilianName.html(civilian["name"]);
	liItem.append(civilianName);
	
	var reqs = $('<ul>');
	for (var i = 0; i < civilian["years"].length; i++) {
		var yearLi = $('<li>');
		
		var yearRaw = civilian["years"][i];
		if (yearRaw.length > 4)   		//  year is prime, cut off the prime to get selector
			yearRaw = yearRaw.substring(0, 4);
		yearLi.attr("name", yearRaw);		
		
		yearLi.html(civilian["years"][i]);
		reqs.append(yearLi);
	}
	
	liItem.append(reqs);

	return liItem;
}

function highlightCivilians() {
	$('div#missions ul li.civilian.lost').each(function(index) {
	
		var reqs = $(this).find('ul li');
		
		reqs.each(function(index) {
			if (yearMatchesTimeline(this.innerHTML))
				$(reqs[index]).addClass("gtg");
			else
				$(reqs[index]).removeClass("gtg");
		});
		
		var flag = true;
		reqs.each(function(index) {
			if (this.className != "gtg")
				flag = false;
		});
		
		if (flag) {
			$(this).removeClass("lost");
			$(this).addClass("returned");
		}
		
	});
	
	var missionsComplete = allCiviliansReturned();
	if (missionsComplete) {
		var count = $('h2#counter span').html();	
		
		$('div#status').empty();
		$('div#status').append("<h2>Mission Complete!<br>All civilians returned home.</h2>");
		
		var newMission = $('<h2>');					
		console.log("counter = " + count);
		
		newMission.html("You changed " + count + " events total.<br>Click for new mission.");
		newMission.bind("click", getNewMission);
		newMission.hover( function() { $(this).css("cursor", "pointer"); });
				
		$('div#status').append(newMission);		
	}
}

function allCiviliansReturned() {
	var civilians = $('div#missions ul li.civilian');
	
	for (var i = 0; i < civilians.length; i++) {
		if (!$(civilians[i]).hasClass("returned"))
			return false;
	}

	return true;
}

function yearMatchesTimeline(year) {
	var year_raw = year;

	if (year.length > 4)   //  year is prime, cut off the prime to get selector
		year_raw = year.substring(0, 4);		
		
	var selector = $('div#timeline li[name="' + year_raw + '"] h1');
	if (selector.html() === year)
		return true;
	
	return false;
}

var civilians = [
	{name : "Andy", years : ["1939a", "1969", "1986a"]},
	{name : "Angela", years : ["1917a", "1929a", "1945"]},
	{name : "Betty", years : ["1945", "1968a", "1969a"]},
	{name : "Dale", years : ["1933a", "1948", "1991a"]},
	{name : "Fruity", years : ["1868a", "1933a", "1986"]},
	{name : "Ginohn", years : ["1868", "1944a", "1999a"]},
	{name : "Gunther", years : ["1917a", "1918a", "1950"]},
	{name : "Herb", years : ["1918a", "1929a", "1939"]},
	{name : "Isaac", years : ["1933a", "1969a", "1999"]},
	{name : "Johnson", years : ["1868", "1945a", "1950a"]},
	{name : "Mason", years : ["1974a", "1995", "1999a"]},
	{name : "Mojo", years : ["1933", "1939a", "1986a"]},
	{name : "Mr. X", years : ["1950a", "1968", "1995a"]},
	{name : "Oliver", years : ["1917a", "1929", "1974a"]},
	{name : "Rainbow", years : ["1948", "1968a", "1986a"]},
	{name : "Renee", years : ["1917", "1929a", "1948a"]},
	{name : "Rufus", years : ["1944a", "1950", "1995a"]},
	{name : "Squa", years : ["1933", "1950a", "1962a"]},
	{name : "Timmy", years : ["1918a", "1944", "1999a"]},
	{name : "Turtle", years : ["1868a", "1968a", "1991"]},
	{name : "Tyb", years : ["1942a", "1969", "1986a"]},
	{name : "Walter", years : ["1868a", "1948a", "1974"]},
	{name : "Werner", years : ["1939a", "1974a", "1991"]},
	{name : "Yitz", years : ["1918", "1942", "1995a"]},
	{name : "Yuri", years : ["1969a", "1991a", "1995"]},
	{name : "Zane", years : ["1918", "1948a", "1962a"]}	
];