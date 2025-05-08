import { useQuery } from '@tanstack/react-query';
import { ItemAuthor } from '../../../types/item-author';

const getAuthorDataPath = 'https://randomuser.me/api/?seed=';

const getAuthorData = async (id: string): Promise<ItemAuthor> => {
  const response = await fetch(`${getAuthorDataPath}${id}`);
  const data = await response.json();
  return data.results[0];
};

const useItemAuthor = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [getAuthorDataPath, id],
    queryFn: () => getAuthorData(id),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

  return { data, isError, isLoading };
};

export default useItemAuthor;
