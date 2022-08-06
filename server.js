const express = require('express');
const productos = require('./modulos/productos');


const app = express();

//funcione el body push
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Middleware a nivel de aplicación
//antes q ingresa una mascota o persona
//muestre por consola la hora

// app.use((req, res, next) => {
//     console.log('Time:', Date.now());
//     next();
// });
  

app.use('/api/productos', productos);

app.get('/api/productos/:id',(req, res  ) =>{
    const product=productos[req.params.id];
   // const { id } = req.params.id;
   // const product= productos[id]
    res.send(product).status(200);
});

app.use('/static', express.static(__dirname + '/public'))

app.listen(8080, () => console.log('Servidor OK puerto 8080'));