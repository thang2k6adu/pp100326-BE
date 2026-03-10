import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class FirebaseLoginDto {
  @IsNotEmpty()
  @IsString()
  idToken: string;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsOptional()
  @IsString()
  platform?: string;
}
