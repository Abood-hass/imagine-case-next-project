"use server";

import { db } from "@/app/db";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModels,
} from "@prisma/client";

export type SaveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModels;
  configId: string;
};

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModels;
  configId: string;
}) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model },
  });
}
