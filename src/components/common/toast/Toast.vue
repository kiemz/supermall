<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() { 
    return {
      message: '',
      isShow: false,
    }
  },
  props: {
    // message: {
    //   type: String,
    //   default: '',
    // },
    // show: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  components:{

  },
  methods:{
    show(message,duration=2000) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
            this.isShow = false
            this.message = ''
      },duration)
    }
  },
 }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    z-index: 999;
    padding: 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
  }
</style>