import { expect, test, vi, beforeAll} from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { render, screen } from '@testing-library/react'
import steps from '../__fixtures__/steps'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test('Возврат на предыдущий экран при нажатии кнопки "Вернуться назад"', async () => {
    const user = userEvent.setup()
    render(Widget(steps))
  
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
    await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
    await user.click(screen.getByRole('button', { name: 'Попробовать себя в IT' }))
  
    expect(screen.getByText(/У нас есть подготовительные курсы/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Вернуться назад' }))
    
    expect(screen.getAllByText(/Помогу вам выбрать подходящий курс/)[1]).toBeInTheDocument()
})

test('Возврат на начальный экран при нажатии кнопки "Вернуться в начало"', async () => {
    const user = userEvent.setup()
    render(Widget(steps))
  
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
    await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
    await user.click(screen.getByRole('button', { name: 'Попробовать себя в IT' }))
    await user.click(screen.getByRole('button', { name: 'А что по поводу смены профессии?' }))

    expect(screen.getByText(/У нас есть программы обучения новой профессии/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Вернуться в начало' }))

    expect(screen.getAllByText(/Привет! Я ваш виртуальный помощник/)[1]).toBeInTheDocument()
})

test('Отображение иконки рядом с сообщением', async () => {
    const user = userEvent.setup();
    render(Widget(steps));

    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }));
  
    const icon = document.querySelector('.message img.avatar');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src');
    expect(icon).toHaveAttribute('alt', 'tota');
})

test('Проверка заголовка модального окна', async () => {
    const user = userEvent.setup();
    render(Widget(steps));

    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }));
  
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
})

