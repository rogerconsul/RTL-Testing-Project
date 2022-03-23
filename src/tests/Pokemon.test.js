import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  it('Testa se o nome correto do pokemón é exibido', () => {
    pokemons.forEach((pokemon) => {
      const { unmount } = renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );

      const { name, type, averageWeight, image } = pokemon;
      const nome = screen.getByText(`${name}`);
      const tipo = screen.getByText(`${type}`);
      const peso = screen.getByText('Average weight: '
      + `${averageWeight.value} ${averageWeight.measurementUnit}`);
      const imagem = screen.getByRole('img');

      expect(nome).toBeInTheDocument();
      expect(tipo).toBeInTheDocument();
      expect(peso).toBeInTheDocument();
      expect(imagem.getAttribute('src')).toBe(image);

      unmount(); // https://testing-library.com/docs/react-testing-library/api/#unmount
    });
  });

  it('Se o card tem o link de navegação com a url correta', () => {
    pokemons.forEach((pokemon) => {
      const { unmount } = renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );

      const { id } = pokemon;
      const url = `/pokemons/${id}`;
      const link = screen.getByRole('link', { name: /more details/i });

      expect(link.getAttribute('href')).toBe(url);
      unmount();
    });
  });

  it('Se ao clicar em "Detalhes" o redirecionamento ocorre', () => {
    pokemons.forEach((pokemon) => {
      const { unmount, history } = renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );
      const link = screen.getByRole('link', { name: /more details/i });
      const { id, name, type } = pokemon;

      userEvent.click(link);
      const texto = screen.getByText(`${name}`);
      const tipo = screen.getByText(`${type}`);

      expect(history.location.pathname).toBe(`/pokemons/${id}`);
      expect(texto).toBeInTheDocument();
      expect(tipo).toBeInTheDocument();
      unmount();
    });
  });

  it('Se o botao favorito e a estrela funcionam de acordo', () => {
    pokemons.forEach((pokemon) => {
      const { unmount } = renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite
        />,
      );
      const imagem = screen.getAllByRole('img');
      const { name } = pokemon;

      expect(imagem[1].getAttribute('src')).toBe('/star-icon.svg');
      expect(imagem[1].getAttribute('alt')).toBe(`${name} is marked as favorite`);
      expect(imagem[0].getAttribute('alt')).toBe(`${name} sprite`);
      unmount();
    });
  });
});
