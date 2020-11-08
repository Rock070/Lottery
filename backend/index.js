const express = require('express')
const bodyParser = require('body-parser')
const lotteryControl = require('./controls/lottery.js')
const flash = require('connect-flash');
const session = require('express-session')
const cors = require('cors');





const app = express()
const port = 5002


function redirectIndex(req, res) {
    res.redirect('back')
}

// app set
app.set('view engine', 'ejs');  

// app use (middleware)

// 1. body-parse
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 2. express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// 3. connect-flash

app.use(flash());

// 4. 內建提供靜態檔案

app.use('/css', express.static('./views/css'));

// 5. local 儲存全域變數

app.use((req, res, next) => {
    res.locals.nickname = req.session.nickname || false
    res.locals.userId = req.session.userId || false
    res.locals.errMessage = req.flash('errMessage')
    next()
})
// 6. cors() 開放跨來源存取

app.use(cors())
// app get
app.get('/', (req, res) => {
    res.end('rock')
})

// prizeList
app.get('/prizeList', lotteryControl.prizeList)

// lottery
app.get('/lottery', lotteryControl.lottery)
app.post('/lottery', lotteryControl.prizeAddPost)

// prize

app.post('/prizeEditPost/:id', lotteryControl.prizeEditPost, redirectIndex)
app.post('/prizeDeletePost/:id', lotteryControl.prizeDeletePost, redirectIndex)
app.listen(port, () => {
    console.log(`success!listen to ${port}`)
})


