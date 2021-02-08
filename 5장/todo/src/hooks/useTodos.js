import store from '../store'
import { ref, computed } from 'vue'
export default function useTodos() { 
    const newTodo = ref('')
    const todos = computed(() => store.getters['todos'])  
    const addTodo = () => {
        const value = newTodo.value && newTodo.value.trim()
        if (!value) {
            return
        }  
        const id = (todos.value.length && todos.value[todos.value.length - 1].id + 1) || 0 
        const payload = {
            id : id,
            title: value,
            done: false
        } 
        store.dispatch('ADD_TODO', payload)
        newTodo.value = ''
    }
    const changeTodo = (todo)=>{ 
        store.commit('CHANGE_TODO', todo) 
    }
    const removeTodo = (id) => {
        store.dispatch('REMOVE_TODO', id)
    }
    return {
        addTodo,
        newTodo,
        changeTodo,
        removeTodo,
        todos
    }
}
