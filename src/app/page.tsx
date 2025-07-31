import LoginForm from '@/frontend/components/home/LoginForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-white to-gray-50">
      {/* 배경 요소 */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(0,128,0,0.05)_0%,transparent_60%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_80%_70%,rgba(0,128,0,0.08)_0%,transparent_50%)]"></div>

      {/* 콘텐츠 */}
      <div className="flex flex-1 flex-col items-center justify-center gap-16 px-6 py-12 md:flex-row md:gap-24">
        {/* 왼쪽: 문구 */}
        <div className="max-w-md text-center md:text-left">
          <h1 className="via-primary-hover2 mb-6 bg-gradient-to-r from-gray-900 to-gray-900 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            AI와 함께하는 대화의
            <br className="hidden md:block" />
            새로운 경험
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            언제 어디서나 당신의 질문에 답하고, 아이디어를 발전시키며,
            <br />
            새로운 통찰력을 제공하는 AI 어시스턴트를 만나보세요.
          </p>
          <ul className="hidden flex-col gap-4 text-gray-700 md:flex">
            {[
              '24시간 언제든지 대화할 수 있는 AI 어시스턴트',
              '다양한 주제에 대한 정확하고 유용한 정보 제공',
              '개인 맞춤형 대화로 더 나은 결과 도출',
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {/* 체크 아이콘 */}
                <svg className="text-primary h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>

                {/* 텍스트 */}
                <span className="text-base">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <LoginForm />
      </div>
    </main>
  );
}
