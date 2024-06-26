import accountService from "../services/accountService";
class AccountController {
  handleLogin = async(req, res) => {
    try {
      let username = req.body.username;
      let password = req.body.password;
      let data = await accountService.loginService(username, password);
      if (data.DT && data) {
        res.cookie("jwt", data.DT.token, {httpOnly: true, maxAge: 60*60*1000*24*7})
      }
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  handleLogout = (req, res) => {
    try {
      res.clearCookie("jwt");
      res.status(200).json({
        EM: "success",
        EC: 0,
        DT: '',
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  handleCreateNewAccount = async (req, res) => {
    try {
      let username = req.body.username;
      let password = req.body.password;
      let email = req.body.email;
      let groupId = req.body.groupId;
      let user = await accountService.serviceCreateNewAccount(
        username,
        password,
        email,
        groupId
      );
      res.status(200).json({
        EM: user.EM,
        EC: user.EC,
        DT: user.DT,
      });
    } catch (err) {
      return res.status(500).json({ message: e.message });
    }
  };

  handleFindAllUser = async (req, res) => {
    await accountService
      .getAllUserService()
      .then((user) => {
        res.status(200).json({ data: user });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
      });
  };

  handleFindUserById = async (req, res) => {
    try {
      let id = req.params.id;
      let user = await accountService.getUserByIdService(id);
      let userData = {};
      userData = user;
      res.status(200).json(userData);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  handleUpdateUser = async (req, res) => {
    try {
      let username = req.body.username;
      let email = req.body.email;
      let groupId = req.body.groupId;
      let id = req.params.id;
      let updatedAccount = await accountService.updateUserService(
        username,
        email,
        groupId,
        id
      );
      res.status(200).json({ message: "updated user" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  handleDeleteUser = async (req, res) => {
    try {
      let id = req.params.id;
      let deletedAccount = await accountService.deleteUserService(id);
      res.status(200).json({ message: "deleted user" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  handleChangePassUser = async(req, res) => {
    let userId = req.body.id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let retypeNewPassword = req.body.retypeNewPassword;
    try {
      let data = await accountService.changePassService(userId, oldPassword, newPassword, retypeNewPassword);
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch(e) {
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new AccountController();
