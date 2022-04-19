
import { useAuth } from "@/services/auth";
import { Article } from "@/types/Article";
import { Utilisateur } from "@/types/Utilisateur";
import { defineComponent, PropType, ref } from "vue";
import Comment from "../Comment";
import { CommentDotsIcon } from "../icons/CommentDots";
import { ThumbsUpRegularIcon } from "../icons/ThumbsUp";
import PostHeader from "./PostHeader";

const Post = defineComponent({
  name: 'Post',
  props: {
    post: {
      type: Object as PropType<Article>,
      required: true
    },
    users: {
      type: Array as PropType<Utilisateur[]>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const commentaire = ref<string>('')

    const datePost = new Date(props.post.date);
    const { isLogged, user } = useAuth()

    const handleLike = (articleId: number) => {
      if (isLogged.value) {
        props.post.like = props.post.like + 1;
        const { id, ...post } = props.post;
        fetch(`http://127.0.0.1:5000/articles/${articleId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...post }),
        })
          .then((res) => console.log(res))
          .catch((res) => console.log(res));
      }
    };

    const handleComment = (articleId: number) => {
      if (commentaire.value !== "") {
        props.post.commentaires.push({
          id: Math.max(...props.post.commentaires.map(o => o.id)) + 1,
          contenu: commentaire.value,
          dt: Date.now(),
          pseudo: user?.value?.pseudo,
        })
        const { id, ...post } = props.post;
        fetch(`http://127.0.0.1:5000/articles/${articleId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...post }),
        })
          .then((res) => console.log(res))
          .catch((res) => console.log(res));
      }
    };

    const userImage: string | undefined = props.users.find((x) => x.pseudo === props.post.pseudo)?.urlImgProfil

    return () => (
      <div
        class="border-2 rounded mt-3 last:mb-3 first:mt-0 border-gray-500 bg-white"
      >
        <PostHeader date={datePost} pseudo={props.post.pseudo} image={userImage != undefined ? userImage : ""} />
        <div>
          <img class="w-full" src={props.post.urlImgArticle} />
          <p class="p-3">{props.post.contenu}</p>
        </div>
        <div class="border-t p-3 bg-gray-200 border-gray-400 flex props.posts-center">
          <CommentDotsIcon class="h-6 w-6" />
          <span class="bg-green-500 text-number">
            {props.post.commentaires.length}
          </span>
          <ThumbsUpRegularIcon
            class="h-6 w-6"
            onClick={() => handleLike(props.post.id)}
          />
          <span class="bg-blue-500 text-number">
            {props.post.like}
          </span>
        </div>
        <div class="">
          <h5 class="text-xl p-3">Commentaires :</h5>
          {props.post.commentaires.map((comment) => <Comment comment={comment} />)}
          {isLogged.value &&
            <div class="border-t border-gray-400 w-full p-3">
              <h5 class="text-xl pb-3">Ajouter un commentaires :</h5>
              <textarea required name="commentaire" placeholder="Laisser un commentaire" class="input-base" vModel={commentaire.value} />
              <button onClick={() => handleComment(props.post.id)} class="button-comment" >Laisser un commentaire</button>
            </div>
          }
        </div>
      </div>
    )
  }
})

export default Post