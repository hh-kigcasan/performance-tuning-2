const chai                  = require('chai');
const expect                = chai.expect;
const HeroModel           = require('../application/models/hero');


describe("Hero Model Hero Summary", function(){

    it('Should return one summary of specific hero.', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.fetchSummaryByID(hero_id);

        expect(Object.keys(data)).to.have.lengthOf(19); 
    });

    it('Should return master hero level.', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.fetchSummaryByID(hero_id);

        expect(data.type).to.equal("Master");
    });

    it('Should return mid hero level.', async function(){
        let hero_id = 1;
        let model = new HeroModel();
        let data = await model.fetchSummaryByID(hero_id);

        expect(data.type).to.equal("Mid");
    });

    it('Should return novice hero level.', async function(){
        let hero_id = 68;
        let model = new HeroModel();
        let data = await model.fetchSummaryByID(hero_id);

        expect(data.type).to.equal("Novice");
    });

    it('Should return image of specific hero.', async function(){
        let hero_id = 68;
        let model = new HeroModel();
        let data = await model.fetchSummaryByID(hero_id);

        expect(data.converted_image).to.have.lengthOf.at.least(256);
    });
});


describe("Hero Model Statistics", function(){

    it('Should return count of unfinished challenges of specific hero.', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.getUnfinished(hero_id);

        expect(data).to.equal(119);
    });

    it('Should return count of challenges with passing score of specific hero.', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.getPassed(hero_id);

        expect(data).to.equal(4);
    });

    it('Should return count of languages of specific hero.', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.getProficiency(hero_id);

        expect(data).to.equal("Javascript, Ruby, Java");
    });
});


describe("Hero Model Followers", function(){

    it('Should return first 20 followers of current page.', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.fetchFollowers(hero_id);

        expect(data.length).to.equal(20);
    });

    it('Should return image of follower hero.', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.fetchFollowers(hero_id);
        
        expect(data[0].converted_image).to.have.lengthOf.at.least(256);
    });

    it('Should return next set of followers of current page.', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.nextFollowers(hero_id);

        expect(data).to.have.lengthOf(5);
        expect(model.offset).to.equal(20);
    });

    it('Should return empty if has no next followers', async function(){
        let hero_id = 23;
        let model = new HeroModel(40);
        let data = await model.nextFollowers(hero_id);

        expect(data).to.equal("");
        expect(model.offset).to.equal(40);
    });

    it('Should return previous 20 followers of current page.', async function(){
        let hero_id = 23;
        let model = new HeroModel(20);
        let data = await model.prevFollowers(hero_id);

        expect(data).to.have.lengthOf(20);
        expect(model.offset).to.equal(0);
    });

    it('Should return empty if has no previous followers', async function(){
        let hero_id = 23;
        let model = new HeroModel();
        let data = await model.prevFollowers(hero_id);

        expect(data).to.equal("");
        expect(model.offset).to.equal(0);
    });
});