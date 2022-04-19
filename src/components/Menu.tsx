
import { useAuth } from "@/services/auth";
import { defineComponent } from "vue";
import { RouterLink, useRouter } from "vue-router";
import CircleUserIcon from "./icons/CircleUser";
import HouseIcon from "./icons/House";
import { LoginIcon } from "./icons/Login";
import { LogoutIcon } from "./icons/Logout";
import MenuItem from "./MenuItem";

const Menu = defineComponent({
    name: 'Menu',
    setup() {

        const { logout, isLogged } = useAuth()
        const router = useRouter()

        const deco = () => {
            logout().then(() => router.push({ name: 'home' }))
        }

        return () => (

            <div class="lg:w-1/5 container-column">
                <ul class="list-reset sticky w-full inset-0 top-8">
                    <MenuItem text="Fils d'actualités" link="/"><HouseIcon class="link-icon" /></MenuItem>
                    {!isLogged.value ? (
                        <>
                            <MenuItem text="Créer un profil" link="/register"><CircleUserIcon class="link-icon" /></MenuItem>
                            <MenuItem text="Se connecter" link="/login"><LoginIcon class="link-icon" /></MenuItem>
                        </>
                    ) : (
                        <li class="menu-item">
                            <a
                                href="#"
                                class="hover-link"
                            >
                                <a onClick={deco} activeClass="active-link" class="link">
                                    <LogoutIcon class="link-icon" />
                                    Déconnexion
                                </a>
                            </a>
                        </li>)}
                </ul>
            </div>
        )
    }
})

export default Menu