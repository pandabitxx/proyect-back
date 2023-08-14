const indexCtrl = {};

indexCtrl.renderMain = (req, res) => {
    res.render('main')
};

indexCtrl.renderReal = (req, res) => {
    res.render('realTimeProducts')
}

export default indexCtrl;