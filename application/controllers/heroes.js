const HeroModel = require('../models/hero');
const hero_model = new HeroModel();

class Heroes {
    async index(req, res){
        let hero_display = await hero_model.fetchSummaryByID();
        res.render('index', {"hero_display": hero_display});
    }

    async fetchCurrentFollowers(req, res){
        let hero_followers = await hero_model.fetchFollowers();
        res.render('./partials/followers', {"hero_followers": hero_followers});
    }
    
    async fetchNextFollowers(req, res){
        let hero_followers = await hero_model.nextFollowers();
        res.render('./partials/followers', {"hero_followers": hero_followers});
    }

    async fetchPrevFollowers(req, res){
        let hero_followers = await hero_model.prevFollowers();
        res.render('./partials/followers', {"hero_followers": hero_followers});
    }
}
module.exports = new Heroes();