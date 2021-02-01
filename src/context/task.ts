import { ref, provide, inject } from 'vue'

export interface TaskState {
  search_uid: string
  searchFlag: string
}
type TaskContext = {
  task: TaskState
  setSearchUid: (search_uid: string) => void
  setSeachFlag: (searchFlag: string) => void
  removeSearchContent: () => void
}

const TaskSymbol = Symbol()
export const useTaskProvide = () => {
  const task = ref<TaskState>({
    search_uid: window.localStorage.getItem('search_uidqwerts') || '',
    searchFlag: window.localStorage.getItem('searchFlagqwertys') || 'first'
  })

  const setSearchUid = (search_uid: string) => {
    window.localStorage.setItem('search_uidqwerts', search_uid)
    task.value.search_uid = search_uid
  }

  const setSeachFlag = (searchFlag: string) => {
    window.localStorage.setItem('searchFlagqwertys', searchFlag)
    task.value.searchFlag = searchFlag
  }

  const removeSearchContent = () => {
    window.localStorage.removeItem('search_uidqwerts')
    window.localStorage.removeItem('searchFlagqwertys')
  }

  provide(TaskSymbol, {
    task: task.value,
    setSearchUid,
    setSeachFlag,
    removeSearchContent
  })
}

export const useTaskInject = () => {
  const booksContext = inject<TaskContext>(TaskSymbol)
  if (!booksContext) {
    throw new Error(`useBookListInject must be used after useBookListProvide`)
  }
  return booksContext
}
