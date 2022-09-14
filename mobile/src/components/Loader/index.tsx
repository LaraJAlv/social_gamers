import { ActivityIndicator, View } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY} />
    </View>
  )
}
