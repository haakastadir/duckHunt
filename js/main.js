const duckAll = document.querySelectorAll('.duck')
const duck1 = document.querySelector('#duck-1');
const duck2 = document.querySelector('#duck-2');
const duck3 = document.querySelector('#duck-3');
const dog = document.querySelector('#dog');
const gameWindow = document.querySelector('.stage')




//==========================================================
// GAME FUNCTIONS
//==========================================================

// === Register Shots ===
let duckAlive = true
let bullets = 3;
let shots = 0;

function regShot(e) {
  let bulletsReminding = document.querySelector(`.bullet-${bullets}`);
  let changeColorOnTarget = document.querySelector(`#duck-hit-${shots}`)
  
  duckHit = function() {
    if (duckAlive == false) {
      changeColorOnTarget.firstChild.src="./img/ui/hit.png"
    }
  }

  shotFired = function() {
    bulletsReminding.style.display = 'none';
    bullets--;
    shots++;
    console.log(`${bullets} bullets left`);
  }

  switch (bullets) {
    case 3:
      shotFired()
      duckHit()
      duckAlive = true
      break;
      
    case 2:
      shotFired()
      duckHit()
      duckAlive = true
      break;
        
    case 1:
      shotFired()
      duckHit()
      duckAlive = true

      break;

    default:
      console.log('no more bullets');
      break;
    }

  console.log(`${shots} shots fired!`);
  // console.log(`x: ${e.offsetX} y: ${e.offsetY}`);
};

duck1.addEventListener('mousedown', ()=> {
  if (bullets > 0) {
    increaseScore(100);
    x.stop()
    duckFlap1.hit()
    duckAlive = false
    duckGone = duckGone + 1;
    };
  });
  duck2.addEventListener('mousedown', ()=> {
  if (bullets > 0) {
    increaseScore(200);
    y.stop()
    duckFlap2.hit()
    duckAlive = false
    duckGone = duckGone + 1;
    };
  });
  duck3.addEventListener('mousedown', ()=> {
  if (bullets > 0) {
    increaseScore(500);
    z.stop()
    duckFlap3.hit()
    duckAlive = false
    duckGone = duckGone + 1;
    };
  });

// === INCREASE SCORE ===
const counter = document.querySelector('#count');
let count = +counter.innerHTML;
let score = 0;
function increaseScore(x) {
  let z = x
  let newScore = score + z; 
  
  score = score + z;
  (function increase() {
      if (count <= newScore) {
      counter.innerText = String('000000' + count).slice(-6);
      count = count + 10;
      setTimeout(increase, 20);
    } else {
      counter.innerText = String('000000' + newScore).slice(-6);
    }
  })();
}


// === INCREASE ROUND ===
function increaseRound() {
  level = level + 1;
  for (const i in levelSpan) {
      levelSpan[i].innerText = String('00' + level).slice(-2);
  }
};

// === RESET BULLETS ===
const ammo = document.querySelector('#ammo').children
function resetBullets() {
  bullets = 3;
  for (const i in ammo) {
    if (Object.hasOwnProperty.call(ammo, i)) {
      const element = ammo[i];
      console.log(element);
      element.style.display = 'block'
    }
  }
}


//==========================================================
// ANIMATIONS
//========================================================== 


// === DUCK ANIMATION ===



// === DUCK ANIMATION ===
// Lift off / run off
function liftOff() {
  
}


// === DUCK ANIMATION ===
// Fall after hit



// === DOG ANIMATION ===
//




//==========================================================
// GAME LOOP
//========================================================== 
const gameIntro = document.querySelector('#game-intro')
const roundIntro = document.querySelector('#round-intro')
const roundResult = document.querySelector('#result')
const levelSpan = document.querySelectorAll('.level')

let duckdead = 0;
let duckGone = 0; // if duckGone < duckDead at end of round === GAME OVER

let duckCounter = 0;// if duck % 3 = 0 new ducks, if duckGone === 12 newRound

let level = 1;

let gameRunning = false


// setTimeout(() => {
  gameIntro.style.display = 'none';
// }, 4000);


// === INITIATE ===
const x = new DuckMover(duck1, 1);
const y = new DuckMover(duck2, 1.1);
const z = new DuckMover(duck3, 1.5);

duckFlap1 = new AnimateDuck(duck1, x);
duckFlap2 = new AnimateDuck(duck2, y);
duckFlap3 = new AnimateDuck(duck3, z);


document.body.addEventListener('keyup', () => {
    // if (gameRunning === false) {
    gameRunning = true
    // === HIDE CENTER CARDS ===
    gameIntro.style.display = 'none'; //block
    roundIntro.style.display = 'none' //flex
    
    // === START DOG ANIMATION ===
    //? dog animation (2170ms gå, 5250 total)
    
    // === ENABLES SHOOTING ===
    gameWindow.addEventListener('mousedown', regShot);
    resetBullets()
    
    // === UNHIDES DUCKS AND START FLAPPING===
    for (const x of duckAll) {
      x.classList.remove('no-disp')
    };
    
    x.start(1000)
    y.start(2000)
    z.start(4000)
    
    duckFlap1.move(1)
    duckFlap2.move(1)
    duckFlap3.move(1)


    
    gameWindow.addEventListener('nextRound', () => {
      increaseRound()
    });

  // }
  })
