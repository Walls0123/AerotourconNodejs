var user = "integraciones.visanet@necomplus.com";
var password = "d5e7nk$M";

var urlApiSeguridad = "https://apitestenv.vnforapps.com/api.security/v1/security";
var urlApiSesion = "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/";

var urlJs = "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true";
var urlautorization="https://apitestenv.vnforapps.com/api.authorization/v3/authorization/ecommerce/"

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
        localStorage.setItem("token", response);
    });
}
function generateAuthorization(transactionToken,numerodecompra){
    
    generarToken()
    // generarSesion();
    console.log(reserva)
    var merchantId = 522591303
    var importe = 2
    var data = {
        "captureType":"manual",
        "amount": importe,
        "antifraud": null,
        "channel": "web",
        "countable":true,
        "recurrenceMaxAmount": null,
        "order":{
            amount:2,
            currency:"PEN",
            purchaseNumber:numerodecompra,
            tokenId:transactionToken
        },
        "recurrence":null,
        "sponsored":null
    };
    console.log(data)
    var tokengenerado=localStorage.getItem('token')
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urlautorization+merchantId,
        "method": "POST",
        "headers": {
            "Authorization": tokengenerado,
            "Content-Type": "application/json",
        },
        "processData": false,
        "data": JSON.stringify(data)
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        
    });
}
function generarSesion(token) {
    
    var merchantId = 522591303
    var importe = 2
    console.log('importe: ', importe);
    // "captureType":'manual',
    // "antifraud": null,
    // "channel": "web",
    // "countable":true,
    // "order":{
    //     "amount": 2,
    //     "currency":'PEN',
    //     "purchaseNumber":51465465,
    //     "tokenId":transactionToken
    // },
    // "recurrence":null,
    // "sponsored":null
    var data = {
        "captureType":"manual",
        "amount": importe,
        "antifraud": null,
        "channel": "web",
        "recurrenceMaxAmount": null,
        "order":{
            amount:2,
            currency:"PEN",
            purchaseNumber:51465465,
            tokenId:""
        }
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urlApiSesion + merchantId,
        "method": "POST",
        "headers": {
            "Authorization": localStorage.getItem('token'),
            "Content-Type": "application/json",
        },
        "processData": false,
        "data": JSON.stringify(data)
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    
}