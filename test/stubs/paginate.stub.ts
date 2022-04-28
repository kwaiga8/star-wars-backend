export const paginateStub = () => {
  return {
    items: [
      {
        id: 1,
        name: 'LUKE SKYWALKER',
      },
    ],
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
  };
};
