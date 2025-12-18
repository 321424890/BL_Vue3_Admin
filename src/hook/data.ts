import { ref, reactive, watch } from 'vue'
import type { QueryItem, Column, QueryConfigItem } from "@/components/BasicTable/hook/types";

// 数据文件

export function dataCrud() {
    // 表格基础
    const columns = ref<Column[]>([
        { prop: 'name', label: '姓名', width: '200px', sortable: true, align: 'center' },
        { prop: 'age', label: '年龄', width: '200px', sortable: true, align: 'center' },
        { prop: 'email', label: '邮箱', width: '200px', sortable: true, align: 'center' },
        { prop: 'phone', label: '手机号', width: '200px', sortable: true, align: 'center' },
        { prop: 'gender', label: '性别', width: '200px', sortable: true, align: 'center' },
        { prop: 'address', label: '地址', width: '200px', sortable: true, align: 'center' },
        { prop: 'occupation', label: '职业', width: '200px', sortable: true, align: 'center' },
        { prop: 'company', label: '公司', width: '200px', sortable: true, align: 'center' },
        { prop: 'hireDate', label: '入职日期', width: '200px', sortable: true, align: 'center' }
    ])
    // 搜索条件信息
    const queryConfig = ref<QueryItem[]>([
        {
            type: 'el-input', //类型
            prop: 'name', //字段名
            label: '姓名', //显示文字
            props: {
                placeholder: '请输入姓名',
                clearable: true, // 可清空
                maxlength: 20, // 最大长度
                showWordLimit: true // 显示字数统计
            },
            value: '', //默认值
            width: '200px',
            required: false, // 是否必填
            disabled: false, // 是否禁用
            rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }] // 验证规则
        },
        {
            type: 'el-select',
            prop: 'age',
            label: '年龄',
            props: {
                placeholder: '请选择',
                options: [
                    { label: '18-25', value: '18-25' },
                    { label: '26-35', value: '26-35' },
                    { label: '36-45', value: '36-45' },
                    { label: '46+', value: '46+' }
                ]
            },
            value: '',
            width: '200px',
            disabled: false, // 是否禁用
            // 联动示例：当选择特定值时禁用其他字段
            onChange: (val) => {
                onchangeon(val)
            }
        },
        {
            type: 'el-select',
            prop: 'money',
            label: '钱钱钱',
            props: {
                placeholder: '请选择',
                options: [
                    { label: '18-25', value: '18-25' },
                    { label: '26-35', value: '26-35' },
                    { label: '36-45', value: '36-45' },
                    { label: '46+', value: '46+' }
                ]
            },
            value: '',
            width: '200px',
            disabled: false, // 是否禁用
            // 联动示例：当选择特定值时改变其他字段的值
            onChange: (val) => {
                onchangeon(val)
            }
        },
        {
            type: 'el-date-picker',
            prop: 'StartTime',
            label: '日期',
            props: {
                placeholder: '选择日期',
                type: 'date',
                clearable: true, // 可清空
                valueFormat: 'YYYY-MM-DD', // 日期格式
                disabledDate: (time) => {
                    // 禁用未来日期
                    // return time.getTime() > Date.now()
                }
            },
            value: '',
            width: '200px',
            disabled: false, // 是否禁用
            // 日期选择后的处理
            onChange: (val) => {
                onchangeon(val)
            }
        },

    ])
    //   弹窗form表单数据案例
    const dialogFormConfig = ref<QueryConfigItem[]>([
        {
            type: 'el-input',
            prop: 'name',
            label: '姓名',
            value: '',
            readonly: false,  // true时禁止键盘输入，只读，需点击弹出选择框
            props: {
                placeholder: '请输入姓名',
                clearable: true,
                // maxlength: 50,
                // showWordLimit: true
            },
            required: true,
            rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        },
        {
            type: 'el-input-number',
            prop: 'age',
            label: '年龄',
            value: null,
            props: {
                placeholder: '请输入年龄',
                // min: 0,
                // max: 150,
                controlsPosition: 'right'
            },
            required: true,
            rules: [{ required: true, message: '请输入年龄', trigger: 'blur' }]
        },
        {
            type: 'el-input',
            prop: 'email',
            label: '邮箱',
            readonly: false,
            value: '',
            props: {
                placeholder: '请输入邮箱',
                clearable: true
            },
            required: true,
            rules: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                //   { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
            ]
        },
        {
            type: 'el-input',
            prop: 'phone',
            label: '手机号',
            value: '',
            props: {
                placeholder: '请输入手机号',
                clearable: true,
                maxlength: 11
            },
            required: true,
            rules: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
                //   { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
            ]
        },
        {
            type: 'el-select',
            prop: 'gender',
            label: '性别',
            value: '',
            props: {
                placeholder: '请选择性别',
                options: [
                    { label: '男', value: 'male' },
                    { label: '女', value: 'female' },
                    { label: '其他', value: 'other' }
                ],
                clearable: true
            },
            required: true,
            rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
        },
        {
            type: 'el-select',
            prop: 'address',
            label: '地址',
            value: '',
            props: {
                placeholder: '请输入地址',
                options: [
                    { label: '11', value: '33' },
                    { label: '女22', value: 'fem33ale' },
                    { label: '333', value: 'oth333er' }
                ],
                clearable: true
            },
            required: false
        },
        {
            type: 'el-input',
            prop: 'occupation',
            label: '职业',
            value: '',
            props: {
                placeholder: '请输入职业',
                clearable: true
            },
            required: false
        },
        {
            type: 'el-input',
            prop: 'company',
            label: '公司',
            value: '',
            props: {
                placeholder: '请输入公司',
                clearable: true
            },
            required: false
        },
        {
            type: 'el-date-picker',
            prop: 'hireDate',
            label: '入职日期',
            value: '',
            props: {
                placeholder: '请选择入职日期',
                type: 'date',
                clearable: true,
                valueFormat: 'YYYY-MM-DD'
            },
            required: false
        }
    ])
    function onchangeon(val) {
        console.log('选中', val)
        // 这里写你的删除逻辑
    }

    return {
        columns,
        queryConfig,
        dialogFormConfig,
        onchangeon,
    }
}
