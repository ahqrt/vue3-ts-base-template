import { createStore } from 'vuex'
import { UserState } from './module/user'
import user from './module/user'
export interface GlobalProps {
  user: UserState
}

const store = createStore<GlobalProps>({
  modules: {
    user
  }
})

export default store
