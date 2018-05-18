<template>
    <div class="default-layout flex-container">
        <!-- Nav -->
        <header>
            <nav id="nav-header">
                <b-navbar toggleable="md" type="dark" variant="info">
                    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                    <b-navbar-brand href="#">LOGO</b-navbar-brand>
                    <b-collapse is-nav id="nav_collapse">
                        <b-navbar-nav>
                            <b-nav-item href="#">HOME</b-nav-item>
                            <b-nav-item href="#">Link 1</b-nav-item>
                            <b-nav-item href="#">Link 2</b-nav-item>
                            <b-nav-item href="#">Link 3</b-nav-item>
                        </b-navbar-nav>
                        <!-- Right aligned nav items -->
                        <b-navbar-nav class="ml-auto">
                            <b-nav-form>
                                <b-form-input size="sm" class="mr-sm-2 search_input" type="text" placeholder="Search"></b-form-input>
                                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                            </b-nav-form>
                            <b-nav-item-dropdown text="Lang" right>
                                <b-dropdown-item href="#">EN</b-dropdown-item>
                                <b-dropdown-item href="#">ES</b-dropdown-item>
                                <b-dropdown-item href="#">RU</b-dropdown-item>
                                <b-dropdown-item href="#">FA</b-dropdown-item>
                            </b-nav-item-dropdown>
                            <b-nav-item-dropdown right>
                                <!-- Using button-content slot -->
                                <template slot="button-content">
                                    <em>User</em>
                                </template>
                                <b-dropdown-item href="#">Profile</b-dropdown-item>
                                <b-dropdown-item href="#" v-on:click="logout">Logout</b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
            </nav>
        </header>
        <aside class="main-sidebar" id="main-sidebar">
            <div class="sidebar">
                <div class="container-avatar">
                    <img src="../static/img/avatar.png">
                    <!--<div>Username: {{ $store.state.auth.user.username }}</div>-->
                </div>
                <!--<div class="username" v-if="!$store.state.auth">-->
                <!--<img src="../static/img/logo.png" width="64" height="64">-->
                <!--</div>-->
                <div id="menu">
                    <b-nav vertical>
                        <b-nav-item to="/"><i class="fa fa-home icon-menu"></i> Home</b-nav-item>
                        <b-nav-item to="about"><i class="fa fa-bookmark icon-menu"></i> about</b-nav-item>
                        <b-nav-item to="posts"><i class="fa fa-file-alt icon-menu"></i> post</b-nav-item>
                        <b-nav-item to="store"><i class="fa fa-shopping-bag icon-menu"></i> store</b-nav-item>
                    </b-nav>
                </div>
            </div>
        </aside>
        <div id="content-wrapper" class="wrapper">
            <div class="content">
                <nuxt></nuxt>
            </div>
        </div>
        <footer>
            <div class="footer-content">
                Footer
            </div>
        </footer>
    </div>
</template>

<script>
    import Cookie from 'js-cookie';
    export default {
        name: 'default-layout',
        methods: {
            logout: function (event) {
              let logout =   this.$store.dispatch('logout');
              console.log(logout);
                Cookie.remove('auth');
              window.location.href = "backoffice/login";
            }
        },
        async asyncData({app, store, redirect}) {
            if (! store.state.auth) {
                redirect(301, '/account/login')
            }
        },

    };
</script>
