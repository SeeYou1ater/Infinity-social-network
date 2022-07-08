import React from "react";
import { create } from "react-test-renderer";
import Status from './Status';

describe('Status component', () => {
  test('status from props should be in the state', () => {
    const component = create(<Status status='status'/>)
    const instance = component.getInstance()
    expect(instance.state.status).toBe('status')
  })

  test('after creation <span> should be displayed', () => {
    const component = create(<Status status='status'/>)
    const root = component.root
    let span = root.findByType('span')
    expect(span.length).not.toBeNull()
  })

  test('after creation <span> should contains correct status', () => {
    const component = create(<Status status='status'/>)
    const root = component.root
    let span = root.findByType('span')
    expect(span.children[0]).toBe('status')
  })

  test('after creation <input> should\'t be displayed', () => {
    const component = create(<Status status='status'/>)
    const root = component.root
    expect(() => {
      let input = root.findByType('input')
    }).toThrow()
  })

  test('<input> should be displayed in edit mode instead of <span>', () => {
    const component = create(<Status status='status'/>)
    const root = component.root
    let span = root.findByType('span')
    span.props.onDoubleClick()
    let input = root.findByType('input')
    expect(input.length).not.toBeNull()
  })

  test('<input> should be displayed in edit mode correct status like in <span> before', () => {
    const component = create(<Status status='status'/>)
    const root = component.root
    let span = root.findByType('span')
    span.props.onDoubleClick()
    let input = root.findByType('input')
    expect(input.props.value).toBe('status')
  })

  test('callback should be called', () => {
    const mockCallback = jest.fn()
    const component = create(<Status status='status' updateStatus={mockCallback}/>)
    const instance = component.getInstance()
    instance.deactivateEditMode()
    instance.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(2)
  })
})

