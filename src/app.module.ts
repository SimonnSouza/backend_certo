import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './gameThings/game_module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://henricksouza:henrick2000@cluster0.mhlgeri.mongodb.net/Hunter´s_Quest'),
  GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
