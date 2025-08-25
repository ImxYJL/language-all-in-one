const startMockWorker = async () => {
  if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      const { server } = await import('./server');
      console.log('[MSW] server.listen pid=%d ts=%d', process.pid, Date.now());
      return server.listen();
    }
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./browser');
    console.log('[MSW] worker.listen(client) pid=%d ts=%d', process.pid, Date.now());
    return await worker.start();
  }
};

export default startMockWorker;
