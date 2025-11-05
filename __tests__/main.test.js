import { expect, test } from 'vitest'
import Widget from '@hexlet/chatbot-v2';
import { render, screen } from '@testing-library/react';
import steps from '../__fixtures__/steps';

test('main', () => {
  render(Widget(steps))
  screen.debug()
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})