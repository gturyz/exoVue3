
import { Commentaire } from "@/types/Commentaire";
import { defineComponent, PropType } from "vue";

const Comment = defineComponent({
    name: 'Comment',
    props: {
        comment: {
            type: Object as PropType<Commentaire>,
            required: true
        }
    },
    setup(props) {
        const date = new Date(props.comment.dt);
        return () => (
            <div class="border-t border-gray-400 w-full p-3">
                <div class="flex justify-between items-center">
                    <h4 class="text-base font-bold mr-5">{props.comment.pseudo}</h4>
                    <div>
                        posté le {date.toLocaleDateString()} à {date.getHours()}
                        h{date.getMinutes()}
                    </div>
                </div>
                <p>{props.comment.contenu}</p>
            </div>
        )
    }
})

export default Comment