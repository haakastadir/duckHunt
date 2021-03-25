class DuckMover {
  constructor(obj, speedAdjust) {
    this.redSquare = obj;
    this.pixels_per_second = 250 * speedAdjust;
    this.currentPosition = { x: '0', y: '0'};
    this.nextPosition = { x: '0', y: '0'};
  }
  
  generateNewPosition() {
    let containerSize = {
      height: gameWindow.clientHeight,
      width: gameWindow.clientWidth
    };
    let availableHeight = containerSize.height - this.redSquare.clientHeight;
    let availableWidth = containerSize.width - this.redSquare.clientHeight;
    
    // Pick a random place in the space (-200 px for grass at bottom screen on y-axis)
    let y = Math.floor(Math.random() * (availableHeight - 200));
    let x = Math.floor(Math.random() * availableWidth);
    
    return { x: x, y: y };
  }

  calcDistance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  }

  duckDirection() {
    // creates classes for animation directions
      // Calculate distances  
      let xDistance = Math.round(Math.sqrt((this.currentPosition.x - this.nextPosition.x) * (this.currentPosition.x - this.nextPosition.x)));
      let yDistance = Math.round(Math.sqrt((this.currentPosition.y - this.nextPosition.y) * (this.currentPosition.y - this.nextPosition.y)));
      let duckDirection = document.querySelector(`#${this.redSquare.id}`).firstChild;

      if (this.currentPosition.x < this.nextPosition.x) {
        duckDirection.className = 'duck-right';

        if (this.currentPosition.y > this.nextPosition.y && xDistance < yDistance) {
          this.duckWay = 'up_';
        } else {
          this.duckWay = '';
        }
      } else {
          duckDirection.className = 'duck-left';
          if (this.currentPosition.y > this.nextPosition.y && xDistance < yDistance) {
            this.duckWay = 'up_';
          } else {
            this.duckWay = '';
          }
      };
  }

  liftoff() {
      this.currentPosition = {x: '750', y: '750'};
      this.newPosition = this.generateNewPosition();
      let liftoffPosition = {x: this.newPosition.x, y: '750'};

      let distance = this.calcDistance(this.currentPosition, liftoffPosition);
      let speed = Math.round((distance / this.pixels_per_second) * 100) / 10000;
      
      this.redSquare.style.transition = `transform ${speed}s linear`;
      this.redSquare.style.transform = `translate(${liftoffPosition.x}px, 750px)`;
      
      // Save this new position ready for the this.nextPosition call.
      this.currentPosition = liftoffPosition;
  }

  moveOnce() {
    this.nextPosition = this.generateNewPosition();
    // Pick a new spot on the page
    
    // How far do we have to move?
    let distance = this.calcDistance(this.currentPosition, this.nextPosition);

    // Speed of this transition, rounded to 2DP
    let speed = Math.round((distance / this.pixels_per_second) * 100) / 100;
    this.redSquare.style.transition = `transform ${speed}s linear`;
    this.redSquare.style.transform = `translate(${this.nextPosition.x}px, ${this.nextPosition.y}px)`;
    this.duckDirection()
    
    
    // Save this new position ready for the this.nextPosition call.
    this.currentPosition = this.nextPosition;
    
  }

  
  start(delay) {
    // makes clicking possible
    this.redSquare.style.pointerEvents = `unset`;
    // Bind callback to keep things moving
    this.boundEvent = this.moveOnce.bind(this);

    // moves ducks down below grass
    this.redSquare.style.transform = `translate(750px, 750px)`;
    this.duckWay = 'up_'
    
    // Start it moving
    setTimeout(() => {
      this.liftoff();
      this.redSquare.addEventListener('transitionend', this.boundEvent);
    }, delay);
    
    setTimeout(() => {
      this.flyAway()
    }, delay + 2000);
    
  }
  
  flyAway() {
    // Remove callback to stop things moving
    this.redSquare.removeEventListener('transitionend', this.boundEvent);


    this.redSquare.addEventListener('transitionend', () => {
      duckCounter++;
      duckGone++;
      console.log(`count: ${duckCounter}... gone: ${duckGone}`);
      this.stop();
    });

    // Generat new position
    this.nextPosition = this.generateNewPosition();

    // Set y-position above screen
    this.nextPosition = {x: this.nextPosition.x, y: -100}

    // How far do we have to move?
    let distance = this.calcDistance(this.currentPosition, this.nextPosition);
    // Speed of this transition, rounded to 2DP
    let speed = Math.round((distance / this.pixels_per_second) * 100) / 100;
    this.redSquare.style.transition = `transform ${speed}s linear`;
    this.redSquare.style.transform = `translate(${this.nextPosition.x}px, -100px)`;
    this.duckDirection()
  }

  stop() {
    // Disables clicking
    this.redSquare.style.pointerEvents = `none`


    // Get live position
    let computedStyle = window.getComputedStyle(this.redSquare).transform;
    let matrixString = computedStyle;
    matrixString = matrixString.replace(')', '');
    matrixString = matrixString.split(',');
    matrixString = matrixString.slice(-2)
    let stopAtX = Math.floor(Number(matrixString[0]));
    let stopAtY = Math.floor(Number(matrixString[1]));

    function fallPosition() {
        let y = 750;
        let x = stopAtX;
        return { x: x, y: y };
        }

    this.redSquare.style.transform = `translate(${stopAtX}px, ${stopAtY}px)`;
    
    // Remove callback to stop things moving
    this.redSquare.removeEventListener('transitionend', this.boundEvent);
    
    setTimeout(() => {
        this.pixels_per_second = 300
        let distance = this.calcDistance(this.currentPosition, fallPosition());

        let speed = Math.round((distance / this.pixels_per_second) * 100) / 100;

        this.redSquare.style.transition = `transform ${speed}s linear`;
  
        this.redSquare.style.transform = `translate(${stopAtX}px, 750px)`;
    }, 575);
      
  }
}





