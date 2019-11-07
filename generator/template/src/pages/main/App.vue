<template>
  <div id="app">
    <header-view></header-view>
    <div class="main">
      <div class="nav">
        <div v-for="(item,index) in routerList" :key="item.name">
          <div v-if="item.children" >
            <div :class="'nav-menu-item ovfl-ellipsis '+($route.path===item.path||$route.path.indexOf((item.path+'/'))===0?'nav-menu-active':'')"  @click="toggleSubMenu(item,index)">
              <span class="">{{item.name}}</span>
            </div>
            <collapse-transition>
              <div v-show="item.showChild" >
                <router-link v-for="child in item.children" :key="child.name" v-if="!child.hidden"
                             :to="{path: `${child.path}`}">
                  <div :class="'nav-menu-item nav-menu-child ovfl-ellipsis '+($route.path===child.path||$route.path.indexOf((child.path+'/'))===0?'nav-menu-child-active': '')">
                    <span style="margin-left:2.3vw;">{{child.name}}</span>
                  </div>
                </router-link>
              </div>
            </collapse-transition>

          </div>
          <div v-else>
            <router-link v-if="!item.hidden" :to="{path: `${item.path}`}">
              <div :class="'nav-menu-item ovfl-ellipsis '+($route.path===item.path||$route.path.indexOf((item.path+'/'))===0?'nav-menu-active': '')">
                <i :class="item.icon"></i>
                <span class="">{{item.name}}</span>
              </div>
            </router-link>
          </div>

        </div>
      </div>
      <div class="content">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {routerList} from './router'
  import headerView from '../../components/headerView.vue'
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import socket from '../../service/msg_trans/socket.io'
  export default {
    name: 'app',
    components:{
      headerView,
      CollapseTransition
    },
    data() {
      return {
        routerList
      }
    },
    methods: {
      toggleSubMenu:function(item,index){
        item.showChild=!item.showChild;
        this.$set(this.routerList, index, item);
      },
      routerChildStatus(){
        for (let i = 0; i < this.routerList.length; i++) {
          if (this.routerList[i].children) {
            for (let j = 0; j < this.routerList[i].children.length; j++) {
              if (this.routerList[i].children[j].path == this.$route.path) {
                this.routerList[i].showChild = true
                break;

              }
            }
          }
        }
      }
    },
    created(){
      let _this = this;
      this.routerChildStatus()

      // 启用监听-识别比对结果
      socket.io.on(socket.PROTOCOLS.ONE,(msg)=>{
        console.log(JSON.stringify(msg));
      })
    },
    beforeDestroy:function () {
      // 注销监听
      console.log(`socket msg: ${socket.PROTOCOLS.ONE} 注销`);
      socket.io.removeAllListeners(socket.PROTOCOLS.ONE);
    }
  }

</script>
<style>
  div{
    color: white;
  }
</style>

<style lang="scss" scoped>
  $nav_item_height: 30px;
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background: linear-gradient(to right, #142469 , #0A367B);

    .header{
      border-bottom: 1px solid grey;
    }
    > .main {
      display: flex;
      overflow:hidden;
      flex: 1;

      .nav{
        border-right: 1px solid grey;

        .nav-menu-item{
          line-height: $nav_item_height;
          width: 100px;
          padding:0 1vw;
          font-size: 20px;
          cursor: pointer;
          position:relative;
          >span{
            margin-left:.5vw;
          }
        }
        .nav-menu-item:hover{
          background-color:#0957b6;
        }
        .nav-menu-item.nav-menu-child{
          padding:0 0 0 2vw;
        }
        .nav-menu-item.nav-menu-active {
          background: linear-gradient(to right,#0086EA,#00BBF6);
          color: white!important;
          border-bottom: .5px solid rgba(0,0,0,0);
        }
        .nav-menu-item.nav-menu-child-active{
          background: rgba(0,134,234,0.80);
          color: white!important;
        }
      }

      > .content {
        flex: 1;
      }
    }
  }
</style>
