const HeroAnswersModel = require('../models/hero.answer');
const hero_answers_model = new HeroAnswersModel();

class HeroAnswers {
    
    async fetchCurrentAnswer(req, res){
        let hero_answer = await hero_answers_model.fetchAnswerByHeroID();
        res.render('./partials/answer', {"hero_answer": hero_answer});
    }

    async fetchNextAnswer(req,res){
        let hero_answer = await hero_answers_model.nextAnswer();
        res.render('./partials/answer', {"hero_answer": hero_answer});
    }

    async fetchPrevAnswer(req,res){
        let hero_answer = await hero_answers_model.prevAnswer();
        res.render('./partials/answer', {"hero_answer": hero_answer});
    }
}
module.exports = new HeroAnswers();