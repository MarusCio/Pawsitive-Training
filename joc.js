<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Click the Treat!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #f4f4f9;
      margin: 0;
      padding: 20px;
    }
    #gameArea {
      position: relative;
      width: 500px;
      height: 500px;
      margin: 20px auto;
      background-color: #e1eaf5;
      border: 2px solid #333;
      overflow: hidden;
    }
    .target {
      position: absolute;
      width: 100px;
      height: 100px;
      background-size: contain;
      cursor: pointer;
    }
    #score {
      font-size: 24px;
      color: #333;
    }
    #timer {
      font-size: 20px;
      color: #555;
      margin-top: 10px;
    }
    #startButton {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      font-size: 18px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    #startButton:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <h1>Click the Treat!</h1>
  <p>Da click pe jucarii si pe mancarea de caini petru a castiga puncte, dar ai grija sa nu te atinci de pisica suparata. Distractie placuta!</p>
  <div id="score">Scor: 0</div>
  <div id="timer">Timp ramas: 60 secunde</div>
  <button id="startButton">Incepe Jocul</button>
  <div id="gameArea"></div>

  <script>
    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("startButton");

    let score = 0;
    let timpRamas = 60; // Game duration in seconds
    let gameInterval;
    let spawnTimeout;
    let bombProbability = 0.2; // 20% chance to spawn a bomb

    const rewardImages = [
      "poze/lama.png",
      "poze/elan.png",
      "poze/mingii.png",
      "poze/os.png",
      "poze/bobite.png",
    ];


    const Grumpy_cat = "poze/grumpy_cat.png";

    // Function to clear all targets from the game area
    function clearTargets() {
      while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild); // Remove each child node
      }
    }

    // Function to reset the game state
    function resetGame() {
      clearInterval(gameInterval); // Stop the game timer
      clearTimeout(spawnTimeout); // Stop any pending target spawns
      clearTargets(); // Clear all visible elements
      score = 0;
      timpRamas = 60;
      scoreDisplay.textContent = "Scor: 0";
      timerDisplay.textContent = "Timp ramas: 60 secunde";
      startButton.style.display = "block"; // Show the start button
    }

    // Function to create a new target (reward or bomb)
    function createTarget() {
      clearTimeout(spawnTimeout); // Clear previous timeout to avoid overlaps

      const isBomb = Math.random() < bombProbability; // Decide if it's a bomb
      const target = document.createElement("div");
      target.classList.add("target");
      target.style.backgroundImage = `url(${isBomb ? Grumpy_cat : rewardImages[Math.floor(Math.random() * rewardImages.length)]})`;
      target.style.top = `${Math.random() * (gameArea.offsetHeight - 100)}px`;
      target.style.left = `${Math.random() * (gameArea.offsetWidth - 100)}px`;

      target.addEventListener("click", () => {
        if (isBomb) {
          clearTargets(); // Clear all targets immediately
          alert("Din pacate ai pierdut... Data viitoare stai departe de pisica!");
          resetGame(); // Automatically reset the game
        } else {
          score++;
          scoreDisplay.textContent = `Scor: ${score}`;
          target.remove(); // Remove the clicked reward
          createTarget(); // Spawn a new target
        }
      });

      gameArea.appendChild(target);

      // Remove the target after 1 second and spawn a new one
      spawnTimeout = setTimeout(() => {
        if (target.parentNode) {
          target.remove();
          createTarget();
        }
      }, 1000);
    }

    // Function to start the game
    function startGame() {
      startButton.style.display = "none"; // Hide the start button
      gameInterval = setInterval(() => {
        timpRamas--;
        timerDisplay.textContent = `Timp ramas: ${timpRamas} secunde`;

        if (timpRamas <= 0) {
          clearInterval(gameInterval);
          alert(`Timpul a expirat! Ai reusit sa acumulezi un total de ${score} puncte.`);
          resetGame(); // Automatically reset the game
        }
      }, 1000);

      // Start spawning targets
      createTarget();
    }

    // Attach event listener to the start button
    startButton.addEventListener("click", startGame);

    // Initialize the game by showing the start button
    resetGame();
  </script>
</body>
</html>
