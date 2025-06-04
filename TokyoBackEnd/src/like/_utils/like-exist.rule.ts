import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { LikeRepository } from '../like.repository';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'LikeExists', async: true })
@Injectable()
export class LikeExistsRule implements ValidatorConstraintInterface {
  constructor(private likeRepository: LikeRepository) {}

  async validate(id: string, args: ValidationArguments) {
    if (!Types.ObjectId.isValid(id)) return false;
    const like = await this.likeRepository.findOneById(id);
    return !!like && (
      (
        args.constraints && 
        args.constraints?.includes(like.recovery_token) && 
        args.constraints?.includes(like.manga_id)
      ) ?? true
    );
  }

  defaultMessage = (args: ValidationArguments) => `${args.property} didn't find like`;
  
}

export function LikeExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'LikeExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: LikeExistsRule,
    });
  };
}
