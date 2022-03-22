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

    expect(botao).toBeInTheDocument();
    // falta terminar aqui
  });
});
