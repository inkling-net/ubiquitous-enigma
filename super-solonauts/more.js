
function fetchLinks(year, event, list1Text, list2Text) {	
	var list1 = $('<ul>');
	var list2 = $('<ul>');

	for (var i = 0; i < event["links"].length; i++) {
		var tempLi = $('<li>');	
		var trigger, subject, display;
		
		if (event.type === 0) {	
			trigger = year;
			subject = event["links"][i];
			display = event["links"][i];
		}
		else {
			trigger = event["links"][i];
			subject = year;
			display = event["links"][i];
		}
		
		var triggerSelector = getYearSelector(trigger);		
		var subjectSelector = getYearSelector(subject);
		var displaySelector = getYearSelector(display);
		
		var result;
		if (yearIsPrime(triggerSelector)) 
			result = wouldItChange(trigger, subject, "unprime");			
		else
			result = wouldItChange(trigger, subject, "prime");
		
		if (result) 
			list1.append('<li name="' + display + '">' + $(displaySelector).html() + '</li>');
		else 
			list2.append('<li name="' + display + '">' + $(displaySelector).html() + '</li>');
	}
	
	var linksDiv = $('<div>');
	linksDiv.attr("id", "links");
	
	if (list1.children().length !== 0) {
			linksDiv.append('<h4>' + list1Text + '</h4>');
			linksDiv.append(list1);
		}
		
	if (list2.children().length !== 0) {
		linksDiv.append('<h4>' + list2Text + '</h4>');
		linksDiv.append(list2);
	}

	return linksDiv;	
}

function refreshMore() {
	var selector = $('div#timeline ul li.active');
	
	if (selector !== undefined)
		selector.trigger("click");	
}

function hideMore() {
	$(this).removeClass("active");
	$('div#more').fadeOut();
}

function displayMore() {
	makeActive($(this));
	
	var more = $('div#more');
	more.hide();
	more.empty();
	
	var year = $(this).attr('name');
	var event = timeline[year];
	
	var date = $('<h1>');
	if (event.type === 0)
		date.addClass("lynchpin");
	else
		date.addClass("ripple");
	
	var headline = $('<h2>');
	var flavor = $('<h3>');
	
	var selector = getYearSelector(year);	
	if (yearIsPrime(selector)) {
		var html = $(selector).html();
		date.html(html);
		headline.html(event.alt[html]["headline"]);
		flavor.html(event.alt[html]["flavor"]);
	}
	else {
		date.html(year);
		headline.html(event.headline);
		flavor.html(event.flavor);
	}
		
	more.append(date);
	more.append(headline);
	more.append(flavor);
	
	var linksDiv;
	if (event.type === 0) {
		linksDiv = fetchLinks(year, event, "Will Affect", "Helps Affect");
	}
	else if (event.type === 1) {
		linksDiv = fetchLinks(year, event, "Affected By", "Linked To");
	}
	else if (event.type === 2) {
		if (yearIsPrime(selector))
			linksDiv = fetchLinks(year, event, "Either", "Needs");
		else
			linksDiv = fetchLinks(year, event, "Needs", "Requires");
	}
	
	more.append(linksDiv);
	
	if (event.type === 0) {
		var flipLink = $('<h3 class="flip">');
		flipLink.attr("name", year);
		flipLink.html("Flip This");
		
		var needs = event["needs"];
		
		for (item in needs) {		
			var temp = {};
			temp[item] = needs[item];
			
			var count = doYouHave(temp);			
			if (count <= 0) 
				var partialCount = Math.abs(count);
		
			for (var i = 0; i < needs[item]; i++) {
				var iconDiv = $('<div>');
				iconDiv.addClass("icon");
				iconDiv.addClass(item);
				
				if (count > 0) {
					iconDiv.addClass("gtg");
				}
				
				if (partialCount > 0) {
					partialCount--;
					
					if (partialCount === 0)
						partialCount--;
				}
				else if (partialCount !== undefined && partialCount < 0) {
					iconDiv.addClass("gtg");
				}
				
				flipLink.append(iconDiv);
			}
		}
		
		if (doYouHave(needs) > 0) {
			flipLink.addClass("gtg");
			flipLink.bind("click", flip);
			flipLink.css("cursor", "pointer");
		}
		
		more.append(flipLink);		
	}
	
	$('div[id="links"] li').bind("click", switchTo);
	
	more.fadeIn();
}

function switchTo() {
	var selector = getYearSelector($(this).attr("name"));
	$(selector).trigger('click');	
	$('#timeline').animate({ scrollTop: $(selector).offset().top - 75 }, {duration: 'slow', easing: 'swing'});
}

function wouldItChange(trigger, subject, toggle) {
	var selector = getYearSelector(subject);
	var startState = $(selector).html();

	// flip
	var triggerSelector = getYearSelector(trigger);
	if (toggle === "prime") 
		prime(triggerSelector, trigger);
	else
		unprime(triggerSelector, trigger);
	
	var endState = $(selector).html();
	
	var result;
	if (startState === endState)
		result = false;
	else
		result = true;
		
	// then flip back
	if (toggle === "prime")
		unprime(triggerSelector, trigger);
	else
		prime(triggerSelector, trigger);

	return result;
}






