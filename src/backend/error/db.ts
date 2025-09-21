// Supabase(Postgres) 에러 코드 중심으로 분기

export function isUniqueViolation(err: any) {
  return (
    err?.response?.status === 409 ||
    err?.code === '23505' ||
    /duplicate key value/i.test(String(err?.message ?? err?.details ?? ''))
  );
}
