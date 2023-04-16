import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FadeInImage } from '../components/base/FadeImage'
import { PokemonCard } from '../components/pokemon/PokemonCard'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { globalStyles } from '../theme/AppTheme'

export const HomeScreen = () => {
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons, isLoading } = usePokemonPaginated();
    return (
        <>
            <Image style={globalStyles.pokeballBg} source={require('../assets/images/pokeball.png')} />
            <FlatList
                contentContainerStyle={{
                    paddingTop: top + 16,
                    paddingBottom: 16,
                    paddingHorizontal: 8
                }}
                data={simplePokemonList}
                keyExtractor={(pokemon) => pokemon.id}
                renderItem={({ item, index }) => (
                    <PokemonCard pokemon={item} onClick={
                        (pokemon, color) => { navigation.navigate('PokemonDetail', { simplePokemon: item, color: color }); }
                    } />
                )}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-evenly'
                }}
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.4}
                ListHeaderComponent={() => (
                    <Text style={{
                        ...globalStyles.globalMargin,
                        ...globalStyles.title,
                        marginBottom: 16,
                        color: 'black'
                    }}>Pokedex</Text>
                )}
                ListFooterComponent={() => (
                    isLoading ? (
                        <ActivityIndicator
                            style={{
                                padding: 24
                            }}
                            size={20} />
                    ) : <></>
                )}
                ItemSeparatorComponent={() => (
                    <View style={{ padding: 8 }} />
                )} />
        </>
    )
}
