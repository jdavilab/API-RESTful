const express = require('express')
const { Router } = express;

const router = Router();

const productos = [
    {
        id: 1,
        title: 'Computadora',
        thumbnail: 'https://www.iconfinder.com/icons/2090109/computer_desktop_computer_monitor_icon'
    },
    {
        id: 2,
        title: 'Impresora',
        thumbnail: 'https://www.iconfinder.com/icons/52431/impresora_icon'
    },
]

// router.use((req, res, next) => {
//     console.log('Time:', Date.now());
//     next();
// });


router.get('/', (req, res) => {
    res.send(productos)
});


router.get('/:id', (req, res) => {
    
   const product=productos[req.params.id-1];
   
    res.send(product)
});
 

router.post('/', (req, res) => {
    //obtenemos el maximo Id
    let newId= productos.reduce((max, obj) => (obj.id > max ? obj.id : max),0);
    //proximo Id
    newId++;

    const {title='',price='', thumbnail=''}= req.body
    productos.push({id: newId, title, price, thumbnail})
    res.json({id: newId, title, price, thumbnail})
    res.status(201).send({status: 'ok'});
});
 


//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put('/:id', (req, res) => {
    const id=parseInt(req.params.id)
    const {title='',price='', thumbnail=''}= req.body
    let salida= productos.find(obj=>(obj.id===id))
    if(!salida){
        return res.json({ error : 'producto no encontrado' })
    }
    //eliminamos el elemento
    productos.forEach((e,index)=>{
        if(e.id===id){
            productos.splice(index,1)
        }
    });
    //lo agregamos modificado
    productos.push({id: salida.id, title, price, thumbnail})
    return res.json({id: salida.id, title, price, thumbnail})
});

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/:id', (req, res) => {
    const id=parseInt(req.params.id)
    let salida= productos.find(obj=>(obj.id===id))
    if(!salida){
        return res.json({ error : 'producto no encontrado' })
    }
    //eliminamos el elemento
    productos.forEach((e,index)=>{
        if(e.id===id){
            productos.splice(index,1)
        }
    });
    return res.json(salida)
});



module.exports = router;