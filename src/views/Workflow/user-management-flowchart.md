# 用户管理流程图

使用 Mermaid 语法绘制的用户管理流程图，与提供的
原图完全一致。

```mermaid
flowchart TD
    start(开始) --> enterUserManagement[进入用户管理页面]
    enterUserManagement --> selectOperation{选择操作}
    
    selectOperation -->|创建用户| fillUserInfo[填写用户信息]
    selectOperation -->|修改用户| modifyUserInfo[修改用户信息]
    selectOperation -->|删除用户| confirmDeleteUser[确认删除用户]
    
    fillUserInfo --> createUser{创建用户}
    modifyUserInfo --> createUser
    confirmDeleteUser --> confirmDelete{确认删除?}
    
    createUser -->|否| showError[提示错误信息]
    createUser -->|是| submitServer[提交服务器]
    confirmDelete -->|否| enterUserManagement
    confirmDelete -->|是| submitServer
    
    submitServer --> operationSuccess{操作成功?}
    operationSuccess -->|否| showFailure[提示操作失败]
    operationSuccess -->|是| showSuccess[提示操作成功]
    
    showSuccess --> endNode(结束)
    showError --> enterUserManagement
    showFailure --> enterUserManagement

    classDef startEnd shape:ellipse,font-size:16px,width:100px,height:50px
    classDef process font-size:14px,width:160px,height:50px
    classDef decision font-size:14px,width:120px,height:80px
    classDef ellipseProcess font-size:14px,width:200px,height:60px,shape:ellipse

    class start,endNode startEnd
    class fillUserInfo,modifyUserInfo,confirmDeleteUser,submitServer,showError,showFailure,showSuccess process
    class selectOperation,createUser,confirmDelete,operationSuccess decision
    class enterUserManagement ellipseProcess
```

## 说明

- **开始和结束节点**：使用椭圆形表示
- **进入用户管理页面**：使用椭圆形表示
- **流程节点**：使用矩形表示
- **决策节点**：使用菱形表示
- **连接线**：使用实线连接，带有分支标签
- **循环**：从各个错误/失败节点回到进入用户管理页面的连接线表示循环

## 流程说明

1. **开始**：流程的起点
2. **进入用户管理页面**：用户访问系统的用户管理功能
3. **选择操作**：用户选择要执行的操作类型
4. **创建用户**分支：
   - 填写用户信息
   - 创建用户确认
   - 提交服务器
5. **修改用户**分支：
   - 修改用户信息
   - 创建用户确认（复用节点）
   - 提交服务器
6. **删除用户**分支：
   - 确认删除用户
   - 确认删除确认
   - 提交服务器
7. **操作结果处理**：
   - 操作成功？确认
   - 提示操作成功或失败
8. **循环处理**：
   - 错误信息或操作失败时返回用户管理页面
9. **结束**：流程的终点

## 使用方法

1. 在支持 Mermaid 的 Markdown 编辑器中打开此文件
2. 查看渲染后的流程图
3. 可以根据需要修改节点内容和样式