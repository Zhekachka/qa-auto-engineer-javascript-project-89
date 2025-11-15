import { expect } from 'vitest'
import { APP_TEXTS } from '../constants/appTexts'

export class AppPage {
  constructor(user, screen) {
    this.user = user
    this.screen = screen
  }

  async fillForm() {
    const { email, password } = APP_TEXTS.testData
    await this.user.type(this.getEmailInput(), email)
    await this.user.type(this.getPasswordInput(), password)
    await this.user.click(this.getTermsCheckbox())
    return this
  }

  async submitForm() {
    await this.user.click(this.getSubmitButton())
    return this
  }

  async verifySubmittedData() {
    const { email, password } = APP_TEXTS.testData
    expect(this.screen.getByText(email)).toBeInTheDocument()
    expect(this.screen.getByText(password)).toBeInTheDocument()
    expect(this.screen.getByText('true')).toBeInTheDocument()
    return this
  }

  async backToForm() {
    await this.user.click(this.getBackButton())
    return this
  }

  async openChat() {
    await this.user.click(this.getChatButton())
    return this
  }

  async verifyFormVisible() {
    expect(this.getEmailInput()).toBeInTheDocument()
    return this
  }

  // Локаторы
  getEmailInput() {
    return this.screen.getByLabelText(APP_TEXTS.emailLabel)
  }

  getPasswordInput() {
    return this.screen.getByLabelText(APP_TEXTS.passwordLabel)
  }

  getTermsCheckbox() {
    return this.screen.getByLabelText(APP_TEXTS.termsLabel)
  }

  getSubmitButton() {
    return this.screen.getByRole('button', { name: APP_TEXTS.submitButton })
  }

  getBackButton() {
    return this.screen.getByText(APP_TEXTS.backButton)
  }

  getChatButton() {
    return this.screen.getByRole('button', { name: APP_TEXTS.openChatButton })
  }
}