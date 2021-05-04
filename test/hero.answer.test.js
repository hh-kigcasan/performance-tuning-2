const chai                  = require('chai');
const expect                = chai.expect;
const HeroAnswerModel       = require('../application/models/hero.answer');


describe("Hero Answer Model Display", function(){

    it('Should return latest best answer of specific hero.', async function(){
        let hero_id = 23;
        let model = new HeroAnswerModel();
        let data = await model.fetchAnswerByHeroID(hero_id);

        expect(data.hero_id).to.equal(23);
        expect(Object.keys(data)).to.have.lengthOf(15); 
    });

    it('Should return previous best answer of specific hero.', async function(){
        let hero_id = 23;
        let model = new HeroAnswerModel(3);
        let data = await model.prevAnswer(hero_id);

        expect(model.offset).to.equal(2);
        expect(Object.keys(data)).to.have.lengthOf(15); 
    });

    it('Should return empty if has no previous best answer.', async function(){
        let hero_id = 23;
        let model = new HeroAnswerModel();
        let data = await model.prevAnswer(hero_id);

        expect(data).to.equal("");
        expect(model.offset).to.equal(0);
    });

    it('Should return next best answer of specific hero.', async function(){
        let hero_id = 23;
        let model = new HeroAnswerModel();
        let data = await model.nextAnswer(hero_id);

        expect(model.offset).to.equal(1);
        expect(Object.keys(data)).to.have.lengthOf(15); 
    });

    it('Should return empty if has no next best answer.', async function(){
        let hero_id = 23;
        let model = new HeroAnswerModel(3);
        let data = await model.nextAnswer(hero_id);

        expect(data).to.equal("");
        expect(model.offset).to.equal(3);
    });
});