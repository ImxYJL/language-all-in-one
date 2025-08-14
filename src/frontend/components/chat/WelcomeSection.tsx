import DayInfo from './DayInfo';
import SentenceCard from './SentenceCard';
import WordCard from './WordCard';

const WelcomeSection = () => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center space-y-8">
      <DayInfo />

      {/* Today's Cards */}
      <div className="grid w-full max-w-2xl gap-6 md:grid-cols-2">
        <WordCard />
        <SentenceCard />
      </div>

      <div className="text-center text-gray-500">
        <p className="text-sm">아래에 메시지를 입력하여 대화를 시작하세요</p>
      </div>
    </section>
  );
};

export default WelcomeSection;
