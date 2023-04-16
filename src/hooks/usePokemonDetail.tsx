import React, { useEffect } from 'react'
import { useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonDetailResponse } from '../interfaces/pokemonInterfaces';

export const usePokemonDetail = (pokemonId:  string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailResponse>({} as PokemonDetailResponse)

  const loadPokemonDetail = async () => {
    try {
        const resp = await pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemonDetail(resp.data);
        setIsLoading(false);
    } catch (error) {
        console.log(error);
        setIsLoading(false);
    }
    
  }

  useEffect(() => {
    loadPokemonDetail();  
  }, [])
  
  return {
    isLoading, 
    pokemonDetail
  }
}
