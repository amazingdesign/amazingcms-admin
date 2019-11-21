import moveArrayElement from '../moveArrayElement'

describe('moveArrayElement', () => {
  const testArray = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ]

  it('moves up middle element', () => {
    const result = moveArrayElement(testArray, 2, -1)
    const expected = [
      { label: '1', value: '1' },
      { label: '3', value: '3' },
      { label: '2', value: '2' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ]

    expect(result).toEqual(expected)
  })

  it('moves down middle element', () => {
    const result = moveArrayElement(testArray, 2, 1)
    const expected = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '4', value: '4' },
      { label: '3', value: '3' },
      { label: '5', value: '5' },
    ]

    expect(result).toEqual(expected)
  })

  it('moves up last element', () => {
    const result = moveArrayElement(testArray, 4, -1)
    const expected = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '5', value: '5' },
      { label: '4', value: '4' },
    ]

    expect(result).toEqual(expected)
  })

  it('moves down last element', () => {
    const result = moveArrayElement(testArray, 4, 1)
    const expected = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ]

    expect(result).toEqual(expected)
  })

  it('moves up first element', () => {
    const result = moveArrayElement(testArray, 0, -1)
    const expected = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ]

    expect(result).toEqual(expected)
  })

  it('moves down first element', () => {
    const result = moveArrayElement(testArray, 0, 1)
    const expected = [
      { label: '2', value: '2' },
      { label: '1', value: '1' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ]

    expect(result).toEqual(expected)
  })

  it('moves last on the begin', () => {
    const result = moveArrayElement(testArray, 4, -4)
    const expected = [
      { label: '5', value: '5' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
    ]

    expect(result).toEqual(expected)
  })

  it('moves first to the end', () => {
    const result = moveArrayElement(testArray, 0, 4)
    const expected = [
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '1', value: '1' },
    ]

    expect(result).toEqual(expected)
  })

  it('do nothing when delta 0', () => {
    const result = moveArrayElement(testArray, 0, 0)

    expect(result).toEqual(testArray)
  })
})