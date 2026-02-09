import { MockMethod } from "vite-plugin-mock"

const timeout = 500

const List: any = [
  {
    userId: 0,
    username: "admin",
    password: "admin",
    roleId: 0,
    // 角色
    roles: ["admin"],
    // 权限
    auths: ["create", "read", "update", "delete"],
    sex: 0,
    age: 23,
    nickname: "花子丶"
  },
  {
    userId: 1,
    username: "test",
    password: "test",
    roleId: 1,
    roles: ["user", "test"],
    auths: ["read"],
    sex: 1,
    age: 24,
    nickname: "测试用户"
  }
]

let roleList = [
  {
    roleId: 0,
    role: "admin",
    remark: "管理员,拥有一系列权限",
    createTime: "2024-03-29",
    roleName: "管理员"
  },
  {
    roleId: 1,
    role: "test",
    remark: "测试用户,拥有一系列权限",
    createTime: "2024-03-29",
    roleName: "测试用户"
  },
  {
    roleId: 2,
    role: "user",
    remark: "普通用户,拥有一系列权限",
    createTime: "2024-03-29",
    roleName: "普通用户"
  },
  {
    roleId: 3,
    role: "manager",
    remark: "项目经理,拥有项目管理权限",
    createTime: "2024-04-01",
    roleName: "项目经理"
  },
  {
    roleId: 4,
    role: "editor",
    remark: "编辑,拥有内容编辑权限",
    createTime: "2024-04-05",
    roleName: "编辑"
  },
  {
    roleId: 5,
    role: "viewer",
    remark: "查看者,只能查看数据",
    createTime: "2024-04-10",
    roleName: "查看者"
  },
  {
    roleId: 6,
    role: "developer",
    remark: "开发者,拥有开发权限",
    createTime: "2024-04-12",
    roleName: "开发者"
  },
  {
    roleId: 7,
    role: "designer",
    remark: "设计师,负责界面设计",
    createTime: "2024-04-14",
    roleName: "设计师"
  },
  {
    roleId: 8,
    role: "hr",
    remark: "人力资源,负责员工管理",
    createTime: "2024-04-16",
    roleName: "人力资源"
  },
  {
    roleId: 9,
    role: "support",
    remark: "技术支持,为用户提供帮助",
    createTime: "2024-04-18",
    roleName: "技术支持"
  },
  {
    roleId: 10,
    role: "sales",
    remark: "销售,负责公司产品销售",
    createTime: "2024-04-20",
    roleName: "销售"
  },
  {
    roleId: 11,
    role: "analyst",
    remark: "数据分析师,负责数据分析",
    createTime: "2024-04-22",
    roleName: "数据分析师"
  },
  {
    roleId: 12,
    role: "marketing",
    remark: "市场营销,负责市场推广",
    createTime: "2024-04-24",
    roleName: "市场营销"
  },
  {
    roleId: 13,
    role: "accountant",
    remark: "会计,负责公司财务管理",
    createTime: "2024-04-26",
    roleName: "会计"
  },
  {
    roleId: 14,
    role: "quality",
    remark: "质量检查员,负责产品质量控制",
    createTime: "2024-04-28",
    roleName: "质量检查员"
  },
  {
    roleId: 15,
    role: "security",
    remark: "安全管理员,负责系统安全",
    createTime: "2024-04-30",
    roleName: "安全管理员"
  },
  {
    roleId: 16,
    role: "moderator",
    remark: "版主,负责社区内容审核",
    createTime: "2024-05-02",
    roleName: "版主"
  },
  {
    roleId: 17,
    role: "customer_service",
    remark: "客服,为客户提供服务",
    createTime: "2024-05-04",
    roleName: "客服"
  },
  {
    roleId: 18,
    role: "consultant",
    remark: "顾问,提供专业咨询服务",
    createTime: "2024-05-06",
    roleName: "顾问"
  },
  {
    roleId: 19,
    role: "coordinator",
    remark: "协调员,负责团队协调工作",
    createTime: "2024-05-08",
    roleName: "协调员"
  },
  {
    roleId: 20,
    role: "administrator",
    remark: "系统管理员,管理系统和服务器",
    createTime: "2024-05-10",
    roleName: "系统管理员"
  },
  {
    roleId: 21,
    role: "executive",
    remark: "高管,负责决策和领导工作",
    createTime: "2024-05-12",
    roleName: "高管"
  },
  {
    roleId: 22,
    role: "trainer",
    remark: "培训师,负责员工培训工作",
    createTime: "2024-05-14",
    roleName: "培训师"
  },
  {
    roleId: 23,
    role: "researcher",
    remark: "研究员,负责科研工作",
    createTime: "2024-05-16",
    roleName: "研究员"
  }
]

