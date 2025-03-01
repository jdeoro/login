import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { router } from 'expo-router';
import ThemedButton from '@/components/ThemedButton';
import { useAuthStore } from '@/core/auth/store/useAuthStore';
import { useURL } from 'expo-linking';

const RegisterScreen = () => {
  return <Redirect href='/auth/login' />

  const { logout} = useAuthStore()
  const salir = () => {
    logout()
    router.replace('/auth/login')
  }  
 
  <>
  <Text>Register</Text>

    {/* Spacer */}
    <View style={{ marginTop: 10 }} />

    {/* Botón */}
    <ThemedButton
      icon="arrow-forward-outline"
      onPress={salir}
    >
      Salir
    </ThemedButton>

    {/* Spacer */}
    <View style={{ marginTop: 50 }} />


</>

}

export default RegisterScreen
