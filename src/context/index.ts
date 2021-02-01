import { useUserProvide, useUserInject } from './user'
import { useTaskInject, useTaskProvide } from './task'
import { App } from 'vue'
export { useUserInject, useTaskInject }

export const useProvide = () => {
  useUserProvide()
  useTaskProvide()
}

// export default {
//   install : (app: App<Element>) {
//     app.
//   }
// }
