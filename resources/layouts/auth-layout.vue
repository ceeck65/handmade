<template>
    <div class="auth">
        <nuxt></nuxt>
    </div>
</template>

<script>
    export default {
        name: "auth-layout"
    }
</script>

<style>
    html {
        background: url('../static/img/bg-login.jpg') no-repeat center center !important;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    #__nuxt {
         display: block;
        width: inherit;
        height: inherit;
    }

    #__layout {
        height: inherit;
    }

    .row {
        margin: 5%;
    }

    .col-4 {
        padding: 0 !important;
    }

    .login-container {
        position: absolute;
        top: 10%;
        left: 0;
        content: "";
        padding: 1%;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.15);
    }

    .login-container:before {
        content: "";
        padding: 1%;
        border-radius: 5px;
        background: inherit;
        position: absolute;
        box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.06);
        filter: blur(10px);
    }

    .form-login {
        padding: 0 15px;
        color: #FFFFFF;
    }


    button {
        width: 100%;
    }

    .title {
        width: 100%;
        height: 15%;
        padding: 2% 5%;
        color: #FFFFFF;
        margin-bottom: 15px;
        background: #3b8070;
        border-bottom: 1px solid rgba(255, 255, 255, 0.9);
        border-radius: 5px 5px 0  0;
    }

    .error {
        color: #ff6e6e;
        padding: 20px 0;
    }

    .link-account {
        padding: 5px 0;
        text-align: center;
        color: #ffffff;
    }

    .link-account > a {
        text-decoration: none;
        color: #ffffff;
    }

    .btn-danger {
        color: #fff;
        background-color: rgba(222, 65, 80, 0.71) !important;
        border-color: #f8f9fa !important;
    }
    .btn-success {
        color: #fff;
        background-color: #3b8070c2 !important;
        border-color: #f8f9fa !important;
    }

    .form-control, input:-webkit-autofill {
        border-radius: 0 !important;
        background: inherit !important;
        color: #FFFFFF !important;
        border-top-color: transparent !important;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
    }

    .form-control::placeholder {
        color: #FFFFFF !important;
    }
</style>