//==========================================================
// ANIMATIONS
//========================================================== 

// === Duck Animations ===
class AnimateDuck {
  constructor(obj, xyz){
  this.object = obj;
  this.duckNumber = xyz;
  this.duckAlive = true
  }

  move(a) {
    this.a = a;

    if (this.duckAlive = true) {
      console.log(this.object.firstChild);
      let moveInterval = setInterval(() => {
      if (this.duckAlive == true && a == 1) {
        this.object.firstChild.style.background = `url('./img/duck/${this.object.id}_${this.duckNumber.duckWay}${[a]}.png')`
        a++
      } else if (this.duckAlive == true && a == 2){
        this.object.firstChild.style.background = `url('./img/duck/${this.object.id}_${this.duckNumber.duckWay}${[a]}.png')`
        a++
      } else if (this.duckAlive == true && a == 3){
        this.object.firstChild.style.background = `url('./img/duck/${this.object.id}_${this.duckNumber.duckWay}${[a]}.png')`
        a++
      } else if (this.duckAlive == true && a == 4){
        this.object.firstChild.style.background = `url('./img/duck/${this.object.id}_${this.duckNumber.duckWay}${[a]}.png')`
        a = 1
      } else {
        clearInterval(moveInterval);
      }
      }, 100);
    }
  }


  hit() {
    this.duckAlive = false
    this.object.firstChild.style.background = `url('./img/duck/${this.object.id}_hit.png')`
    let duckDirection = document.querySelector(`#${this.object.id}`).firstChild

    setTimeout(() => {
      this.object.firstChild.style.background = `url('./img/duck/${this.object.id}_fall.png')`
    }, 500);
    setTimeout(() => {
      let x = 0
      let timedInterval = setInterval(() => {
        if (duckDirection.className !== 'duck-left') {
        duckDirection.className = 'duck-left'
        } else {
        duckDirection.className = ''
        }
        if (++x === 50) {
          clearInterval(timedInterval)
        }
      }, 75);

    }, 500);
  }
}
