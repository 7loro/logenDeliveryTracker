function search_btn_clicked() {
    console.log("search btn clicked");
    var number = $('#result_textarea').val();
    var numbers = number.split('\n');
    var result = {}
    $.each(numbers, function (index, number) {
        result[number] = "초기값";
    });

    $('#result_textarea').val('');

    $.each(numbers, function (index, number) {
        $.get("https://apis.tracker.delivery/carriers/kr.logen/tracks/" + number,
        function (data, status) {
            result[number] = data['state']['text'];
        }).fail(function(msg) {
            result[number] = msg.responseJSON.message;
        }).always(function() {
            if (index == numbers.length - 1) {
                $.each(numbers, function (index ,number) {
                    $('#result_textarea').val($('#result_textarea').val() + number + " " + result[number] + "\n");
                });
            }
        });
    });
}

function clear_btn_clicked() {
    console.log("clear btn clicked");
    console.log($('#result_textarea'))
    $('#result_textarea').val('');
}