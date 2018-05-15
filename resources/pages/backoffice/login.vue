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
                    <b-row>
                        <b-col col="2">
                            <b-button @click="handleSubmit('formLogin', user)" variant="success">LOGIN</b-button>
                        </b-col>
                        <b-col col="2">
                            <b-button type="reset" variant="danger">CANCEL</b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col col="2" class="link-account">
                            <b-link to="#foo">Link</b-link>
                        </b-col>
                        <b-col col="2" class="link-account">
                            <b-link to="signup">REGISTER</b-link>
                        </b-col>
                    </b-row>
                </b-form>
                <div class="error" v-if="errorMessage">
                    {{ errorMessage }}
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';
    import { Link } from 'bootstrap-vue/es/components';
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
                errorMessage: null
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
                    this.$router.replace({path: '/'});
                } else {
                    // this.$Message.error('Fail!');
                    this.errorMessage = auth;
                }
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
        margin-left: 0 !important;
        margin-right: 0 !important;
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

    .error {
        color: #ff565d;
        padding: 15px 0;
    }

    .link-account {
        padding: 15px 0;
        text-align: center;
        color: #05adff;
    }

    .link-account > a {
        text-decoration: none;
        color: #05adff;
    }

</style>