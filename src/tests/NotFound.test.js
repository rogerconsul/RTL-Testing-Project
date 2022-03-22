import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente "Not Found"', () => {
  renderWithRouter(<NotFound />);
  it('Se contem um H2 com o texto necessario', () => {
    const texto = screen.getByRole('heading',
      { level: 2, name: /Page requested not found Crying emoji/i });

    expect(texto).toBeInTheDocument();
  });

  it('Se a imagem aparece com o endereço correto', async () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagem = await screen.findAllByRole('img');

    expect(imagem[1].getAttribute('src')).toBe(url);
    // https://stackoverflow.com/questions/51646265/jest-to-test-html-string
  });
});
