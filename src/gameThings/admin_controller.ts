import { Controller, Get, Body, Post, Patch, Param,  } from '@nestjs/common';
import { CharStruct } from 'src/models/char_model';
import { LevelStruct } from 'src/models/level_model';
import { MobStruct } from 'src/models/mob_model';
import { SpellStruct } from 'src/models/spell_model';
import { AllGameServices } from './game_service';


//------------------------------------gera codigo----------------------------------------------
function genSpellId() {
    var chars = "56789IJKLMNOPQ";
    var passwordLength = 5;
    var spellPassword = "";
 for (var i = 0; i <= passwordLength; i++) {
   var randomSpellId = Math.floor(Math.random() * chars.length);
   spellPassword += chars.substring(randomSpellId, randomSpellId +1);
  }
  return spellPassword
 }
function genMonsterId() {
    var chars = "01234ABCDEFGH";
    var passwordLength = 5;
    var monsterPassword = "";
 for (var i = 0; i <= passwordLength; i++) {
   var randomMonsterId = Math.floor(Math.random() * chars.length);
   monsterPassword += chars.substring(randomMonsterId, randomMonsterId +1);
  }
  return monsterPassword
 }

 /*---------------------------------------------------------------------------------------------*/ 

         /*------------Geração de id automatica-----------*/
         const autoSpellId = genSpellId().toString()
         const autoMonsterId = genMonsterId().toString() 
         /*--------------------------------------------------*/

@Controller()
export class AdminController {
    constructor(private readonly GameInjection: AllGameServices){}



    @Post('formSpells')
    async createNewSpell(
        @Body('spellName') insertedSpellName:string,
        @Body('spellDamage') insertedSpellDamage:number,
        @Body('spellLevel') insertedSpellLevel:number,

        newSpell:SpellStruct = {spell_Id: genSpellId().toString(),
                                spell_Name: insertedSpellName,
                                spell_Damage: insertedSpellDamage,
                                spell_Level: insertedSpellLevel}
    )
    {
        const newSpellCreaed = this.GameInjection.createSpell(newSpell)
        return console.log ('Spell criada com sucesso')
    }

    @Post('formMonsters')
    async createNewMob(
        @Body('mobName') insertedMobName:string,
        @Body('mobLife') insertedMobLife:number,
        @Body('mobDamage') insertedMobDamage:number,
        @Body('mobExp') insertedMobExp:number,

        newMob:MobStruct = {mob_Id:genMonsterId().toString(),
                            mob_Name:insertedMobName,
                            mob_Life:insertedMobLife,
                            mob_Damage:insertedMobDamage,
                            mob_Exp:insertedMobExp}
    )
    {
        const newMobCreaed = this.GameInjection.createMob(newMob)
        return console.log ('Mob criado com sucesso')
    }

    @Post('newLevel')

    async createNewLevel (
        @Body('levelNumber') insertedLevelNumber: number,
        @Body('expToLevel') insertedExpToLevel: number,
        @Body('levelHealth') insertedLevelHealth: number,
        
        newLevel:LevelStruct = {level_Number:insertedLevelNumber,
                                exp_To_Level:insertedExpToLevel,
                                level_Hp: insertedLevelHealth}
    )
    {
        const newLevelCreated = this.GameInjection.createLevel(newLevel)
        return console.log('Level novo adicionado a Base de Dados')
    }
}
