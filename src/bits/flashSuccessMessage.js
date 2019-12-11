import { flashMessage } from 'redux-flash'

export const flashSuccessMessage = (message, options) => (
  flashMessage(message, { ...options, props: { variant: 'success' } })
)

export default flashSuccessMessage