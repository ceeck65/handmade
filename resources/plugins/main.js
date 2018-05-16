import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import VueNotifications from 'vue-notifications';
import miniToastr from 'mini-toastr';
import VeeValidate from 'vee-validate';
import {Link} from 'bootstrap-vue/es/components';


miniToastr.init();
const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
};

function toast({title, message, type, timeout, cb}) {
    return miniToastr[type](message, title, timeout, cb)
}

Vue.use(VueNotifications, options);
Vue.use(VueSweetalert2);
Vue.use(Link);
Vue.use(VeeValidate);