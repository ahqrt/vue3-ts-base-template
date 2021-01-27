import { ref, Ref, provide, inject } from 'vue'

export interface Books {
  id: number
  title: string
}

type BookContext = {
  books: Ref<Books[]>
  setBooks: (value: Books[]) => void
}

const BookSymbol = Symbol()

export const useBookListProvide = () => {
  // 全部图书
  const books = ref<Books[]>([])
  const setBooks = (value: Books[]) => (books.value = value)

  provide(BookSymbol, {
    books,
    setBooks
  })
}

export const useBookInject = () => {
  const booksContext = inject<BookContext>(BookSymbol)
  if (!booksContext) {
    throw new Error(`useBookListInject must be used after useBookListProvide`)
  }
  return booksContext
}
