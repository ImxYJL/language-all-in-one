const startMockWorker = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./browser');

    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};

export default startMockWorker;
