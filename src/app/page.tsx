import { Button } from '@/frontend/components/common';

export default function Home() {
  return (
    <main className="bg-primary flex min-h-screen items-center justify-center px-4 text-white">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <form className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="접속을 위해 아이디를 입력해주세요"
            className="w-full flex-1 rounded-md border border-white/40 bg-white/25 px-4 py-2 text-sm text-white placeholder-white/70 transition focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none sm:w-64"
          />
          <Button type="submit" styleType="primary" className="w-full sm:w-auto">
            확인
          </Button>
        </form>
      </div>
    </main>
  );
}
