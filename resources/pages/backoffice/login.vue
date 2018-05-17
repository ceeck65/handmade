<template>
    <div class="fullscreen_bg">
        <b-row>
            <b-col cols="4" offset="4" class="login-container align-middle">
                <b-col class="title">
                    <h3>Access login</h3>
                </b-col>
                <b-form ref="formLogin" @reset="onReset" v-model="user" method="post">
                    <input type="hidden" name="_csrf" value="">
                    <b-form-group id="exampleInputGroup1"
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
                    <b-form-group label="Password:"
                                  label-for="password">
                        <b-form-input id="password"
                                      type="password"
                                      v-model="user.password"
                                      placeholder="Enter password">
                        </b-form-input>
                    </b-form-group>
                    <b-row>
                        <b-col cols="6">
                            <b-button @click="handleSubmit('formLogin', user)" variant="success">LOGIN</b-button>
                        </b-col>
                        <b-col cols="6">
                            <b-button type="reset" variant="danger">CANCEL</b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6" class="link-account">
                            <b-link to="#foo">Forgot password?</b-link>
                        </b-col>
                        <b-col cols="6" class="link-account">
                            <b-link to="signup">REGISTER</b-link>
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
        fetch ({ store, redirect }) {
            if (store.state.auth) {
                return redirect('/')
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
                this.user.email = '';
                this.user.password = '';
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
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-size: cover;
        background: url('../../static/img/bg-login.jpg') repeat 50% 50%;
    }

    .row {
        margin: 5%;
    }

    .login-container {
        background: #fafafa;
        opacity: 0.9;
        padding: 1%;
        border-radius: 5px;
    }

    button {
        width: 100%;
    }

    .title {
        width: 100%;
        margin-bottom: 15px;
    }

    .error {
        color: #ff565d;
        padding: 15px 0;
    }

    .link-account {
        padding: 5px 0;
        text-align: center;
        color: #05adff;
    }

    .link-account > a {
        text-decoration: none;
        color: #05adff;
    }

</style>