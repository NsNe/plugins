import { utils } from 'umi';
import { join } from 'path';

export default function (util: typeof utils) {
  return `\
import React, { useContext } from 'react';
import AccessContext, { AccessInstance as AccessInstanceType } from './context';
import { traverseModifyRoutes } from '${util.winPath(
    join(__dirname, '..', 'utils', 'runtimeUtil'),
  )}';

export { traverseModifyRoutes };

export type AccessInstance = AccessInstanceType;

export const useAccess = () => {
  const access = useContext(AccessContext);

  return access;
};

export interface AccessProps {
  accessible: boolean;
  fallback?: React.ReactNode;
}

export const Access: React.FC<AccessProps> = props => {
  const { accessible, fallback, children } = props;

  if (process.env.NODE_ENV === 'development' && typeof accessible === 'function') {
    console.warn(
      '[plugin-access]: provided "accessible" prop is a function named "' +
        (accessible as Function).name +
        '" instead of a boolean, maybe you need check it.',
    );
  }

  return <>{accessible ? children : fallback}</>;
};
`;
}
