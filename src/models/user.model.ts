import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Transform, Type, Exclude } from 'class-transformer';
export class User {
  public id: number;
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @MinLength(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  @Transform(({ value }) => value?.trim())
  public name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  public email: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Tuổi phải là số' })
  @Min(1, { message: 'Tuổi phải lớn hơn 0' })
  @Max(120, { message: 'Tuổi phải nhỏ hơn 120' })
  public age?: number;

  @Exclude() // Không trả về trong response
  private password?: string;

  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(id: number, name: string, email: string, age?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Instance method
  public getInfo(): UserInfo {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}