const container = document.querySelector('.container')
const word = document.getElementById('word')
const settingsBtn = document.getElementById('settings-btn')
const settingsEl = document.getElementById('settings')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const endgameContainer = document.getElementById('end-game-container')
const text = document.getElementById('text')
const select = document.getElementById('difficulty')

let score = 0
let timeLeft = 10

async function getRandomWord() {
    const res = await fetch('https://random-word-api.herokuapp.com/word')
    const data = await res.json()
    return data[0]
}

async function randomWordToDOM() {
    const randomWord = await getRandomWord()
    word.innerText = randomWord
}

randomWordToDOM()

function toggleSettings() {
    settingsEl.classList.toggle('hide')
}

settingsBtn.addEventListener('click', toggleSettings)

function gameIsOver() {
    endgameContainer.style.display = 'block'
    endgameContainer.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button id="reload-button">Reload</button>
    `

    const reloadBtn = document.getElementById('reload-button')
    reloadBtn.addEventListener('click', () => {
        score = 0
        scoreEl.innerText = score
        timeLeft = 10
        timeEl.innerText = timeLeft
        startTimer()
        randomWordToDOM()
        endgameContainer.style.display = 'none'
    })
}

function startTimer() {
    const interval = setInterval(() => {
        timeLeft--
        timeEl.innerText = `${timeLeft}s`

        if(timeLeft <= 0) {
            clearInterval(interval)
            gameIsOver()
        }
    },1000)
   }

document.addEventListener('DOMContentLoaded', startTimer)

    text.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            const writingWord = text.value
        if(writingWord === word.innerText && select.value === 'easy') {
            score++
            scoreEl.innerText = score
            timeLeft = timeLeft + 5
            text.value = ''
          randomWordToDOM()
        }
        else if(writingWord === word.innerText && select.value === 'medium') {
            score++
            scoreEl.innerText = score
            timeLeft = timeLeft + 3
            text.value = ''
          randomWordToDOM()
        }
        else if(writingWord === word.innerText && select.value === 'hard') {
            score++
            scoreEl.innerText = score
            timeLeft = timeLeft + 2
            text.value = ''
          randomWordToDOM()
        }   else {
            text.value = ''
        }
    }
    })

  