import Vue from 'vue';
import Vuex from 'vuex';

import common from './common.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        common
    },
    state:{
        userId:sessionStorage.getItem('userId')?sessionStorage.getItem('userId'):'',
        roleId:sessionStorage.getItem('roleId')?sessionStorage.getItem('roleId'):'',
    },
    getters:{},
    mutations:{
        userId(state,userId){
            sessionStorage.setItem('userId',userId)
            state.userId = userId
        },
        roleId(state,roleId){
            sessionStorage.setItem('roleId',roleId)
            state.roleId = roleId
        }
    },
    actions: {}
})