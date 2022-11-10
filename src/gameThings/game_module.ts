import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chars, CharSchema } from 'src/schemas/char_schema';
import { Spells, SpellSchema } from 'src/schemas/spell_schema';
import { Mobs, MobSchema } from 'src/schemas/mob_schema';
import { Levels, LevelSchema } from 'src/schemas/level_schema';
import { GameController } from './game_controller';
import { AllGameServices } from './game_service';
import { AdminController } from './admin_controller';


@Module ({
    imports: [MongooseModule.forFeature([{name: Chars.name, schema:CharSchema}]),
              MongooseModule.forFeature([{name: Spells.name, schema:SpellSchema}]),
              MongooseModule.forFeature([{name: Mobs.name, schema:MobSchema}]),
              MongooseModule.forFeature([{name: Levels.name, schema:LevelSchema}])],
    controllers: [GameController, AdminController],
    providers: [AllGameServices],
})

export class GameModule{}