const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const usuarios = new Usuarios();
const {crearMensaje}= require('../utils/utilidades')

io.on('connection', (client) => {


    client.on('entraChat', (data, callback) => {
        console.log(data);
        if (!data.nombre || !data.sala) {
            return callback({
                err: 'El nombre y la sala son necesarios'
            });
        }
        client.join(data.sala);
        usuarios.agragarPersonas(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador',`Persona ${data.nombre} se ha unido el chat`));

        
        //Emite lista de personas
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));



        return callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crearMensaje',(data, callback) => { 
        let persona= usuarios.getPersona(client.id);
        let mensaje=  crearMensaje(persona.nombre,data.mensaje)
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);

    })


    client.on('disconnect',() => {
        let borrado=usuarios.borrarPersona(client.id);
        client.broadcast.to(borrado.sala).emit('crearMensaje', crearMensaje('Administrador',`Persona ${borrado.nombre} ha abandonado el chat`));
        client.broadcast.to(borrado.sala).emit('listaPersona', usuarios.getPersonasPorSala(borrado.sala));
  
    });

    client.on('mensajePrivado', (data, callback)=>{
        let persona= usuarios.getPersona(client.id);
        client.broadcast.to(data.paraquien).emit('mensajePrivado',crearMensaje(persona.nombre, data.mensaje));
    })

});