const arr: any = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: "layout",
    redirect: "/dashboard/workplace",
    meta: {
      title: "routes.dashboard",
      icon: "ri:dashboard-line"
    },
    children: [
      {
        path: "workplace",
        name: "Workplace",
        component: "/views/Dashboard/Workplace",
        meta: {
          title: "routes.workplace",
          icon: "bx:bxs-briefcase-alt-2"
        }
      }
    ]
  },
  {
    path: "/workflow",
    name: "Workflow",
    redirect: "/workflow/antvX6",
    component: "layout",
    meta: {
      title: "routes.workflow",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "antvX6",
        name: "AntvX6",
        component: "/views/Workflow/useAntvX6",
        meta: {
          title: "routes.useX6"
        }
      }
    ]
  },

  {
    path: "/cl-Crystal",
    name: "cl-Crystal",
    redirect: "/cl-Crystal",
    component: "layout",
    meta: {
      title: "基础",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "text",
        name: "text",
        component: "/views/ClText/text",
        meta: {
          title: "text示例"
        }
      },
      {
        path: "icon",
        name: "icon",
        component: "/views/ClIcon/icon",
        meta: {
          title: "cl_icon图标示例"
        }
      },
      {
        path: "button",
        name: "button",
        component: "/views/ClButton/button",
        meta: {
          title: "cl_button按钮示例"
        }
      }
    ]
  },

  {
    path: "/cl-CrystalFrom",
    name: "cl-CrystalFrom",
    redirect: "/cl-CrystalFrom",
    component: "layout",
    meta: {
      title: "From表单",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "bl_input",
        name: "bl_input",
        component: "/views/zlinput/input",
        meta: {
          title: "cl_input输入框示例"
        }
      },
      {
        path: "bl_input_number",
        name: "bl_input_number",
        component: "/views/zlinput/inputnumber",
        meta: {
          title: "cl_input_number输入框示例"
        }
      },
      {
        path: "bl_input_tag",
        name: "bl_input_tag",
        component: "/views/zlinput/inputtag",
        meta: {
          title: "cl_input_tag输入框示例"
        }
      },
      {
        path: "bl_select",
        name: "bl_select",
        component: "/views/ClSelect/select",
        meta: {
          title: "cl_select下拉框示例"
        }
      },
      {
        path: "bl_select_zdy",
        name: "bl_select自定义用法",
        component: "/views/ClSelect/selectzdy",
        meta: {
          title: "cl_select下拉框自定义用法"
        }
      },
      {
        path: "datepickerpane",
        name: "bl_datepickerpane",
        component: "/views/ClDatePickerPane/datepickerpane",
        meta: {
          title: "cl_datepickerpane日期示例"
        }
      },
      {
        path: "TimePicker",
        name: "TimePicker",
        component: "/views/ClTimePicker/TimePicker",
        meta: {
          title: "cl_time_picker时间选择示例"
        }
      },
      {
        path: "time_select",
        name: "bl_time_select",
        component: "/views/ClTimeSelect/TimeSelect",
        meta: {
          title: "cl_time_select时间示例"
        }
      },
      {
        path: "bl_cascade",
        name: "bl_cascade",
        component: "/views/ClCascade/cascade",
        meta: {
          title: "cl_cascade下拉树示例"
        }
      },
      {
        path: "bl_checkbox",
        name: "bl_checkbox",
        component: "/views/ClCheckbox/checkbox",
        meta: {
          title: "cl_checkbox单选示例"
        }
      },
      {
        path: "bl_CrystalCheckboxGroup",
        name: "bl_CrystalCheckboxGroup",
        component: "/views/ClCheckbox/checkboxgroup",
        meta: {
          title: "cl_CrystalCheckboxGroup复选示例"
        }
      },
      {
        path: "radio",
        name: "radio",
        component: "/views/ClRadio/radio",
        meta: {
          title: "cl_radio示例"
        }
      },
      {
        path: "radioGroup",
        name: "radioGroup",
        component: "/views/ClRadio/radioGroup",
        meta: {
          title: "cl_CrystalRadioGroup示例"
        }
      },
      {
        path: "tree",
        name: "tree",
        component: "/views/ClTreeSelect/tree",
        meta: {
          title: "cl_tree示例"
        }
      },
      {
        path: "treeSelect",
        name: "treeSelect",
        component: "/views/ClTreeSelect/treeSelect",
        meta: {
          title: "cl_treeSelect示例"
        }
      },
      {
        path: "treeSelectGroup",
        name: "treeSelectGroup",
        component: "/views/ClTreeSelect/treeSelectGroup",
        meta: {
          title: "cl_ClTreeSelect复杂示例"
        }
      },
      {
        path: "calendar",
        name: "calendar",
        component: "/views/ClCalendar/calendar",
        meta: {
          title: "cl_calendar示例"
        }
      },
      {
        path: "calendarGroup",
        name: "calendarGroup",
        component: "/views/ClCalendar/calendarGroup",
        meta: {
          title: "cl_CrystalCalendar复杂示例"
        }
      },
      {
        path: "switch",
        name: "switch",
        component: "/views/ClSwitch/switch",
        meta: {
          title: "cl_switch示例"
        }
      },
      {
        path: "image",
        name: "image",
        component: "/views/ClImage/image",
        meta: {
          title: "cl_image单图片示例"
        }
      },
      {
        path: "images",
        name: "images",
        component: "/views/ClImage/images",
        meta: {
          title: "cl_image多图片示例"
        }
      }
    ]
  },
  {
    path: "/cl-CrystalAllFrom",
    name: "cl-CrystalAllFrom",
    redirect: "/cl-CrystalAllFrom",
    component: "layout",
    meta: {
      title: "From表单案例",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "elFrom",
        name: "elFrom",
        component: "/views/ElForm/ElForm",
        meta: {
          title: "el基础表单示例"
        }
      },
      {
        path: "elFrom1",
        name: "elFrom1",
        component: "/views/ElForm/ElForm1",
        meta: {
          title: "el输入框只读事件示例"
        }
      },
      {
        path: "ElSearchForm",
        name: "ElSearchForm",
        component: "/views/ElSearchForm/index",
        meta: {
          title: "el搜索表单示例"
        }
      },
      {
        path: "ElSearchForm1",
        name: "ElSearchForm1",
        component: "/views/ElSearchForm/index1",
        meta: {
          title: "el动态搜索表单示例"
        }
      },
      {
        path: "clFrom",
        name: "clFrom",
        component: "/views/ClForm/ClForm",
        meta: {
          title: "cl基础表单示例"
        }
      },
      {
        path: "clFrom1",
        name: "clFrom1",
        component: "/views/ClForm/ClForm1",
        meta: {
          title: "cl输入框只读事件示例"
        }
      },
      {
        path: "clSearchForm",
        name: "clSearchForm",
        component: "/views/clSearchForm/index",
        meta: {
          title: "cl搜索表单示例"
        }
      },
      {
        path: "clSearchForm1",
        name: "clSearchForm1",
        component: "/views/clSearchForm/index1",
        meta: {
          title: "cl动态搜索表单示例"
        }
      },
      {
        path: "clFormGroup",
        name: "clFormGroup",
        component: "/views/ClForm/ClFormGroup",
        meta: {
          title: "cl_formGroup示例"
        }
      }
    ]
  },
  {
    path: "/cl-CrystalDialog",
    name: "cl-CrystalDialog",
    redirect: "/cl-CrystalDialog",
    component: "layout",
    meta: {
      title: "弹窗抽屉",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "dialog",
        name: "dialog",
        component: "/views/ClDialog/dialog",
        meta: {
          title: "cl_dialog弹窗示例"
        }
      },
      {
        path: "Drawer",
        name: "Drawer",
        component: "/views/ClDrawer/Drawer",
        meta: {
          title: "cl_drawer抽屉示例"
        }
      },
      {
        path: "alert",
        name: "alert",
        component: "/views/ClAlert/alert",
        meta: {
          title: "cl_alert示例"
        }
      },
      {
        path: "modal",
        name: "modal",
        component: "/views/Clmodal/modal",
        meta: {
          title: "cl_modal示例"
        }
      },
      {
        path: "notify",
        name: "notify",
        component: "/views/ClNotify/notify",
        meta: {
          title: "cl_notify示例"
        }
      },
      {
        path: "message",
        name: "message",
        component: "/views/ClMessage/message",
        meta: {
          title: "cl_message示例"
        }
      }
    ]
  },
  {
    path: "/el-ErystalTable",
    name: "el-ErystalTable",
    redirect: "/el-ErystalTable",
    component: "layout",
    meta: {
      title: "el封装表格",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "ElTable",
        name: "ElTable",
        component: "/views/ElTable/BasicTableDemo",
        meta: {
          title: "el_table表格示例"
        }
      },
      {
        path: "ElTable1",
        name: "ElTable1",
        component: "/views/ElTable/TableWithActionsDemo",
        meta: {
          title: "el_table操作表格示例"
        }
      },
      {
        path: "ElTable2",
        name: "ElTable2",
        component: "/views/ElTable/TableWithEditableRowsDemo",
        meta: {
          title: "el_table可编辑表格示例"
        }
      },
      {
        path: "ElTable3",
        name: "ElTable3",
        component: "/views/ElTable/TableWithSearchDemo",
        meta: {
          title: "el_table带搜索表格示例"
        }
      },
      {
        path: "ElTable4",
        name: "ElTable4",
        component: "/views/ElTable/TableWithSelection",
        meta: {
          title: "el_table带选择功能表格示例"
        }
      },
      {
        path: "ElTable5",
        name: "ElTable5",
        component: "/views/ElTable/TableWithSingleSelect",
        meta: {
          title: "el_table带单选功能表格示例"
        }
      },
      {
        path: "ElTable6",
        name: "ElTable6",
        component: "/views/ElTable/TableWithCustomColumns",
        meta: {
          title: "el_table带自定义列表格示例"
        }
      },
      {
        path: "ElTable7",
        name: "ElTable7",
        component: "/views/ElTable/TableWithPagination",
        meta: {
          title: "el_table带分页表格示例"
        }
      },
      {
        path: "ElTable8",
        name: "ElTable8",
        component: "/views/ElTable/ComprehensiveDemo",
        meta: {
          title: "el_table全部表格示例"
        }
      }
    ]
  },
  {
    path: "/cl-ErystalTable",
    name: "cl-ErystalTable",
    redirect: "/cl-ErystalTable",
    component: "layout",
    meta: {
      title: "cl封装表格",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "ClTable",
        name: "ClTable",
        component: "/views/ClTable/BasicTableDemo",
        meta: {
          title: "cl_table表格示例"
        }
      },
      {
        path: "ClTable0",
        name: "ClTable0",
        component: "/views/ClTable/BasicTableDem1",
        meta: {
          title: "cl_table排序筛选表格示例"
        }
      },
      {
        path: "ClTable1",
        name: "ClTable1",
        component: "/views/ClTable/TableWithActionsDemo",
        meta: {
          title: "cl_table操作表格示例"
        }
      },
      {
        path: "ClTable2",
        name: "ClTable2",
        component: "/views/ClTable/TableWithEditableRowsDemo",
        meta: {
          title: "cl_table可编辑表格示例"
        }
      },
      {
        path: "ClTable3",
        name: "ClTable3",
        component: "/views/ClTable/TableWithSearchDemo",
        meta: {
          title: "cl_table带搜索表格示例"
        }
      },
      {
        path: "ClTable4",
        name: "ClTable4",
        component: "/views/ClTable/TableWithSelectionDemo",
        meta: {
          title: "cl_table带选择功能表格示例"
        }
      },
      {
        path: "ClTable5",
        name: "ClTable5",
        component: "/views/ClTable/TableWithSingleSelectDemo",
        meta: {
          title: "cl_table带单选功能表格示例"
        }
      },
      {
        path: "ClTable6",
        name: "ClTable6",
        component: "/views/ClTable/TableWithCustomColumnsDemo",
        meta: {
          title: "cl_table带自定义列表格示例"
        }
      },
      {
        path: "ClTable7",
        name: "ClTable7",
        component: "/views/ClTable/TableWithPaginationDemo",
        meta: {
          title: "cl_table带分页表格示例"
        }
      },
      {
        path: "ClTable8",
        name: "ClTable8",
        component: "/views/ClTable/ComprehensiveDemo",
        meta: {
          title: "cl_table全部表格示例"
        }
      }
    ]
  }
]

