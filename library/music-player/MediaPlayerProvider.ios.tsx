import React, { FC, PropsWithChildren } from 'react';

type Props = {};

export const MediaPlayerProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <>{children}</>;
};
