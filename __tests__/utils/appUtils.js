import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppPage } from '../pages/appPage'
import App from '../../src/App'

export const setupAppTest = () => {
  const user = userEvent.setup()
  render(<App />)
  const app = new AppPage(user, screen)
  return { user, app, screen }
}
