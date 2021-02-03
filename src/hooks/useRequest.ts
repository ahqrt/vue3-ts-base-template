import { ref } from "vue"

const useRequest =(api) => {
  const loading = ref(false)
  const result = ref(null)
  const error = ref(null)

  const fetctResource = (params) => {
    loading.value = true
    return api(params).then()
  }
}