const express = require('express');

class BaseRoute {
    constructor() {
        this._router = new express.Router({mergeParams: true});
        this.setupListeners();
    }

    get router() {
        return this._router;
    }

    set router(router) {
        this._router = router;
    }
}

module.exports = BaseRoute;