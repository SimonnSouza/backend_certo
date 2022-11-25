import { Controller, Get, Body, Post, Patch, Param, HttpException, HttpStatus,  } from '@nestjs/common';
import { CharStruct } from 'src/models/char_model';
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
        const alreadyExists = await this.GameInjection.existentChar(insertedCharName)

        if (alreadyExists == true){
            
        throw new HttpException('Um personagem com esse nome já existe', HttpStatus.FORBIDDEN)        
       
        }
        const newCharCreated = this.GameInjection.createChar(newChar)
    }

    @Get('fightPage:indexNumber')
    async selectedMonsterToFight(@Param('indexNumber') selectedMob:string) {
        return this.GameInjection.findMonsterByIndex(selectedMob)
    }

    
    /*@Get('nextLevel:actualLevel')
    async getNextLevelToCompare(@Param('actualLevel') charLevel) {
        const intoNumber = parseFloat(charLevel)
        return this.GameInjection.nextLevelToCompare(intoNumber)
    }*/ //só pra ver se funcionava

    @Get('allMonsters') //mesmo caso, o front tem so que mandar um número
    async getEveryMonter(): Promise<Mobs[]> {
        return this.GameInjection.getAllMobs()
    }

    
    @Get('allSpells')  //Não precisa usar isso mais, já que tem como filtrar as spells
    async getEverySpell(): Promise<Spells[]>{
        return this.GameInjection.getAllSpells()
    }
    
    @Get('getCharData:name')
    async getRightChar(@Param('name') insertedCharName:string){
        return this.GameInjection.getOneChar(insertedCharName)
    }
    
    @Get('spellsFor:name')
    async getSpellsForChar(@Param('name') insertedCharName){
        return this.GameInjection.rightSpellsForChar(insertedCharName)
    }


    @Patch('char:id;exp:xp')
    async updateCharExp(@Param('id') charIdToChange:string, @Param('xp') expGained:string) {
        return this.GameInjection.patchExp(charIdToChange,expGained)
    }

    

    
}
 