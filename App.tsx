import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { TabMain } from './src/navigation/TabMain'
import { BottomTabs } from './src/navigation/BottomTabs';

export const App = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  )
}

