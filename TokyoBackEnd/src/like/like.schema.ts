import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LikeValueEnum } from './_utils/like-value-enum';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ versionKey: false, timestamps: true })
export class Like {
  @Prop({ required: true })
  recovery_token: string;

  @Prop({ required: true })
  manga_id: string;

  @Prop({required: true})
  is_liked : LikeValueEnum;
}

export const LikeSchema = SchemaFactory.createForClass(Like);