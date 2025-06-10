import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';


export type CommentDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false, timestamps: true })
export class Comment {
  @Prop({ required: true, type: Types.ObjectId })
  user_id: ObjectId;

  @Prop({ required: true })
  manga_id: string;

  @Prop({required: true})
  message: string;

  @Prop({required: true})
  title: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);