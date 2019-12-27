<template>
    <div class="NaviBar">
        <nav class="navi-bar col-1">
            <div class="d-flex flex-column">
                <div class="mx-auto">
                    <a class="navbar-brand text-dark h-2" href="#">
                        <div id="logo">
                            <img  class="mx-auto logo-img" src="~@/assets/navi-img/logo-test.png" />
                            <p>LOGO</p>
                        </div>
                    </a>
                </div>
                <router-link to="/" >
                    <div class="d-flex flex-column">
                        <div class="mx-auto">
                            <img src="~@/assets/navi-img/edit.svg">
                            <p class="mx-auto text-dark">Edit</p>
                        </div>
                    </div>
                </router-link>
                <router-link to="/file" >
                    <div class="d-flex flex-column">
                        <div class="mx-auto">
                            <img src="~@/assets/navi-img/folder.svg">
                            <p class="mx-auto text-dark">file</p>
                        </div>
                    </div>
                </router-link>
                <router-link to="/setting" >
                    <div class="d-flex flex-column">
                        <div class="mx-auto">
                            <img src="~@/assets/navi-img/settings.svg">
                            <p class="mx-auto text-dark">Setting</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'NaviBar'
}
</script>

<style scoped>
 .navi-bar{
     top:0px;
     left:0px;
     height: 100%;
     width: 100%;
     position:fixed;
     background-color: cornflowerblue;
 }
 
 router-link{
     display: block;
 }

 img{
     height: 50px;
     width: 50px;
 }

 #logo{
     font-size: 20px;
 }
</style>