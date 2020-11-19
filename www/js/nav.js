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
                                <h4 class="card-title">${results[i].Restaurant_Name}</h4>
                            </a>
                            <p class="card-text">${results[i].Restaurant_Type}</p>
                            <button id="DeleteRes" rateId="${results[i].id}" class="btn btn-outline-primary">Delete</button>
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
                    <h5 class="modal-title" id="exampleModalLabel">${Restaurant_Detail.Restaurant_Name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="card-title">${Restaurant_Detail.Restaurant_Name}</h4>
                    <p class="card-text">${Restaurant_Detail.Restaurant_Type}</p>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-secondary" data-dismiss="modal" href="#homepage">Close</button>
                </div>
                </div>
            </div>
            `
            $('#detail').empty().append(html)
        }
    })
})