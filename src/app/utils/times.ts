export function getSecondsUntilKSTMidnight(): number {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;

  const nowKST = new Date(now.getTime() + kstOffset);
  const midnightKST = new Date(nowKST);

  midnightKST.setUTCHours(24, 0, 0, 0);
  const remainingMilliseconds = midnightKST.getTime() - nowKST.getTime();

  return Math.floor(remainingMilliseconds / 1000);
}
