
import { Utilisateur } from "./Utilisateur";

export interface AuthState {
    isLogged: boolean,
    user?: Utilisateur,
    error?: Error
}