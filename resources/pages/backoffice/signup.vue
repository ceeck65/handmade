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
                                      v-model="user.username"
                                      placeholder="Enter username">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup1"
                                  label="Email:"
                                  label-for="exampleInput1">
                        <b-form-input id="exampleInput1"
                                      type="email"
                                      v-model="user.email"
                                      placeholder="Enter email">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup2"
                                  label="Password:"
                                  label-for="exampleInput2">
                        <b-form-input id="exampleInput2"
                                      type="password"
                                      v-model="user.password"
                                      placeholder="Enter password">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup2"
                                  label="Password:"
                                  label-for="exampleInput2">
                        <b-form-input id="exampleInput2"
                                      type="password"
                                      v-model="user.password_confirmation"
                                      placeholder="Confirm password">
                        </b-form-input>
                    </b-form-group>
                    <b-row>
                        <b-col col="2">
                            <b-button @click="handleSubmit('formLogin', user)" variant="success">REGISTER</b-button>
                        </b-col>
                        <b-col col="2">
                            <b-button type="reset" variant="danger">CANCEL</b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col col="2">
                            <b-link to="#foo">Link</b-link>
                        </b-col>
                        <b-col col="2">
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
    export default {
        name: "signup",
        layout: 'auth-layout',
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
                loading: false
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
                this.register(formData);
                // this.$refs[name].validate((valid) => {
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
                    this.$Message.success('Success!');
                    this.showSuccessMsg({title: 'Error!', message: register, type: 'success', timeout: 1000})
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

                    this.showErrorMsg({title: 'Error!', message: register, type: 'error', timeout: 1000})
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
        border-radius: 10px;
        height: 50%;
    }
    button {
        width: 100%;
    }

    .title {
        width: 100%;
        margin-bottom: 15px;
    }

</style>