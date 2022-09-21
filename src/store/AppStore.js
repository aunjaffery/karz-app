const AppStore = (set) => ({
  transFetching: false,
  setTransFetching: (val) => set({ transFetching: val }),
});

export default AppStore;
