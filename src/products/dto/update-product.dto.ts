import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Id du produit',
    example: 'grfr-5g5g-5g5g-fred',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Nom du produit',
    example: 'BN',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Description du produit',
    example: 'Délicieux paquet de biscuits',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Prix du produit',
    example: 1.70,
  })
  @IsNumber()
  @IsOptional()
  price: string;
}
