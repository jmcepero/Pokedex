import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonDetail } from '../screens/PokemonDetail';
import { SearchScreen } from '../screens/SearchScreen';

export interface TabSearchNavigationProps extends ParamListBase {
    SearchScreen: undefined,
    PokemonDetail: {
        simplePokemon: SimplePokemon,
        color?: string
    }
}

const Stack = createStackNavigator<TabSearchNavigationProps>();

export const TabSearch = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}>
            <Stack.Screen name={'SearchScreen'} component={SearchScreen} />
            <Stack.Screen name={'PokemonDetail'} component={PokemonDetail} />
        </Stack.Navigator>
    )
}
