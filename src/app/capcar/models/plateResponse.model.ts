export class PlateResponse {
    constructor(
        public ano: number,
        public anoModelo: number,
        public chassi: string,
        public codigoRetorno: number,
        public codigoSituacao: number,
        public cor: string,
        public data: Date,
        public dataAtualizacaoAlarme: string,
        public dataAtualizacaoCaracteristicasVeiculo: string,
        public dataAtualizacaoRouboFurto: string,
        public marca: string,
        public mensagemRetorno: string,
        public modelo: string,
        public municipio: string,
        public placa: string,
        public situacao: string,
        public uf: string
    ) { }
}
