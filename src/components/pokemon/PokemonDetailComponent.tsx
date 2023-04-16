import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { PokemonDetailResponse } from '../../interfaces/pokemonInterfaces'
import { FadeInImage } from '../base/FadeImage'

interface Props {
    pokemonDetail: PokemonDetailResponse
}

export const PokemonDetailComponent = ({ pokemonDetail }: Props) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject
            }} contentContainerStyle={{
                paddingHorizontal: 16
            }}>

            {/* types */}
            <View style={customStyles.container}>
                <Text style={customStyles.title}>Types</Text>
            </View>
            <View style={customStyles.row}>
                {
                    pokemonDetail.types.map(({ type }) =>
                        (<Text style={customStyles.caption} key={type.name}>{type.name}</Text>)
                    )
                }
            </View>

            {/* wight */}
            <Text style={customStyles.title}>Weight</Text>
            <Text style={customStyles.caption}>{pokemonDetail.weight} Kg</Text>


            {/* sprites */}
            <Text style={customStyles.title}>Sprites</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                <FadeInImage uri={pokemonDetail.sprites.front_default} style={customStyles.sprite} />
                <FadeInImage uri={pokemonDetail.sprites.back_default} style={customStyles.sprite} />
                <FadeInImage uri={pokemonDetail.sprites.front_shiny} style={customStyles.sprite} />
                <FadeInImage uri={pokemonDetail.sprites.back_shiny} style={customStyles.sprite} />
            </ScrollView>

        </ScrollView>
    )
}

const customStyles = StyleSheet.create({
    container: {
        marginTop: 380
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8
    },
    row: {
        flexDirection: 'row',
        gap: 4
    },
    caption: {
        fontSize: 16,
        paddingVertical: 8
    },
    sprite: {
        width: 80,
        height: 80
    }
})
