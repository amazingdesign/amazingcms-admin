export const moveArrayElement = (array, from, delta) => {
  const newIndex = from + delta

  if (newIndex < 0 || newIndex === array.length)
    return array

  const element = array[from]
  const head = array.slice(0, from)
  const tail = array.slice(from + 1)

  const newArray = delta < 0 ?
    head
      .slice(0, delta)
      .concat(element)
      .concat(head.slice(delta))
      .concat(tail)
    :
    head
      .concat(tail.slice(0, delta))
      .concat(element)
      .concat(tail.slice(delta))

  return newArray
}

export default moveArrayElement