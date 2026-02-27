import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { t } from "@/hooks/useLocale"
import { Layout, secLayout } from "@/utils/routerUtils"

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard/workplace",
    name: "Root"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue"),
    meta: {
      title: t("routes.login")
    }
  },
  {
    path: "/redirect/:path(.*)*/:type(.*)*",
    name: "Redirect",
    component: () => import("@/views/Redirect/Redirect.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    redirect: "/dashboard/workplace",
    meta: {
      title: t("routes.dashboard"),
      icon: "ri:dashboard-line"
    },
    children: [
      {
        path: "workplace",
        name: "Workplace",
        component: () => import("@/views/Dashboard/Workplace.vue"),
        meta: {
          title: t("routes.workplace"),
          icon: "bx:bxs-briefcase-alt-2"
        }
      }
    ]
  },
  {
    path: "/workflow",
    name: "Workflow",
    redirect: "/workflow/antvX6",
    component: Layout,
    meta: {
      title: t("routes.workflow"),
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "antvX6",
        name: "AntvX6",
        component: () => import("@/views/Workflow/useAntvX6.vue"),
        meta: {
          title: t("routes.useX6")
        }
      }
    ]
  },
  {
    path: "/cl-Crystal",
    name: "cl-Crystal",
    redirect: "/cl-Crystal/text",
    component: Layout,
    meta: {
      title: "基础",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "text",
        name: "text",
        component: () => import("@/views/ClText/text.vue"),
        meta: {
          title: "text示例"
        }
      },
      {
        path: "icon",
        name: "icon",
        component: () => import("@/views/ClIcon/icon.vue"),
        meta: {
          title: "cl_icon图标示例"
        }
      },
      {
        path: "button",
        name: "button",
        component: () => import("@/views/ClButton/button.vue"),
        meta: {
          title: "cl_button按钮示例"
        }
      },
      {
        path: "card",
        name: "card",
        component: () => import("@/views/ClCard/card.vue"),
        meta: {
          title: "cl_card卡片示例"
        }
      }
    ]
  },
  {
    path: "/cl-CrystalFrom",
    name: "cl-CrystalFrom",
    redirect: "/cl-CrystalFrom/bl_input",
    component: Layout,
    meta: {
      title: "From表单",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "bl_input",
        name: "bl_input",
        component: () => import("@/views/zlinput/input.vue"),
        meta: {
          title: "cl_input输入框示例"
        }
      },
      {
        path: "bl_input_number",
        name: "bl_input_number",
        component: () => import("@/views/zlinput/inputnumber.vue"),
        meta: {
          title: "cl_input_number输入框示例"
        }
      },
      {
        path: "bl_input_tag",
        name: "bl_input_tag",
        component: () => import("@/views/zlinput/inputtag.vue"),
        meta: {
          title: "cl_input_tag输入框示例"
        }
      },
      {
        path: "bl_select",
        name: "bl_select",
        component: () => import("@/views/ClSelect/select.vue"),
        meta: {
          title: "cl_select下拉框示例"
        }
      },
      {
        path: "bl_select_zdy",
        name: "bl_select自定义用法",
        component: () => import("@/views/ClSelect/selectzdy.vue"),
        meta: {
          title: "cl_select下拉框自定义用法"
        }
      },
      {
        path: "datepickerpane",
        name: "bl_datepickerpane",
        component: () => import("@/views/ClDatePickerPane/datepickerpane.vue"),
        meta: {
          title: "cl_datepickerpane日期示例"
        }
      },
      {
        path: "TimePicker",
        name: "TimePicker",
        component: () => import("@/views/ClTimePicker/TimePicker.vue"),
        meta: {
          title: "cl_time_picker时间选择示例"
        }
      },
      {
        path: "time_select",
        name: "bl_time_select",
        component: () => import("@/views/ClTimeSelect/TimeSelect.vue"),
        meta: {
          title: "cl_time_select时间示例"
        }
      },
      {
        path: "bl_cascade",
        name: "bl_cascade",
        component: () => import("@/views/ClCascade/cascade.vue"),
        meta: {
          title: "cl_cascade下拉树示例"
        }
      },
      {
        path: "bl_checkbox",
        name: "bl_checkbox",
        component: () => import("@/views/ClCheckbox/checkbox.vue"),
        meta: {
          title: "cl_checkbox单选示例"
        }
      },
      {
        path: "bl_CrystalCheckboxGroup",
        name: "bl_CrystalCheckboxGroup",
        component: () => import("@/views/ClCheckbox/checkboxgroup.vue"),
        meta: {
          title: "cl_CrystalCheckboxGroup复选示例"
        }
      },
      {
        path: "radio",
        name: "radio",
        component: () => import("@/views/ClRadio/radio.vue"),
        meta: {
          title: "cl_radio示例"
        }
      },
      {
        path: "radioGroup",
        name: "radioGroup",
        component: () => import("@/views/ClRadio/radioGroup.vue"),
        meta: {
          title: "cl_CrystalRadioGroup示例"
        }
      },
      {
        path: "tree",
        name: "tree",
        component: () => import("@/views/ClTreeSelect/tree.vue"),
        meta: {
          title: "cl_tree示例"
        }
      },
      {
        path: "treeSelect",
        name: "treeSelect",
        component: () => import("@/views/ClTreeSelect/treeSelect.vue"),
        meta: {
          title: "cl_treeSelect示例"
        }
      },
      {
        path: "treeSelectGroup",
        name: "treeSelectGroup",
        component: () => import("@/views/ClTreeSelect/treeSelectGroup.vue"),
        meta: {
          title: "cl_ClTreeSelect复杂示例"
        }
      },
      {
        path: "calendar",
        name: "calendar",
        component: () => import("@/views/ClCalendar/calendar.vue"),
        meta: {
          title: "cl_calendar示例"
        }
      },
      {
        path: "calendarGroup",
        name: "calendarGroup",
        component: () => import("@/views/ClCalendar/calendarGroup.vue"),
        meta: {
          title: "cl_CrystalCalendar复杂示例"
        }
      },
      {
        path: "switch",
        name: "switch",
        component: () => import("@/views/ClSwitch/switch.vue"),
        meta: {
          title: "cl_switch示例"
        }
      },
      {
        path: "image",
        name: "image",
        component: () => import("@/views/ClImage/image.vue"),
        meta: {
          title: "cl_image单图片示例"
        }
      },
      {
        path: "images",
        name: "images",
        component: () => import("@/views/ClImage/images.vue"),
        meta: {
          title: "cl_image多图片示例"
        }
      }
    ]
  },
  {
    path: "/cl-CrystalAllFrom",
    name: "cl-CrystalAllFrom",
    redirect: "/cl-CrystalAllFrom/elFrom",
    component: Layout,
    meta: {
      title: "From表单案例",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "elFrom",
        name: "elFrom",
        component: () => import("@/views/ElForm/ElForm.vue"),
        meta: {
          title: "el基础表单示例"
        }
      },
      {
        path: "elFrom1",
        name: "elFrom1",
        component: () => import("@/views/ElForm/ElForm1.vue"),
        meta: {
          title: "el输入框只读事件示例"
        }
      },
      {
        path: "ElSearchForm",
        name: "ElSearchForm",
        component: () => import("@/views/ElSearchForm/index.vue"),
        meta: {
          title: "el搜索表单示例"
        }
      },
      {
        path: "ElSearchForm1",
        name: "ElSearchForm1",
        component: () => import("@/views/ElSearchForm/index1.vue"),
        meta: {
          title: "el动态搜索表单示例"
        }
      },
      {
        path: "clFrom",
        name: "clFrom",
        component: () => import("@/views/ClForm/ClForm.vue"),
        meta: {
          title: "cl基础表单示例"
        }
      },
      {
        path: "clFrom1",
        name: "clFrom1",
        component: () => import("@/views/ClForm/ClForm1.vue"),
        meta: {
          title: "cl输入框只读事件示例"
        }
      },
      {
        path: "clSearchForm",
        name: "clSearchForm",
        component: () => import("@/views/clSearchForm/index.vue"),
        meta: {
          title: "cl搜索表单示例"
        }
      },
      {
        path: "clSearchForm1",
        name: "clSearchForm1",
        component: () => import("@/views/clSearchForm/index1.vue"),
        meta: {
          title: "cl动态搜索表单示例"
        }
      },
      {
        path: "clFormGroup",
        name: "clFormGroup",
        component: () => import("@/views/ClForm/ClFormGroup.vue"),
        meta: {
          title: "cl_formGroup示例"
        }
      }
    ]
  },
  {
    path: "/cl-CrystalDialog",
    name: "cl-CrystalDialog",
    redirect: "/cl-CrystalDialog/dialog",
    component: Layout,
    meta: {
      title: "弹窗抽屉",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "dialog",
        name: "dialog",
        component: () => import("@/views/ClDialog/dialog.vue"),
        meta: {
          title: "cl_dialog弹窗示例"
        }
      },
      {
        path: "Drawer",
        name: "Drawer",
        component: () => import("@/views/ClDrawer/Drawer.vue"),
        meta: {
          title: "cl_drawer抽屉示例"
        }
      },
      {
        path: "alert",
        name: "alert",
        component: () => import("@/views/ClAlert/alert.vue"),
        meta: {
          title: "cl_alert示例"
        }
      },
      {
        path: "modal",
        name: "modal",
        component: () => import("@/views/Clmodal/modal.vue"),
        meta: {
          title: "cl_modal示例"
        }
      },
      {
        path: "notify",
        name: "notify",
        component: () => import("@/views/ClNotify/notify.vue"),
        meta: {
          title: "cl_notify示例"
        }
      },
      {
        path: "message",
        name: "message",
        component: () => import("@/views/ClMessage/message.vue"),
        meta: {
          title: "cl_message示例"
        }
      }
    ]
  },
  {
    path: "/el-ErystalTable",
    name: "el-ErystalTable",
    redirect: "/el-ErystalTable/ElTable",
    component: Layout,
    meta: {
      title: "el封装表格",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "ElTable",
        name: "ElTable",
        component: () => import("@/views/ElTable/BasicTableDemo.vue"),
        meta: {
          title: "el_table表格示例"
        }
      },
      {
        path: "ElTable1",
        name: "ElTable1",
        component: () => import("@/views/ElTable/TableWithActionsDemo.vue"),
        meta: {
          title: "el_table操作表格示例"
        }
      },
      {
        path: "ElTable2",
        name: "ElTable2",
        component: () => import("@/views/ElTable/TableWithEditableRowsDemo.vue"),
        meta: {
          title: "el_table可编辑表格示例"
        }
      },
      {
        path: "ElTable3",
        name: "ElTable3",
        component: () => import("@/views/ElTable/TableWithSearchDemo.vue"),
        meta: {
          title: "el_table带搜索表格示例"
        }
      },
      {
        path: "ElTable4",
        name: "ElTable4",
        component: () => import("@/views/ElTable/TableWithSelection.vue"),
        meta: {
          title: "el_table带选择功能表格示例"
        }
      },
      {
        path: "ElTable5",
        name: "ElTable5",
        component: () => import("@/views/ElTable/TableWithSingleSelect.vue"),
        meta: {
          title: "el_table带单选功能表格示例"
        }
      },
      {
        path: "ElTable6",
        name: "ElTable6",
        component: () => import("@/views/ElTable/TableWithCustomColumns.vue"),
        meta: {
          title: "el_table带自定义列表格示例"
        }
      },
      {
        path: "ElTable7",
        name: "ElTable7",
        component: () => import("@/views/ElTable/TableWithPagination.vue"),
        meta: {
          title: "el_table带分页表格示例"
        }
      },
      {
        path: "ElTable8",
        name: "ElTable8",
        component: () => import("@/views/ElTable/ComprehensiveDemo.vue"),
        meta: {
          title: "el_table全部表格示例"
        }
      }
    ]
  },
  {
    path: "/cl-ErystalTable",
    name: "cl-ErystalTable",
    redirect: "/cl-ErystalTable/ClTable",
    component: Layout,
    meta: {
      title: "cl封装表格",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "ClTable",
        name: "ClTable",
        component: () => import("@/views/ClTable/BasicTableDemo.vue"),
        meta: {
          title: "cl_table表格示例"
        }
      },
      {
        path: "ClTable0",
        name: "ClTable0",
        component: () => import("@/views/ClTable/BasicTableDem1.vue"),
        meta: {
          title: "cl_table排序筛选表格示例"
        }
      },
      {
        path: "ClTable1",
        name: "ClTable1",
        component: () => import("@/views/ClTable/TableWithActionsDemo.vue"),
        meta: {
          title: "cl_table操作表格示例"
        }
      },
      {
        path: "ClTable2",
        name: "ClTable2",
        component: () => import("@/views/ClTable/TableWithEditableRowsDemo.vue"),
        meta: {
          title: "cl_table可编辑表格示例"
        }
      },
      {
        path: "ClTable3",
        name: "ClTable3",
        component: () => import("@/views/ClTable/TableWithSearchDemo.vue"),
        meta: {
          title: "cl_table带搜索表格示例"
        }
      },
      {
        path: "ClTable4",
        name: "ClTable4",
        component: () => import("@/views/ClTable/TableWithSelectionDemo.vue"),
        meta: {
          title: "cl_table带选择功能表格示例"
        }
      },
      {
        path: "ClTable5",
        name: "ClTable5",
        component: () => import("@/views/ClTable/TableWithSingleSelectDemo.vue"),
        meta: {
          title: "cl_table带单选功能表格示例"
        }
      },
      {
        path: "ClTable6",
        name: "ClTable6",
        component: () => import("@/views/ClTable/TableWithCustomColumnsDemo.vue"),
        meta: {
          title: "cl_table带自定义列表格示例"
        }
      },
      {
        path: "ClTable7",
        name: "ClTable7",
        component: () => import("@/views/ClTable/TableWithPaginationDemo.vue"),
        meta: {
          title: "cl_table带分页表格示例"
        }
      },
      {
        path: "ClTable8",
        name: "ClTable8",
        component: () => import("@/views/ClTable/ComprehensiveDemo.vue"),
        meta: {
          title: "cl_table全部表格示例"
        }
      }
    ]
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: () => import("@/views/Error/404.vue"),
    meta: {
      title: t("result.notfound"),
      icon: "ic:outline-error-outline"
    }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: staticRouter
})

// 在路由加载完毕后，导出之前将router注册方法导出
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
