import {debounce} from "common/utils"

export const itemListenerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemListener = () => {
      refresh()
    }
    this.$bus.on('itemImageLoad',this.itemListener)
  }
}