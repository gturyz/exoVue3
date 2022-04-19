
import { defineComponent } from "vue";

const PostHeader = defineComponent({
    name: 'PostHeader',
    props: {
        pseudo: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    setup(props) {
        return () => (
            <div class="flex props.posts-center bg-gray-200 p-3 justify-between">
          <div class="flex props.posts-center">
            <h4 class="text-2xl mr-5">{props.pseudo}</h4>
            <img
              class="h-10 w-10 rounded-full"
              src={props.image}
            />
          </div>
          <div>
            posté le {props.date.toLocaleDateString()} à {props.date.getHours()}
            h{props.date.getMinutes()}
          </div>
        </div>
        )
    }
})

export default PostHeader