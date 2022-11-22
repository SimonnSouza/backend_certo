import { Controller, Get, Body, Post, Patch, Param,  } from '@nestjs/common';
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


         /*------------Geração de id automatica-----------*/
         const autoSpellId = genSpellId().toString()
         const autoMonsterId = genMonsterId().toString() 
         /*--------------------------------------------------*/

 /*---------------------------------------------------------------------------------------------*/

         @Controller()
export class AdminController {
    constructor(private readonly GameInjection: AllGameServices){}



    @Post('formSpells')
    async createNewSpell(
        @Body('spellName') insertedSpellName:string,
        @Body('spellDamage') insertedSpellDamage:string,
        @Body('spellLevel') insertedSpellLevel:string,

        newSpell:SpellStruct = {spell_Id: genSpellId().toString(),
                                spell_Name: insertedSpellName,
                                spell_Damage: parseFloat(insertedSpellDamage),
                                spell_Level: parseFloat(insertedSpellLevel)}
    )
    {
        const newSpellCreaed = this.GameInjection.createSpell(newSpell)
        return console.log ('Spell criada com sucesso')
    }

    @Post('formMonsters')
    async createNewMob(
        @Body('mobName') insertedMobName:string,
        @Body('mobLife') insertedMobLife:string,
        @Body('mobDamage') insertedMobDamage:string,
        @Body('mobExp') insertedMobExp:string,

        newMob:MobStruct = {mob_Id:genMonsterId().toString(),
                            mob_Name:insertedMobName,
                            mob_Life:parseFloat(insertedMobLife),
                            mob_Damage:parseFloat(insertedMobDamage),
                            mob_Exp:parseFloat(insertedMobExp)}
    )
    {
        
        const newMobCreaed = this.GameInjection.createMob(newMob)
        return console.log ('Mob criado com sucesso')
    }

    @Post('newLevel')

    async createNewLevel (
        @Body('levelNumber') insertedLevelNumber: string,
        @Body('expToLevel') insertedExpToLevel: string,
        @Body('levelHealth') insertedLevelHealth: string,
        
        newLevel:LevelStruct = {
            level_Number:parseFloat(insertedLevelNumber),
            exp_To_Level:parseFloat(insertedExpToLevel),
            level_Hp: parseFloat(insertedLevelHealth),
            }
    )
    {
        console.log(newLevel);
        console.log(insertedLevelHealth)
        console.log(insertedExpToLevel)
        console.log(insertedLevelNumber)
        const newLevelCreated = this.GameInjection.createLevel(newLevel)
        return console.log('Level novo adicionado a Base de Dados')
    }
}
