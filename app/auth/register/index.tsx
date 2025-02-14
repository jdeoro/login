import ThemedButton from '@/components/ThemedButton';
import ThemedLink from '@/components/ThemedLink';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <>
    
    </>
  );
};
export default RegisterScreen;
