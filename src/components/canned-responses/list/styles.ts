import { css } from '@emotion/css';

export const virtualizerWrapper = css`
    height: 100%;
    overflow-y: auto;
    contain: strict;
`;

export const virtualizerSizer = css`
    width: 100%;
    position: relative;
`;
export const virtualizerList = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`;
