import { RouterLink } from 'vue-router'
import Header from '@/components/Header.vue'
import Profile from '@/assets/user.png'
import MenuButton from '@/components/MenuButton.vue'
import orderIcon from '@/assets/order.svg?raw'; 
import shakerIcon from '@/assets/shaker.svg?raw'; 
import mapIcon from '@/assets/map.svg?raw';

export default {
  name: 'MainMenuView',
  components: {
    RouterLink,
    Header,
    MenuButton
  },
  data() {
    return {
      Profile,
      orderIcon,
      shakerIcon,
      mapIcon
    }
  }
}
