import { css } from '@emotion/css';

const maxWidth = '100%';

export const actionBar = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  max-width: ${maxWidth};

  .lc-search-bar__container {
    height: 36px;
  }
`;

export const barContainer = css`
  display: flex;
  flex-direction: column;
`;

export const searchBar = css`
  align-self: flex-end;
  max-width: 250px;
`;

export const segmentedControlButton = css`
  box-sizing: border-box;

  button:focus {
    box-shadow: none;
  }
`;

export const segmentedControllButtonTopSpace = css`
  height: 32px;
`;