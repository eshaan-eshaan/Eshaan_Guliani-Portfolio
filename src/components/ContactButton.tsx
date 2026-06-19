import React from 'react';

interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ 
  label = "Contact Me", 
  className = "", 
  ...props 
}) => {
  return (
    <button
      className={`rounded-full text-white font-medium uppercase tracking-widest transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus:outline-none ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
      {...props}
    >
      <span className="block px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base">
        {label}
      </span>
    </button>
  );
};
