import { Recency } from '@src/graphql/types';
import { getCurrentTimeEpoch } from '@src/coreUtils/timeUtils';

enum EPOCH_DIFF {
  MINUTE = 60,
  HOUR = 3600,
  DAY = 86400,
  MONTH = 2629743,
}

export function computeRecency(dateEpoch: number): Recency {
  const diff = getCurrentTimeEpoch() - dateEpoch;
  if (diff <= EPOCH_DIFF.DAY) return Recency.Day;
  else if (diff <= EPOCH_DIFF.DAY * 7) return Recency.Week;
  else if (diff <= EPOCH_DIFF.MONTH) return Recency.Month;
  return Recency.Any;
}

export function computeEpochGivenRecency(recency: Recency): number {
  const currentEpoch = getCurrentTimeEpoch();
  if (Recency.Day) return currentEpoch - EPOCH_DIFF.DAY;
  else if (Recency.Week) return currentEpoch - EPOCH_DIFF.DAY * 7;
  else if (Recency.Month) return currentEpoch - EPOCH_DIFF.MONTH;
  return 0;
}
