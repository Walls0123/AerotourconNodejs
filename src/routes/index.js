const express = require('express');
const router = express.Router();
const sql = require('mssql');
const http = require('http')
//Routes Server
router.get('/', (req, res) => {
    res.render('index.html', { title: 'Inicio' })
});
router.get('/reserva', (req, res) => {
    res.render('reserva.html', { title: 'Reserva' })
});
router.get('/comprar', (req, res) => {
    res.render('comprar.html', { title: 'Comprar' })
})
router.post('/pagar', (req, res) => {
    res.render('pagar.html', { token: req })
})
router.get('/pagar/', (req, res) => {
    res.render('pagar.html', { token: req })
})
router.get('/timeout/', (req, res) => {
    res.render('pagar.html')
})

router.get('/get/:search', (req, res) => {
    //Get Params
    var config = {
        user: 'nodejs',
        password: 'golft0123',
        server: 'localhost',
        database: 'aerotour'
    };
    sql.connect(config).then(pool => {

        return pool.request()
            .input('input', sql.VarChar(60), req.params.search)
            .execute('GetCiudadesFilters')
    }).then(result => {
        let sendobjectname = [];
        for (let index = 0; index < result['recordset'].length; index++) {
            const element = result['recordset'][index]
            sendobjectname.push({ 'label': element.nombre.trim(), 'value': element.codigo.trim() })
        }
        res.status(200).send({
            success: 'true',
            mensaje: 'datos filtrados',
            todos: (sendobjectname)
        })

    }).catch(err => {
        res.send(err)
    })

})
var urlApiSeguridad = "https://apitestenv.vnforapps.com/api.security/v1/security";
router.post('/confirmar', (req, res) => {
    var query = require('url').parse(req.url, true).query;
    console.log(query.purchasenumber)
    console.log(query.amount)
    console.log(req.body)
    let objectres={
        purchasenumber:query.purchasenumber,
        amount:query.amount,
        object:req.body
    }
    res.render('pagar.html',{reserva:objectres})
})
//
module.exports = router;