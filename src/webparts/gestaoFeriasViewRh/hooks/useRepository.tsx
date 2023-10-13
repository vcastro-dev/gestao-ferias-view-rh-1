import { Params, QueryBuilder } from '../../utils/QueryBuilder';
import { useGet } from './useGet';

type Source = { 
    guid: string;
}

type Field<T> = {
    Title: keyof T;
}

type ChoiceField<T> = {
    choices: string[];
} & Field<T>

type LookupField<T> = {
    lookup: string[];
} & Field<T>

interface RepositoryActions<T> {
    getItems(params: Params<T>): T[];
    getFields(): Field<T>[] | ChoiceField<T>[] | LookupField<T>[];
}

export type Repository<T> = {
    source: Source;
} & RepositoryActions<T>;

export function useRepository<T>({source} : {source: Source}): Repository<T> {
    const getFields = () : (Field<T> | ChoiceField<T> | LookupField<T>)[] => {
        const fields = useGet<Field<T> | ChoiceField<T> | LookupField<T>>(`lists(guid'${source.guid}')/fields`)
        return fields;
    }

    const getItems = (params: Params<T>) : T[] => {
        const queryString = QueryBuilder<T>(params)    
        return useGet<T>(`lists(guid'${source.guid}')/items?${queryString}`)
    }

    return {
        source,
        getItems,
        getFields
    }
}