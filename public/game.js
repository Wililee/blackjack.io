const socket = io();
console.log("beans");

var matchScore = 0;
var nickname = "";

const myInput = document.getElementById("writeNick");
$('#writeNick').focus();

myInput.addEventListener("keyup", function(event) {
	// 13 === 'enter' key
	if (event.keyCode === 13) {
	  event.preventDefault();
	  setNick();
	}
});
  
function setNick(){
	nickname = document.getElementById('writeNick').value;
	socket.emit('set nickname', nickname);
	$('#first').fadeOut();
	$('#second').show();
}

function revealOpponent(oppHand){
	let oppHandDiv = document.getElementById('opponentHand');
	oppHandDiv.innerHTML = '';
	oppHand.forEach(oppCard => {
		let card = document.createElement("div");
		let spanRank = document.createElement("span");
		spanRank.innerHTML = oppCard.Value;
		spanRank.className = "rank";
		let spanSuit = document.createElement("span");
		spanSuit.innerHTML = `&${oppCard.Suit};`;
		spanSuit.className = "suit";
		card.appendChild(spanRank);
		card.appendChild(spanSuit);
		card.className = `card rank-${oppCard.Value} ${oppCard.Suit}`;
		oppHandDiv.appendChild(card);
	});
}

// Emitters 
function requestRoom1(){
	socket.emit('request room 1');
}

function readyUp(){
	socket.emit('ready');
}

function requestHit(){
	socket.emit('hit');
}

function requestStand(){
	socket.emit('stand');
}

// Receivers

socket.on('start game', () => {
	$('#second').fadeOut();
	$('#third').show();
});

socket.on('room full', () => {
	document.getElementById('lobbyMsg').textContent = "That room is full!";
});

// On game restart
socket.on('restart', () => {
	// Reset divs to initial state
	console.log("Receiving match restart event.");
	document.getElementById('gameOverMsg').innerHTML = "";
	document.getElementById('hand').innerHTML = "";
	document.getElementById('opponentHand').innerHTML = "";
});

socket.on('new match score', matchScoreText => {
	document.getElementById('matchScoreDiv').textContent = matchScoreText;
});

// socket.on('new nickname', newNick => {
// 	nickname = newNick;
// });

socket.on('tie', opponentHand => {
	console.log("Receiving tie event!");
	revealOpponent(opponentHand);
	document.getElementById('gameOverMsg').innerHTML = "You Tied!";
});

socket.on('win', opponentHand => {
	console.log("Receiving win event!");
	revealOpponent(opponentHand);
	document.getElementById('gameOverMsg').innerHTML = "You won!";
})

socket.on('lose', opponentHand => {
	console.log("Receiving lose event!");
	revealOpponent(opponentHand);
	document.getElementById('gameOverMsg').innerHTML = "You lost!";
})

socket.on('join room 1', () => {
	console.log("You have successfully joined room 1.");
});

socket.on('hit', newCard =>{
	console.log("Receiving 'hit' event with new card:", newCard);
	let handDiv = document.getElementById('hand');
	let card = document.createElement("div");
	let spanRank = document.createElement("span");
	spanRank.innerHTML = newCard.Value;
	spanRank.className = "rank";
	let spanSuit = document.createElement("span");
	spanSuit.innerHTML = `&${newCard.Suit};`;
	spanSuit.className = "suit";
	card.appendChild(spanRank);
	card.appendChild(spanSuit);
	card.className = `card rank-${newCard.Value} ${newCard.Suit}`;
	handDiv.appendChild(card);
});

socket.on('opponent hit', () => {
	let oppHandDiv = document.getElementById('opponentHand');
	let card = document.createElement("div");
	card.className = "card back";
	oppHandDiv.appendChild(card);
});

socket.on('update score', newScore =>{
	let scoreDiv = document.getElementById('scoreDiv');
	scoreDiv.innerHTML = "New score: " + newScore;
});