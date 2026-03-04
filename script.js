const container = document.getElementById('game-container');

function showGame(game){
  if(game==='coin') loadCoinFlip();
  else if(game==='rps') loadRPS();
  else if(game==='dot') loadDotGame();
  else if(game==='ludo') loadLudo();
}

/*---------------- COIN FLIP ----------------*/
function loadCoinFlip(){
  container.innerHTML=`
    <h2>🎲 Coin Flip</h2>
    <div id="coin">🪙</div>
    <button onclick="flipCoin()">Flip Coin</button>
    <p id="coin-result"></p>
  `;
}

function flipCoin(){
  const coin=document.getElementById('coin');
  coin.style.transform='rotateY(1440deg)'; // spin
  document.getElementById('coin-result').innerText='Flipping...';
  setTimeout(()=>{
    const result=Math.random()<0.5?'Heads':'Tails';
    document.getElementById('coin-result').innerText=`Result: ${result}`;
    coin.style.transform='rotateY(0deg)';
  },2000);
}

/*---------------- ROCK PAPER SCISSORS ----------------*/
function loadRPS(){
  container.innerHTML=`
    <h2>🤜🤛 Rock-Paper-Scissors</h2>
    <p>Choose your move:</p>
    <div id="rps-buttons">
      <button onclick="playRPS('rock')">🪨 Rock</button>
      <button onclick="playRPS('paper')">📄 Paper</button>
      <button onclick="playRPS('scissors')">✂️ Scissors</button>
    </div>
    <p id="rps-result"></p>
    <div id="rps-animation"></div>
  `;
}

function playRPS(player){
  const anim=document.getElementById('rps-animation');
  anim.innerHTML='🤔 Computer is thinking...';
  document.getElementById('rps-result').innerText='';
  let dots=0;
  const interval=setInterval(()=>{
    dots=(dots+1)%4;
    anim.innerHTML='🤔 Computer is thinking'+'.'.repeat(dots);
  },400);
  setTimeout(()=>{
    clearInterval(interval);
    const moves=['rock','paper','scissors'];
    const bot=moves[Math.floor(Math.random()*3)];
    let result='';
    if(player===bot) result='Tie!';
    else if((player==='rock' && bot==='scissors')||(player==='paper' && bot==='rock')||(player==='scissors' && bot==='paper')) result='You Win!';
    else result='You Lose!';
    anim.innerHTML='';
    document.getElementById('rps-result').innerText=`You: ${player} | Bot: ${bot} → ${result}`;
  },2400);
}

/*---------------- CATCH THE DOT ----------------*/
function loadDotGame(){
  container.innerHTML=`
    <h2>🏃 Catch the Dot!</h2>
    <p>Use arrow keys to move the green square and catch the red dot!</p>
    <div id="game-area"></div>
    <p>Score: <span id="dot-score">0</span></p>
  `;
  const gameArea=document.getElementById('game-area');
  const player=document.createElement('div');
  player.style.width='30px';
  player.style.height='30px';
  player.style.background='green';
  player.style.position='absolute';
  player.style.left='10px';
  player.style.top='10px';
  gameArea.appendChild(player);

  const dot=document.createElement('div');
  dot.style.width='20px';
  dot.style.height='20px';
  dot.style.background='red';
  dot.style.borderRadius='50%';
  dot.style.position='absolute';
  dot.style.left=Math.random()*280+'px';
  dot.style.top=Math.random()*380+'px';
  gameArea.appendChild(dot);

  let score=0;
  function movePlayer(dx,dy){
    const x=Math.min(270,Math.max(0,player.offsetLeft+dx));
    const y=Math.min(370,Math.max(0,player.offsetTop+dy));
    player.style.left=x+'px';
    player.style.top=y+'px';
    checkCollision();
  }
  function checkCollision(){
    const dx=dot.offsetLeft-player.offsetLeft;
    const dy=dot.offsetTop-player.offsetTop;
    if(Math.abs(dx)<30 && Math.abs(dy)<30){
      score++;
      document.getElementById('dot-score').innerText=score;
      dot.style.left=Math.random()*280+'px';
      dot.style.top=Math.random()*380+'px';
      dot.style.transition='0.2s';
      dot.style.transform='scale(1.3)';
      setTimeout(()=>{dot.style.transform='scale(1)';},200);
    }
  }
  document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowUp') movePlayer(0,-20);
    if(e.key==='ArrowDown') movePlayer(0,20);
    if(e.key==='ArrowLeft') movePlayer(-20,0);
    if(e.key==='ArrowRight') movePlayer(20,0);
  });
}

/*---------------- LUDO (Simplified) ----------------*/
function loadLudo(){
  container.innerHTML=`
    <h2>🎲 Ludo Mini</h2>
    <button onclick="rollDice()">Roll Dice</button>
    <p id="dice-result">Click roll to start!</p>
    <div id="ludo-board"></div>
  `;
  const board=document.getElementById('ludo-board');
  const piece=document.createElement('div');
  piece.style.width='30px';
  piece.style.height='30px';
  piece.style.background='blue';
  piece.style.borderRadius='50%';
  piece.style.position='absolute';
  piece.style.left='0px';
  piece.style.top='0px';
  board.appendChild(piece);

  window.rollDice=function(){
    const dice=Math.floor(Math.random()*6)+1;
    document.getElementById('dice-result').innerText=`You rolled a ${dice}`;
    let steps=dice;
    const interval=setInterval(()=>{
      if(steps<=0){clearInterval(interval); return;}
      let left=parseInt(piece.style.left);
      let top=parseInt(piece.style.top);
      if(left<270) piece.style.left=left+50+'px';
      else if(top<270) piece.style.top=top+50+'px';
      steps--;
    },300);
  }
          }
