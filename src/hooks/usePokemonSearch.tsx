import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi"
import { Pokemon, PokemonPaginatedResponse, SimplePokemon } from "../interfaces/pokemonInterfaces";

export const usePokemonSearch = () => {

    const [isFetching, setIsFetching] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const [filteredPokemonList, setFilteredPokemonList] = useState<SimplePokemon[]>([])

    const loadPokemons = async () => {
        const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
        mapPokemonList(resp.data.results)
        setIsFetching(false)
    }

    const mapPokemonList = (pokemonList: Pokemon[]) => {
        const simplePokemonArray: SimplePokemon[] = pokemonList.map((value, index) => {
            const urlParts = value.url.split('/');
            const id = urlParts[urlParts.length - 2]

            return {
                name: value.name,
                id: id,
                picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
            }
        });
        setSimplePokemonList(simplePokemonArray);
    }

    const onDebouncedValueArrive = (term: string) => {
        if (term === '') {
            setFilteredPokemonList(simplePokemonList);
            return
        }

        const filteredList = simplePokemonList.filter((value) => {
            if (isNaN(Number(term))) {
                return value.name.includes(term.toLocaleLowerCase())
            } else return value.id === term
        });

        setFilteredPokemonList(filteredList);
    }

    useEffect(() => {
        loadPokemons()
    }, []);

    return {
        simplePokemonList,
        isFetching,
        onDebouncedValueArrive,
        filteredPokemonList
    }
}
