function ValidaCPF(cpfEnviado){

    Object.defineProperty(this, 'cpfLimpo', {
        get: function(){
            return cpfEnviado.replace(/\D+/g, '')
        }
    })
}

ValidaCPF.prototype.Valida = function(){
    if(typeof this.cpfLimpo === undefined) return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2)    
    const digito1 = this.criarDigito(cpfParcial);
    const digito2 = this.criarDigito(cpfParcial + digito1)
   
   const novoCpf =  cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo;
}

ValidaCPF.prototype.criarDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial);
    let regressivo= cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val))
        regressivo--;
        return ac;
    }, 0);
    const digito = 11 - (total % 11)
    return digito > 9 ? '0' : String(digito);
}

ValidaCPF.prototype.isSequencia = function isSequencia(){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
}

const cpf = new ValidaCPF('049.897.850-88');

if(cpf.Valida()){
    console.log('cpf válido');
}else{
    console.log('Cpf inválido');
}