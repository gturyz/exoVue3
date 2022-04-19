import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import ReverseFacebookIcon from "@/components/icons/ReverseFacebook";
import Menu from "@/components/Menu";

const App = defineComponent({
  setup() {
    return () => (
      <div class="container flex flex-wrap mx-auto px-2 pt-8 lg:pt16 mt-16">
        <div class="w-full">
          <p class="text-3xl font-bold py-2 lg:pb-6 text-gray-700 flex space-x-4 items-center">
            <span>MyNetWork</span>
            <ReverseFacebookIcon class="h-14 w-14 -scale-x-100" />
          </p>
        </div>
        <Menu />
        <RouterView class="lg:w-4/5 container-column" />
      </div>
    );
  },
});

export default App;
