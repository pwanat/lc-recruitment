import { memo } from 'react';
import { cx } from '@emotion/css';
import { ContentCopyFilled, DeleteFilled, EditFilled } from '@livechat/design-system-icons';
import { Icon, Tooltip } from '@livechat/design-system-react-components';
import Highlighter from 'react-highlight-words';

import { CannedResponse } from '../../../types/canned-responses';
import { useCannedResponseItem } from './use-canned-response-item';
import { CANNED_COPY_LABEL, CANNED_EDIT_LABEL, CANNED_REMOVE_LABEL } from '../constants';
import { FakeLink } from '../../fake-link/FakeLink';
import { ConfirmationOverlay } from '../ConfirmationOverlay';
import Author from './author/Author';

import * as styles from '../styles';

type Props = CannedResponse;

export const CannedResponseItem = memo(
  (item: Props) => {
    const {
      content,
      foldButtonContent,
      foldButtonIcon,
      lastAction,
      lastDate,
      showConfirmOverlay,
      toggleFolded,
      justModified,
      handleTagClick,
      searchWords,
    } = useCannedResponseItem({ item });
    const { id, isPrivate } = item;

    return (
      <div className={cx(styles.item, { justModified })} key={`item-${id}`}>
        <div className={styles.itemHeader}>
          <div className={styles.tags}>
            <ul>
              {item.tags.map((tag) => (
                <li
                  className={cx(styles.sharedItemHandle, { [styles.privateItemHandle]: isPrivate })}
                  key={tag}
                  data-testid={tag}
                  onClick={() => handleTagClick(tag)}
                  role="button"
                >
                  <Highlighter searchWords={searchWords} autoEscape={true} textToHighlight={tag} />
                </li>
              ))}
            </ul>
          </div>

          <div className="controls">
            <Tooltip
              theme="invert"
              placement="top"
              triggerRenderer={() => (
                <button className={styles.iconButton} aria-label={CANNED_EDIT_LABEL}>
                  <Icon source={EditFilled} size="small" />
                </button>
              )}
            >
              <span>{CANNED_EDIT_LABEL}</span>
            </Tooltip>
            <Tooltip
              theme="invert"
              placement="top"
              triggerRenderer={() => (
                <button className={styles.iconButton} aria-label={CANNED_COPY_LABEL}>
                  <Icon source={ContentCopyFilled} size="small" />
                </button>
              )}
            >
              <span>{CANNED_COPY_LABEL}</span>
            </Tooltip>
            <Tooltip
              theme="invert"
              placement="top"
              className={styles.tooltip}
              triggerRenderer={() => (
                <button className={styles.iconButton} aria-label={CANNED_REMOVE_LABEL}>
                  <Icon source={DeleteFilled} size="small" />
                </button>
              )}
            >
              <span>{CANNED_REMOVE_LABEL}</span>
            </Tooltip>
          </div>
        </div>

        <div data-testid="canned-message" className={cx({ [styles.content]: false })}>
          <Highlighter searchWords={searchWords} autoEscape={true} textToHighlight={content} />
        </div>

        <div className={styles.footer}>
          <div>
            {isPrivate ? (
              <div className={styles.modifiedText}>
                Private, {lastAction} {lastDate}
              </div>
            ) : (
              <Author id={id} lastAction={lastAction} lastDate={lastDate} />
            )}
          </div>
          {foldButtonContent && foldButtonIcon && (
            <FakeLink className={cx(styles.foldContent, 'foldButton')} onClick={toggleFolded}>
              <span>{foldButtonContent}</span>
              <Icon source={foldButtonIcon} size="xsmall" />
            </FakeLink>
          )}
        </div>

        {showConfirmOverlay && <ConfirmationOverlay onCancelClick={() => {}} onConfirmClick={() => {}} />}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.id === nextProps.id &&
      prevProps.isPrivate === nextProps.isPrivate &&
      prevProps.tags.join(',') === nextProps.tags.join(',') &&
      prevProps.text === nextProps.text &&
      prevProps.modificationTimestamp === nextProps.modificationTimestamp
    );
  },
);
