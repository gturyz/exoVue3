
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

const MenuItem = defineComponent({
    name: 'MenuItem',
    props: {
        text: {
            type: String,
            required: false
        },
        link: {
            type: String,
            required: true
        }
    },
    setup(props, { slots }) {
        return () => (
            <li class="menu-item">
                <a
                    href="#"
                    class="hover-link"
                >
                    <RouterLink to={props.link} activeClass="active-link" class="link">
                        {slots?.default && slots.default()}
                        {props.text}
                    </RouterLink>
                </a>
            </li>
        )
    }
})

export default MenuItem