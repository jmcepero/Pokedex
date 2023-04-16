import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { useDebounceValue } from '../../hooks/useDebounceValue';

interface Props {
    onDebounced: (value: string) => void;
}

export const SearchInput = ({ onDebounced }: Props) => {
    const { top } = useSafeAreaInsets();
    const [textValue, setTextValue] = useState('');
    const textDebounced = useDebounceValue(textValue);

    useEffect(() => {
        onDebounced(textDebounced)
    }, [textDebounced])


    return (
        <View style={[customStyle.textContainer, { marginTop: top + 16 }]}>
            <Icon style={customStyle.icon} name='search-outline' size={26} color={'gray'} />
            <TextInput value={textValue} onChangeText={(value) => setTextValue(value)} placeholder='Search Pokemons' style={[customStyle.textInput]} />
        </View>
    )
}

const customStyle = StyleSheet.create({
    textContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginHorizontal: 16
    },
    textInput: {
        padding: 16,
        flex: 1
    },
    icon: {
        marginLeft: 16
    }
})
