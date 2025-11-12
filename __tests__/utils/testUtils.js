import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Widget from '@hexlet/chatbot-v2'
import steps from '../../__fixtures__/steps'
import { ChatPage } from '../pages/chatPage'

export const setupTest = () => {
  const user = userEvent.setup()
  render(Widget(steps))
  const chat = new ChatPage(user, screen)
  return { user, chat, screen }
}
