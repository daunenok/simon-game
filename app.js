var currClick, gameMode, currStep, gameClicks;
var letStep, userClicks;
var total = 20;
var elems = [".green", ".red", ".yellow", ".blue"];

$("#start").on("click", startGame);
$(".sector").on("click", sectorClick);
$(".alert button").on("click", closeClick);


function clearGame() {
	letStep = false;
	gameClicks = [];
	userClicks = [];
}

function startGame() {
	var x;

	clearGame();
	gameMode = $("#mode").val();

	for (var i = 0; i < total; i++) {
		x = Math.floor(Math.random() * 4); 
		gameClicks.push(x);
	}
	
	currStep = 1;
	setTimeout(doStep, 1000);
}	

function doStep() {
	$("#count").val(currStep);
	showClicks();
	setTimeout(userStep, 1500 * currStep);
}

function showClicks() {
	currClick = 0;
	showClick();
}

function showClick() {
	if (currClick >= currStep) return;

	$(elems[gameClicks[currClick]]).addClass("active");
	document.querySelector("audio").play();
	setTimeout(betweenClick, 1000);
}

function betweenClick() {
	$(".sector").removeClass("active");
	currClick++;
	setTimeout(showClick, 500);
}

function userStep() {
	userClicks = [];
	letStep = true;
}

function sectorClick() {
	var count;

	if (letStep) {
		$(this).addClass("active");
		document.querySelector("audio").play();
		setTimeout(clearClick, 300);
		count = $(this).index(".sector");
		userClicks.push(count);
		if (userClicks.length === currStep) {
			letStep = false;
			if (userCheck()) {
				currStep++;
				if (currStep > total) 
					setTimeout(endGame, 1000, "You won!");
				else
					setTimeout(doStep, 2000);
			} else {
				if (parseInt(gameMode)) {
					setTimeout(endGame, 1000, "You lose...");
				} else {
					$(".circle img").attr("src", "sad.png");
					$(".circle img").addClass("blinking");
					setTimeout(smilik, 2500);
					setTimeout(doStep, 2500);
				}
			}
		}
	}
}

function clearClick () {
	$(".sector").removeClass("active");
}

function userCheck() {
	var arr = gameClicks.slice(0, currStep);
	if (arr.toString() === userClicks.toString())
		return true;
	else
		return false;
}

function endGame(mess) {
	$(".alert span").html(mess);
	$(".alert").show();
	$("#count").val(0);
}

function closeClick() {
	$(".alert").hide();
}

function smilik() {
	$(".circle img").attr("src", "smiling.png");
	$(".circle img").removeClass("blinking");
}





