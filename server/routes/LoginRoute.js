const BaseRoute = require('./BaseRoute');
const { getDb } = require('../db');

class LoginRoute extends BaseRoute {
    constructor() {
        super();
    }

    setupListeners() {
        this.router.route('/').post(this.login);
    }

    async login(req, res, next) {
        try {
            var admin = await getDb().collection('administrators').findOne({name: req.body.loginName});

            if(admin == null || admin.password !== req.body.loginPassword) {
                console.log("Incorrect credentials!");
                return res.status(200).send({authorized: 0, error: 'Incorrect credentials!'});
            } else {
                console.log("Login succeeded");
                return res.status(200).send({authorized: 1, admin: admin});
            }
            } catch (error) {
            console.log("DB connection fail");
            return next(error);
        }
    }
}

module.exports = new LoginRoute();