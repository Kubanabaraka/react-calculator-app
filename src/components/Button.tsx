type ButtonProps = {
  label: string;
  className?: string;
  variant?: "number" | "operator" | "function";
  onClick?: () => void;
};

export default function Button({
  label,
  className = "",
  onClick,
}: ButtonProps) {
  const isOperator = ["÷", "x", "-", "+", "="].includes(label);

  return (
    <button
      onClick={onClick}
      className={`h-26.25 text-[40px] font-normal leading-none transition-colors ${
        isOperator
          ? "bg-[#f28b32] text-white hover:bg-[#ea7f24]"
          : "bg-[#d5d5d8] text-black hover:bg-[#c8c8cd]"
      } ${className}`}
    >
      {label}
    </button>
  );
}
