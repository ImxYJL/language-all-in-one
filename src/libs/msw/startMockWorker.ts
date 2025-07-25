const startMockWorker = async () => {
  if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      const { server } = await import('./server');
      server.listen();
      console.log('[MSW] Server-side mock server started');
    }
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./browser');
    await worker.start();
    console.log('[MSW] Client-side mock worker started');
  }
};

export default startMockWorker;
