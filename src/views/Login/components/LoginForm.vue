<script lang="tsx" setup>
import { reactive, ref, computed, unref } from "vue"
import { Form } from "@/components/Form"
import { FormSchema } from "@/components/Form"
import { useForm } from "@/hooks/useForm"
import { useValidator } from "@/hooks/useValidator"
import { useI18n } from "@/hooks/useI18n"
import { ElButton, ElMessage } from "element-plus"
import { useRouter } from "vue-router"
import { staticRouter } from "@/router"
import { useRoutersStore } from "@/store/modules/router"
import { useAppStore } from "@/store/modules/app"
import { createRouter } from "@/router/asyncRouterHelper"

const appSotre = useAppStore()
const { formRegister, formMethods } = useForm()
const { getFormData, getElFormExpose } = formMethods
const { required } = useValidator()
const { t } = useI18n()
const { push } = useRouter()
const routersStore = useRoutersStore()

const routerMode = computed(() => appSotre.getRouterMode)
const rules = {
  username: [required()],
  password: [required()]
}

const loading = ref(false)
const schema = reactive<FormSchema[]>([
  {
    field: "username",
    label: t("login.username"),
    value: "admin",
    component: "Input",
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: "请输入账号"
    }
  },
  {
    field: "password",
    label: t("login.password"),
    value: "admin",
    component: "Input",
    componentProps: {
      type: "password"
    },
    colProps: {
      span: 24
    }
  },
  {
    field: "login",
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <ElButton style="width: 100%;" loading={loading.value} type="primary" onClick={signIn}>
                {t("login.login")}
              </ElButton>
            </>
          )
        }
      }
    }
  }
])

const signIn = async () => {
  const formRef = await getElFormExpose()
  const vali = await formRef?.validate()
  if (vali) {
    // 发送请求
    const formData = await getFormData()
    Login(formData)
    return
  }
  ElMessage.error("请输入账号和密码")
}

const Login = async ({ username, password }) => {
  loading.value = true
  // 模拟接口返回
  const loginRes = {
    data: {
      code: 200,
      message: "登录成功",
      data: {
        username: username,
        name: "管理员",
        roles: ["admin"],
        routers: []
      }
    }
  }

  setTimeout(() => {
    loading.value = false
    if (loginRes.data.code === 200) {
      // 存储user信息
      const userData = {
        ...loginRes.data.data,
        routers: staticRouter
      }
      routersStore.setUser(userData)
      // 写入router
      routersStore.setRouters(staticRouter)
      // 设置为静态路由模式
      appSotre.setRouterMode("static")
      // 创建路由和更新菜单
      createRouter(staticRouter)
      // 延迟跳转，确保路由和菜单更新完成
      setTimeout(() => {
        // 跳转到主页面
        push({
          name: "Redirect",
          params: {
            path: "dashboard/workplace",
            type: "static"
          }
        })
      }, 100)
    } else {
      ElMessage.error(loginRes.data.message || "登录失败")
    }
  }, 500)
}
</script>
<template>
  <Form :schema="schema" :rules="rules" label-position="top" hide-required-asterisk size="large" @register="formRegister" />
</template>
