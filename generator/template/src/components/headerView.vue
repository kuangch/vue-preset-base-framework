<template>
  <div class="header">
    <img src="../assets/logo.svg"/>
  </div>
</template>

<script>
import packageJSON from '../../package'
import HeadView from '../components/headerView'
export default {
  name: 'headerView',
  props:{
    name:{
      type:String,
      default:packageJSON.name
    }
  },
  components:{
      HeadView
  },
  created(){
      this.$constants = {
          title : this.name
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $nav_max_w: 15vw;
  $nav_min_w:188px;
  $header_content_height: 4rem;
  $interspace:.3vw;
  .header {
    flex-basis: 5rem;
    min-height:5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color_main_txt;
  }
</style>
