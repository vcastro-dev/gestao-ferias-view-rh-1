import { Repository, useRepository } from './useRepository';

export type Hierarquia = {
    NAME_EMPLOYEE: string
}

export function useHierarquia(): Repository<Hierarquia> {
    const repository = useRepository<Hierarquia>({
        source: {
            guid: '1733062b-2634-43fc-8207-42fe20b40ac4',
        }
    });

    return repository
}