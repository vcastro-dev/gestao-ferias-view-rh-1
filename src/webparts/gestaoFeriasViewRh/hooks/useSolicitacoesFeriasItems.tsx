import { Repository, useRepository } from './useRepository';

export type SolicitacaoFeriasItem = {
    Id: number;
    DataInicio: Date;
    DataFim: Date;
    Status: string;
    QuantidadeDias: number;
    DecimoTerceiro: boolean;
    SolicitacaoFeriasId: number;
}

export function useSolicitacaoFeriasItems(): Repository<SolicitacaoFeriasItem> {
    const repository = useRepository<SolicitacaoFeriasItem>({
        source: {
            guid: 'ff367779-18a9-43f1-8ffc-7237dc66ec80',
        }
    });

    return repository;
}