/* eslint-disable space-before-function-paren */
<template>
  <div class="navbar shadow-xl">
    <div class="ml-9 sm:ml-12 md:ml-36 xl:ml-52">
      <p
        class="font-mono text-lg text-gray-800 text-center cursor-pointer"
        @click="$router.push('/')"
      >
        sniff
      </p>
    </div>
    <div class="ml-24 sm:ml-52 md:ml-64 xl:ml-96" v-if="isShowInput">
      <input
        type="text"
        class="w-32 sm:w-40 md:w-44 lg:w-60 xl:w-96 border-gray-600 h-10 ml-24 rounded-md rounded-r-none focus:outline-none bg-blue-200 bg-opacity-30"
        v-model="searchContent"
      />
      <el-button
        icon="el-icon-search"
        class="btn-self"
        @click="handleSearch"
      ></el-button>
    </div>
    <div class="ml-auto sm:mr-2 md:mr-10 xl:mr-40 mr-4" v-if="isShowLogout">
      <el-link
        type="primary"
        class="font-sans text-lg text-gray-800 text-center ml-6"
        @click="gotoManagerPage"
        v-if="checkManager()"
        >管理员面板
      </el-link>
      <el-link
        type="primary"
        class="font-sans text-lg text-gray-800 text-center ml-6"
        @click="gotoUserDetail"
        >{{ userName }}
      </el-link>
      <el-link
        class="font-sans text-lg text-gray-800 text-center ml-6"
        @click="handleLogout"
        >退 出</el-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { addTask } from '@/api/task'
import { useUserInject } from '@/context'
import router from '@/router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { userInfo, logout } = useUserInject()

    const targetType = ref('uname')
    const searchContent = ref('')
    const userName = computed(() => userInfo.name)

    const isShowInput = computed(() => {
      if (route.path === '/home' || route.path === '/login') {
        return false
      } else {
        return true
      }
    })

    const checkManager = () => {
      return userInfo.permissions.indexOf('任务调度') > -1 ? false : true
    }

    // eslint-disable-next-line space-before-function-paren
    const handleSearch = async () => {
      if (!searchContent.value.length) {
        ElMessage({
          message: '请输入内容',
          type: 'error'
        })
      } else {
        const { data } = await addTask(
          searchContent.value.trim(),
          targetType.value
        )
        useRouter().push({
          path: '/searchResult/' + data.search_uid,
          query: { searchContent: searchContent.value }
        })
      }
    }

    const handleLogout = () => {
      ElMessageBox({
        message: '确认退出？',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
        logout().then(() => {
          router.push('/login')
        })
      )
    }

    const gotoUserDetail = () => {
      router.push({ path: '/userinfo' })
    }

    return {
      userName,
      targetType,
      searchContent,
      isShowInput,
      checkManager,
      handleSearch,
      handleLogout,
      gotoUserDetail
    }
  }
})
// @Component
// export default class extends Vue {
//   get isShowInput() {
//     if (this.$route.path === '/home' || this.$route.path === '/login') {
//       return false
//     } else {
//       return true
//     }
//   }
//   private targetType = 'uname'
//   private searchContent = ''

//   private checkManager(){
//     const result = this.$store.state.user.permissions.indexOf('任务调度')
//     if (result === -1){
//       return false
//     }else{
//       return true
//     }
//   }

//   get userName() {
//     return this.$store.state.user.name
//   }

//   get isShowLogout() {
//     if (this.$route.path === '/login') {
//       return false
//     } else {
//       return true
//     }
//   }
//   private async handleSearch() {
//     if (!this.searchContent.length) {
//       Message({
//         message: '请输入内容',
//         type: 'error'
//       })
//     } else {
//       const { data } = await addTask(this.searchContent.trim(), this.targetType)
//       this.$router.push({
//         path: '/searchResult/' + data.search_uid,
//         query: { searchContent: this.searchContent }
//       })
//     }
//   }

//   private handleLogout() {
//     this.$confirm('确认要退出吗?', '提示', {
//       confirmButtonText: '确认',
//       cancelButtonText: '取消',
//       type: 'warning'
//     }).then(() => {
//       UserModule.logout().then((_) => {
//         this.$router.push('/login')
//       })
//     })
//   }

//   private gotoUserDetail() {
//     this.$router.push({ path: '/userinfo' })
//   }

//   private gotoManagerPage(){
//     this.$router.push({path:'/managerinfo'})
//   }
// }
</script>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  overflow: hidden;
  position: relative;
  background: #fff;
  display: flex;
  align-items: center;
  z-index: 1000;
}
::v-deep.el-button:focus {
  outline: none;
}
::v-deep.el-button--primary:focus {
  outline: none;
}
.btn-self {
  background-color: rgba(191, 219, 254, 0.3);
  border: none;
  height: 40px;
  border-radius: 0%;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
</style>
