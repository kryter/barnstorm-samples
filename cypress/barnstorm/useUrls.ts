export function useUrls() {
  const baseUrl = 'https://example.cypress.io/todo';

  return {
    baseUrl,
    entryUrl: `${baseUrl}/`,
    activeFilterUrl: `${baseUrl}#/active`,
    completedFilterUrl: `${baseUrl}#/completed`
  };
}

export type AppUrls = ReturnType<typeof useUrls>;
