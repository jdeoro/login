import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const AppIndex = () => {
  return <Redirect href='/auth/login' />

}

export default AppIndex