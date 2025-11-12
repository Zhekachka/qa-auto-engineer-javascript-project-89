import '@testing-library/jest-dom'
import { expect, test, vi, beforeAll } from 'vitest'
import { setupTest } from './utils/testUtils'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test('Возврат на предыдущий экран при нажатии кнопки "Вернуться назад"', async () => {
  const { chat, screen } = setupTest()
  
  await chat.open()
  await chat.startConversation()
  await chat.chooseITOption()
  
  expect(screen.getByText(/У нас есть подготовительные курсы/)).toBeInTheDocument()
  await chat.goBack()
  expect(screen.getAllByText(/Помогу вам выбрать подходящий курс/)[1]).toBeInTheDocument()
})

test('Возврат на начальный экран при нажатии кнопки "Вернуться в начало"', async () => {
  const { chat, screen } = setupTest()
  
  await chat.open()
  await chat.startConversation()
  await chat.chooseITOption()
  await chat.chooseCareerChange()
    
  expect(screen.getByText(/У нас есть программы обучения новой профессии/)).toBeInTheDocument()
  await chat.goToStart()
  expect(screen.getAllByText(/Привет! Я ваш виртуальный помощник/)[1]).toBeInTheDocument()
})

test('Отображение иконки рядом с сообщением', async () => {
  const { chat, screen } = setupTest()
  await chat.open()
  
  const icon = screen.getByRole('img', { name: 'tota' })
  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('src')
  expect(icon).toHaveAttribute('alt', 'tota')
})

test('Проверка заголовка модального окна', async () => {
  const { chat } = setupTest()
  await chat.open()
  await chat.verifyChatTitle()
})
