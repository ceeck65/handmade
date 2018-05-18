<template>
    <section class="container">
        <div>Logout processing...</div>
    </section>
</template>

<script>
    import Cookie from 'js-cookie';
    export default {
        name: 'logout',
        async logout({store, redirect, app}) {
            store.dispatch('logout');
            Cookie.remove('auth');
            redirect('/backoffice/login')
        },
    }
</script>
