import { Controller, Get, Body, Post, Patch, Param,  } from '@nestjs/common';
import { Number } from 'mongoose';
import { CharStruct } from 'src/models/char_model';
import { LevelStruct } from 'src/models/level_model';
import { MobStruct } from 'src/models/mob_model';
import { SpellStruct } from 'src/models/spell_model';
import { Mobs } from 'src/schemas/mob_schema';
import { Spells } from 'src/schemas/spell_schema';
import { AllGameServices } from './game_service';


//------------------------------------gera codigo----------------------------------------------

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
         const autoMonsterId = genMonsterId().toString() 
         /*--------------------------------------------------*/

@Controller()
export class GameController {
    constructor(private readonly GameInjection: AllGameServices){}



    @Post('createChar')
    async createNewChar (
        @Body('charName') insertedCharName,
        newChar:CharStruct = {char_Id:genMonsterId(),
                              char_Name:insertedCharName,
                              char_Life:300,
                              char_Exp:0,
                              char_Level:0}
    )
    {
        const newCharCreated = this.GameInjection.createChar(newChar)
        return console.log ('Personagem criado com sucesso')
    }

    @Get('fightPage:name')
    async selectedMonsterToFight(@Param('name') selectedMob:string) {
        return this.GameInjection.findMonsterByName(selectedMob)
    }

    
    /*@Get('nextLevel:actualLevel')
    async getNextLevelToCompare(@Param('actualLevel') charLevel) {
        const intoNumber = parseFloat(charLevel)
        return this.GameInjection.nextLevelToCompare(intoNumber)
    }*/

    @Get('allMonsters')
    async getEveryMonter(): Promise<Mobs[]> {
        return this.GameInjection.getAllMobs()
    }

    
    @Get('allSpells')
    async getEverySpell(): Promise<Spells[]>{
        return this.GameInjection.getAllSpells()
    }

    @Patch('char:id;exp:xp')
    async updateCharExp(@Param('id') charIdToChange:string, @Param('xp') expGained:string) {
        return this.GameInjection.patchExp(charIdToChange,expGained)
    }

    

    
}
 