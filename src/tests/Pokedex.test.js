import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Se contem um H2 com o texto', () => {
    renderWithRouter(<App />);
    const texto = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });

    expect(texto).toBeInTheDocument();
  });

  it('Se o proximo pokemon é exibido ao clicar em proximo', () => {
    renderWithRouter(<App />);

    const botao = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(botao).toBeInTheDocument();

    userEvent.click(botao);

    const texto = screen.getByText(/próximo pokémon/i);
    const charmander = screen.getByText(/charmander/i);

    expect(botao).toBeInTheDocument();
    expect(texto).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();

    userEvent.click(botao);

    const caterpie = screen.getByText(/caterpie/i);

    expect(botao).toBeInTheDocument();
    expect(texto).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
  });

  it('Se aparece apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const nomePokemon = screen.getAllByTestId(/pokemon-name/i);

    expect(nomePokemon.length).toBe(1);

    const botao = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(botao);

    expect(nomePokemon.length).toBe(1);
  });

  it('Se os botões de filtro funcionam como deveriam', () => {
    renderWithRouter(<App />);

    const tipos = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    tipos.map((tipo) => {
      const botao = screen.getByRole('button', { name: `${tipo}` });
      return (expect(botao).toBeInTheDocument());
    });

    tipos.map((tipo) => {
      const botao = screen.getByRole('button', { name: `${tipo}` });
      const nomeTipo = screen.queryAllByText(`${tipo}`);
      userEvent.click(botao);

      return (expect(nomeTipo[0]).toBeInTheDocument());
    });
  });

  it('Se o botão "All" existe e aparece todo tempo', () => {
    renderWithRouter(<App />);
    const botaoAll = screen.getByRole('button', { name: /all/i });
    const botaoNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const botaoTipos = screen.getAllByTestId('pokemon-type-button');

    expect(botaoAll).toBeInTheDocument();
    expect(botaoNext).toBeInTheDocument();

    userEvent.click(botaoNext); // charmander
    userEvent.click(botaoNext); // caterpie

    expect(botaoAll).toBeInTheDocument();
    expect(botaoNext).toBeEnabled();

    userEvent.click(botaoTipos[2]);

    expect(botaoNext).toBeDisabled();
    expect(botaoAll).toBeInTheDocument();

    userEvent.click(botaoAll);

    expect(botaoNext).toBeEnabled();
    expect(botaoAll).toBeInTheDocument();
  });
});
