let utilMap = {}

utilMap.apis = {
    roleSelect:"/mysql/roleSelect",// 查询用户权限下拉框
    register:"/mysql/user/register",// 注册
    login:"/mysql/user/login",// 登录
    SqlList:"/mysql/SqlList",// 查询
    addRow:"/mysql/addRow", // 添加
    deleteRow:"/mysql/deleteRow",// 删除
    UpDataRow:"/mysql/UpDataRow",// 修改

    getmenu:"/mysql/menuList",// 查询菜单
    addParentMenu:"/mysql/addParentMenu",// 添加菜单
    delectMenu:"/mysql/delectMenu",// 删除菜单
    updataMenu:"/mysql/updataMenu", // 修改菜单

    getvariety:"/mysql/variety",// 获取菜品
    addVariety:"/mysql/add-variety", // 添加菜品
    delectVariety:"/mysql/delect-variety",// 删除菜品
    updataVariety:"/mysql/updata-variety",// 修改菜品
    updataPlace:"/mysql/updata-place",// 下单&新增餐桌
    deletePlace:"/mysql/delete-place",// 删除餐桌
    searchbydesk:"/mysql/searchbydesk",// 根据餐桌查询已点菜品
    addHistory:"/mysql/add-history",// 新增历史菜单
    getHistory:"/mysql/get-history",// 获取历史订单
}

export default utilMap