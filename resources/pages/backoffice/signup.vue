<template>
    <div class="fullscreen_bg">
        <b-row>
            <b-col cols="4" offset="4" class="login-container align-middle">
                <b-col class="title">
                    <h3><i class="fa fa-user"></i> Create Account</h3>
                </b-col>
                <b-form ref="formLogin" @reset="onReset" :model="user" method="post"  class="form-login">
                    <input type="hidden" name="_csrf" value="">
                    <b-form-group horizontal id="exampleInputGroup1"
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
                    <b-form-group horizontal id="exampleInputGroup1"
                                  label="First Name:"
                                  label-for="exampleInput1">
                        <b-form-input id="exampleInput1"
                                      type="text"
                                      name="first_name"
                                      v-model="user.first_name"
                                      v-validate="{ required: true, regex: /[A-Z-a-z]\s+/ }"
                                      placeholder="Enter First Name">
                        </b-form-input>
                        <span class="error" v-show="errors.has('first_name')">{{ errors.first('first_name') }}</span>
                    </b-form-group>
                    <b-form-group horizontal id="exampleInputGroup1"
                                  label="Last Name:"
                                  label-for="exampleInput1">
                        <b-form-input id="exampleInput1"
                                      type="text"
                                      name="last_name"
                                      v-model="user.last_name"
                                      v-validate="{ required: true, regex: /[A-Z-a-z]\s+/ }"
                                      placeholder="Enter Last Name">
                        </b-form-input>
                        <span class="error" v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
                    </b-form-group>
                    <b-form-group horizontal id="exampleInputGroup1"
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
                    <b-form-group horizontal id="exampleInputGroup2"
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
                    <b-form-group horizontal id="exampleInputGroup2"
                                  label="Confirm password:"
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
                            <b-button @click="handleSubmit('formLogin', user)" variant="success">
                                <i class="fa fa-save"></i> REGISTER</b-button>
                        </b-col>
                        <b-col cols="6">
                            <b-button type="reset" variant="danger">
                                <i class="fa fa-times-circle"></i> CANCEL</b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="4" class="link-account">
                        </b-col>
                        <b-col cols="8" class="link-account">
                            <b-link to="login">I already have an account?, Login</b-link>
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
                    first_name: '',
                    last_name: '',
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
                    this.showSuccessMsg({title: 'Confirm e-mail!', message: "Please confirm your e-mail address to activate your account!", type: 'success', timeout: 1000});
                    this.$router.replace({path: '/'});
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