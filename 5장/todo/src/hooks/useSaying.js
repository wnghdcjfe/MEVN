import store from '../store' 
import { ref, computed } from 'vue'
export default function useSaying() {  
    const newSaying = ref('')
    const saying = computed(() => store.getters['saying']) 
    const setSaying = async () => {  
        await store.dispatch('REQ_SAYING')  
        newSaying.value = saying.value
    } 

    return {
        newSaying, 
        saying,
        setSaying,
    }
}
