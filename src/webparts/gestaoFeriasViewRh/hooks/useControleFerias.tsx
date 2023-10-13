import { Params } from '../../utils/QueryBuilder';
import { Hierarquia } from './useHierarquia';
import { Repository, useRepository } from './useRepository';

type Author = {
    Title: string;
}

type ExpandableFields = {
    Author: Author;
    NomeColaborador: Hierarquia;
}

export type ControleFerias = {
    Id: number;
    InicioPeriodoAtual: Date;
    FimPeriodoAtual: Date;
    DataLimiteAgendarFerias: Date;
    DataLimiteSairFerias: Date;
    SaldoDias: string;
} & ExpandableFields;

export function useControleFerias(): Repository<ControleFerias>{
    const repository = useRepository<ControleFerias>({
        source: {
            guid: '95a4f6c1-9837-4f6e-bcb5-488115e6a417',
        },
    });

    const getItems = (params?: Params<ControleFerias>) : ControleFerias[] => {
        return repository.getItems({
            ...params,
            expand: {
                NomeColaborador: ['NAME_EMPLOYEE'],
            }
        });
    }

    return {
        ...repository,
        getItems,
    };
}