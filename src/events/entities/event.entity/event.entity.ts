import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Document } from 'mongoose';

export class Event extends Document {
  @Prop()
  type: string;

  @Prop({ index: true })
  name: string;

  @Prop(SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);

/**
 * compound index (name, type) in descending order (-1) and ascending order (1) respectively (1, -1) would be
 * the same as (-1, 1) in this case (order matters)
 **/
EventSchema.index({ name: 1, type: -1 }); //
