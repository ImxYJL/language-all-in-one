const LoadingBar = () => {
  return (
    <div className="flex justify-start gap-3">
      <div className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3">
        <div className="flex gap-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
