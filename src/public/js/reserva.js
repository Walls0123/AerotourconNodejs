$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#tableasientos").on("click", "div", function () {
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

});
//Credenciales Pagos
var user = "integraciones.visanet@necomplus.com";
var password = "d5e7nk$M";

var urlApiSeguridad = "https://apitestenv.vnforapps.com/api.security/v1/security";
var urlApiSesion = "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/";

var urlJs = "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true";

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

function generarSesion(token) {
    
    var merchantId = 522591303
    var importe = 2
    console.log('importe: ', importe);

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
    form.setAttribute('action', `https://127.0.0.1:3000/confirmar?amount=${importe}&purchasenumber=${51465465}`);
    form.setAttribute('id', "boton_pago");
    document.getElementById("btn_pago").appendChild(form);
    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', urlJs);
    scriptEl.setAttribute('data-sessiontoken', sessionKey);
    scriptEl.setAttribute('data-merchantid', merchantId);
    scriptEl.setAttribute('data-purchasenumber', 51465465);
    scriptEl.setAttribute('data-merchantlogo', "https://mercadobodegas.cl/assets/logo1.svg")
    scriptEl.setAttribute('data-channel', 'web');
    scriptEl.setAttribute('data-amount', importe);
    scriptEl.setAttribute('data-cardholdername', nombre);
    scriptEl.setAttribute('data-cardholderlastname', apellido);
    scriptEl.setAttribute('data-cardholderemail', email);
    scriptEl.setAttribute('data-timeouturl', 'http://127.0.0.1:3001/timeout');
    document.getElementById("boton_pago").appendChild(scriptEl);
}