import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonDetail } from '../screens/PokemonDetail';

export interface TabMainNavigationProps extends ParamListBase {
    HomeScreen: undefined,
    PokemonDetail: {
        simplePokemon: SimplePokemon,
        color?: string
    }
}

const Stack = createStackNavigator<TabMainNavigationProps>();

export const TabMain = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
            <Stack.Screen name={'PokemonDetail'} component={PokemonDetail} />
        </Stack.Navigator>
    )
}
