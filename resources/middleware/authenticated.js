import Cookie from 'js-cookie'
export default function ({ store, redirect }) {
    // If the user is not authenticated
    let auth = Cookie.get('auth');
    if (!auth) {
        return redirect('/backoffice/login')
    }
};