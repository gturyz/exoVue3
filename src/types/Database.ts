import { Utilisateur } from "@/types/Utilisateur";
import { Article } from "@/types/Article";

export interface Database {
  utilisateurs: Utilisateur[];
  articles: Article[];
}
