const db = require('../models/index.js')
const PrizeList = db.PrizeList

function getRandom(x){
    return Math.floor(Math.random()*x);
};



const lotteryControls = {
    index: (req, res) => {
        res.end('rock')
    },
    prizeList: (req, res) => {
        PrizeList.findAll({
            where:{
                is_deleted: null
            }
        })
        .then((result) => {
            let response = {
                "message": "success",
                "prizeList": []
            }
            let prizeList = JSON.parse(JSON.stringify(result, null, 4))
            response.prizeList.push(prizeList)
            response = JSON.stringify(response, null, 4)
            res.set({ 'content-type': 'application/json; charset=utf-8' });
            res.end(response)
        })
        .catch((err) => {
            console.log(err)
            res.redirect('back')
        })
        
    },
    
    lottery: (req, res) => {
        PrizeList.findAll({
            where: {
                is_deleted: null
            }
        })
        .then((result) => {
            const prizeList = JSON.parse(JSON.stringify(result, null, 4))
            // console.log(prizeList)
            let prizeBox = []
            for(prize of prizeList) {
                for(let i = 0; i < prize.number; i++) {
                    prizeBox.push(prize.id)
                }
            }
            const random = getRandom(prizeBox.length) // 隨機產生 0 ~ prizeBox 長度中隨機一數。
            const finalPrizeId = prizeBox[random]
            PrizeList.findOne({
                where: {
                    id: finalPrizeId,
                    is_deleted: null
                }
            }).then((result) => {
                const finalPrize = JSON.stringify(result, null, 4)
                res.set({ 'content-type': 'application/json; charset=utf-8' });
                res.end(finalPrize)
            }).catch((err) => {
                console.log(err)
                
                res.redirect('back')
            })
        }).catch((err) => {
            console.log(err)
            res.redirect('back')
        })
    },
    prizeAddPost: (req, res) => {
        const prize = req.body.prize 
        const name = req.body.name 
        const number = req.body.number 
        const imgurl = req.body.imgurl
        console.log(prize, name, number, imgurl)
        PrizeList.create({
            prize,
            name,
            number,
            imgurl
        }).then(() => {
            console.log('prize create success!')
            let response = {
                "message": "success"
            }
            response = JSON.stringify(response, null, 4)
            res.end(response)
            
        }).catch((err) => {
            console.log(err)
            res.redirect('back')
        })
    },
    
    prizeEditPost: async function (req, res, next) {
        const id = req.params.id 
        const prize = req.body.prize
        const name = req.body.name
        const number = req.body.number
        const imgurl = req.body.imgurl
        await PrizeList.update({
            prize,
            name,
            number,
            imgurl
        },{
            where: {
                id
            }
        }).then(() => {
            res.redirect('http://localhost:8080/rock/week17-BE201/homework-lottery/frontend/admin.html')    
        }).catch((err) => {
            console.log(err)
            res.redirect('http://localhost:8080/rock/week17-BE201/homework-lottery/frontend/admin.html')
        })
    },
    prizeDeletePost: async function (req, res, next) {
        const id = req.params.id 
        await PrizeList.update({
            is_deleted: 1
        },{
            where: {
                id
            }
        }).then(() => {
            console.log('deleted success!')
            res.redirect('http://localhost:8080/rock/week17-BE201/homework-lottery/frontend/admin.html')    
        }).catch((err) => {
            console.log(err)
            res.redirect('http://localhost:8080/rock/week17-BE201/homework-lottery/frontend/admin.html')
        })
    },

}


// npx sequelize-cli model:generate --name PrizeList --attributes prize:string,name:string,number:number,imgurl:string
// npx sequelize-cli model:generate --name Article --attributes user_id:number,title:string,content:text,type:string

module.exports = lotteryControls