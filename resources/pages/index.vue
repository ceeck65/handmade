<template>
    <section class="container">
        <h4><strong>Material design inputs</strong></h4>
        <div style="margin-top:3rem;max-width:20rem">
            <md-input type="text" label="Basic example"></md-input>
            <md-input size="sm" type="text" label="Small input"></md-input>
        </div>
        <div style="margin-top:3rem;max-width:20rem">
            <md-input type="text" label="Input with icon" icon="envelope" ></md-input>
        </div>
        <div style="margin-top:3rem;max-width:20rem">
            <md-input type="text" label="Example label" placeholder="Placeholder" ></md-input>
        </div>
        <div style="margin-top:3rem;max-width:20rem">
            <md-input type="text" label="Basic example" disabled ></md-input>
        </div>
        <div style="margin-top:3rem;max-width:20rem">
            <md-input type="email" label="Your e-mail" ></md-input>
        </div>
        <div style="margin-top:3rem;max-width:20rem">
            <md-input type="password" label="Password" ></md-input>
        </div>
        <div style="margin-top:3rem;max-width:20rem">
            <md-textarea label="Textarea" ></md-textarea>
        </div>
        <h4 class="mt-5 mb-3"><strong>Default inputs</strong></h4>
        <div style="max-width:20rem">
            <label for="exampleForm2">Default input</label>
            <input type="text" id="exampleForm2" class="form-control">
        </div>
    </section>
</template>

<script>
    import "../components/materialBoostrap/css/mdb.css";
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