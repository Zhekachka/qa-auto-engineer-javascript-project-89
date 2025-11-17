import '@testing-library/jest-dom'
import { expect, test, vi, beforeAll, beforeEach } from 'vitest'
import { CHAT_TEXTS } from './constants/texts'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Widget from '@hexlet/chatbot-v2'
import steps from '../__fixtures__/steps'
import { ChatPage } from './pages/widgetPage'

let user, screen, chat

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

beforeEach(() => {
  user = userEvent.setup()
  render(Widget(steps))
  chat = new ChatPage(user, screen)
  return { user, chat, screen }
})

test('Проверка начального состояния, открытие и закрытие модального окна чата', async () => {
  const openButton = screen.getByRole('button', { name: CHAT_TEXTS.openButton })
  expect(openButton).toBeInTheDocument()
  await chat.open()
  await chat.verifyChatTitle()
  await chat.verifyInitialMessage()
  expect(screen.getByRole('button', { name: CHAT_TEXTS.startConversation })).toBeInTheDocument()
  await chat.close()
  expect(screen.queryByText(CHAT_TEXTS.chatTitle)).not.toBeInTheDocument()
})

test('Начало разговора с ботом', async () => {
  await chat.open()
  await chat.startConversation()
  expect(await screen.findByText(CHAT_TEXTS.helpChooseCourse)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: CHAT_TEXTS.tryIT })).toBeInTheDocument()
})

test('Проверка скролла к новым сообщениям', async () => {
  window.HTMLElement.prototype.scrollIntoView.mockClear()
  await chat.open()
  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1)
  await chat.startConversation()
  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(2)
  await chat.chooseITOption()
  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(3)
})

test('Выбор варианта ответа', async () => {
  await chat.open()
  await chat.startConversation()
  await chat.chooseITOption()
  expect(screen.getByText(CHAT_TEXTS.preparatoryCourses)).toBeInTheDocument()
})

test('Возврат на предыдущий экран при нажатии кнопки "Вернуться назад"', async () => {
  await chat.open()
  await chat.startConversation()
  await chat.chooseITOption()
  expect(screen.getByText(CHAT_TEXTS.preparatoryCourses)).toBeInTheDocument()
  await chat.goBack()
  expect(screen.getAllByText(CHAT_TEXTS.helpChooseCourse)[1]).toBeInTheDocument()
})

test('Возврат на начальный экран при нажатии кнопки "Вернуться в начало"', async () => {
  await chat.open()
  await chat.startConversation()
  await chat.chooseITOption()
  await chat.chooseCareerChange()
  expect(screen.getByText(CHAT_TEXTS.careerChangePrograms)).toBeInTheDocument()
  await chat.goToStart()
  expect(screen.getAllByText(CHAT_TEXTS.initialGreeting)[1]).toBeInTheDocument()
})

test('Отображение иконки рядом с сообщением', async () => {
  await chat.open()
  const icon = screen.getByRole('img', { name: 'tota' })
  expect(icon).toBeInTheDocument()
  expect(icon).toHaveAttribute('src')
  expect(icon).toHaveAttribute('alt', 'tota')
})

test('Проверка заголовка модального окна', async () => {
  await chat.open()
  await chat.verifyChatTitle()
})
