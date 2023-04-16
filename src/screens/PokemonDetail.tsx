import { NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { TabMainNavigationProps } from '../navigation/TabMain';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/base/FadeImage';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { PokemonDetailComponent } from '../components/pokemon/PokemonDetailComponent';

interface Props extends StackScreenProps<TabMainNavigationProps, 'PokemonDetail'> {

};

export const PokemonDetail = (props: Props) => {

  const { simplePokemon, color } = props.route.params;
  const { top } = useSafeAreaInsets();
  const { isLoading, pokemonDetail } = usePokemonDetail(simplePokemon.id);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={36} />
      </View>
    )

  return (
    <View style={{ flex: 1 }}>
      <View style={[customStyle.headerContainer, { backgroundColor: color }]}>
        <TouchableOpacity style={[customStyle.backButton, { top: top + 16 }]}>
          <Icon name='arrow-back-outline' size={24} color={'white'} />
        </TouchableOpacity>
        <Text style={[customStyle.pokemonName, { top: Platform.OS === 'android' ? 20 : 40 }]}>
          {simplePokemon.name}
        </Text>
        <FadeInImage uri={simplePokemon.picture} style={customStyle.pokemonImage} />
      </View>
      <PokemonDetailComponent pokemonDetail={pokemonDetail}/>
    </View>
  )
}

const customStyle = StyleSheet.create({
  headerContainer: {
    height: 340,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backButton: {
    alignSelf: 'flex-start',
    left: 16
  },
  pokemonName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-start',
    left: 16,
  },
  pokemonImage: {
    position: 'absolute',
    width: 280,
    height: 280,
    bottom: -20
  }
});
