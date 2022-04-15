// ! Get first starter deck

let deckID = "";

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    deckID = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

// ! This makes 2 piles of all the cards
let p1Hand = [];
let p2Hand = [];
let lastBattle = [];

// ! This is how you start a new Game .. REDEAL
document.querySelector("#new").addEventListener("click", newGameDealAll);

function newGameDealAll() {
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`;
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.cards.length; i++) {
        if (i % 2 === 0) {
          p1Hand.push(data.cards[i]);
        } else {
          p2Hand.push(data.cards[i]);
        }
      }
      console.log(p1Hand);
      console.log(p2Hand);
      document.querySelector("#count1").innerText = p1Hand.length;
      document.querySelector("#count2").innerText = p2Hand.length;
      document.querySelector("#draw").classList.toggle("hidden");
      document.querySelector("#new").classList.toggle("hidden");
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// ! This is how you deal the top card for each player. And see who wins

let winner = [];
let addToP1Hand = [];
let addToP2Hand = [];
let winningCard = [];

document.querySelector("#draw").addEventListener("click", drawACardEach);

function drawACardEach() {
  if (p1Hand.length === 0) {
    document.querySelector("#w2").classList.toggle("hidden");
  } else if (p2Hand.length === 0) {
    document.querySelector("#w1").classList.toggle("hidden");
  } else {
    // ABOVE IS TO FIND A WINNER
    // ? Work in progress
    // TODO work in progress

    document.querySelector("#BIG").classList.add("hidden");
    // console.log(p1Hand);
    // console.log(p2Hand);
    document.querySelector("#player1").src = p1Hand[0].image;
    document.querySelector("#player2").src = p2Hand[0].image;
    let player1Val = convertToNum(p1Hand[0].value);
    let player2Val = convertToNum(p2Hand[0].value);
    if (player1Val > player2Val) {
      document.querySelector("#result").innerText = "Player 1 Wins";
      winner = p2Hand.shift();
      addToP1Hand = p1Hand.push(winner);
      winningCard = p1Hand.shift();
      addToP1Hand = p1Hand.push(winningCard);
      document.querySelector("#count1").innerText = p1Hand.length;
      document.querySelector("#count2").innerText = p2Hand.length;
      // console.log(p1Hand);
      // console.log(p2Hand);
    } else if (player1Val < player2Val) {
      document.querySelector("#result").innerText = "Player 2 Wins";
      winner = p1Hand.shift();
      addToP1Hand = p2Hand.push(winner);
      winningCard = p2Hand.shift();
      addToP1Hand = p2Hand.push(winningCard);
      document.querySelector("#count1").innerText = p1Hand.length;
      document.querySelector("#count2").innerText = p2Hand.length;
      // console.log(p1Hand);
      // console.log(p2Hand);
    } else {
      console.log(p1Hand);
      console.log(p2Hand);
      document.querySelector("#result").innerText = "";
      document.querySelector("#draw").classList.toggle("hidden");
      document.querySelector("#drawWar").classList.toggle("hidden");
      document.querySelector("#BIG").classList.toggle("hidden");
    }
  }
}

// ! This is for war matches
let p1War = [];
let p2War = [];
let warWinner = [];

document.querySelector("#drawWar").addEventListener("click", drawForWar);

function drawForWar() {
  // BELOW IS TO play work for less than 5 cards
  // ? Work in progress
  // TODO work in progress

  if (p1Hand.length === 4 || p2Hand.length === 4) {
  } else if (p1Hand.length === 3 || p2Hand.length === 3) {
    document.querySelector("#player1").src = p2Hand[2].image;
    document.querySelector("#player2").src = p2Hand[2].image;
    let p1WarVal = convertToNum(p1Hand[2].value);
    let p2WarVal = convertToNum(p2Hand[2].value);
    if (p1WarVal > p2WarVal) {
      document.querySelector("#result").innerText = "Player 1 Wins";
      document.querySelector("#w1").classList.toggle("hidden");
    } else if (p1WarVal < p2WarVal) {
      document.querySelector("#result").innerText = "Player 2 Wins";
      document.querySelector("#w2").classList.toggle("hidden");
    }
  } else if (p1Hand.length === 2 || p2Hand.length === 2) {
    document.querySelector("#player1").src = p2Hand[1].image;
    document.querySelector("#player2").src = p2Hand[1].image;
    let p1WarVal = convertToNum(p1Hand[1].value);
    let p2WarVal = convertToNum(p2Hand[1].value);
    if (p1WarVal > p2WarVal) {
      document.querySelector("#result").innerText = "Player 1 Wins";
      document.querySelector("#w1").classList.toggle("hidden");
    } else if (p1WarVal < p2WarVal) {
      document.querySelector("#result").innerText = "Player 2 Wins";
      document.querySelector("#w2").classList.toggle("hidden");
    }
  } else if (p1Hand.length === 1) {
    document.querySelector("#w2").classList.toggle("hidden");
  } else if (p2Hand.length === 1) {
    document.querySelector("#w1").classList.toggle("hidden");
  } else {
    // ABOVE IS TO play work for less than 5 cards
    // ? Work in progress
    // TODO work in progress

    document.querySelector("#player1").src = p1Hand[4].image;
    document.querySelector("#player2").src = p2Hand[4].image;
    p1War = p1Hand.splice(0, 4);
    p2War = p2Hand.splice(0, 4);
    let p1WarVal = convertToNum(p1Hand[0].value);
    let p2WarVal = convertToNum(p2Hand[0].value);
    // console.log(p1Hand)
    // console.log(p2Hand)
    // console.log(p1War)
    // console.log(p2War)
    // console.log(p1WarVal)
    // console.log(p2WarVal)
    if (p1WarVal > p2WarVal) {
      document.querySelector("#result").innerText = "Player 1 Wins";
      winner = p2Hand.shift();
      addToP1Hand = p1Hand.push(winner);
      winningCard = p1Hand.shift();
      addToP1Hand = p1Hand.push(winningCard);
      warWinner = p1Hand.concat(p1War, p2War);
      p1Hand = warWinner;
      document.querySelector("#count1").innerText = p1Hand.length;
      document.querySelector("#count2").innerText = p2Hand.length;
      console.log(p1Hand);
      console.log(p2Hand);
      document.querySelector("#draw").classList.toggle("hidden");
      document.querySelector("#drawWar").classList.toggle("hidden");
      document.querySelector("#BIG").classList.toggle("hidden");
    } else if (p1WarVal < p2WarVal) {
      document.querySelector("#result").innerText = "Player 2 Wins";
      winner = p1Hand.shift();
      addToP1Hand = p2Hand.push(winner);
      winningCard = p2Hand.shift();
      addToP1Hand = p2Hand.push(winningCard);
      warWinner = p2Hand.concat(p1War, p2War);
      p2Hand = warWinner;
      document.querySelector("#count1").innerText = p1Hand.length;
      document.querySelector("#count2").innerText = p2Hand.length;
      console.log(p1Hand);
      console.log(p2Hand);
      document.querySelector("#draw").classList.toggle("hidden");
      document.querySelector("#drawWar").classList.toggle("hidden");
      document.querySelector("#BIG").classList.toggle("hidden");
    } else {
      console.log(p1Hand);
      console.log(p2Hand);
      document.querySelector("#result").innerText = "";
      document.querySelector("#drawWar").classList.toggle("hidden");
      document.querySelector("#warAgain").classList.toggle("hidden");
      document.querySelector("#BIG").classList.toggle("hidden");
    }
  }
}

// BELOW IS TO HAVE BACK TO BACK WARS
// ? Work in progress
// TODO work in progress

document.querySelector("#warAgain").addEventListener("click", back2back);

function back2back() {
  console.log(p1Hand);
  console.log(p2Hand);
}

// ! Function to change the face cards to Values to compare WIN/LOSE

function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return Number(val);
  }
}

//         if(p1WarVal > p2WarVal){
//             document.querySelector('h3').innerText = 'Player 1 Wins'
//             winner = p2Hand.shift()
//             addToP1Hand = p1Hand.push(winner)
//             winningCard = p1Hand.shift()
//             addToP1Hand = p1Hand.push(winningCard)
//             document.querySelector('#count1').innerText = p1Hand.length
//             document.querySelector('#count2').innerText = p2Hand.length
//               console.log(p1Hand);
//               console.log(p2Hand);
//         }else if(p1WarVal < p2WarVal){
//             document.querySelector('h3').innerText = 'Player 2 Wins'
//             winner = p1Hand.shift()
//             addToP1Hand = p2Hand.push(winner)
//             winningCard = p2Hand.shift()
//             addToP1Hand = p2Hand.push(winningCard)
//             document.querySelector('#count1').innerText = p1Hand.length
//             document.querySelector('#count2').innerText = p2Hand.length
//                 console.log(p1Hand);
//                 console.log(p2Hand);
//         }else{
//         document.querySelector('h3').innerText = 'Time for War!!!'
//       }
// console.log(p1Hand);
// console.log(p2Hand);

// document.querySelector('#draw').addEventListener('click', drawTwo)

// function drawTwo(){
//   const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         document.querySelector('#player1').src = data.cards[0].image
//         document.querySelector('#player2').src = data.cards[1].image
//         let player1Val = convertToNum(data.cards[0].value)
//         let player2Val = convertToNum(data.cards[1].value)
//         if(player1Val > player2Val){
//           document.querySelector('h3').innerText = 'Player 1 Wins'
//         }else if(player1Val < player2Val){
//           document.querySelector('h3').innerText = 'Player 2 Wins'
//         }else{
//           document.querySelector('h3').innerText = 'Time for War!!!'
//         }
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

// const url = `https://deckofcardsapi.com/api/deck/${deckID}/pile/p1Hand/add/?cards=${p1Hand}`
//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         for(let i = 0; i < data.cards.length; i++){
//           if(i % 2 === 0){
//             p1Hand.push(data.cards[i])
//           }else {
//             p2Hand.push(data.cards[i])
//           }
//         }
//         // console.log(p1Hand);
//         // console.log(p2Hand);
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       })
