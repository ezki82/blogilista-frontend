import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  const blog = {
    title: 'Test blog',
    author: 'Test Tester',
    url: 'www.test.com',
    likes: 0,
    user: {
      name: 'Test Tester',
      username: 'ttes'
    }
  }
  const user = {
    username: 'ttes'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Test blog')
  })

  test('url and likes are not rendered', () => {
    const div = component.container.querySelector('.showDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('url and likes ares hown after button is pressed', () => {
    const button = component.getByText('show details')
    fireEvent.click(button)

    const div = component.container.querySelector('.showDetails')
    expect(div).not.toHaveStyle('display: none')
  })
})
