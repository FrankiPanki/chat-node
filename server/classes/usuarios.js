class Usuarios {

    constructor() {
        this.personas = []
    }

    agragarPersonas(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }
 
    getPersonasPorSala(sala) {
        let personas= this.personas.filter(persona=>persona.sala === sala);
        return personas;
    }

    borrarPersona(id) {
        console.log(this.personas)
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        console.log(personaBorrada);
        return personaBorrada;

    }
}

module.exports = {Usuarios}