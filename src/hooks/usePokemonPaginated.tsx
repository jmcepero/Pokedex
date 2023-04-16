import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi"
import { Pokemon, PokemonPaginatedResponse, SimplePokemon } from "../interfaces/pokemonInterfaces";

export const usePokemonPaginated = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async () => {
        setIsLoading(true)
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.next;
        mapPokemonList(resp.data.results);
        setIsLoading(false);
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
        setSimplePokemonList([...simplePokemonList, ...simplePokemonArray]);
    }

    useEffect(() => {
        loadPokemons()
    }, []);

    return {
        simplePokemonList,
        loadPokemons,
        isLoading
    }
}
