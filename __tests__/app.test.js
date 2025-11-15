import '@testing-library/jest-dom'
import { expect, test, vi, beforeAll, beforeEach } from 'vitest'
import { setupAppTest } from './utils/appUtils'

let app

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  window.Widget = {
    init: vi.fn(),
    someMethod: vi.fn(),
  }
})

beforeEach(() => {
  const result = setupAppTest()
  app = result.app
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
  expect(window.Widget.init).toHaveBeenCalledTimes(1)
})