import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @ApiProperty decorator useful to *override*
 * information automatically inferred from the @nestjs/swagger plugin
 */

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: ['chocolate', 'vanilla'] })
  @IsString({ each: true })
  readonly flavors: string[];
}
