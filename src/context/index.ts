import { useBookInject, useBookListProvide } from './books'
import { useTodoProvider, useTodoInject } from './todos'
export { useBookInject, useTodoInject }

export const useProvide = () => {
  useBookListProvide()
  useTodoProvider()
}
