import { ICidade } from "./cidade";

export interface IRegiao {
  id?: string;
  nome: string;
  ativa: boolean;
  cidades: [{
    id?: string;
    cidadeId: string;
    regiaoId: string;
  }];
}
