interface BigButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success";
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function BigButton({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
}: BigButtonProps) {
  const baseClasses =
    "h-[64px] px-8 rounded-[24px] font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft";

  const variantClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-white text-primary border-2 border-primary",
    success: "bg-success text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}
