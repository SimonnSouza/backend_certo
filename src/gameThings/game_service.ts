import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chars, CharDocument } from 'src/schemas/char_schema';
import { Spells, SpellDocument } from 'src/schemas/spell_schema';
import { Mobs, MobDocument } from 'src/schemas/mob_schema';
import { Levels, LevelDocument } from 'src/schemas/level_schema';
import { CharStruct } from 'src/models/char_model';
import { MobStruct } from 'src/models/mob_model';
import { SpellStruct } from 'src/models/spell_model';
import { LevelStruct } from 'src/models/level_model';

@Injectable()
    export class AllGameServices {
        constructor(@InjectModel(Chars.name) private charModel: Model<CharDocument>,
        @InjectModel(Mobs.name) private mobModel: Model<MobDocument>,
        @InjectModel(Spells.name) private spellModel: Model<SpellDocument>,
        @InjectModel(Levels.name) private levelModel: Model<LevelDocument>){}

/*===============================================Creates==================================================*/


        async createMob(mobToDatabase: MobStruct): Promise<Mobs> {
            const createMob = new this.mobModel(mobToDatabase);
            return createMob.save();
        }

        
        async createSpell(spellToDatabase: SpellStruct): Promise<Spells> {
            const createSpell = new this.spellModel(spellToDatabase);
            return createSpell.save();
        }

        
        async createChar(charToDatabase: CharStruct): Promise<Chars> {
            const thisCharExist = this.getOneChar(charToDatabase.char_Name)
            if(thisCharExist != null) {

                console.log("Já existe um personagem com esse nome")
                return 
            } 
            const createChar = new this.charModel(charToDatabase);
            console.log('Personagem criado com sucesso')
            return createChar.save();
        }

        async createLevel(levelToDatabase: LevelStruct): Promise<Levels> {
            
            try{
                const createNewLevel = new this.levelModel(levelToDatabase)
                return createNewLevel.save()
                
            } catch(error){
                console.log(error)
            }
            
        }
/*--------------------------------------------------------------------------------------------------------------*/

        async getAllMobs(): Promise<Mobs[]>{
            return this.mobModel.find().exec()
        }
        async getAllSpells(): Promise<Spells[]>{
            return this.spellModel.find().exec()
        }

        async findMonsterByName(monsterName: string) {
            return this.mobModel.findOne({mob_Name: monsterName}).exec()
        }

        async nextLevelToCompare(recentLevel:number) {
            console.log(typeof(recentLevel))
            return this.levelModel.findOne({level_Number: recentLevel + 1}).exec()
        }

        async patchExp(charIdToRecive:string,expGained:string ){
            const expToNumber = parseFloat(expGained)
            const relatedChar = await this.charModel.findOne({char_Id: charIdToRecive})
            const nextCharLevel = await this.nextLevelToCompare(relatedChar.char_Level)
            relatedChar.char_Exp = relatedChar.char_Exp + expToNumber
            
            if (relatedChar.char_Exp >= nextCharLevel.exp_To_Level){
                relatedChar.char_Level = nextCharLevel.level_Number
                relatedChar.char_Life = nextCharLevel.level_Hp
                return relatedChar.save()
            }
            return relatedChar.save()
          
        }

        async getOneChar(recivedName:string){
            const rightChar = await this.charModel.findOne({char_Name: recivedName}).exec()
            return rightChar
        }

        async rightSpellsForChar(charToFilter:string){
        const rightObject =  await this.getOneChar(charToFilter)
        const levelOfChar = rightObject.char_Level
        const everySpell = await this.getAllSpells()
        const spellsAvailable = everySpell.filter(spellsInside =>(spellsInside.spell_Level <= levelOfChar))
        return spellsAvailable
        }
    }