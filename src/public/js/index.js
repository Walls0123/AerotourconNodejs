$(document).ready(function () {
    //Slider Presentation
    // var slideIndex = 0;
    // carrucel()
    // function carrucel() {
    //     let arrayImg = $('.slide');
    //     for (let i = 0; i < arrayImg.length; i++) {
    //         $(arrayImg[i]).css('display', 'none')
    //     }
    //     slideIndex++;
    //     if (slideIndex > arrayImg.length) {
    //         slideIndex = 1
    //     }
    //     $(arrayImg[slideIndex - 1]).css('display', 'block')
    //     setTimeout(carrucel, 5000)
    // }
    $("#searchorigen").autocomplete({
        source: function (req, res) {
            $.get('http://192.168.1.10:3001/get/' + this.element[0].value, {
                query: req
            }, function (data) {
                res(data.todos)
                //Method Fail AJAX
            }).fail(function (jqXHR, textStatus, errorThrown) {
                $('#myModal').modal('show');
                $('#searchorigen').val('')
            })
        }
        ,
        select: function (e, ui) {
            e.preventDefault();
            $("#searchorigen").val(ui.item.label)
        }
    })
    $('.carta').hover(function(){
        $(this).find('.lugarid').css('top','30%')
        $(this).find('.precio').css('display','block')
    },function(){
        $(this).find('.precio').css('display','none')
        $(this).find('.lugarid').css('top','40%')
    })
    //Close Modal
    //Get Values Autocomplete Destino
    $("#searchdestino").autocomplete({
        source: function (req, res) {
            
            $.get('http://192.168.1.10:3001/get/' + this.element[0].value, {
                query: req
            }, function (data) {
                res(data.todos)
            }).fail(function (jqXHR, textStatus, errorThrown) {
                $('#myModal').modal('show');
                $('#searchdestino').val('')
            })
        }
        ,
        select: function (e, ui) {
            e.preventDefault();
            $("#searchdestino").val(ui.item.label)
        }
    })
    //Value date 
    // $('#fechaorigen').val('2020-02-04')
    // $('#fecharegreso').val('2020-02-06')
    //Form Send Values
    $('#formreserva').submit(function () {

    })

    
})