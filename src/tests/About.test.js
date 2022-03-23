import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa todo o componente About', () => {
  it('Se a página tem um h2 com o texto "About Pokedex"', () => {
    renderWithRouter(<About />);
    const textosH2 = screen.getByRole('heading', { level: 2, name: /about pokédex/i });

    expect(textosH2).toBeInTheDocument();
  });

  it('Se tem dois paragrafos com texto sobre a pokedex', () => {
    renderWithRouter(<About />);
    const paragrafos = screen.getAllByText((_content, element) => (
      element.tagName.toLowerCase() === 'p'));
    // const paragrafo2 = screen.getByText(/One can filter Pokémons by/i);

    expect(paragrafos.length).toBe(2);
    // expect(paragrafo2).toBeInTheDocument();
  });

  it('Se tem uma imagem usando a source correta', () => {
    renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagem = screen.getByRole('img');

    expect(imagem.getAttribute('src')).toBe(url);
    // https://stackoverflow.com/questions/51646265/jest-to-test-html-string
  });
});
