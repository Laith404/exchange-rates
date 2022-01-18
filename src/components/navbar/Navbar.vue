<template>
    <div class="navbar">
        <div class="container">
            <div class="navbar__content">
                <div class="navbar__nav">
                    <router-link to="/" class="navbar__nav-link">Курс валют</router-link>
                    <router-link to="/Konvert" class="navbar__nav-link">Конвертация валют</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "navbar",
    data() {
        return {}
    },
    
}
</script>

<style lang="sass" scoped>
.navbar
    box-shadow: 0 20px 20px rgba(0,0,0,.05)
    &__content
        display: flex
        justify-content: flex-end
        background: $bg-color
        padding: 20px 0
        
    &__nav
        display: flex
        &-link
            display: block
            position: relative
            margin: 0 .625rem
            color: $link-color
            outline: none

.router-link-exact-active::before
    content: ''
    width: 100%
    height: .125rem
    background: $link-color
    border-radius: .625rem
    position: absolute
    left: 0
    bottom: -0.3125rem
</style>