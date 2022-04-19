
import Post from "@/components/Post";
import Comment from "@/components/Comment";
import { CommentDotsIcon } from "@/components/icons/CommentDots";
import HouseIcon from "@/components/icons/House";
import { ThumbsUpRegularIcon } from "@/components/icons/ThumbsUp";
import { useAuth } from "@/services/auth";
import { Article } from "@/types/Article";
import { Utilisateur } from "@/types/Utilisateur";
import { defineComponent, onMounted, reactive, ref } from "vue";

const Home = defineComponent({
  name: 'Home',
  setup() {
    const posts = ref<Article[]>([]);
    const users = ref<Utilisateur[]>([]);

    const article = reactive<Omit<Article, 'id' | 'commentaires' | 'date' | 'like' | 'pseudo'>>({
      contenu: '',
      urlImgArticle: ''
    })

    const { isLogged, user } = useAuth()

    onMounted(() => {
      fetch("http://127.0.0.1:5000/articles")
        .then((reponse) => reponse.json())
        .then((data) => {
          posts.value = data;
        });
      fetch("http://127.0.0.1:5000/users")
        .then((reponse) => reponse.json())
        .then((data) => {
          users.value = data;
        });
    });

    const handlePost = (e: Event) => {
      e.preventDefault()
      const newPost: Omit<Article, 'id'> = {
        date: Date.now(),
        pseudo: user?.value?.pseudo || '',
        contenu: article.contenu,
        urlImgArticle: article.urlImgArticle,
        like: 0,
        commentaires: []
      }
      // posts.value.push(newPost)
      fetch(`http://127.0.0.1:5000/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPost }),
      })
        .then((res) => res.json())
        .then(data => posts.value.push(data))
        .catch((res) => console.log(res));
    };

    return () => (
      <div>
        {isLogged.value &&
          <div class="border-2 rounded mt-3 p-3 last:mb-3 first:mt-0 border-gray-500 bg-gray-200">
            <div class="flex items-center">
              <h4 class="text-2xl mr-5">Quoi de neuf ?</h4>
              <HouseIcon class="h-8 w-8" />
            </div>
            <form onSubmit={handlePost} class="flex flex-col p-3 space-y-3">

              <textarea required name="contenu" placeholder="Laisser un nouveau post" class="input-base" vModel={article.contenu} />
              <input required type="text" name="image" placeholder="url de votre image - taille conseillée 1000x200px" class="input-base" vModel={article.urlImgArticle} />
              <input type="submit" value="Laisser un nouveau post" class="button-post" />
            </form>
          </div>
        }
        {posts.value.map((item, index) =>
          <Post key={item.id} index={index} post={item} users={users.value} />
        )}
      </div>
    );
  },
});

export default Home;
