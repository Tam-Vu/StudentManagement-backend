import accountService from '../services/accountService';

class AccountController {
    handleCreateNewAccount = async(req, res) => {
        try {
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let role = req.body.role;
            await accountService.serviceCreateNewAccount(username, password, email, role);
        }
        catch (err) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleFindAllUser = async(req, res) => {
        try {
            let userList = await accountService.getAllUserService()
            .then(user => {
                res.status(200).json({ user });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleFindUserById = async(req, res) => {
        try {
            let id = req.params.id;
            let user = await accountService.getUserByIdService(id);
            let userData = {};
            userData = user;
            res.status(200).json(userData);
        } catch(e) {
            return res.status(500).json({ message: e.message});
        }
    }

    handleUpdateUser = async(req, res) => {
        try{
            let username = req.body.username;
            let email = req.body.email;
            let role = req.body.role;
            let id = req.params.id;
            let updatedAccount = await  accountService.updateUserService(username, email, role, id);
            res.status(200).json(updatedAccount);
        } catch(e) {
            return res.status(500).json({ message: e.message});
        }
    }

    handleDeleteUser = async(req, res) => {
        try {
            let id = req.params.id;
            let deletedAccount = await  accountService.deleteUserService(id);
            res.status(200).json(deletedAccount);
        } catch(e) {
            return res.status(500).json({ message: e.message});
        }
    }
}

module.exports = new AccountController();