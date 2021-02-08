import { createStore } from 'vuex' 
import axios from 'axios'
import {init_data} from '../constants' 
const local_data = JSON.parse(localStorage.getItem("todo"))
const getRand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min 
export default createStore({
    state: {
        todos : local_data || init_data, 
        saying : ""
    }, 
    mutations: {
        SET_TODO(state, payload) {
            state.todos = [...state.todos, payload] 
            localStorage.setItem("todo",JSON.stringify(state.todos))
        },
        DELETE_TODO(state, payload) {
            const index = state.todos.findIndex(todo => todo.id === payload)
            state.todos.splice(index, 1)
            localStorage.setItem("todo",JSON.stringify(state.todos))
        }, 
        SET_SAYING(state, payload){
            state.saying = payload
        }, 
        CHANGE_TODO(state, payload){
            const id = payload.id; 
            const index = state.todos.findIndex(todo => todo.id === id);
            state.todos[index] = payload
            localStorage.setItem("todo",JSON.stringify(state.todos))
        }
    }, 
    actions: {
        ADD_TODO({ commit }, payload) {
            commit('SET_TODO', payload)
        },
        REMOVE_TODO({ commit }, payload) {
            commit('DELETE_TODO', payload)
        }, 
        async REQ_SAYING({commit}){
            const ret = await axios.get("https://wnghdcjfe.github.io/saying.json").then(res => {  
                const n = res.data.data.length
                const saying = res.data.data[getRand(0, n - 1)]   
                return saying
            }) 
            commit('SET_SAYING', ret)
        }
    }, 
    getters: {
        todos : state => state.todos, 
        saying : state => state.saying, 
    },
    modules: {

    }
  })