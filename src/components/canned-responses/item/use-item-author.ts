import { useQuery } from '@tanstack/react-query';
import { ItemAuthor } from '../../../types/item-author';

const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes

export const getAuthorDataPath = 'https://randomuser.me/api/?seed=';

export const getAuthorData = async (id: string): Promise<ItemAuthor> => {
  const response = await fetch(`${getAuthorDataPath}${id}`);
  const data = await response.json();
  return data.results[0];
};

const useItemAuthor = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [getAuthorDataPath, id],
    queryFn: () => getAuthorData(id),
    staleTime: FIVE_MINUTES,
    gcTime: FIVE_MINUTES,
  });

  return { data, isError, isLoading };
};

export default useItemAuthor;
