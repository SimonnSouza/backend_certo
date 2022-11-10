import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LevelDocument = Levels & Document

@Schema()
export class Levels {
    @Prop({required: true})
    level_Number:number
    @Prop({required: true})
    exp_To_Level:number
    @Prop({required: true})
    level_Hp:number
}

export const LevelSchema = SchemaFactory.createForClass(Levels)
