<template>
    <div class="fullscreen_bg">
        <b-row>
            <b-col cols="4" offset="4" class="login-container align-middle">
                <b-col class="title">
                    <h3>Access login</h3>
                </b-col>
                <b-form ref="formLogin" @reset="onReset" :model="user" method="post">
                    <input type="hidden" name="_csrf" value="">
                    <b-form-group id="exampleInputGroup1"
                                  label="Username:"
                                  label-for="exampleInput1">
                        <b-form-input id="exampleInput1"
                                      type="text"
                                      name="username"
                                      v-model="user.username"
                                      v-validate="{ required: true, regex: /^\w+$/ }"
                                      placeholder="Enter username">
                        </b-form-input>
                        <span class="error" v-show="errors.has('username')">{{ errors.first('username') }}</span>
                    </b-form-group>
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
                    <b-form-group id="exampleInputGroup2"
                                  label="Password:"
                                  label-for="password">
                        <b-form-input id="password"
                                      name="password"
                                      type="password"
                                      v-model="user.password"
                                      v-validate="{ required: true, min: 6, regex: /[0-9]+/ }"
                                      placeholder="Enter password">
                        </b-form-input>
                        <span class="error" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup2"
                                  label="Password:"
                                  label-for="password_confirmation">
                        <b-form-input id="password_confirmation"
                                      type="password"
                                      name="password_confirmation"
                                      v-model="user.password_confirmation"
                                      v-validate="{ required: true, regex: /[0-9]+/ }"
                                      placeholder="Confirm password">
                        </b-form-input>
                        <span class="error" v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
                    </b-form-group>
                    <b-row>
                        <b-col cols="6">
                            <b-button @click="handleSubmit('formLogin', user)" variant="success">REGISTER</b-button>
                        </b-col>
                        <b-col cols="6">
                            <b-button type="reset" variant="danger">CANCEL</b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6">
                            <b-link to="#foo">Link</b-link>
                        </b-col>
                        <b-col cols="6">
                            <b-link to="login">LOGIN</b-link>
                        </b-col>
                    </b-row>
                </b-form>
                <div class="error" v-if="signUpErrors">
                  {{ signUpErrors }}
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueNotifications from 'vue-notifications'
    import miniToastr from 'mini-toastr'
    import VeeValidate from 'vee-validate';
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
    Vue.use(VeeValidate);
    export default {
        name: "signup",
        layout: 'auth-layout',
        middleware: "authenticatedAdmin",
        data() {
            return {
                user: {
                    username: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                show: true,
                errorMessage: null,
                signUpErrors: null,
                loading: false,
                regxEmail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
        },
        methods: {
            async checkUsername(username) {
                return await this.$axios.$post('checkUsername', {username: username})
            },

            async checkEmail(email) {
                return await this.$axios.$post('checkEmail', {email: email})
            },

            handleSubmit(name, formData) {
                this.loading = true;
                this.register(formData)
                // this.$refs.name.validate((valid) => {
                //     if (valid) {
                //         this.register(formData)
                //     } else {
                //         this.$Message.error('Fail!')
                //     }
                // })
            },
            onReset(evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.email = '';
                this.form.password = '';
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                });
            },
            async register(user) {
                const register = await this.$store.dispatch('register', user);
                if (register === true) {
                    this.showSuccessMsg({title: 'Success!', message: "Welcome", type: 'success', timeout: 1000});
                    this.$Modal.info({
                        title: 'Confirm E-Mail',
                        content: 'Please confirm your e-mail address to activate your account!',
                        okText: 'OK',
                        onOk: () => {
                            this.$router.replace({path: '/'});
                        }
                    })
                } else if (register.jwt) {
                    this.$Message.success('Success!');
                    this.$router.replace({path: '/'});
                } else {
//                    this.signUpErrors = register;
                    this.showErrorMsg({title: 'Error!', message: register[0].message, type: 'error', timeout: 5000})
                }
            }
        },notifications: {
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
    body, html {
        background: #15b5cc url("../../static/img/bg-login.jpg") !important;
    }
    .fullscreen_bg {
        background: #15b5cc url("../../static/img/bg-login.jpg") !important;
        background-size: cover;
        position: absolute;
        min-width: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
    }

    .row {
        margin: 5%;
    }

    .login-container {
        background: #fafafa;
        opacity: 0.9;
        padding: 1%;
        border-radius: 10px;
        height: 100%;
    }
    button {
        width: 100%;
    }

    .title {
        width: 100%;
        margin-bottom: 15px;
    }

</style>