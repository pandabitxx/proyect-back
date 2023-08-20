const indexCtrl = {};

indexCtrl.renderSignin = (req, res) => {
    res.render('login/signin')
};

indexCtrl.renderSignup = (req, res) => {
    res.render('login/signup')
};

indexCtrl.renderRecoveryPassword = (req, res) => {
    res.render('login/recoveryPassword')
}

indexCtrl.renderReal = (req, res) => {
    res.render('realTimeProducts')
}

export default indexCtrl;