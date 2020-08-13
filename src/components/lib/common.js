var common = {
    namespace: true,
    state: {
        menuList: [],
    },
    getters: {
        menuList: state => state.menuList
    },
    mutations: {
        SET_COLLAPSE (state, args){
            state.menuList = args
        },
    }
}

export default common