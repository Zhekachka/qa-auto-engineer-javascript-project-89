import { expect, test, vi, beforeAll} from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { render, screen } from '@testing-library/react'
import steps from '../__fixtures__/steps'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test('Проверка начального состояния, открытие и закрытие модального окна чата', async () => {
    const user = userEvent.setup()
    render(Widget(steps))
   
    const openButton = screen.getByRole('button', { name: 'Открыть Чат' })
    expect(openButton).toBeInTheDocument()
    
    await user.click(openButton)
    
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument()
    expect(screen.getByText('Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Начать разговор' })).toBeInTheDocument()
    
    const closeButton = screen.getByRole('button', { name: 'Close' })
    await user.click(closeButton)
    
    expect(screen.queryByText('Виртуальный помощник')).not.toBeInTheDocument()
    screen.debug()
})

test('Начало разговора с ботом', async () => {
    const user = userEvent.setup()
    render(Widget(steps))
    
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
    await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
    
    expect(screen.getByText('Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса, и буквально через пару шагов я смогу рассказать вам то, что нужно.')).toBeInTheDocument()
    
    const options = [
        'Сменить профессию или трудоустроиться',
        'Попробовать себя в IT',
        'Я разработчик, хочу углубить свои знания'
    ]
    
    options.forEach(optionText => {
        expect(screen.getByRole('button', { name: optionText })).toBeInTheDocument()
    })
    screen.debug()
})

test('Проверка скролла к новым сообщениям', async () => {
    const user = userEvent.setup()
    render(Widget(steps))
    
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
    expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled()
    
    await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1)
    
    await user.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }))
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(2)
    screen.debug()
})

test('Выбор варианта ответа', async () => {
    const user = userEvent.setup()
    render(Widget(steps))
    
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
    await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
    
    await user.click(screen.getByRole('button', { name: 'Попробовать себя в IT' }))
    expect(screen.getByText('У нас есть подготовительные курсы, которые длятся всего 2 недели.За это время вы знакомитесь с основами программирвоания, пробуете его на практике и плавной подойдете к старту обучения в основной программе. Все это под руководством опытного программиста. Он поможет, если будут сложности. Курс стоит всего 990 рублей')).toBeInTheDocument()
    screen.debug()
})

test('Возврат на предыдущий экран при нажатии кнопки "Вернуться назад"', async () => {
    const user = userEvent.setup()
    render(Widget(steps))
  
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
    await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
  
    const firstOption = 'Сменить профессию или трудоустроиться'
    await user.click(screen.getByRole('button', { name: firstOption }))
  
    const currentScreenText = screen.getByText('У нас есть программы обучения новой профессии. Мы постоянно мониторим, какие компетенции востребованы на рынке, а учебные программы строим в соответствии ними. Учиться можно онлайн в удобном темпе без дедлайнов. К концу обучения у вас будет портфолио на GitHub. А к трудоустройству поможет подготовиться Карьерный трек').textContent
  
    const backButton = screen.getByRole('button', { name: 'Вернуться назад' })
  
    await user.click(backButton)

    expect(screen.queryByText(currentScreenText)).not.toBeInTheDocument()
    expect(screen.getByText('Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса, и буквально через пару шагов я смогу рассказать вам то, что нужно.')).toBeInTheDocument()
    screen.debug()
})
