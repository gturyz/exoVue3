
import CircleUserIcon from "@/components/icons/CircleUser";
import { useAuth } from "@/services/auth";
import { Utilisateur } from "@/types/Utilisateur";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const Register = defineComponent({
    setup() {

        const payload = reactive<Omit<Utilisateur, 'id'>>({
            email: '',
            password: '',
            pseudo: '',
            urlImgProfil: ''
        })

        const confirmPassword = ref<string>('')

        const error = ref<string>('')

        const { setUser } = useAuth()

        const router = useRouter()

        const submit = (e: Event) => {
            e.preventDefault()

            const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
            if (!payload.email.toLowerCase().match(regex)) {
                error.value = "L'email doit être au format votre@email.fr"
                return
            }
            if (payload.pseudo.length < 3) {
                error.value = "Le pseudo doit contenir au moins 3 caractères"
                return
            }
            if (payload.password.length < 6) {
                error.value = "Le mot de passe doit contenir au moins 6 caractères"
                return
            }
            if (payload.password !== confirmPassword.value) {
                error.value = "Les mots de passe ne sont pas identique"
                return
            }

            fetch("http://127.0.0.1:5000/register", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...payload }),
            })
                .then(reponse => {
                    if (reponse.ok) {
                        reponse.json().then(data => {
                            setUser(data, true)
                            router.push({ name: 'home' })
                        })
                    } else reponse.json().then(err => error.value = err)
                })


        }

        return () => <form onSubmit={submit} class="form">
            <div class="flex items-center mb-3">
                <h4 class="text-2xl mr-5">Quoi de neuf ?</h4>
                <CircleUserIcon class="h-8 w-8" />
            </div>
            <input required type="text" name="pseudo" placeholder="pseudo" class="input-base" minlength={3} vModel={payload.pseudo} />
            <input required type="email" name="email" placeholder="votre@email.fr" class="input-base" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="Email invalide" vModel={payload.email} />
            <input required type="password" name="password" placeholder="password" class="input-base" minlength={6} vModel={payload.password} />
            <input required type="password" name="confirmPassword" placeholder="confirmer password" class="input-base" vModel={confirmPassword.value} />
            <input required type="text" name="image" placeholder="url de votre image - taille conseillée 1000x200px" class="input-base" vModel={payload.urlImgProfil} />
            <input type="submit" value="Connexion" class="button-blue" />
            {error.value !== '' &&
                <div class="relative flex items-center p-4 border-l-4  rounded shadow-sm bg-red-50 border-red-500">
                    <div class="flex-grow text-red-700">
                        {error.value}
                    </div>
                </div>
            }
        </form>;
    },
});

export default Register;
