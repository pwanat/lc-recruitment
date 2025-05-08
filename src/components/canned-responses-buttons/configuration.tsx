import { People, Person } from '@livechat/design-system-icons';
import { Icon, type SegmentedControlProps } from '@livechat/design-system-react-components';
import { ResponsesCounts } from '../../types/canned-responses';

const sharedIcon = <Icon source={People} />;
const privateIcon = <Icon source={Person} />;

export const getCannedResponsesButtons = ({
  allCount,
  sharedCount,
  privateCount,
}: ResponsesCounts): SegmentedControlProps['buttons'] => [
  { id: 'all', label: `All (${allCount ?? 0})` },
  { id: 'shared', label: `Shared (${sharedCount ?? 0})`, icon: sharedIcon },
  { id: 'private', label: `Private (${privateCount ?? 0})`, icon: privateIcon },
];
