
import { AuthState } from "@/types/AuthSate";
import { Register } from "@/types/Register";
import { reactive, toRefs } from "vue";

const state = reactive<AuthState>({
    isLogged: false,
    user: undefined,
    error: undefined
})

const token = window.localStorage.getItem('accessToken')
const userId = window.localStorage.getItem('userId')

if (token) {
    state.isLogged = true

    fetch(`http://127.0.0.1:5000/440/users/${userId}`)
        .then(reponse => reponse.json())
        .then(data => {
            state.user = data
        })
        .catch(err => {
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem('userId')
            state.isLogged = false
        })

    }

export const useAuth = () => {
    const setUser = (data: Register, save: boolean) => {
        if (save) {
            window.localStorage.setItem('accessToken', data.accessToken)
            window.localStorage.setItem('userId', data.user.id.toString())
        }
        state.user = data.user
        state.isLogged = true
        state.error = undefined
    }
    
    const logout = (): Promise<void> => {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('userId')
        state.isLogged = false
        return Promise.resolve(state.user = undefined)
    }

    return { setUser, logout, ...toRefs(state) }
}