$(document).ready(function () {
    gererarrutas()
    $('[data-toggle="tooltip"]').tooltip();

    $(document).on("click", "#tableasientos>tbody>tr>td>div", function () {
        console.log('click tabless')
        if ($(this).hasClass('asientolibre')) {
            if ($(this).hasClass('asientoseleccionado')) {
                $(this).removeClass('asientoseleccionado');
                console.log($('#asientosselecionadosclick').children().last().remove())
            } else {
                $(this).addClass('asientoseleccionado');
                $('#asientosseleccionados').clone().css('display', 'block').appendTo('#asientosselecionadosclick')
            }
        }
    });
    $(document).on('click', '.btn.p-0.borrarselecionado', function () {
        console.log($(this).parent().parent().parent().remove())
    });
    $(document).on('click', '.showmodal', function () {
        let id = this.id
        $.getJSON('db/rutas.json', function (data) {
            $.each(data, function (i, item) {
                $(`#asientos${data[i].codigoempresa}`).empty();
                // $(`#asientos${data[i].codigoempresa}`).append(`<h1>${data[i].codigoempresa}<h1>`)

                if (data[i].codigoempresa === id) {
                    generarAsientos(data[i].bus, id)
                }
            })
        })
    })

});
function generarAsientos(data, id) {
    console.log(data)
    var html = "<table><tr>";
    $.each(data['listaasientos'],function(i,item) {
        if(item.disponible==false){
            html = html + `<td class="asientoocupado">${item.numasiento}</td>`;
            
        }else{
            html = html + `<td class="asientolibre">${item.numasiento}</td>`;
        }
    })
    // var html = "<table><tr>";
    // for (i = 0; i < 4; i++) {
    //     if(i==3){
    //         html = html + "<td>" + (i + 5) + "</td>";
    //     }
    //     else{
    //         html = html + "<td>" + (i + 1) + "</td>";
    //     }
        
    // }
    html = html + "</tr></table>";

    $(`#asientos${id}`).append(html);
}

//Credenciales Pagos
var user = "integraciones.visanet@necomplus.com";
var password = "d5e7nk$M";

var urlApiSeguridad = "https://apitestenv.vnforapps.com/api.security/v1/security";
var urlApiSesion = "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/";

var urlJs = "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true";

//Generar Asientos
function gererarrutas() {
    //Agregar mas IDS
    $.getJSON('db/rutas.json', function (data) {
        $.each(data, function (i, item) {
            // alert(data[i].codigoempresa)
            $('#accordionExample').append(`<div class="card">
            <div class="card-header p-0" id="heading${data[i].codigoempresa}">
            <button id="${data[i].codigoempresa}" class="btn btn-block showmodal" type="button" data-toggle="collapse" data-target="#collapse${data[i].codigoempresa}" aria-expanded="false" aria-controls="collapse${data[i].codigoempresa}">
                    <div class="row m-0">
                        <div class="col-md-2 p-0">
                            <img src="${data[i].urlimg}" alt="" width="100%">
                        </div>
                        <div class="col-md-5">
                            <div class="d-flex justify-content-around">
                                <div class="d-flex flex-column">
                                    <span>Salida</span>
                                    <h4>${data[i].hora}</h4>
                                    <span class="subtitle">22, sep.</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span>Salida</span>
                                    <h4>15:00</h4>
                                    <span class="subtitle">22, sep.</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span>Salida</span>
                                    <h4>15:00</h4>
                                    <span class="subtitle">22, sep.</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <img src="https://localhost:3000/img/AER.png" alt="">
                        </div>
                    </div>
            </button>
            </div>
        
            <div id="collapse${data[i].codigoempresa}" class="collapse" aria-labelledby="heading${data[i].codigoempresa}" data-parent="#accordionExample">
            <div class="card-body">
                <div id="asientos${data[i].codigoempresa}"></div>
                
                </div>
            </div>
            </div>`)
        })

    })

}

function pagar() {
    generarToken();
}

function generarToken() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urlApiSeguridad,
        "method": "POST",
        "headers": {
            "Authorization": "Basic aW50ZWdyYWNpb25lcy52aXNhbmV0QG5lY29tcGx1cy5jb206ZDVlN25rJE0=",
            "Accept": "*/*"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        generarSesion(response);
        localStorage.setItem("token", response);
    });
}
// const fs=require('fs')
function generarSesion(token) {

    $.getJSON('db/pucharsenumber.json', function (data) {
        let datas = {
            "numberpucharse": data.numberpucharse + 1
        }
        localStorage.setItem('numerodecompra', data.numberpucharse);
        // fs.writeFileSync('db/pucharsenumber.json',JSON.stringify(datas))
    })
    var merchantId = 522591303
    var importe = 2

    var data = {
        "amount": importe,
        "antifraud": null,
        "channel": "web",
        "recurrenceMaxAmount": null
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urlApiSesion + merchantId,
        "method": "POST",
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json",
        },
        "processData": false,
        "data": JSON.stringify(data)
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        generarBoton(response['sessionKey']);
    });

}

function generarBoton(sessionKey) {
    var merchantId = 522591303
    var moneda = 'PEN';
    var nombre = 'walls';
    var apellido = 'Starring';
    var importe = 2
    var email = 'carnada3000@gmail.com'

    var json = {
        "merchantId": merchantId,
        "moneda": moneda,
        "nombre": nombre,
        "apellido": apellido,
        "importe": importe,
        "email": email
    }

    localStorage.setItem("data", JSON.stringify(json));

    let form = document.createElement("form");
    form.setAttribute('method', "post");
    form.setAttribute('action', `https://127.0.0.1:3000/confirmar?amount=${importe}&purchasenumber=${localStorage.getItem('numerodecompra')}`);
    form.setAttribute('id', "boton_pago");
    document.getElementById("btn_pago").appendChild(form);
    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', urlJs);
    scriptEl.setAttribute('data-sessiontoken', sessionKey);
    scriptEl.setAttribute('data-merchantid', merchantId);
    scriptEl.setAttribute('data-purchasenumber', localStorage.getItem('numerodecompra'));
    scriptEl.setAttribute('data-merchantlogo', "https://mercadobodegas.cl/assets/logo1.svg")
    scriptEl.setAttribute('data-channel', 'web');
    scriptEl.setAttribute('data-amount', importe);
    scriptEl.setAttribute('data-cardholdername', nombre);
    scriptEl.setAttribute('data-cardholderlastname', apellido);
    scriptEl.setAttribute('data-cardholderemail', email);
    scriptEl.setAttribute('data-timeouturl', 'http://127.0.0.1:3001/timeout');
    document.getElementById("boton_pago").appendChild(scriptEl);
}