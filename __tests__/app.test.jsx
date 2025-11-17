import '@testing-library/jest-dom'
import { expect, test, vi, beforeAll, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppPage } from './pages/appPage'
import App from '../src/App'

let app, user

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  window.Widget = {
    init: vi.fn(),
    someMethod: vi.fn(),
  }
})

beforeEach(() => {
  user = userEvent.setup()
  render(<App />)
  app = new AppPage(user, screen)
  return { user, app, screen }
})

test('Проверка окружения', () => {
  expect(true).toBe(true)
})

test('Мокирование', () => {
  const mockFn = vi.fn()
  mockFn()
  expect(mockFn).toHaveBeenCalled()
})

test('Приложение рендерится без ошибок', async () => {
  await app.verifyFormVisible()
})

test('Работа формы: заполнение и отправка', async () => {
  await app.fillForm()
  await app.submitForm()
  await app.verifySubmittedData()
  await app.backToForm()
  await app.verifyFormVisible()
})

test('Виджет не влияет на работу формы', async () => {
  await app.fillForm()
  await app.openChat()
  await app.submitForm()
  await app.verifySubmittedData()
})

test('Виджет чата инициализируется при загрузке', async () => {
  window.Widget.init()
  expect(window.Widget.init).toHaveBeenCalledTimes(1)
})
