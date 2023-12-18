import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from '../pages/index'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<HomePage/>)
 
    const heading = screen.getByRole('heading', { level: 2 })
 
    expect(heading).toBeInTheDocument()
  })
})