import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  const alakazam = '/pokemons/65';

  it('Deve conter um texto com o nome do pokemão', () => {
    const { history } = renderWithRouter(<App />);
    const detalhesButton = screen.getByRole('link', { name: /more details/i });

    history.push('/pokemons/25'); // pikachu
    const texto = screen.getByText('Pikachu Details');
    const sumario = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const detalhes = screen.getByText(/This intelligent Pokémon roasts hard/i);

    expect(detalhesButton).not.toBeInTheDocument();
    expect(sumario).toBeInTheDocument();
    expect(detalhes).toBeInTheDocument();

    expect(texto).toBeInTheDocument();

    // Repetindo o teste com outro bixão

    history.push(alakazam); // alakazam
    const texto1 = screen.getByText('Alakazam Details');
    const sumario1 = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const detalhes1 = screen.getByText(/Closing both its eyes heightens all its other/i);

    expect(detalhesButton).not.toBeInTheDocument();
    expect(sumario1).toBeInTheDocument();
    expect(detalhes1).toBeInTheDocument();

    expect(texto1).toBeInTheDocument();
  });

  it('Se existe uma seçao com o mapa e localizações', () => {
    const { history } = renderWithRouter(<App />);
    history.push(alakazam); // alakazam

    const heading = screen.getByRole('heading',
      { level: 2, name: /Game Locations of alakazam/i });
    const localizacaoNome = screen.getByText(/Unova Accumula Town/i);
    const mapaImagem = screen.getAllByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png';

    expect(heading).toBeInTheDocument();
    expect(localizacaoNome).toBeInTheDocument();
    expect(mapaImagem[1].getAttribute('src')).toBe(url);
    expect(mapaImagem[1].getAttribute('alt')).toBe('Alakazam location');
  });

  it('Se o usuario pode favoritar o bixão dentro de Details', () => {
    const { history } = renderWithRouter(<App />);
    history.push(alakazam); // alakazam
    const favoritos = localStorage;

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });

    expect(checkbox).toBeInTheDocument();
    expect(favoritos.length).toBe(0);
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(favoritos).toHaveProperty('favoritePokemonIds', '[65]');
    // https://jestjs.io/docs/expect#tohavepropertykeypath-value
  });
});
