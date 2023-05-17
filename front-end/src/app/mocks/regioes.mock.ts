import { Regiao, StatusEnum } from "../interfaces/regiao";

export const regioes: Regiao[] = [
    {
        id: 1,
        nome: 'Sudeste',
        status: StatusEnum.ATIVA,
        cidades: ['São Paulo', 'Rio de Janeiro']
    },
    {
        id: 2,
        nome: 'Nordeste',
        status: StatusEnum.DESATIVADA,
        cidades: ['Salvador', 'Recife']
    }
]