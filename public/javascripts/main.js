/**
 * Created by User on 15.01.2017.
 */

$(document).ready(function() {
    // Добавляем новый контакт, когда произошел клик по кнопке
    function createContacts(name,phone){
        return "<div class='row contact'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><div class='row'><div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'><img src='/assets/images/contact_img.jpg' style='width: 45%;height: 45%;'></div><div class='col-lg-9 col-md-9 col-sm-9 col-xs-9'><div class='row'><span>"+name+"</span></div><div class='row'><span>"+phone+"</span></div></div><div class='col-lg-1 col-md-1 col-sm-1 col-xs-1'><div class='row'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12' name='"+name+"'><a href='#' class='del_button' ><i class='fa fa-times-circle  fa-5x' aria-hidden='true' ></i></a></div></div></div></div></div><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><div class='row'><hr></div></div></div>";
    }
    $("#addContact").click(function (e) {

        e.preventDefault();


        if(!(/^\\w+$/i.test($("#newName").val())) && !(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test($('#newPhone').val()))) //validator
        {
            alert("Incorrectly filled field. In the phone only input numbers, +, -, and ().");
            return false;
        }
        alert(/^\\w+$/i.test($("#newName").val()) && /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test($('#newPhone').val()));
        var myData = {name: $('#newName').val(),phoneNumber: $('#newPhone').val()};
        $.ajax({
            type: "POST",
            url: "/add-contact",
            dataType:"json",
            data: myData,
            success:function(response){
                $("#newName").val('');
                $('#newPhone').val('');//очищаем текстовое поле после успешной вставки
                if(!response.errorMessage) $('.contacts-list').append(createContacts(response.name, response.phoneNumber));
                else alert(response.errorMessage);
            },
            error:function (xhr, ajaxOptions, thrownError){
                alert(thrownError);
            }
        });
    });

    //Удаляем контакт при клике по крестику
    $("body").on("click", ".del_button", function(e) {
        e.preventDefault();
        var NameDelet = {deletContact: $(this).parent('div').attr('name')};
        var mainTag  = $(this);
        $.ajax({
            type: "POST",
            url: "/delet-contact",
            data: NameDelet,
            success:function(response){
                mainTag.parent('div').parent('div').parent('div').parent('div').parent('div').parent('div').fadeOut('slow');
            },
            error:function (xhr, ajaxOptions, thrownError){
                alert(thrownError);
            }
        });
    });

    $("#searchText").keyup(function() {
        $.post("/search-contact", { searchText: $('#searchText').val() }, "json")
            .done(function(data) {
                $('.contacts-list').empty();
                data.forEach(function (item, i, arr) {
                    $('.contacts-list').append( createContacts(data[i].name,data[i].phoneNumber));
                });
            });
    });
});