// KST는 UTC보다 9시간 빠르다는 것을 명시하는 상수 (밀리초 단위)
const KOREA_TIME_OFFSET_MS = 9 * 60 * 60 * 1000;

/**
 * Date 객체에서 추출한 KST 기준 시간 구성요소
 */
export interface DateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

/**
 * 현재 시간을 기준으로 KST의 연, 월, 일, 시, 분, 초를 숫자로 반환
 */
function getKstComponents(): DateTime {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const partMap: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== 'literal') {
      partMap[part.type] = part.value;
    }
  }

  const hour = partMap.hour === '24' ? 0 : Number(partMap.hour);

  return {
    year: Number(partMap.year),
    month: Number(partMap.month),
    day: Number(partMap.day),
    hour: hour,
    minute: Number(partMap.minute),
    second: Number(partMap.second),
  };
}

/**
 * KST 기준 오늘 날짜를 'YYYY-MM-DD' 형식의 문자열로 반환
 */
export function formatKstYmd(): string {
  const { year, month, day } = getKstComponents();

  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');

  return `${year}-${formattedMonth}-${formattedDay}`;
}

/**
 * KST 기준 다음 날 자정까지 남은 시간을 초 단위로 반환
 */
export function getSecondsUntilKSTMidnight(): number {
  const now = Date.now();
  const { year, month, day } = getKstComponents();

  const nextDayMidnightUTC = Date.UTC(year, month - 1, day + 1, 0, 0, 0);
  const nextDayMidnightKSTTimestamp = nextDayMidnightUTC - KOREA_TIME_OFFSET_MS;

  const remainingMilliseconds = nextDayMidnightKSTTimestamp - now;

  return Math.floor(remainingMilliseconds / 1000);
}
