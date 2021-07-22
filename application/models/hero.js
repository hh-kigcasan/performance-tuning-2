const Mysql = require('mysql');
const executeQuery = require('../../system/database');
class Hero {
    constructor(num=0) {
        this.offset = num;
    }
    async fetchSummaryByID(hero_id=23){
        const query = `SELECT heroes.*, CAST(heroes.created_at AS DATE) AS membership_date, COUNT(following_hero_id) as followers_count, course_challenges.title, courses.name 
                        FROM heroes 
                        LEFT JOIN hero_follows ON following_hero_id = heroes.id
                        LEFT JOIN hero_answers ON hero_answers.id = (
                            SELECT id FROM hero_answers WHERE hero_id=23 ORDER BY updated_at DESC LIMIT 1
                        )
                        LEFT JOIN course_challenges ON hero_answers.course_challenge_id = course_challenges.id
                        LEFT JOIN courses ON courses.id = course_challenges.course_id
                        WHERE heroes.id=?`;
        const value = [hero_id];

        try{
			let get_hero_query = Mysql.format(query, value);
			let [get_hero_result] = await executeQuery(get_hero_query);
            let result = get_hero_result;
            
            result.unfinish_num = await this.getUnfinished();

            result.passed_num = await this.getPassed();
            result.language_proficiency = await this.getProficiency();

            if(result.hero_level > 8){
                result.type = "Master";
            } else if(result.hero_level > 5){
                result.type = "Mid";
            } else{ 
                result.type = "Novice";
            }
            result.converted_image = Buffer.from(result.displayed_image, 'binary').toString('base64');

            return result;

		} catch(err){
            return err;
		}
    }

    async getUnfinished(value=23){
        const query = `SELECT COUNT(*) AS unfinish_num FROM hero_answers WHERE score <> 1 AND score <> 2 AND score <> 3 AND hero_id = ?`;
        let get_unfinish_num = Mysql.format(query, [value]);

        let [result] = await executeQuery(get_unfinish_num);
        return result.unfinish_num;
    }

    async getPassed(value=23){
        const query = `SELECT COUNT(*) AS passed_num FROM hero_answers WHERE (score >= 2) AND hero_id = ?`;
        let get_passed_num = Mysql.format(query, [value]);

        let [result] = await executeQuery(get_passed_num);
        return result.passed_num;
    }

    async getProficiency(value=23){
        const query = `SELECT DISTINCT(languages.name), hero_id 
                        FROM hero_answers 
                        LEFT JOIN languages ON hero_answers.language_id = languages.id 
                        HAVING hero_answers.hero_id=?`;
        let get_lang_proficiency = Mysql.format(query, [value]);
        let results = await executeQuery(get_lang_proficiency);
        
        let languages = [];
        for(const row in results){
            languages.push(results[row].name);
        }
        return languages.join(", ");
    }

    async fetchFollowers(hero_id=23){
        const query = `SELECT * FROM heroes 
                        LEFT JOIN hero_follows ON hero_follows.follower_hero_id = heroes.id
                        WHERE hero_follows.following_hero_id = ?`;
        const values = [hero_id];
        try{
			let get_followers_query = Mysql.format(query, values);
            let get_followers_result = await executeQuery(get_followers_query);
            
            let results = get_followers_result.slice(this.offset, (this.offset + 20));
            for(let i=0; i<results.length; i++){
                results[i].converted_image = Buffer.from(results[i].displayed_image, 'binary').toString('base64');
            }
			return results;
        } catch(err){
            return err;
		}
    }
   
    async prevFollowers(){
        this.offset -= 20;

        if(this.offset >= 0){
            return await this.fetchFollowers();
        }
        this.offset = 0;
        return "";
    }

    async nextFollowers(){
        let old_offset = this.offset;
        this.offset += 20;
        
        let result = await this.fetchFollowers();
        if(result.length == 0){
            this.offset = old_offset;
            return "";
        }
        return result;
    }
}

module.exports = Hero;
