import { Colaborador } from "../../../types/Colaborador";
import { SolicitacaoFerias } from "../../../types/SolicitacaoFeiras";

export interface IGestaoFeriasViewRhProps {
  colaboradores: Colaborador[];
  solicitacaoFerias: SolicitacaoFerias[];
}
