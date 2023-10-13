import { Params } from '../../utils/QueryBuilder';
import { Hierarquia } from './useHierarquia';
import { Repository, useRepository } from './useRepository';

type ExpandableFields = {
    Author: Author;
    NomeColaborador: Hierarquia;
}

type Author = {
    Title: string;
}

export type SolicitacaoFerias = {
    Id: number;
    Status: string;
    PeriodoAquisitivo: Date;
} & ExpandableFields;

export function useSolicitacaoFerias(): Repository<SolicitacaoFerias>{
    const repository = useRepository<SolicitacaoFerias>({
        source: {
            guid: '3f6aca03-ed95-49d7-91a4-aae35eaa1958',
        },
    });

    const getItems = (params?: Params<SolicitacaoFerias>) : SolicitacaoFerias[] => {
        return repository.getItems({
            ...params,
            expand: {
                Author: ['Title'],
            }
        });
    }

    return {
        ...repository,
        getItems,
    };
}