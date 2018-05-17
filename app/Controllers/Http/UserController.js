/* eslint-disable space-before-function-paren */
'use strict';
const User = use('App/Models/User');
const Confirm = use('App/Models/Confirm');
const {validate} = use('Validator');
const Mail = use('Mail');
const crypto = use('crypto');
const Env = use('Env');
const Logger = use('Logger');
const Encryption = use('Encryption');

class UserController {

    /**
     * Creating a new user into the database.
     */
    async store({auth, request, response}) {
        const data = request.only(['username', 'email', 'password', 'password_confirmation']);
        const validation = await validate(data, {
                username: 'required|unique:users',
                email: 'required|email|unique:users',
                password: 'required',
                password_confirmation: 'required_if:password|same:password'
            },
            {
                'username.required': 'Please fill in the Username',
                'username.unique': 'Username has already been taken by someone else',
                'email.required': 'Mailbox cannot be empty',
                'email.email': 'Incorrect email format',
                'email.unique': 'E-Mail already exist',
                'password.required': 'Please fill in the password',
                'password.strongPassword': 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
            });

        if (validation.fails()) {
            Logger.info('Register - Validation Form fails %s', data.username);
            Logger.info('Register - Validation Form fails %j', validation.messages());
            return response.send(validation.messages())
        }

        // Deleting the confirmation field since we don't want to save it
        delete data.password_confirmation;

        /**
         * Creating a new user into the database.
         *
         * ref: http://adonisjs.com/docs/4.0/lucid#_create
         */
        try {
            const user = await User.create(data);
            if (Env.get('ACCOUNT_CONFIRM', 'true') === 'true') {
                const token = await UserController.createConfirmToken(user);
                const verify = {domain: Env.get('MAIL_URL', '127.0.0.1:3000'), token: encodeURI(token)}
                await Mail.send('emails.confirmMail', {user: user.toJSON(), verify: verify}, (message) => {
                    message
                        .to(user.email)
                        .from(Env.get('MAIL_FROM'), Env.get('MAIL_FROM_NAME'))
                        .subject(Env.get('MAIL_SUBJECT'));
                });
                Logger.info('Register - Send Mail to confirm %s', user.email);
                return response.send(true);
            } else {
                user.active = true;
                await user.save();
                const jwt = await auth.withRefreshToken().generate(user, true);
                const userInfo = {id: user.id, username: user.username, email: user.email};
                Logger.info('Register - User created without confirm mail %s', user.email);
                return response.send({jwt, user: userInfo})
            }
        } catch (err) {
            Logger.error('Register - Send Mail Error %s', err);
            return response.send(err);
        }
    }

    /**
     * Login a user and return jwt token.
     */
     async login({auth, request, response}) {
        const {email, password} = request.all();
        try {
            let user = await User.findBy('email', email);
            if (user.active) {
                const jwt = await auth
                    .withRefreshToken()
                    .attempt(email, password, true);
                const userInfo = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
                const data = {jwt, user: userInfo};
                request.cookie('name', user);
                return response.send(data);
            } else {
                Logger.info('Login - User deactivated %s', email);
                return response.send('User deactivated - Please confirm your E-Mail!');
            }
        } catch (err) {
            Logger.error('Login - Error: %s', err);
            Logger.info('Login - Can not find User credentials for %s', email);
            return response.send('We cannot find any account with these credentials.');
        }
    }

    /**
     * Logout a user and delete the refresh tokens in the database.
     */
     async logout({auth, request, response}) {
        const header = await auth.getAuthHeader();
        const decodedHeader = Encryption.base64Decode(header.split('.')[1]);
        const userToken = JSON.parse(decodedHeader);
        const user = await User.find(userToken.uid);
        await user
            .tokens()
            .where('user_id', userToken.uid)
            .delete();
        return response.send('success')
    }

    /**
     * Get new jwt token by users refresh token.
     */
     async refreshToken({auth, request, response}) {
        try {
            const params = request.only(['refreshToken']);
            const header = await auth.getAuthHeader();
            const decodedHeader = Encryption.base64Decode(header.split('.')[1]);
            const jwtToken = JSON.parse(decodedHeader);
            const user = await User.find(jwtToken.uid);
            const jwt = await auth.newRefreshToken().generateForRefreshToken(UserController.refreshToken, true);
            const refreshUser = {
                jwt,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            }
            return response.send(refreshUser)
        } catch (err) {
            Logger.error('refreshJWTToken - Error: %s', err)
        }
    }

    /**
     * Check username exist for signup.
     */
     async checkUsername({request, response}) {
        let exist = await User.findBy('username', request.input('username'));
        return response.send(!!exist);
    }

    /**
     * Check e-mail exist for signup.
     */
     async checkEmail({request, response}) {
        let exist = await User.findBy('email', request.input('email'));
        return response.send(!!exist);
    }

    /**
     * Create confirm token for validation of e-mail address
     */
     async createConfirmToken(user) {
        const hmac = crypto.createHmac('sha256', Env.get('APP_KEY'));
        hmac.update(user.email);
        let token = hmac.digest('hex');
        try {
            // valid token 3 days
            await Confirm.create({user_id: user.id, token: token, valid: 259200, type: 1});
            return token;
        }
        catch (err) {
            Logger.error('Register - Create Confirm Token Error %s', err);
        }
    }

    /**
     * Confirm the e-mail with confirm token
     */
     async confirmAccount({request, response}) {
        try {
            let confirm = await Confirm.findBy('token', request.input('token'));
            if (confirm.created_at.unix() + confirm.valid > Math.round(+new Date() / 1000)) {
                // Set user to active
                await User
                    .query()
                    .where('id', confirm.user_id)
                    .update({active: true});

                // Delete confirm token in database
                await Confirm
                    .query()
                    .where('id', confirm.id)
                    .delete();

                Logger.info('ConfirmAccount - UserID: %s', confirm.user_id);
                return response.send('Confirm your E-Mail successfully');
            } else {
                Logger.info('ConfirmAccount - Link expired - UserID: %s', confirm.user_id);
                return response.send('Confirm Link expired!');
            }
        }
        catch (err) {
            Logger.error('ConfirmAccount - Confirm Token not found %s', request.input('token'));
            return response.send('Confirm Token not found!');
        }
    }

}

module.exports = UserController;
