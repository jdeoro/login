import ThemedButton from '@/components/ThemedButton';
import ThemedLink from '@/components/ThemedLink';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import { useAuthStore } from '@/core/auth/store/useAuthStore';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';

const RegisterScreen = () => {
  const { register  } = useAuthStore();

    // se utiliza para que una vez que llama al login, deja 'disable' el boton ingresar.
    const [isPosting, setIsPosting] = useState(false);
    const [form, setForm] = useState({
      fullname : "",
      email: "",
      password: "",
    });

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  const onRegister  = async () => {
    setIsPosting(true);
    const ok = await register(form.email, form.password, form.fullname);
    setIsPosting(false);

    if (ok) {
      Alert.alert("Succesfull!", "Se ha registrado correctamente");
      router.replace("/auth/login");
      return;
    }else{
      Alert.alert("Email already exists!", "No se ha podido registrar");
    }
     

  }

  return (
    <>
   <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.25,
          }}
        >
          <ThemedText type="title">Registrarse</ThemedText>
        </View>

        {/* Email , Password y FullName*/}

        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Nombre"
            autoCapitalize="none"
            icon="person-outline"
            value={form.fullname}
            onChangeText={(value) => setForm({ ...form, fullname: value })}
          />

          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Botón */}
        <ThemedButton
          icon="arrow-forward-outline"
          onPress={onRegister}
          disabled={isPosting}
        >
          Grabar
        </ThemedButton>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />
        <View>{isPosting && <ActivityIndicator />}</View>

      </ScrollView>
    </KeyboardAvoidingView>

    </>
  );
};
export default RegisterScreen;
