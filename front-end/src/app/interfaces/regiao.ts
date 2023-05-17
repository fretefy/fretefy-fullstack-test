export interface Regiao {
    id: number;
    nome: string;
    status: StatusEnum;
    cidades: Array<string>;
}

export enum StatusEnum {
    ATIVA = 'Ativa',
    DESATIVADA = 'Desativada'
}