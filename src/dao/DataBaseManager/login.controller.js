const indexCtrl = {};



indexCtrl.renderPrincipal = (req, res) => {
    res.render('login/principal')
};

indexCtrl.renderRegister = (req, res) => {
    res.render('login/register')
};

indexCtrl.renderRecoveryPassword = (req, res) => {
    res.render('login/recoveryPassword')
}

indexCtrl.renderReal = (req, res) => {
    res.render('realTimeProducts')
}

export default indexCtrl;