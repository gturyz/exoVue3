import { LoginIcon } from "@/components/icons/Login";
import { useAuth } from "@/services/auth";
import { LoginPayload } from "@/types/LoginPayload";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

const Login = defineComponent({
    setup() {

        const payload = reactive<LoginPayload>({
            email: '',
            password: '',
            rememberMe: false
        })

        const { setUser } = useAuth()

        const router = useRouter()

        const submit = (e: Event) => {
            e.preventDefault()
            fetch("http://127.0.0.1:5000/login", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...payload }),
            })
                .then(reponse => reponse.json())
                .then(data => {
                    setUser(data, payload.rememberMe)
                })
                .then(() => router.push({ name: 'home' }))

        }

        return () => <form onSubmit={submit} class="form">
            <div class="flex items-center mb-3">
                <h4 class="text-2xl mr-5">Quoi de neuf ?</h4>
                <LoginIcon class="h-8 w-8" />
            </div>
            <input required type="email" name="email" placeholder="votre@email.fr" class="input-base" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="Email invalide" vModel={payload.email} />
            <input required type="password" name="password" placeholder="password" class="input-base" vModel={payload.password} />
            <div class="flex items-center">
                <input type="checkbox" id="remember" name="remember" class="checkbox-base" vModel={payload.rememberMe} />
                <label htmlFor="remember" class="ml-2 text-sm">Se souvenir de moi</label>
            </div>
            <input type="submit" value="Connexion" class="button-blue" />
        </form>;
    },
});

export default Login;
