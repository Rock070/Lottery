const prizeListApiUrl = 'http://localhost:5002/prizeList'
const lotteryResultApiUrl = 'http://localhost:5002/lottery'


$('document').ready(() => {

    function escapeHtml(unsafe) {
        return unsafe
            .toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    // call 所有獎項清單 api，並回傳獎項、數量、圖片
    const prizeList = fetch(prizeListApiUrl)
    prizeList.then((res) => {
        res.json().then((result) => {
            let prizeList = result.prizeList[0]
            if(result.message == 'success') {
                for(prize of prizeList) {
                    $('.award-list').append(`
                    <div class='award'>
                        <h4 class="prize">${escapeHtml(prize.prize)}</h4>
                        <img width="110" heigh="130" src="${escapeHtml(prize.imgurl)}">
                        <h4 class='number'>x ${escapeHtml(prize.number)}</h4>
                    </div> 
                    `)
                }
            }
            
            // 開始抽獎按下後動畫
            function startLotteryAnimation() {
                const driver = setInterval(frame, 300);
                function frame() {
                    let num = Math.floor(Math.random()*prizeList.length);
                    $('.result').html(`
                        <div class='award'>
                            <img width="140" heigh="140" src="${escapeHtml(prizeList[num].imgurl)}">
                        </div> 
                    `)

                    $('.stop-btn').click((e) => {
                        clearInterval(driver)
                        
                        // call 抽獎結果 api
                        const lotteryResult = fetch(lotteryResultApiUrl)
                        lotteryResult.then((res) => {
                            res.json().then((result) => {
                                $('section#lottery-game .result').html(`
                                    <div class='award'>
                                        <h1 class="prize">${escapeHtml(result.prize)}</h1>
                                        <h3>${escapeHtml(result.name)}</h3>
                                        <img style="filter:brightness(1)" width="170" heigh="250" src="${escapeHtml(result.imgurl)}">
                                    </div>
                                `)
                            })
                        })
                    })
                }
            }
            
            $('.start-btn').click((e) => {
                startLotteryAnimation()
                
            })
        })
    });    
});

