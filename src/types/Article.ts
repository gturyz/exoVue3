import { Commentaire } from "@/types/Commentaire";

export interface Article {
  id: number;
  contenu: string;
  urlImgArticle: string;
  like: number;
  pseudo: string;
  date: number;
  commentaires: Commentaire[];
}
