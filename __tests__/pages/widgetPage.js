import { expect } from 'vitest'
import { CHAT_TEXTS } from '../constants/texts'

export class ChatPage {
  constructor(user, screen) {
    this.user = user
    this.screen = screen
  }

  async open() {
    await this.user.click(this.getOpenButton())
    return this
  }

  async startConversation() {
    const startButton = await this.findStartButton()
    await this.user.click(startButton)
    await this.screen.findByText(CHAT_TEXTS.helpChooseCourse)
    return this
  }

  async chooseITOption() {
    await this.user.click(this.getTryITButton())
    return this
  }

  async chooseCareerChange() {
    await this.user.click(this.getCareerChangeButton())
    return this
  }

  async goBack() {
    await this.user.click(this.getBackButton())
    return this
  }

  async goToStart() {
    await this.user.click(this.getStartButton())
    return this
  }

  async close() {
    await this.user.click(this.getCloseButton())
    return this
  }

  async verifyChatTitle() {
    expect(this.screen.getByText(CHAT_TEXTS.chatTitle)).toBeInTheDocument()
    return this
  }

  async verifyInitialMessage() {
    expect(this.screen.getByText(CHAT_TEXTS.initialGreeting)).toBeInTheDocument()
    return this
  }

  getOpenButton() {
    return this.screen.getByRole('button', { name: CHAT_TEXTS.openButton })
  }

  findStartButton() {
    return this.screen.findByRole('button', { name: CHAT_TEXTS.startConversation })
  }

  getTryITButton() {
    return this.screen.getByRole('button', { name: CHAT_TEXTS.tryIT })
  }

  getCareerChangeButton() {
    return this.screen.getByRole('button', { name: CHAT_TEXTS.careerChange })
  }

  getBackButton() {
    return this.screen.getByRole('button', { name: CHAT_TEXTS.goBack })
  }

  getStartButton() {
    return this.screen.getByRole('button', { name: CHAT_TEXTS.goToStart })
  }

  getCloseButton() {
    return this.screen.getByRole('button', { name: CHAT_TEXTS.close })
  }
}
