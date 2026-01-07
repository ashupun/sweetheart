import * as minimal from "./minimal";
import * as aesthetic from "./aesthetic";
import * as glass from "./glass";
import * as brutalist from "./brutalist";
import * as kawaii from "./kawaii";
import * as y2k from "./y2k";
import * as neon from "./neon";
import * as soft from "./soft";

export type { TemplateProps, TemplateConfig } from "./types";

export const templates = {
  minimal,
  aesthetic,
  glass,
  brutalist,
  kawaii,
  y2k,
  neon,
  soft,
} as const;

export const templateList = Object.values(templates).map(t => t.config);

export const getTemplate = (id: string) => {
  const template = templates[id as keyof typeof templates];
  return template || templates.minimal;
};

