import { expect } from 'vitest'

export class ChatPage {
  constructor(user, screen) {
    this.user = user
    this.screen = screen
  }

  async open() {
    await this.user.click(this.screen.getByRole('button', { name: 'Открыть Чат' }))
    return this
  }

  async startConversation() {
    const startButton = await this.screen.findByRole('button', { name: 'Начать разговор' })
    await this.user.click(startButton)
    await this.screen.findByText(/Помогу вам выбрать подходящий курс/)
    return this
  }

  async chooseITOption() {
    await this.user.click(this.screen.getByRole('button', { name: 'Попробовать себя в IT' }))
    return this
  }

  async chooseCareerChange() {
    await this.user.click(this.screen.getByRole('button', { name: 'А что по поводу смены профессии?' }))
    return this
  }

  async goBack() {
    await this.user.click(this.screen.getByRole('button', { name: 'Вернуться назад' }))
    return this
  }

  async goToStart() {
    await this.user.click(this.screen.getByRole('button', { name: 'Вернуться в начало' }))
    return this
  }

  async close() {
    await this.user.click(this.screen.getByRole('button', { name: 'Close' }))
    return this
  }

  async verifyChatTitle() {
    expect(this.screen.getByText('Виртуальный помощник')).toBeInTheDocument()
    return this
  }

  async verifyInitialMessage() {
    expect(this.screen.getByText(/Привет! Я ваш виртуальный помощник/)).toBeInTheDocument()
    return this
  }
}
