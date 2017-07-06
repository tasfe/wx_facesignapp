<template>
  <div class="info">
    <img  src="../../assets/title.png" class = 'title-banner'/>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'info',
    data(){
      return {
  
      }
    },
    props: {
      name: {
        type: String
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style>
  .info {

  }
</style>
