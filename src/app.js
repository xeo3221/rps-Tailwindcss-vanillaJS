const getElement = selector => document.querySelector(selector)

const [score, scorePlayer, scoreEnemy, game, start, btnRealod, itemPlayer, itemEnemy, result] = [
	"#score", "#score-player", "#score-enemy", "#game", "#start", "#btn-reload", "#item-player", "#item-enemy", "#result"
].map(getElement)

const [btnRock, btnPaper, btnScissors] = [
	"#btn-rock",
	"#btn-paper",
	"#btn-scissors",
].map(getElement)

scorePlayer.textContent = scoreEnemy.textContent = 0
let scorePlayerValue = (scoreEnemyValue = 0)
let itemPlayerValue = (itemEnemyValue = "")

const randomItem = () => {
	const items = ["rock", "paper", "scissors"]
	return items[Math.floor(Math.random() * 3)]
}

const updateScore = () => {
	scorePlayer.textContent = scorePlayerValue
	scoreEnemy.textContent = scoreEnemyValue
}

const updateItem = () => {
	itemPlayer.src = `/assets/${itemPlayerValue}.svg`
	itemEnemy.src = `/assets/${itemEnemyValue}.svg`
}

const setResultText = (text, color) => {
	result.textContent = text
	result.classList.remove("text-red-400", "text-green-500", "text-yellow-200")
	result.classList.add(color)
}

const checkResult = () => {
	if (itemPlayerValue === itemEnemyValue) {
		setResultText("Draw", "text-yellow-200")
		return
	}

	if (
		(itemPlayerValue === "rock" && itemEnemyValue === "paper") ||
		(itemPlayerValue === "paper" && itemEnemyValue === "scissors") ||
		(itemPlayerValue === "scissors" && itemEnemyValue === "rock")
	) {
		setResultText("Lose", "text-red-400")
		scoreEnemyValue++
	} else {
		setResultText("Win", "text-green-500")
		scorePlayerValue++
	}
	updateScore()
}

const handleButtonClick = item => {
	score.classList.remove("hidden")
	score.classList.add("flex")
	game.classList.remove("hidden")
	game.classList.add("flex")
	btnRealod.classList.remove("hidden")
	btnRealod.classList.add("flex")
	start.classList.add("hidden")
	itemPlayerValue = item
	itemEnemyValue = randomItem()
	updateItem()
	checkResult()
}

btnRock.addEventListener("click", () => handleButtonClick("rock"))
btnPaper.addEventListener("click", () => handleButtonClick("paper"))
btnScissors.addEventListener("click", () => handleButtonClick("scissors"))

btnRealod.addEventListener("click", () => {
	score.classList.add("hidden")
	game.classList.add("hidden")
	btnRealod.classList.add("hidden")
	start.classList.remove("hidden")
	scorePlayerValue = scoreEnemyValue = 0
	updateScore()
	itemPlayerValue = itemEnemyValue = ""
	result.textContent = ""
})