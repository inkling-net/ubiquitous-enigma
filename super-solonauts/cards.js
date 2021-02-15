
function showCards() {
	$('div#cards').fadeIn();
	$('div#navi_tabs li[name="cards"]').removeClass("inactive");
	
	$('div#missions').fadeOut();
	$('div#navi_tabs li[name="missions"]').addClass("inactive");
}

function Card(name, icon) {	
	this.name = name;
	this.icon = icon;
	this.make = function() {
		var liItem = $('<li>');
		liItem.attr("name", name);
		liItem.html(this.name);
		liItem.bind("click", toggleForTrade);
		liItem.css("background-image", "url('" + icon + "')");
		
		return liItem;
	};
	
}

function toggleForTrade() {

	/* basic trade any 3 for any 1 */
	if ($(this).hasClass("trademe")) 
		$(this).removeClass("trademe");
	else
		$(this).addClass("trademe");
		
	canWeTrade();
}

function canWeTrade() {
	var selectedForTrade = $('li.trademe');
		
	if (selectedForTrade.length == 3)   // yes we can!		
		activateTrade();		
	else 
		deactivateTrade();
}

function initTrade() {	
	var tradeWindow = $('div#trade_window');
	tradeWindow.fadeIn();
	
	var list = $('div#trade_window ul');
	list.empty();
	list = $('<ul>');
	
	list.append((new Card("pistol", "images/card_pistol.png")).make().bind("click", commitTrade));
	list.append((new Card("armor", "images/card_armor.png")).make().bind("click", commitTrade));
	list.append((new Card("disguise", "images/card_disguise.png")).make().bind("click", commitTrade));	
	list.append((new Card("tool", "images/card_tool.png")).make().bind("click", commitTrade));
	list.append((new Card("bomb", "images/card_bomb.png")).make().bind("click", commitTrade));
		
	tradeWindow.append(list);
		
	$('div#trade_window h4').bind("click", closeTradeWindow);
}

function commitTrade() {
	var selectedForTrade = $('li.trademe');
	selectedForTrade.remove();
	$(this).bind("click", toggleForTrade);
	$('div#cards ul').append(this);	
	
	closeTradeWindow();
	activateDraw();
	refreshMore();
}

function closeTradeWindow() {
	$('div#trade_window').fadeOut();
}

function dealCards(num) {
	var list = $('<ul>');
	
	for (var i = 0; i < num; i++) {	
		var card = getRandomCard();		
		var liItem = card.make();
		list.append(liItem);
	}

	$('div#cards').append(list);	
}

function getHand() {
	return $('div#cards ul').children();
}

function countHand() {
	var hand = getHand();
	return hand.length;
}

function drawOne() {
	var handList = $('div#cards ul');
	var card = getRandomCard();
	var cardMarkup = card.make().hide().fadeIn();

	handList.append(cardMarkup);
	
	if (countHand() == 7)
		deactivateDraw();
		
	refreshMore();
}

function activateDraw() {
	$('div#cards #draw').addClass("active");
	$('div#cards #draw').unbind("click");
	$('div#cards #draw').bind("click", drawOne);
}

function activateTrade() {
	$('div#cards #trade').addClass("active");
	$('div#cards #draw').unbind("click");
	$('div#cards #trade').bind("click", initTrade);
}

function deactivateDraw() {
	$('div#cards #draw').removeClass("active");
	$('div#cards #draw').unbind("click");
}

function deactivateTrade() {
	$('div#cards #trade').removeClass("active");
	$('div#cards #trade').unbind("click");
}

function spendThese(cards) {
	var hand = getHand();
	
	for (item in cards) {		
		for (var i = 0; i < cards[item]; i++)
			findAndRemove(hand, item);		
	}
	
	incrementCounter();
	
	if (countHand() < 7)
		activateDraw();
		
	// reset any selected trades
	$('div#cards li.trademe').removeClass("trademe");
	deactivateTrade();
}

function findAndRemove(hand, card) {
	for (var i = hand.length - 1; i >= 0; i--) {

		if ($(hand[i]).attr("name") === card) {
			$(hand[i]).remove();
			return;
		}
	}	
}

function doYouHave(cards) {	
	var cardMap = makeCardMap();
	
	for (card in cards) {		
		var inHand = cardMap[card];
	
		if (inHand === undefined)
			return 0;
		
		if (inHand < cards[card]) 
			return (inHand - cards[card]);
	}

	return inHand;
}

function makeCardMap() {
	var map = {};

	var hand = getHand();
	for (var i = 0; i < hand.length; i++) {
		var name = $(hand[i]).attr("name");
		
		if (map[name] === undefined)
			map[name] = 1;
		else
			map[name] += 1;	
	}
	
	return map;
}

function getRandomCard() {
	var card;
	var random = (Math.floor(Math.random() * 5) + 1);
	
	if (random == 1)
		card = new Card("pistol", "images/card_pistol.png");
	else if (random == 2)
		card = new Card("disguise", "images/card_disguise.png");
	else if (random == 3)
		card = new Card("bomb", "images/card_bomb.png");
	else if (random == 4)		
		card = new Card("tool", "images/card_tool.png");
	else
		card = new Card("armor", "images/card_armor.png");

	return card;
}