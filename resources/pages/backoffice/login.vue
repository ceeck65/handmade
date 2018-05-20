<template class="fullscreen_bg">
    <div class="fullscreen_bg">
        <b-row>
            <b-col cols="4" offset="4" class="login-container align-middle">
                <b-col class="title">
                    <h3><i class="fa fa-lock"></i> Access login</h3>
                </b-col>
                <b-form ref="formLogin" @reset="onReset" :model="user" method="post" class="form-login">
                    <input type="hidden" name="_csrf" value="">
                    <b-form-group horizontal
                                  id="exampleInputGroup1"
                                  label="Email:"
                                  label-for="email">
                        <b-form-input id="email"
                                      type="email"
                                      name="email"
                                      v-model="user.email"
                                      v-validate="{ required: true, email: true, regex: regxEmail  }"
                                      placeholder="Enter email">
                        </b-form-input>
                        <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </b-form-group>
                    <b-form-group horizontal
                                  label="Password:"
                                  label-for="password">
                        <b-form-input id="password"
                                      type="password"
                                      v-model="user.password"
                                      placeholder="Enter password">
                        </b-form-input>
                    </b-form-group>
                    <b-row>
                        <b-col cols="6">
                            <b-button @click="handleSubmit('formLogin', user)" variant="success">
                               <i class="fa fa-lock"></i> LOGIN</b-button>
                        </b-col>
                        <b-col cols="6">
                            <b-button type="reset" variant="danger"><i class="fa fa-times-circle"></i> CANCEL</b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6" class="link-account">
                            <b-link to="#foo">Forgot password?</b-link>
                        </b-col>
                        <b-col cols="6" class="link-account">
                            <b-link to="signup">Create account</b-link>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';
    import {Link} from 'bootstrap-vue/es/components';
    import VueNotifications from 'vue-notifications'
    import miniToastr from 'mini-toastr'// https://github.com/se-panfilov/mini-toastr
    miniToastr.init();
    function toast({title, message, type, timeout, cb}) {
        return miniToastr[type](message, title, timeout, cb)
    }
    const options = {
        success: toast,
        error: toast,
        info: toast,
        warn: toast
    };
    Vue.use(VueNotifications, options);
    Vue.use(Link);
    Vue.use(VeeValidate);

    export default {
        name: "login",
        layout: 'auth-layout',
        middleware: "authenticatedAdmin",
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                show: true,
                errorMessage: null,
                title: null,
                message: null,
                regxEmail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
        },
        methods: {
            handleSubmit(name, formData) {
                console.log(formData);
                this.login(formData);
                // this.$validator.validateAll().then(()=>{
                //
                // }).catch((e) => {
                //     this.errorMessage(e)
                // });
            },
            async login(user) {
                let auth = await this.$store.dispatch('login', user);
                if (auth.jwt) {
                    // this.$Message.success('Login successful!');
                    this.showSuccessMsg({title: 'Success!', message: "Welcome", type: 'success', timeout: 1000});
                    this.$router.replace({path: '/'});
                } else {
                    this.showErrorMsg({title: 'Error!', message: auth, type: 'error', timeout: 1000})
                }
            },
            onReset(evt) {
                evt.preventDefault();
                /* Reset our form values */
                // this.user.email = '';
                // this.user.password = '';
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                });
            }
        },
        notifications: {
            showSuccessMsg: {
                type: VueNotifications.types.success,
                title: this.title,
                message: this.message
            },
            showErrorMsg: {
                type: VueNotifications.types.error,
                title: this.title,
                message: this.message
            }
        }

    }
</script>

<style scoped>
    .fullscreen_bg {
        width: 100%;
        height: 100%;
        position: absolute;
        background-size: contain;
        background: url('../../static/img/bg-login.jpg') no-repeat center center;
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