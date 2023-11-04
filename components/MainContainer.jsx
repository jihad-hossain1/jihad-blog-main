const MainContainer = ({ children }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-2 md:px-8 py-4 min-h-screen">
      {children}
    </div>
  );
};

export default MainContainer;
