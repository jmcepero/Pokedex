import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchInput } from '../components/base/SearchInput';
import { PokemonCard } from '../components/pokemon/PokemonCard';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { globalStyles } from '../theme/AppTheme';

export const SearchScreen = () => {

    const { isFetching, onDebouncedValueArrive, filteredPokemonList } = usePokemonSearch()
    const navigation = useNavigation()
    const [termSearch, setTermSearch] = useState('');

    useEffect(() => {
        onDebouncedValueArrive(termSearch)
    }, [termSearch]);

    if (isFetching) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={20} />
            </View>
        )
    }

    return (
        <View style={[customStyle.container]}>

            <SearchInput onDebounced={setTermSearch} />

                <FlatList
                    contentContainerStyle={{
                        paddingBottom: 16,
                        paddingHorizontal: 8,
                        paddingTop: 16,
                    }}
                    data={filteredPokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    renderItem={({ item, index }) => (
                        <PokemonCard pokemon={item} onClick={
                            (pokemon, color) => { navigation.navigate('PokemonDetail', { simplePokemon: item, color: color }); }
                        } />
                    )}
                    numColumns={2}
                    ListHeaderComponent={() => (
                        <Text style={{
                            ...globalStyles.globalMargin,
                            ...globalStyles.title,
                            marginBottom: 16,
                            color: 'black'
                        }}>{termSearch}</Text>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ padding: 8 }} />
                    )} />
            </View>

    )
}

const customStyle = StyleSheet.create({
    container: {
        flex: 1
    },
})
