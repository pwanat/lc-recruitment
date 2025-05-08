import { SkeletonAvatar, SkeletonText } from '@livechat/design-system-react-components';
import { AgentAvatar } from '../../../avatar/AgentAvatar';

import * as styles from '../../styles';
import useItemAuthor from '../use-item-author';
import { useMemo } from 'react';

type Props = {
  id: string;
  lastAction: string;
  lastDate: string;
};

const Author = ({ id, lastAction, lastDate }: Props) => {
  const { data, isError, isLoading } = useItemAuthor(id);
  const authorName = data?.name ? `${data?.name.first} ${data?.name.last}` : 'Unknown';
  const avatarUrl = useMemo(() => data?.picture.thumbnail, [data?.picture.thumbnail]);

  return (
    <div className={styles.author}>
      <div className={styles.avatarContainer}>
        {isLoading ? (
          <SkeletonAvatar size={20} />
        ) : (
          <AgentAvatar src={avatarUrl} size="xxsmall" className={styles.avatar} />
        )}
      </div>
      {lastAction} by {isLoading ? <span className={styles.authorNameSkeleton}><SkeletonText width={100} /></span> : authorName}, {lastDate}
    </div>
  );
};

export default Author;
