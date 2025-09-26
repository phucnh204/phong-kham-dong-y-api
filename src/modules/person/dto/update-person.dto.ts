import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonWithUserDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonWithUserDto) {}
