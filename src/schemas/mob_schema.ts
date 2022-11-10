import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MobDocument = Mobs & Document

@Schema()
export class Mobs {
    @Prop({required: true})
    mob_Id:string
    @Prop({required: true})
    mob_Name:string
    @Prop({required: true})
    mob_Life:number
    @Prop({required: true})
    mob_Damage:number
    @Prop({required: true})
    mob_Exp:number
    
}

export const MobSchema = SchemaFactory.createForClass(Mobs)