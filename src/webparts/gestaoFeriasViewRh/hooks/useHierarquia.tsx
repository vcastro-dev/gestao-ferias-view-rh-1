import { Repository, useRepository } from "./useRepository";

export type Hierarquia = {
  Title: string;
};

export function useHierarquia(): Repository<Hierarquia> {
  const repository = useRepository<Hierarquia>({
    source: {
      guid: "2511179d-6e7d-4027-b73f-7136363f96f2",
    },
  });

  return repository;
}
