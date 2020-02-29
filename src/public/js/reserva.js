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

    var html = `<div class="col-sm-6 text-center tablaborde">
    <span>Segundo Piso</span>
    <table><tr>`;
    //Timon
    // html = html + `<td><div></div></td>` +
    //     `<td><div class="timon"></div></td>` +
    //     `<td><div></div></td>` + `<td><div class="timon"></div></td>` + `<td><div></div></td>`
    //Primera Fila
    html = html + `<tr>`;
    let indexprincipal = 0
    for (let index = 0; index < 2; index++) {
        const element = data['listaasientos'][index];
        if (element.disponible) {
            html = html + `<td><div data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$82,000"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        } else {
            html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        }

    }
    html = html + `<td class="tdtv"><div class="tv"></div></td>`;
    for (let index = indexprincipal; index < 4; index++) {
        const element = data['listaasientos'][index];
        if (element.disponible) {
            html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        } else {
            html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        }
    }
    html = html + `</tr>`
    //Segunda,terecera,cuarta..fila

    for (let i = 0; i < 3; i++) {
        html = html + `<tr>`
        for (let index = 0; index < 2; index++) {
            const element = data['listaasientos'][indexprincipal];
            if (element.disponible) {
                html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        html = html + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = data['listaasientos'][indexprincipal];
            if (data['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        html = html + `</tr>`;
        //quinta fila
        //Primera Fila
    }
    html = html + `<tr>`;
    for (let index = 0; index < 2; index++) {
        const element = data['listaasientos'][indexprincipal];
        if (element.disponible) {
            html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        } else {
            html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        }
    }
    html = html + `<td class="tdtv"><div class="tv"></div></td>`;
    for (let index = 0; index < 2; index++) {
        const element = data['listaasientos'][indexprincipal];
        if (element.disponible) {
            html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        } else {
            html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        }
    }
    html = html + `</tr>`
    //Fin asiento
    for (let i = 0; i < 2; i++) {
        html = html + `<tr>`
        for (let index = 0; index < 2; index++) {
            const element = data['listaasientos'][indexprincipal];
            if (element.disponible) {
                html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        html = html + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = data['listaasientos'][indexprincipal];
            if (data['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        html = html + `</tr>`;

        //quinta fila
        //Primera Fila
    }
    html = html + `<tr>`;
    for (let index = 0; index < 2; index++) {
        const element = data['listaasientos'][indexprincipal];
        if (element.disponible) {
            html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        } else {
            html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        }
    }
    html = html + `<td class="tdtv"><div class="tv"></div></td>`;
    for (let index = 0; index < 2; index++) {
        const element = data['listaasientos'][indexprincipal];
        if (element.disponible) {
            html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        } else {
            html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
            indexprincipal++
        }
    }
    html = html + `</tr>`
    let abort=false
    for (let i = 0; i < 4; i++) {
        html = html + `<tr>`
        for (let index = 0; index < 2; index++) {
            
            const element = data['listaasientos'][indexprincipal];
            if (element.disponible) {
                html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
            if(indexprincipal==46){
                console.log(indexprincipal);
                abort=true
                break;
                
            }
        }
        if(abort){
            html = html + `<td><div><div></td>`+`<td><div class="baño"></di></td><td><div class="baño"></di></td>`
            break
        }
        html = html + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = data['listaasientos'][indexprincipal];
            if (data['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        //quinta fila
        //Primera Fila
    }
    html=html+`<tr`
    html = html + "</table></div>";
    console.log(data['listaasientos'].length)
    console.log(indexprincipal)
    $(`#asientos${id}`).first().append(html)
    $(`#asientos${id}>div>table>tbody>tr>td>div`).tooltip()
    indexprincipal--;
    if (indexprincipal >=45) {
        indexprincipal++
        var html = `<div class="col-sm-6 text-center tablaborde tablaborde2">
        <span>Primer Piso</span>
        <table><tr>`;
            //Timon
            html = html + `<td><div></div></td>` +
                `<td><div></div></td>` +
                `<td><div></div></td>` + `<td><div class="timon"></div></td>` + `<td><div></div></td>`
            //Primera Fila
            html = html + `<tr>`;
            for (let index = 0; index < 2; index++) {
                const element = data['listaasientos'][indexprincipal];
                if (element.disponible) {
                    html = html + `<td><div data-toggle="tooltip" data-placement="top" title=""
                    data-original-title="$82,000"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                    indexprincipal++
                } else {
                    html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                    indexprincipal++
                }
            }
            html=html+`<td class="tdtv"><div class="tv"></div></td><td><div></div></td>`;
            if(data['listaasientos'][indexprincipal].disponible){
                html=html+`</td><td><div class="asientolibre position-relative"><span class="numasiento">${data['listaasientos'][indexprincipal].numasiento}</span></div></td>`
            }else{
                html=html+`</td><td><div class="asientoocupado position-relative"><span class="numasiento">${data['listaasientos'][indexprincipal].numasiento}</span></div></td>`
            }
            indexprincipal++;
            abort=false
            for (let i = 0; i < 4; i++) {
                html = html + `<tr>`
                for (let index = 0; index < 2; index++) {
                    
                    const element = data['listaasientos'][indexprincipal];
                    if(indexprincipal==58){
                        abort=true
                        break;
                    }
                    if (element.disponible) {
                        html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                        indexprincipal++
                    } else {
                        html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                        indexprincipal++
                    }
                    if(indexprincipal==58){
                        abort=true
                        break;
                        
                    }
                }
                if(abort){
                    break
                }
                html = html + `<td class="tdtv"><div></div></td>`;
                for (let index = 0; index < 1; index++) {
                    const element = data['listaasientos'][indexprincipal];
                    if (data['listaasientos'].length == indexprincipal) {
                        break;
                    }
                    html=html+`<td><div></div></td>`
                    if (element.disponible) {
                        html = html + `<td><div class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                    } else {
                        html = html + `<td><div class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                    }
                    indexprincipal++
                }
                //quinta fila
                //Primera Fila
            }

            html = html + `</tr>`
            //Segunda,terecera,cuarta..fila
            html = html + "</table></div>";
            $(`#asientos${id}`).last().append(html)
    }
    
    $(`#asientos${id}>div>table>tbody>tr>td>div`).tooltip()
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
            <div class="card-body pl-0 pr-0">
                <div class="row m-0 w-100">
                            <div class="col-sm-2 bg-white">asd</div>
                            <div class="col-sm-7">
                                <div class="row m-0" id="asientos${data[i].codigoempresa}">
                                <div class="col-sm-6">
                                    <div></div>
                                </div>
                                <div class="col-sm-6">asdsd</div>
                                </div>
                            </div> 
                            <div class="col-sm-3">asdsd</div>
                            </div>
                            
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