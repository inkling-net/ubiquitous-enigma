
var timeline = [];

function buildTimeline() {
	$('div[id="timeline"]').empty();
	
	var list = $('<ul>');

	for (event in timeline) {
		var liItem = buildEvent(timeline[event]);
		list.append(liItem);
	}

	$('div[id="timeline"]').append(list);
}

function buildEvent(data) {
	var event = $('<li>');
	event.attr("name", data.year);
	
	if (data.type === 0)
		event.addClass("lynchpin");
	else
		event.addClass("ripple");
	
	var year = $('<h1>');
	year.html(data.year);
	event.append(year);
	
	return event;
}

function initTimeline() {
	timeline = {
		1865: {
			"year": 1865,
			"type": 0,
			"headline": "Lincoln Assassinated",
			"flavor": "President shot dead during theatrical event",
			"links": [1868, 1974],
			"alt": {
				"1865a": {"headline": "Lincoln Wounded", "flavor": "Theatrical event marred by attempt to kill president"}
			},
			"needs": {"pistol" : 1, "armor" : 1, "disguise" : 1 }
		},
		1868: {
			"year": 1868,
			"type": 1,
			"headline": "Andrew Johnson Impeached",
			"flavor": "President escapes conviction and removal from office by one vote",
			"links": [1865],
			"alt": {
				"1868a": {"headline": "Abraham Lincoln Impeached", "flavor": "President escapes conviction and removal from office by one vote" }
			}
		}, 
		1912: {
			"year": 1912,
			"type": 0,
			"headline": "Titanic Sinks",
			"flavor": "Collision with iceberg dooms new ocean liner",
			"links": [1929, 1933],
			"alt": {
				"1912a": {"headline": "Titanic Avoids Iceberg", "flavor": "'We almost hit that,' says lookout" }
			},
			"needs": {"armor" : 1, "bomb" : 1, "tool" : 1 }
		}, 
		1914: {
			"year": 1914,
			"type": 0,
			"headline": "Archduke Ferdinand Assassinated",
			"flavor": "WWI begins",
			"links": [1918],
			"alt": {
				"1914a": {"headline": "Archduke Ferdinand Unharmed in Attack", "flavor": "Injured bodyguard still missing" }
			},
			"needs": {"pistol" : 1, "armor" : 1 }
		}, 
		1915: {
			"year": 1915,
			"type": 0,
			"headline": "Lusitania Sinks",
			"flavor": "German submarine torpedoes ocean liner",
			"links": [1917, 1933],
			"alt": {
				"1915a": {"headline": "Lusitania Arrives Safely", "flavor": "Steamship escapes harm despite submarine blockade" }
			},
			"needs": {"bomb" : 1, "tool" : 2 }
		}, 
		1917: {
			"year": 1917,
			"type": 1,
			"headline": "US Declares War on Germany",
			"flavor": "Key reason: sinking of Lusitania",
			"links": [1915],
			"alt": {
				"1917a": {"headline": "President Wilson Keeps US Out of War", "flavor": "... just like he said he would" }
			}	
		}, 
		1918: {
			"year": 1918,
			"type": 1,
			"headline": "Europe in Ruins after World War I",
			"flavor": "Flu epidemic kills 20 million",
			"links": [1914],
			"alt": {
				"1918a": {"headline": "European Economy Booms", "flavor": "Flu kills 19 million worldwide" }
			}	
		}, 
		1929: {		
			"year": 1929,
			"type": 1,
			"headline": "Stock Market Crashes",
			"flavor": "Millionaires lose millions",
			"links": [1912],
			"alt": {
				"1929a": {"headline": "Titanic Explodes", "flavor": "Steamship sinks after striking derelict mine" }
			}	
		}, 
		1933: {		
			"year": 1933,
			"type": 1,
			"headline": "The Great Depression",
			"flavor": "FDR launches New Deal",
			"links": [1912, 1915],
			"alt": {
				"1933a": {"headline": "The Mild Recession", "flavor": "'Things could be a lot worse,' asserts FDR" }
			}	
		}, 
		1936: {		
			"year": 1936,
			"type": 0,
			"headline": "Hitler Opens '36 Olympics",
			"flavor": "Nazi leader makes speech at Berlin Olympic Games",
			"links": [1939, 1942, 1944, 1945, 1948],
			"alt": {
				"1936a": {"headline": "Hitler is Assassinated", "flavor": "Berlin Olympics marred by sniper attack on host nation's leader" }
			},
			"needs": {"pistol" : 1, "armor" : 1, "disguise" : 1, "tool" : 1 }	
		}, 
		1937: {
			"year": 1937,
			"type": 0,
			"headline": "Hindenburg Explodes",
			"flavor": "Zeppelin bursts into flames while landing at Lakehurst",
			"links": [1950],
			"alt": {
				"1937a": {"headline": "Bomb Found on Hindenburg", "flavor": "Device disarmed safely, but saboteur still at large" }
			},
			"needs": { "disguise" : 1, "bomb" : 1 }	
		}, 
		1939: {
			"year": 1939,
			"type": 1,
			"headline": "Germany Invades Poland",			
			"flavor": "World War II begins",
			"links": [1936],
			"alt": {
				"1939a": {"headline": "Fairgoers Love German Cake", "flavor": "Black Forest Cake served at Germany Pavilion is a big hit at New York World's Fair" }
			}	
		}, 
		1941: {		
			"year": 1941,
			"type": 0,
			"headline": "Pearl Harbor Bombed",
			"flavor": "US enters WWII",
			"links": [1944, 1945],
			"alt": {
				"1941a": {"headline": "Raid on Pearl Harbor Called Off by Tokyo", "flavor": "US remains neutral" }
			},
			"needs": {"pistol" : 1, "disguise" : 1, "bomb" : 1 }
		}, 
		1942: {
			"year": 1942,
			"type": 1,
			"headline": "Final Solution Undertaken",
			"flavor": "Systematic murder of all Jews agreed on at Wannsee Conference",			
			"links": [1936],
			"alt": {
				"1942a": {"headline": "Nuremberg Race Laws Repealed", "flavor": "New government restores full citizenship to German Jews" }
			}	
		}, 
		1943: {		
			"year": 1943,
			"type": 0,
			"headline": "Manhattan Project",
			"flavor": "Secret government project works to build atomic bomb",
			"links": [1945, 1962],
			"alt": {
				"1943a": {"headline": "Manhattan Project Sabotaged", "flavor": "Atomic bomb program set back two years" }
			},
			"needs": {"pistol" : 1, "bomb" : 1, "tool" : 1 }	
		}, 
		1944: {		
			"year": 1944,
			"type": 2,
			"headline": "D-Day",
			"flavor": "Allied troops begin ground invasion",
			"links": [1936, 1941],
			"alt": {
				"1944a": {"headline": "Warsaw Hosts Olympic Games", "flavor": "Jackie Robinson wins 5 gold medals for USA" }
			}	
		}, 
		1945: {		
			"year": 1945,
			"type": 1,
			"headline": "A-Bombs Dropped on Japan",
			"flavor": "World War II ends",			
			"links": [1936, 1941, 1943],
			"alt": {
				"1945a": {"headline": "Allied Troops Invade Tokyo", "flavor": "WWII ends as Japan surrenders" }
			}	
		}, 
		1948: {		
			"year": 1948,
			"type": 1,
			"headline": "Israel Founded",
			"flavor": "First Arab-Israeli War begins",			
			"links": [1936],
			"alt": {
				"1948a": {"headline": "Berlin Hosts World's Fair", "flavor": "6 million tourists visit futuristic expo" }
			}	
		}, 
		1950: {
			"year": 1950,
			"type": 1,
			"headline": "Seoul Captured by North Korea",
			"flavor": "Korean War begins, after US occupation forces are withdrawn from South Korea",			
			"links": [1937],
			"alt": {
				"1950a": {"headline": "Zeppelin Factory Opened in Seoul", "flavor": "Withdrawal of US occupation forces from South Korea postponed (for reasons of National Security)" }
			}		
		}, 
		1957: {		
			"year": 1957,
			"type": 0,
			"headline": "Sputnik Launched",
			"flavor": "Russians stun world by orbiting first satellite",
			"links": [1962, 1969],
			"alt": {
				"1957a": {"headline": "Sputnik Rocket Explodes on Pad", "flavor": "American <i>Vanguard</i> satellite becomes first to orbit Earth" }
			},
			"needs": {"disguise" : 1, "bomb" : 1, "tool" : 1 }	
		}, 
		1962: {
			"year": 1962,
			"type": 1,
			"headline": "Cuban Missile Crisis",
			"flavor": "World War 3 narrowly averted",			
			"links": [1943, 1957],
			"alt": {
				"1962a": {"headline": "World War 3", "flavor": "Huamn civilization destroyed as Cuban missile crisis escalates into nuclear war" }
			}		
		}, 
		1963: {		
			"year": 1963,
			"type": 0,
			"headline": "Kennedy Assassinated",
			"flavor": "President John F. Kennedy shot during motorcade",
			"links": [1968, 1969, 1974],
			"alt": {
				"1963a": {"headline": "JFK Injured in Motorcade Shooting", "flavor": "Doctors predict full recovery" }
			},
			"needs": {"pistol" : 1, "armor" : 2 }	
		}, 
		1968: {
			"year": 1968,
			"type": 1,			
			"headline": "MLK and RFK Assassinated",
			"flavor": "Martin Luther King, Jr. shot; Robert F. Kennedy shot also",
			"links": [1963],
			"alt": {
				"1968a": {"headline": "Vietnam Peace Accord Signed", "flavor": "US Troops pulled out of war-torn nation" }
			}	
		}, 
		1969: {
			"year": 1969,
			"type": 1,			
			"headline": "Apollo 11 Lands on Moon",
			"flavor": "Small Step = Giant Leap",			
			"links": [1957, 1963],
			"alt": {
				"1969a": {"headline": "Cosmonauts Orbit Moon", "flavor": "America's space program still lagging behind" }
			}		
		}, 
		1974: {		
			"year": 1974,
			"type": 2,
			"headline": "Nixon Resigns",
			"flavor": "Vice President Ford replaces Nixon after Watergate scandal",
			"links": [1865, 1963],
			"alt": {
				"1974a": {"headline": "President King Takes Office", "flavor": "V.P. King becomes first black president following impeachment of Nixon" }
			}	
		}, 
		1980: {		
			"year": 1980,
			"type": 0,
			"headline": "John Lennon Murdered",
			"flavor": "Deranged fan guns down rock star on NYC street",
			"links": [1986, 1999],
			"alt": {
				"1980a": {"headline": "John Lennon Nearly Killed", "flavor": "Mysterious hero intervenes in street attack on rock star, then disappears into Central Park" }
			},
			"needs": {"pistol" : 1, "armor" : 1, "disguise" : 1 }	
		}, 
		1981: {		
			"year": 1981,
			"type": 0,
			"headline": "Reagan Wounded",
			"flavor": "President survives when he and 3 staff members are shot outside DC hotel",
			"links": [1986, 1991],
			"alt": {
				"1981a": {"headline": "Reagan Assassinated", "flavor": "President survives shooting only to die on operating table" }
			},
			"needs": {"pistol" : 1, "disguise" : 1, "tool" : 1 }	
		}, 
		1986: {	
			"year": 1986,
			"type": 2,
			"headline": "Challenger Explodes",
			"flavor": "Space Shuttle blows up due to freezing of O-rings",
			"links": [1980, 1981],
			"alt": {
				"1986a": {"headline": "Marijuana Legalized", "flavor": "President Mondale signs bill repealing prohibition after protest on shuttle launchpad staged by John Lennon" }
			}	
		}, 
		1991: {
			"year": 1991,
			"type": 1,
			"headline": "Soviet Union Collapses",
			"flavor": "The Cold War ends as Russia abandons Communism",
			"links": [1981],
			"alt": {
				"1991a": {"headline": "Communism Re-invents Itself", "flavor": "Soviet Union adopts reforms while remaining fundamentally communistic" }
			}	
		}, 
		1993: {
			"year": 1993,
			"type": 0,
			"headline": "Waco Compound Burns to Ground",
			"flavor": "Federal siege of Branch Davidian compound ends in death and destruction",
			"links": [1995],
			"alt": {
				"1993a": {"headline": "Waco Standoff Defused Peacefully", "flavor": "Tanks withdrawn from area" }
			},
			"needs": {"bomb" : 1, "tool" : 1 }	
		}, 
		1995: {
			"year": 1995,
			"type": 1,
			"headline": "Oklahoma City Bombing",
			"flavor": "Act of terrorism destroys federal office building on anniversary of Waco siege",
			"links": [1993],
			"alt": {
				"1995a": {"headline": "David Koresh's Ministry Opens New Hospital", "flavor": "Free clinic serves Waco and nearby Texas communities" }
			}	
		}, 
		1999: {
			"year": 1999,
			"type": 1,
			"headline": "Columbine High School Massacre",
			"flavor": "With nihilism on the rise, shooting spree is one of many",
			"links": [1980],
			"alt": {
				"1999a": {"headline": "Guns Banned", "flavor": "Senator Lennon's campaign to outlaw guns results in passage of Amendment XXIX, which repeals the 2nd amendment" }
			}	
		}
	};
}
