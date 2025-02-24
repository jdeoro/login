import ThemedButton from '@/components/ThemedButton';
import { useAuthStore } from '@/core/auth/store/useAuthStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Platform, Text, Pressable, View } from 'react-native';
import { SecureStorageAdapter } from '@/middelware/secure-storage.adapter';



export default function HomeScreen() {
  const {  status,token, logout , checkStatus}  =useAuthStore()

  const salir = () => {
    logout()
    router.replace('/auth/login')
  }

  useEffect(() => {
    const check = async () => {
      const checkqueo = await checkStatus()
      console.log(checkqueo)
    }

    check()
  }, [])
 


  return (
    <>
      <Text>(tabs)Index.tsx</Text>

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



    </>  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
