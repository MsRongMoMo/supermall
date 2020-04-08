import { deBounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemImgListener = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null,

    }
  },
  mounted() {
    this.newRefresh = deBounce(this.$refs.scroll.refresh, 100)

    this.itemImageListener = () => {
      this.newRefresh()
      // this.getThemeTopYs()

    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)

  }
}

export const backTop = {
  components: {
    BackTop

  },
  data() {
    return {
      isShowBackTop: false

    }
  },
  methods: {
    backTopClick() {
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0)
      // console.log('backtop被点了')
    },
    listenBackTop(position){
      //1.判断backtop是否显示
       this.isShowBackTop=(-position.y)>1000?true:false;
    }
    
  }
}