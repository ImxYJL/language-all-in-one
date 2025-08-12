const DayInfo = () => {
  const dateStr = new Date().toLocaleDateString('ko-KR');

  return (
    <>
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">안녕하세요!</h1>
        <p className="text-lg text-gray-600">오늘도 함께 학습해봐요.</p>
      </div>

      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">오늘은</p>
        <p className="text-xl font-semibold text-gray-800">{dateStr}</p>
      </div>
    </>
  );
};

export default DayInfo;
