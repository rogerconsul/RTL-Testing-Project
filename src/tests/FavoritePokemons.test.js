import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemon from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons', () => {
  if (localStorage.length === 0 || localStorage.favoritePokemonIds === []) {
    it('Se é exibido a mensagem caso nao houver pokemons favoritos', () => {
      renderWithRouter(<FavoritePokemon />);
      const texto = screen.getByText(/No favorite pokemon found/i);

      expect(texto).toBeInTheDocument();
    });
  } else {
    it('Se os cards são renderizados corretamente', () => {
      const cards = screen.findAllByText(/more details/i);
      const storage = localStorage.favoritePokemonIds.length;

      expect(cards.length).toEqual(storage);
    });
  }
});