export default [
  // 列表接口
  {
    url: "/user/list",
    method: "get",
    response: ({ query }) => {
      const { username, page, pageSize } = query
      const mockList = List.filter(item => {
        if (username && item.username.indexOf(username) < 0) return false
        return true
      })
      const pageList = mockList.filter((_, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        data: {
          code: 200,
          data: {
            total: mockList.length,
            list: pageList
          }
        }
      }
    }
  },
  // 权限列表接口
  {
    url: "/user/role",
    method: "post",
    timeout,
    response: ({ body }) => {
      let pageList = roleList
      const { page, pageSize, roleName, role, createTime, remark } = body

      if (roleName) {
        pageList = pageList.filter(item => item.roleName === roleName)
      }
      if (role) {
        pageList = pageList.filter(item => item.role === role)
      }
      if (createTime) {
        pageList = pageList.filter(item => item.createTime === createTime)
      }
      if (remark) {
        pageList = pageList.filter(item => item.remark === remark)
      }
      if (page && pageSize) {
        pageList = pageList.filter((_, index) => index < pageSize * page && index >= pageSize * (page - 1))
      }
      return {
        data: {
          code: 200,
          data: {
            total: roleList.length,
            list: pageList
          }
        }
      }
    }
  },
  //删除权限
  {
    url: "/user/deleteRoleById",
    method: "post",
    timeout,
    response: ({ body }) => {
      const { roleId } = body
      roleList = roleList.filter(item => item.roleId !== roleId)
      return {
        data: {
          code: 200,
          data: "删除成功"
        }
      }
    }
  },
  //更新权限列表
  {
    url: "/user/updateRole",
    method: "post",
    timeout,
    response: ({ body }) => {
      const { roleId, createTime, roleName, remark, role } = body
      for (let dataChange of roleList) {
        if (dataChange.roleId === roleId) {
          dataChange = {
            roleId,
            createTime: createTime || dataChange.createTime,
            roleName: roleName || dataChange.roleName,
            remark: remark || dataChange.remark,
            role: role || dataChange.role
          }
        }
      }
      return {
        data: {
          code: 200,
          data: "更新成功"
        }
      }
    }
  },
  // 登录接口
  {
    url: "/user/login",
    method: "post",
    timeout,
    response: ({ body }) => {
      const data = body
      let hasUser = false
      for (const user of List) {
        if (user.username === data.username && user.password === data.password) {
          hasUser = true
          user.routers = arr
          return {
            data: {
              code: 200,
              data: user
            }
          }
        }
      }
      if (!hasUser) {
        return {
          code: 500,
          message: "账号或密码错误"
        }
      }
    }
  },
  // 获取table
  {
    url: "/user/routerList",
    method: "post",
    timeout,
    response: ({ body }) => {
      const { page, pageSize } = body
      const pageList = arr.filter((_, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        data: {
          code: 200,
          data: {
            total: pageList.length,
            list: pageList
          }
        }
      }
    }
  },
  // 退出接口
  {
    url: "/user/loginOut",
    method: "get",
    timeout,
    response: () => {
      return {
        data: {
          code: 200,
          data: null
        }
      }
    }
  }
] as MockMethod[]
