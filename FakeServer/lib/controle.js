class ControleCaller {    
    constructor() {
        this.comandos = {};
    }   
    recuperaComandos(){
        return this.comandos;
    }     
    carregaComandos(comandos){
        this.comandos = comandos; 
    }
}
// --------------------------------------------------------------------------------
// Module Exports
// --------------------------------------------------------------------------------
module.exports = {
    ControleCaller: ControleCaller,    
}