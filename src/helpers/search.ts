export const searchInString = (item: string, search: string): boolean => {
  return item.toLowerCase().includes(search.toLowerCase());
};
