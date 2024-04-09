import accountService from '../services/accountService';

class AccountController {
    handleCreateNewAccount(req, res) {
        try {
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let role = req.body.role;
            accountService.serviceCreateNewAccount(username, password, email, role);

        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AccountController();