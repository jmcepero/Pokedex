import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { TabMain } from './TabMain';
import { SearchScreen } from '../screens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabSearch } from './TabSearch';

const Tabs = createBottomTabNavigator();

export const BottomTabs = () => {
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                marginBottom: 6
            },
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderWidth: 0,
                elevation: 0
            }
        }} initialRouteName='StackNavigation'
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}>
            <Tabs.Screen options={{
                tabBarLabel: 'All Pokemons',
                tabBarIcon: ({ color, size }) => (
                    <Icon name='list-outline' size={size} color={color} />
                )
            }} name='StackNavigation' component={TabMain} />
            <Tabs.Screen options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                    <Icon name='search-outline' size={size} color={color} />
                )
            }} name='TabSearch' component={TabSearch} />
        </Tabs.Navigator>
    )
}
