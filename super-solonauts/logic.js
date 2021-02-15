
function resetAll() {
	$('div#timeline ul li').removeClass("active");
}

function makeActive(selector) {	
	resetAll();
	selector.addClass("active");
}

function flip() {
	var year = $(this).attr("name");
	var selector = getYearSelector(year);
	
	var cards = timeline[year].needs;
	spendThese(cards);
	
	if (yearIsPrime(selector)) {
		unprime(selector, year);
	}
	else {
		prime(selector, year);
	}
	
	$(selector).trigger('click');
	highlightCivilians();
}

function prime(selector, year) {
	// prime the year
	$(selector).html(year + "a");
	
	// check its ripples
	var ripples = timeline[year].links;
	
	for (var i = 0; i < ripples.length; i++) {
		var ripple = timeline[ripples[i]];
		var rippleSelector = getYearSelector(ripple.year);
		
		// is the ripple of type 2? (and)
		if (ripple.type == 2) {
			// yes, check out its links before priming
			var flag = checkAnd(ripple);
			if (flag === true) 
				$(rippleSelector).html(ripple.year + "a");			
		}
		else {
			// no, go ahead and prime it
			$(rippleSelector).html(ripple.year + "a");
		}
	}	
}

function checkAnd(ripple) {
	var lynchpins = timeline[ripple.year].links;
	
	for (var i = 0; i < lynchpins.length; i++) {
		var lynchpinSelector = getYearSelector(lynchpins[i]);
		
		if (!yearIsPrime(lynchpinSelector))
			return false;
	}

	return true;
}

function unprime(selector, year) {
	// unprime the year
	$(selector).html(year);
	
	// check its ripples
	var ripples = timeline[year].links;
	
	for (var i = 0; i < ripples.length; i++) {	
		var ripple = timeline[ripples[i]];
		var rippleSelector = getYearSelector(ripple.year);		
	
		// is the ripple of type 1? (or)
		if (ripple.type == 1) {
			// yes, check out its links before unpriming

			var flag = checkOr(ripple);
			if (flag === true)
				$(rippleSelector).html(ripple.year);		
		}
		else {
			// no, go ahead and unprime it
			$(rippleSelector).html(ripple.year);
		}
	}
}

function checkOr(ripple) {
	var lynchpins = timeline[ripple.year].links;
	
	for (var i = 0; i < lynchpins.length; i++) {
		var lynchpinSelector = getYearSelector(lynchpins[i]);
		
		if (yearIsPrime(lynchpinSelector))
			return false;
	}
	
	return true;
}

function getYearSelector(year) {
	var selector = $('div#timeline ul li[name="' + year + '"] h1');
	return selector;
}

function yearIsPrime(selector) {
	var html = $(selector).html();
	if (html.length > 4)
		return true;
			
	return false;
}
