<template>
  <div class="flex flex-col justify-center items-center p-4">
    <p class="session-title">登 录</p>
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-position="top"
      class="w-96 my-10"
    >
      <el-form-item label="用户名" prop="account_name">
        <el-input v-model="form.account_name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <div>
        <el-checkbox v-model="checked">记住密码?</el-checkbox>
      </div>
      <button
        :class="[
          loginFlag ? 'login-btn-active' : 'login-btn-deactive',
          'login-btn'
        ]"
        :disabled="!loginFlag"
        @click.prevent="handleLogin"
      >
        登 录
      </button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { GlobalProps } from '@/store'
import { ElForm } from 'element-plus'
import { encode, decode } from 'js-base64'
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
interface LoginForm {
  account_name: string
  password: string
}

export default defineComponent({
  setup() {
    const store = useStore<GlobalProps>()
    const router = useRouter()
    const formRef = ref<typeof ElForm>()
    const form = ref<LoginForm>({
      account_name: window.localStorage.getItem('usernameitemdasd') || '',
      password: window.localStorage.getItem('paswfegwqeqweqw')
        ? decode(window.localStorage.getItem('paswfegwqeqweqw') as string)
        : ''
    })
    const rules = {
      account_name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }
    const checked = ref(true)
    const loginFlag = computed(() => {
      if (
        form.value.account_name.length === 0 ||
        form.value.password.length === 0
      ) {
        return false
      } else {
        return true
      }
    })
    const handleLogin = () => {
      console.log(formRef.value)
      // eslint-disable-next-line space-before-function-paren
      formRef.value!.validate(async (valid: boolean) => {
        if (valid) {
          if (checked.value) {
            window.localStorage.setItem(
              'usernameitemdasd',
              form.value.account_name
            )
            window.localStorage.setItem(
              'paswfegwqeqweqw',
              encode(form.value.password)
            )
          } else {
            window.localStorage.setItem('usernameitemdasd', '')
            window.localStorage.setItem('paswfegwqeqweqw', '')
          }
          // UserModule.Login(this.form)
          store.dispatch('user/Login', form.value)
          router.push({
            path: '/'
          })
        } else {
          return false
        }
      })
    }
    return {
      form,
      rules,
      checked,
      loginFlag,
      handleLogin,
      formRef
    }
  }
})
</script>

<style lang="scss" scoped>
.session-title {
  color: #33393c;
  font-weight: normal;
  text-transform: capitalize;
  font-size: 21px;
  line-height: 1.3333rem;
}
.login-btn {
  width: 100%;
  height: 40px;
  color: #fff;
  border: none;
}
.login-btn-deactive {
  background-color: #83e5d9;
}
.login-btn-active {
  background-color: #07cab2;
}
.login-btn:focus {
  outline: none;
}
</style>
