"use client";

export function AbstractGem() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="gem-spin relative h-48 w-48 sm:h-64 sm:w-64">
        <div className="gem-face absolute inset-0 rounded-[30%] bg-linear-to-br from-gold-light via-gold to-gold-deep shadow-[0_0_60px_rgba(201,169,110,0.5)]" />
        <div className="gem-face-2 absolute inset-4 rounded-[28%] bg-linear-to-tl from-gold-deep via-gold to-gold-light opacity-80" />
        <div className="absolute inset-10 rounded-[25%] bg-linear-to-br from-gold-light/40 to-transparent blur-md" />
      </div>
      <style jsx>{`
        @keyframes gem-spin {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(15deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg);
          }
        }
        .gem-spin {
          animation: gem-spin 8s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .gem-face-2 {
          animation: gem-spin 8s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
}
