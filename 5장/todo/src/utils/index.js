import {days} from '../constants'
const todoDay = () => {
    const date = new Date() 
    return days[date.getDay()]
}
const setForm = (str, payload) => (str + payload).slice(-2) 
export const getDate = () => {
    const day = todoDay()
    const date = setForm("00", new Date().getDate())
    const month = setForm("00", new Date().getMonth() + 1)
    const year = new Date().getFullYear()
    return `${year}.${month}.${date} (${day})`
}