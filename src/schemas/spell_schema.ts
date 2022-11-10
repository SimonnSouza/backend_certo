import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpellDocument = Spells & Document

@Schema ()
export class Spells{
    @Prop({required: true})
    spell_Id:string
    @Prop({required: true})
    spell_Name:string
    @Prop({required: true})
    spell_Damage:number
    @Prop({required: true})
    spell_Level:number
}

export const SpellSchema = SchemaFactory.createForClass(Spells)