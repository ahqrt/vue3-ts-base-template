import { ref, provide, inject } from 'vue'
export interface TodoItem {
  id: number
  title: string
  complate: boolean
}

type TodoContext = {
  todos: TodoItem[]
  setTodo: (todo: TodoItem) => void
  changeTodoState: (todo: TodoItem) => void
  willDo: TodoItem[] | []
  complatedTodo: TodoItem[] | []
}

const todoSymbol = Symbol()

export const useTodoProvider = () => {
  const todos = ref<TodoItem[]>([])
  const setTodo = (todo: TodoItem) => {
    todos.value.push(todo)
  }
  const changeTodoState = (todo: TodoItem) => {
    todos.value.forEach(todoItem => {
      if (todoItem.id === todo.id) {
        todoItem.complate = !todoItem.complate
      }
    })
  }

  const willDo = () => {
    return todos.value.filter(todo => {
      return !todo.complate
    })
  }
  const complatedTodo = () => {
    return todos.value.filter(todo => {
      return todo.complate
    })
  }

  provide(todoSymbol, {
    todos: todos.value,
    setTodo,
    changeTodoState,
    willDo,
    complatedTodo
  })
}

export const useTodoInject = () => {
  const todoContext = inject<TodoContext>(todoSymbol)
  if (!todoContext) {
    throw new Error(`useBookListInject must be used after useBookListProvide`)
  }
  return todoContext
}
