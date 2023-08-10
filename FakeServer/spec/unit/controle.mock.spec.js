const rewire = require('rewire');
const sinon = require('sinon');
const controleRemoto = rewire('../../lib/controle.js');

describe("Controle", function(){
    let vo_controleRemoto;
    const comandosMockados = {"subir": 42, "descer": 26};
    
    beforeEach(function() {        
        vo_controleRemoto = new controleRemoto.ControleCaller();       
        callForecastMock = sinon.stub().returns(comandosMockados);
    });

    it("Controle precisa comecar sem comandos definidos", function() {        
        expect(Object.keys(vo_controleRemoto.comandos).length).toBe(0);
    });

    it("Depois de carregar o sistema precisa estar com os comandos definidos", function() {        
        vo_controleRemoto.carregaComandos(comandosMockados);        
        expect(Object.keys(vo_controleRemoto.comandos).length).toBe(2);
    });    
})


