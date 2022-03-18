const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

app.use(express.json())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'f2963c715eab4b70b57e5f703753e74d',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.use("/", express.static(path.join(__dirname, "/public/")))
app.use("/js", express.static(path.join(__dirname, "/public/index.js")))
app.use("/styles", express.static(path.join(__dirname, "/public/index.css")))

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/index.html"))
// })
// app.get("/", (req, res) => {
//     rollbar.info("HTML served")
//     res.sendFile(path.join(__dirname, "/public/"))
// })

app.get('/api/robots', (req, res) => {
    try {
        rollbar.log("Someone got all the robotz")
        res.status(200).send(bots)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
        rollbar.log("got 5 robots")
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        rollbar.error("error getting 5 bots")
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        rollbar.info("got player record")
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})