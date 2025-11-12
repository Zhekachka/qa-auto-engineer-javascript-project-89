import '@testing-library/jest-dom'
import { expect, test, vi, beforeAll } from 'vitest'
import { setupTest } from './utils/testUtils'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test('Проверка начального состояния, открытие и закрытие модального окна чата', async () => {
  const { chat, screen } = setupTest()

  const openButton = screen.getByRole('button', { name: 'Открыть Чат' })
  expect(openButton).toBeInTheDocument()

  await chat.open()
  await chat.verifyChatTitle()
  await chat.verifyInitialMessage()

  expect(screen.getByRole('button', { name: 'Начать разговор' })).toBeInTheDocument()

  await chat.close()
  expect(screen.queryByText('Виртуальный помощник')).not.toBeInTheDocument()
})

test('Начало разговора с ботом', async () => {
  const { chat, screen } = setupTest()

  await chat.open()
  await chat.startConversation()

  expect(await screen.findByText(/Помогу вам выбрать подходящий курс/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Попробовать себя в IT' })).toBeInTheDocument()
})

test('Проверка скролла к новым сообщениям', async () => {
  const { chat } = setupTest()
  window.HTMLElement.prototype.scrollIntoView.mockClear()

  await chat.open()
  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1)

  await chat.startConversation()
  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(2)

  await chat.chooseITOption()
  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(3)
})

test('Выбор варианта ответа', async () => {
  const { chat, screen } = setupTest()

  await chat.open()
  await chat.startConversation()
  await chat.chooseITOption()

  expect(screen.getByText(/У нас есть подготовительные курсы/)).toBeInTheDocument()
})
