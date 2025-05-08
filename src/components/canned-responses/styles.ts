import { css } from '@emotion/css';
import { DesignToken } from '@livechat/design-system-react-components';

const maxWidth = '100%';

export const wrapper = css`
  height: calc(100vh - 189px);

  &,
  & > div > div {
    box-sizing: border-box;
  }

  .heading {
    width: 100%;
    max-width: ${maxWidth};
    padding-top: 32px;
  }
`;

export const list = css`
  margin-top: 16px;
  position: relative;
  height: calc(100% - 82px);
  min-height: 400px;
  max-width: ${maxWidth};
`;

export const confirmationOverlay = css`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: var(${DesignToken.SurfaceBasicSubtle});
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid white;
`;

export const emptyState = css`
  margin-top: 32px;
  padding: 20px 20px 48px;

  img {
    max-width: 635px;
    max-height: 275px;
  }
`;
