import React, { useEffect, useRef } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces'
import { FadeInImage } from '../base/FadeImage';
import { useState } from 'react';
import ImageColors from 'react-native-image-colors';

const width = Dimensions.get('window').width

interface Props {
    pokemon: SimplePokemon;
    onClick: (simplePokemon: SimplePokemon, color: string) => void
}

export const PokemonCard = ({ pokemon, onClick }: Props) => {

    const [bgColor, setBgColor] = useState('gray')
    const isMounted = useRef(true)

    useEffect(() => {
        ImageColors.getColors(pokemon.picture, {
            fallback: '#228B22',
            cache: true,
            key: pokemon.id,
        }).then((colors) => {

            if (!isMounted.current) return;

            switch (colors.platform) {
                case 'android':
                    // android result properties
                    setBgColor(colors.darkVibrant || 'gray')
                    break
                case 'ios':
                    // iOS result properties
                    setBgColor(colors.secondary)
                    break
                default:
                    throw new Error('Unexpected platform key')
            }
        });

        return () => {
            isMounted.current = false
        }
    }, [])


    return (
        <TouchableOpacity activeOpacity={0.6} style={customStyle.container} onPress={
            () => { onClick(pokemon, bgColor); }
        }>
            <View style={[customStyle.pokeballContainer, { backgroundColor: bgColor }]}>
                <Image style={customStyle.pokeball} source={require('../../assets/images/pokeball-white.png')} />
            </View>
            <View style={customStyle.card}>
                <Text style={customStyle.name}>
                    {pokemon.name}
                </Text>
                <FadeInImage uri={pokemon.picture} style={customStyle.image} />
            </View>
        </TouchableOpacity>
    )
}

const customStyle = StyleSheet.create({
    container: {
        width: width * 0.43,
        height: 120,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        marginHorizontal: 8
    },
    card: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 16
    },
    image: {
        position: 'absolute',
        width: 120,
        height: 120,
        bottom: -5,
        right: -8
    },
    pokeball: {
        width: 140,
        height: 140,
        opacity: 0.25,
        position: 'absolute',
        bottom: -40,
        right: -20,
    },
    pokeballContainer: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden'
    }
});
