type Expand<T> = {
    [K in keyof T]: Array<keyof T[K]>
}

type QueryOperations = {
    eq?: string;
    ne?: string;
    gt?: string;
    ge?: string;
    lt?: string;
    le?: string;
}

type Query<T> = Record<keyof T | string, QueryOperations>

export type Params<T> = {
    expand?: Partial<Expand<T>>
    filter?: Partial<Query<T>>
}

export function QueryBuilder<T>(params: Params<T>): string {
    const { expand, filter } = params;

    const query = []

    if(expand) {
        const keys = Object.keys(expand) || []
        
        if(keys) {
            const expandQuery: string = `$expand=${keys.join(',')}`

            const expandableKeysQueryString = keys.map((key) => {
                const value = expand[key as keyof T] || []
                return `${key}/${value}`
            })

            const selectQuery: string = `$select=*,${expandableKeysQueryString.join(',')}`

            query.push(...[expandQuery, selectQuery])
        }
    }

    if(filter) {
        const keys = Object.keys(filter) as (keyof T)[] || []
        
        if(keys) {
            const queryFilter: string[] = []

            keys.forEach((key) => {
                const value = filter[key] || {}

                if(!value) return
                const operations = Object.keys(value) as (keyof QueryOperations)[] || []

                if(!operations) return
                operations.forEach((operation) => {
                    const operationValue = value[operation] || ''
                    queryFilter.push(`${String(key)} ${operation} ${operationValue}`)
                })
            })

            query.push(`$filter=${queryFilter.join(' and ')}`)
        }
    }

    return query.join('&')
}