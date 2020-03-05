$(document).ready(function () {
    gererarrutas();
    let show=false
    let idprev=``
    $(document).on('click', '.btn-mas', function () {
        let id = this.id
        $(this).html("Cerrar Sillas");
        if(show){
            id = id.replace('versillas', '')
            console.log($(`#boleto${id}>.row.paddi`).empty())
            show=false
            $(this).html("Ver Sillas");
            $(this).removeClass('btn-cerrar');
        }else{
            
            generarasientos(id,this);
            show=true
            $(this).addClass('btn-cerrar');
            idprev=id
        }
        
    })
    
})
function gererarrutas() {
    $.getJSON('db/rutas.json', function (data) {
        
        $.each(data, function (i, item) {
            let headers = `<div class="bg-white col-md-12 p-3" id="boleto${item['codigoempresa']}">
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-12 text-center">
                    <img class="imgempresa" src="http://localhost/aerotour/img/AER2.png" alt=""
                        srcset="">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4 text-center">
                            <span>Salida</span><br>
                            <h5>15.00</h5>
                            <span>22,sep</span>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 text-center">
                            <span>Salida</span><br>
                            <h5>15.00</h5>
                            <span>22,sep</span>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 text-center">
                            <span>Salida</span><br>
                            <h5>15.00</h5>
                            <span>22,sep</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 text-center">
                    <div class="travel-services"><span class="bus-service-name">Navette G7</span>
                        <div class="bus-service-container"><a href="#" data-toggle="tooltip"
                                data-placement="top" title="Baños"><img
                                    src="img/operadoras/bathroom.png"></a> <a href="#"
                                data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Sillas Reclinables"><img
                                    src="img/operadoras/reclining_chairs.png"></a> <a href="#"
                                data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Aire Acondicionado"><img
                                    src="img/operadoras/air_conditioner.png"></a> <a href="#"
                                data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="TV Ambiental"><img src="img/operadoras/tv.png"></a>
                            <a href="#" data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Pantallas Individuales"><img
                                    src="img/operadoras/individual_screen.png"></a> <a href="#"
                                data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Dos Conductores"><img
                                    src="img/operadoras/multiple_drivers.png"></a> <a href="#"
                                data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Toma Corriente"><img
                                    src="img/operadoras/socket_energy.png"></a> <a href="#"
                                data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Wifi"><img src="img/operadoras/wifi.png"></a>
                        </div> <span class="subtitle">Servicios</span>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-12 text-center">
                    <h4>$488484</h4>
                    <button class="btn-mas btn" id="versillas${item['codigoempresa']}">Ver Sillas</button>
                    <p class="demanda">Valor Trayecto por Persona</p>
                </div>
            </div>
            
        </div>`
            $('#rutas').append(headers)
        });
    })
}
function generarasientos(id,ob) {
    $.getJSON('db/rutas.json', function (data) {
        id = id.replace('versillas', '')
        let empresa = data.find(x => x.codigoempresa === id);
        if(empresa.bus['numeroasientos']==46){
            let asientos= generarasientode46(id,empresa.bus,empresa.precioboleto);
            $(`#boleto${id}`).append(asientos);
            $(`#table${id}>tbody>tr>td>div`).tooltip()
        }else if(empresa.bus['numeroasientos']==58){
            let asientos= generarasientode58(id,empresa.bus,empresa.precioboleto);
            $(`#boleto${id}`).append(asientos);
            $(`#table${id}>tbody>tr>td>div`).tooltip();
        }
        let pagar=` <div >
        <button type="button" id="pagar${id}" class="btn btn-danger btn-block">
            Pagar
            </button>
    </div>
    `
        let minimopasaje=false;
        let notlimit=true;
        let asientos=[]
        $(`#table${id}>tbody>tr>td>div`).on('click', function () {
            id = id.replace('versillas', '')
            let num=this.id.replace('asiento','')
            let empresa = data.find(x => x.codigoempresa === id);
            let asientoseleccionado=`<div class="row mt-2" id="asientoseleccionado${num}">
            <div class="col-md-3 col-sm-1">
                <div  data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${empresa.precioboleto}"class="asientoseleccionado position-relative">
                <span class="numasiento">
                ${num}
                </span>
                </div>
            </div>
            <div class="col-md-6 col-sm-8 mt-2 pl-4">
                <h5>
                    $${empresa.precioboleto}
                </h5>
            </div>
            <div class="col-md-3 col-sm-3">
                <button class="btn p-0 borrarselecionado" id="borrarasientoseleccionado${num}" style="color: red;">
                    <i class="far fa-trash-alt fa-2x"></i>
                </button>
            </div>
            <div class="col-md-12 col-sm-12">
                <p class="demanda text-left">
                Valor Trayecto por Persona
                </p>
            </div>
        </div>`
        $("button").remove(`#pagar${id}`);
            if ($(this).hasClass('asientolibre')) {
                if ($(this).hasClass('asientoseleccionado')) {
                    $(this).removeClass('asientoseleccionado');
                    $("div").remove(`#asientoseleccionado${num}`);
                    asientos =asientos.filter(item => item.id !== `asiento${num}`);
                    if($(`#asientosseleccionados${id}>`).children().length!=1){
                        minimopasaje=false
                    }
                    if(notlimit==false){
                        $("h1").remove(`#limite`);
                        notlimit=true
                    }
                } else {
                    if(notlimit==true){
                        $(this).addClass('asientoseleccionado');
                        $(`#asientosseleccionados${id}>span`).append(asientoseleccionado);
                        asientos.push({
                            id:`asiento${num}`
                        })
                        $(`#asientosseleccionados${id}>span`).append(`${pagar}`);
                        $(`#borrarasientoseleccionado${num}`).on('click',function(){
                            let num=this.id.replace('borrarasientoseleccionado','');
                            $(`#asiento${num}`).removeClass('asientoseleccionado')
                            $("div").remove(`#asientoseleccionado${num}`);
                            asientos =asientos.filter(item => item.id !== `asiento${num}`);
                            if($(`#asientosseleccionados${id}>`).children().length<1){
                                minimopasaje=false
                            }
                            if(notlimit==false){
                                $("h1").remove(`#limite`);
                                notlimit=true
                            }
                        })
                        if($(`#asientosseleccionados${id}>`).children().length==6){
                            notlimit=false;
                            let mensaje=`<h1 id="limite">limit</h1>`
                            $(`#asientosseleccionados${id}>span`).append(mensaje);
                        }
                        if($(`#asientosseleccionados${id}>`).children().length!=0){
                            minimopasaje=true
                            
                            $(`#pagar${id}`).on('click',function(){
                                $("#exampleModal").modal().show()
                            })
                        }
                    }
                }
            }
            
        });
    })
}
//
function generarasientode46(id,bus,precio){
    let sillas=`<table id="table${id}" class="table table-borderless">`
    //Timon
    sillas=sillas+`<tr><td><div class="timon"></div></td></tr><tr></tr>`
    //GenerarPrmerFila
    let indexprincipal = 0
    sillas=sillas+`<tr>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][index];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}" class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    //Tv
    sillas=sillas+`<td><div class="tv"></div></td>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    for (let i = 0; i < 3; i++) {
        sillas = sillas + `<tr>`
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"  class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"  class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        sillas = sillas + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (bus['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"  class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}" class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        sillas = sillas + `</tr>`;
        //quinta fila
        //Primera Fila
    }
    //
    //GenerarPrmerFila
    sillas=sillas+`<tr>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    //Tv
    sillas=sillas+`<td><div class="tv"></div></td>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    
    sillas=sillas+`</tr>`
    //Demas Columnas
    for (let i = 0; i < 2; i++) {
        sillas = sillas + `<tr>`
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}" class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}" class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        sillas = sillas + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (bus['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}" class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}" class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        sillas = sillas + `</tr>`;
        //quinta fila
        //Primera Fila
    }
    //Ultima Tv
    //GenerarPrmerFila
    sillas=sillas+`<tr>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    //Tv
    sillas=sillas+`<td><div class="tv"></div></td>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    
    sillas=sillas+`</tr>`
    //Ultimas
    sillas = sillas + `</tr>`
    let abort=false
    for (let i = 0; i < 4; i++) {
        sillas = sillas + `<tr>`
        for (let index = 0; index < 2; index++) {
            
            const element = bus['listaasientos'][indexprincipal];
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}" class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}" class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
            if(indexprincipal==46){
                console.log(indexprincipal);
                abort=true
                break;
                
            }
        }
        if(abort){
            sillas = sillas + `<td><div><div></td>`+`<td><div class="baño"></di></td><td><div class="baño"></di></td>`
            break
        }
        sillas = sillas + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (bus['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        //quinta fila
        //Primera Fila
    }
    sillas=sillas+`</tr>`
    //Fin de Primera Fila

    sillas=sillas+`</table>`
    let test=`<h1 class="table${id}">asdasd<h1>`
    let asientos=`<div class="row paddi">
                <div class="col-md-2 col-lg-2 col-sm-12 mt-2 borderright ocultar ocultar2">
                    <div id="infoasientos">
                        <div class="row">
                            <div class="col-md-4 col-lg-4 asientolibre"></div>
                            <div class="col-md-8 col-lg-8 p-0"
                                style="justify-content: center; display: flex; flex-direction: column;">
                                <span>Libre</span></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-4 asientoseleccionado"></div>
                            <div class="col-md-8 col-lg-8 p-0"
                                style="justify-content: center; display: flex; flex-direction: column;">
                                <span>Selecionado</span></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-4 asientoocupado"></div>
                            <div class="col-md-8 col-lg-8 p-0"
                                style="justify-content: center; display: flex; flex-direction: column;">
                                <span>Ocupado</span></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9 col-lg-7 col-sm-12 mt-2">
                    <div class="row paddi">
                        <div class="col-md-6 col-lg-6 borderbus">
                        <h6 class="text-center">Primer Piso</h6>
                            ${sillas}
                        </div>
                        
                    </div>
                </div>
                <div class="col-md-3 col-lg-3 col-sm-12 mt-2" id="asientosseleccionados${id}">
                    <span>Sillas Seleccionadas</h3>
                    
                    
                </div>
            </div>`

    return asientos
}
function generarasientode58(id,bus,precio){
    let sillas=`<table id="table${id}" class="table table-borderless">`
    //Timon
    sillas=sillas+`<tr></tr><tr></tr>`
    //GenerarPrmerFila
    let indexprincipal = 0
    sillas=sillas+`<tr>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][index];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    //Tv
    sillas=sillas+`<td><div class="tv"></div></td>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    for (let i = 0; i < 3; i++) {
        sillas = sillas + `<tr>`
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        sillas = sillas + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (bus['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        sillas = sillas + `</tr>`;
        //quinta fila
        //Primera Fila
    }
    //
    //GenerarPrmerFila
    sillas=sillas+`<tr>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    //Tv
    sillas=sillas+`<td><div class="tv"></div></td>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    
    sillas=sillas+`</tr>`
    //Demas Columnas
    for (let i = 0; i < 2; i++) {
        sillas = sillas + `<tr>`
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        sillas = sillas + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (bus['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        sillas = sillas + `</tr>`;
        //quinta fila
        //Primera Fila
    }
    //Ultima Tv
    //GenerarPrmerFila
    sillas=sillas+`<tr>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    //Tv
    sillas=sillas+`<td><div class="tv"></div></td>`
    for (let index = 0; index < 2; index++) {
        const element = bus['listaasientos'][indexprincipal];
        if (element.disponible) {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>
        `
            indexprincipal++
        } else {
            sillas = sillas + `<td>
            <div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
            data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">
                ${element.numasiento}
            </span>
        </td>`
            indexprincipal++
        }
    }
    
    sillas=sillas+`</tr>`
    //Ultimas
    sillas = sillas + `</tr>`
    let abort=false
    for (let i = 0; i < 4; i++) {
        sillas = sillas + `<tr>`
        for (let index = 0; index < 2; index++) {
            
            const element = bus['listaasientos'][indexprincipal];
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
            if(indexprincipal==46){
                console.log(indexprincipal);
                abort=true
                break;
                
            }
        }
        if(abort){
            sillas = sillas + `<td><div><div></td>`+`<td><div class="baño"></di></td><td><div class="baño"></di></td>`
            break
        }
        sillas = sillas + `<td class="tdtv"><div></div></td>`;
        for (let index = 0; index < 2; index++) {
            const element = bus['listaasientos'][indexprincipal];
            if (bus['listaasientos'].length == indexprincipal) {
                break;
            }
            if (element.disponible) {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientolibre"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            } else {
                sillas = sillas + `<td><div id="asiento${element.numasiento}" data-toggle="tooltip" data-placement="top" title=""
                data-original-title="$${precio}"class="position-relative asientoocupado"><span class="numasiento">${element.numasiento}</span></div></td>`
                indexprincipal++
            }
        }
        //quinta fila
        //Primera Fila
    }
    sillas=sillas+`</tr>`
    //Fin de Primera Fila

    sillas=sillas+`</table>`
    let test=`<h1 class="table${id}">asdasd<h1>`
    let asientos=`<div class="row paddi">
                <div class="col-md-2 col-lg-2 col-sm-12 mt-2 borderright ocultar ocultar2">
                    <div id="infoasientos">
                        <div class="row">
                            <div class="col-md-4 col-lg-4 asientolibre"></div>
                            <div class="col-md-8 col-lg-8 p-0"
                                style="justify-content: center; display: flex; flex-direction: column;">
                                <span>Libre</span></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-4 asientoseleccionado"></div>
                            <div class="col-md-8 col-lg-8 p-0"
                                style="justify-content: center; display: flex; flex-direction: column;">
                                <span>Selecionado</span></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-4 asientoocupado"></div>
                            <div class="col-md-8 col-lg-8 p-0"
                                style="justify-content: center; display: flex; flex-direction: column;">
                                <span>Ocupado</span></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9 col-lg-7 col-sm-12 mt-2">
                    <div class="row paddi">
                        <div class="col-md-6 col-lg-6 borderbus">
                        <h6 class="text-center">Segundo Piso</h6>
                            ${sillas}
                        </div>
                        <div class="col-md-6 col-lg-6 borderbus">
                        <h6 class="text-center">Primer Piso</h6>
                        ${sillas}
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-lg-3 col-sm-12 mt-2 "id="asientosseleccionados${id}">
                    <span>Sillas Seleccionadas</span>
                    
                </div>
            </div>`

    return asientos
}

function pagar() {
    generarToken();
}
var user = "integraciones.visanet@necomplus.com";
var password = "d5e7nk$M";

var urlApiSeguridad = "https://apitestenv.vnforapps.com/api.security/v1/security";
var urlApiSesion = "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/";

var urlJs = "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true";
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
        let a=document.getElementsByClassName("start-js-btn");
        
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
