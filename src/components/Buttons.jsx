export const Button = ({ disabled, children, onClick, variant }) => {
  // clsx, cx

  return (
    <div
      onClick={onClick}
      className={`rounded-xl text-2xl text-white cursor-pointer py-2 px-8 ${
        disabled ? "bg-blue-200" : "bg-green-400"
      }`}
    >
      {children}
    </div>
  );
};
