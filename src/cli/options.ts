import { IsBoolean, IsOptional } from "class-validator";

export class Options {
  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;
}