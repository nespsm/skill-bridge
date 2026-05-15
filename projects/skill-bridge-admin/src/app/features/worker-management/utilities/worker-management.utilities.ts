import { ICON_MAP } from "../constants/worker-management.constants";

export function resolveIcon(name: string): string {

  const normalized = name.toLowerCase();

  for (const keyword in ICON_MAP) {
    if (normalized.includes(keyword)) {
      return ICON_MAP[keyword];
    }
  }

  return 'icon-mask icon-xl icon-tag';
}