import { View } from '@/components/react-native';
import { PropsWithChildren } from 'react';

import { styles } from '@/styles/common';

export const AppScreen = ({ children }: PropsWithChildren) => {
  return <View style={styles.screen}>{children}</View>;
};
