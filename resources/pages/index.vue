<template>
    <section class="container">
        <div>
            <logo></logo>
            <h1 class="title">
                handmade
            </h1>
        </div>

        <form>
            <!--First row-->
            <row>
                <!--First column-->
                <column md="6">
                    <mdinput label="Type your email" icon="envelope" ></mdinput>
                </column>
                <!--Second column-->
                <column md="6">
                    <mdinput type="password" label="Type your password" icon="lock" ></mdinput>
                </column>
            </row>
            <!--/.First row-->
            
            <!--Second row-->
            <row>
                <!--First column-->
                <column md="12">
                    <mdtextarea label="Basic textarea"></mdtextarea>
                </column>
            </row>
            <!--/.Second row-->

            <!--Third row-->
            <row>
                <!--First column-->
                <column md="4">
                    <mdinput label="Example label" ></mdinput>
                </column>
                <!--Second column-->
                <column md="4">
                    <mdinput label="Example label" ></mdinput>
                </column>
                <!--Third column-->
                <column md="4">
                    <mdinput label="Example label" ></mdinput>
                </column>
            </row>
            <!--/.Third row-->
        </form>


    </section>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    export default {
        layout: "web-layout",
        name: "index",
        components: {
            Logo
        },
    }
</script>

<style scoped>
    .container {
        min-height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .title {
        font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
        display: block;
        font-weight: 300;
        font-size: 100px;
        color: #35495e;
        letter-spacing: 1px;
    }

    .subtitle {
        font-weight: 300;
        font-size: 42px;
        color: #526488;
        word-spacing: 5px;
        padding-bottom: 15px;
    }

    .links {
        padding-top: 15px;
    }
</style>