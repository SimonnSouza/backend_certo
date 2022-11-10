import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CharDocument = Chars & Document


@Schema()

export class Chars {
    @Prop({required: true})
    char_Id:string
    @Prop({required: true})
    char_Name:string
    @Prop({required: true})
    char_Life:number
    @Prop({required: true})
    char_Exp:number
    @Prop({required: true})
    char_Level:number
}

export const CharSchema = SchemaFactory.createForClass(Chars)
