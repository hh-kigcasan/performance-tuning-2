const Mysql = require('mysql');
const executeQuery = require('../../system/database');
class HeroAnswers {
    constructor(num=0) {
        this.offset = num;
    }
    
    async fetchAnswerByHeroID(hero_id=23){
        const query = `SELECT languages.name "language", courses.name "course",  course_challenges.*, 
                        hero_answers.*, CAST(hero_answers.completed_at AS DATE) AS complete_date
                        FROM hero_answers 
                        RIGHT JOIN languages ON languages.id=hero_answers.language_id
                        RIGHT JOIN course_challenges ON hero_answers.course_challenge_id = course_challenges.id
                        RIGHT JOIN courses ON courses.id = course_challenges.course_id
                        WHERE hero_id=? AND score > 2 
                        ORDER BY complete_date DESC`;
        const value = [hero_id];
        
        try{
			let get_hero_query = Mysql.format(query, value);
			let get_hero_results = await executeQuery(get_hero_query);

            return get_hero_results[this.offset];
		} catch(err){
            return err;
		}
    }

    async prevAnswer(){
        this.offset -= 1;
        if(this.offset >= 0){
            return await this.fetchAnswerByHeroID();
        }
        this.offset = 0;
        return "";
    }

    async nextAnswer(){
        let old_offset = this.offset;
        this.offset += 1;
        let result = await this.fetchAnswerByHeroID();
        if(!result || result.length == 0){
            this.offset = old_offset;
            return "";
        }
        return result;
    }
}

module.exports = HeroAnswers;