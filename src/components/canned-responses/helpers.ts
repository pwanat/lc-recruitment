import { privacyFilterCannedResponses } from '../../hooks/helpers/privacy-filter-canned-responses';
import { searchInString } from '../../hooks/helpers/search';
import { CannedResponse } from '../../types/canned-responses';
import { CannedResponseFilterType } from '../../types/filter-type';

export function getExtractedText(text: string, maxTextLength = 150): string {
  return text.length > maxTextLength ? `${text.substring(0, maxTextLength - 3)}...` : text;
}

export function filterAvailableTags(tags: string[], availableTagNames: Set<string>): string[] {
  return availableTagNames.size > 0 ? tags.filter((tag) => availableTagNames.has(tag)) : tags;
}

export const filteredAndSortedResponses = (
  responses: CannedResponse[],
  filter: CannedResponseFilterType,
): CannedResponse[] =>
  privacyFilterCannedResponses(responses, filter).sort(
    (first, second) => second.modificationTimestamp - first.modificationTimestamp,
  );

export const searchInItem = (item: CannedResponse, search: string): boolean => {
  if (!search) return true;

  const { text, tags, createdBy } = item;
  const searchWords = search.trim().toLowerCase().split(/\s+/);

  const isMatched = searchWords.some((word) => {
    const isInText = searchInString(text, word);
    const isInTags = tags.some((tag) => searchInString(tag, word));
    const isInCreatedBy = createdBy ? searchInString(createdBy, word) : false;
    return isInText || isInTags || isInCreatedBy;
  });
  return isMatched;
};
