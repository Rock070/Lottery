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
                            <div class='img'>
                                <img width="110" heigh="130" src="${escapeHtml(prize.imgurl)}">
                            </div>
                            <form action="http://localhost:5002/prizeEditPost/${escapeHtml(prize.id)}" method='POST'>
                                <label for="prize">獎項:
                                    <input type="text" name='prize' id='prize' value='${escapeHtml(prize.prize)}'> 
                                </label>
                                <label for="name">名稱:
                                    <input type="text" name='name' id="name" value='${escapeHtml(prize.name)}'> 
                                </label>
                                <label for="number">數量:
                                    <input type="text" name='number' id='number' value='${escapeHtml(prize.number)}'> 
                                </label>
                                <label for="imgurl">圖片網址:
                                    <input type="text" name='imgurl' id='imgurl' value='${escapeHtml(prize.imgurl)}'> 
                                </label>
                                <input class='btn btn-edit' type="submit" value='按此更新'> 
                            </form>
                            <form action="http://localhost:5002/prizeDeletePost/${prize.id}" method='POST'>
                                    <input class='btn btn-delete' type="submit" value='刪除'> 
                            </form>
                    </div> 
                    `)
                }
            }
        })
    })            

    $('.add-prize-form').submit(e => {
        e.preventDefault();
        
        const prize = $('#prize').val()
        const name = $('#name').val()
        const number = $('#number').val()
        const imgurl = $('#imgurl').val()

        if(!prize || !name || !number || !imgurl){
            alert('資料不可為空')
            return
        }
        const dataNewToAppend = { 
            prize,
            name,
            number,
            imgurl
        }


        $.ajax({
            type: 'POST',
            url: 'http://localhost:5002/lottery',
            data: dataNewToAppend,
            success: function(data) {
                let result = JSON.parse(data)
                if(result.message == 'success') {
                    alert("修改成功！");
                    window.location.reload(); 
                }
            }
        })
    })
})