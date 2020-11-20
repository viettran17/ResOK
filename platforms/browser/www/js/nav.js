function home() {
    const res = GetRes("I-RateRes")
    res.onsuccess = (event) => {
        const results = event.target.result
        for (var i in results.reverse()) {
            let html =`
                <div class="card-group vgr-cards">
                    <div class="card">
                        <div class="card-body">
                            <a id="GetDetailsRes" rateId="${results[i].id}" data-toggle="modal" data-target="#detail">
                                <img src = "${results[i].Restaurant_Image}" style="max-width: 500px; width: 100%; height: auto;">
                                <h1 class="card-title">${results[i].Restaurant_Name}</h1>
                            </a>
                            <h5 class="card-text">${results[i].Restaurant_Type}</h5>
                            <p>Average Rating: <span>${parseFloat((Number(results[i].Food_Rate) + Number(results[i].Clean_Rate) + Number(results[i].Service_Rate))/3).toFixed(1)}</span><i class="fa fa-star fa_custom"></i></p>
                            <p class="card-text">Address: ${results[i].Restaurant_Address}</p>
                            <button id="DeleteRes" rateId="${results[i].id}" class="btn btn-outline-primary">Delete <span><i class="fa fa-trash" ></i></span></button>
                        </div>
                    </div>
                </div>
            `
            $('#listrest').append(html);
        }
    }
}
$(window).on("load", function() {
    home()
});
$(document).ready(function() {
    $('#home').on('click', function() {
        $('#listrest').empty()
        home()
    })
    $('#rate-form').on('submit', function (){
        const rate = {
            Restaurant_Name: $('#Restaurant_Name').val(),
            Restaurant_Type: $('#Restaurant_Type').val(),
            Restaurant_Address: $('#Restaurant_Address').val(),
            Service_Rate: $('#Service_Rate').val(),
            Clean_Rate: $('#Clean_Rate').val(),
            Food_Rate: $('#Food_Rate').val(),
            Price: $('#Price').val(),
            Date: $('#Date').val(),
            Notes: $('#Notes').val(),
            Restaurant_Image: 'img/res.png'
        }
        AddRes("I-RateRes", rate)
        return false
    })
    $(document).on('click', '#DeleteRes', function() {
        const rateid = $(this).attr("rateId")
        const result = DeleteRes(rateid)
        result.onsuccess = function() {
            navigator.notification.beep(1);
            navigator.vibrate(100)
            $('#listrest').empty()
        }
        result.onerror = function() {
            alert("Failed to delete")
        }
        return  home()
    })

    $(document).on('click', '#GetDetailsRes', function() {
        const rateId = $(this).attr("rateId")
        const result = GetDetailsRes(rateId)
        result.onsuccess = function(event) {
            $(location).attr('href', "#detail")
            const Restaurant_Detail = event.target.result
            const html = `
            <div class="modal-dialog" role="document">
                <div class="">
                <div class="modal-header">
                    <h1 class="modal-title" id="exampleModalLabel">${Restaurant_Detail.Restaurant_Name}</h1>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img src = "${Restaurant_Detail.Restaurant_Image}" style="max-width: 500px; width: 100%; height: auto;">
                    <h3 class="card-text">${Restaurant_Detail.Restaurant_Type}</h3>
                    <p class="card-text">Address: ${Restaurant_Detail.Restaurant_Address}</p>
                    <p class="card-text">Food Rate   : ${Restaurant_Detail.Food_Rate}<i class="fa fa-star fa_custom"></i></p>
                    <p class="card-text">Clean Rate  : ${Restaurant_Detail.Clean_Rate}<i class="fa fa-star fa_custom"></i></p>
                    <p class="card-text">Service Rate: ${Restaurant_Detail.Service_Rate}<i class="fa fa-star fa_custom"></i></p>
                    <h4>Average Rating: <span>${parseFloat((Number(Restaurant_Detail.Food_Rate) + Number(Restaurant_Detail.Clean_Rate) + Number(Restaurant_Detail.Service_Rate))/3).toFixed(1)}</span><i class="fa fa-star fa_custom"></i></h4>
                    <h4 class="card-text">Average Price: ${Restaurant_Detail.Price}<i class="fa fa-usd" aria-hidden="true"></i></h4>
                    <p class="card-text">Note: ${Restaurant_Detail.Notes}</p>
                </div>
                <div class="modal-footer">
                    <p class="card-text">Rate time:${Restaurant_Detail.Date}</p>
                    <button type="submit" class="btn btn-secondary" data-dismiss="modal" href="#homepage">Close</button>
                </div>
                </div>
            </div>
            `
            $('#detail').empty().append(html)
        }
    })
})