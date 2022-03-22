import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa todo o componente APP', () => {
  it('Se o topo da aplicação contem um conjunto fixo de links', async () => {
    renderWithRouter(<App />);

    const home = screen.findByRole('link', { name: /home/i });
    const about = screen.findByRole('link', { name: /about/i });
    const favPokemon = screen.findByRole('link', { name: /Favorite Pokémons/i });

    expect(home).toBeDefined();
    expect(about).toBeDefined();
    expect(favPokemon).toBeDefined();
  });

  it('Se a aplicação é redirecionada ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });

    userEvent.click(home);

    expect(history.location.pathname).toBe('/');
  });

  it('Se a aplicação é redirecionada ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });

    userEvent.click(about);

    expect(history.location.pathname).toBe('/about');
  });

  it('Se a aplicação é redirecionada ao clicar em Pokemons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(favPokemon);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Se a aplicação é redirecionada ao clicar em algo que não existe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');
    const textoNotFound = screen.findByText(/page request not found/i);

    expect(history.location.pathname).not.toBe('/');
    expect(history.location.pathname).not.toBe('/about');
    expect(history.location.pathname).not.toBe('/favorites');
    expect(textoNotFound).toBeDefined();
  });
});
