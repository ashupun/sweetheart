"use client";

const lines = [
  { id: 0, height: 45, top: 12, duration: 3.2 },
  { id: 1, height: 62, top: 28, duration: 2.8 },
  { id: 2, height: 38, top: 5, duration: 3.5 },
  { id: 3, height: 55, top: 42, duration: 2.4 },
  { id: 4, height: 48, top: 18, duration: 3.8 },
  { id: 5, height: 70, top: 8, duration: 2.6 },
  { id: 6, height: 42, top: 35, duration: 3.1 },
  { id: 7, height: 58, top: 22, duration: 2.9 },
  { id: 8, height: 35, top: 48, duration: 3.4 },
  { id: 9, height: 52, top: 15, duration: 2.7 },
  { id: 10, height: 65, top: 38, duration: 3.0 },
  { id: 11, height: 40, top: 25, duration: 3.6 },
];

export function AnimatedLines() {
  return (
    <>
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute w-px bg-linear-to-b from-transparent via-pink-500/50 to-transparent"
          style={{
            left: `${10 + line.id * 8}%`,
            height: `${line.height}%`,
            top: `${line.top}%`,
            animationDelay: `${line.id * 0.3}s`,
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-8 bg-pink-500 blur-sm animate-fall"
            style={{ animationDelay: `${line.id * 0.5}s`, animationDuration: `${line.duration}s` }}
          />
        </div>
      ))}
    </>
  );
}

export function AnimatedCircles() {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-pink-500/20 rounded-full animate-spin-slow" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-pink-500/10 rounded-full animate-spin-slow-reverse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-pink-500/20 rounded-full animate-spin-slow" />
    </>
  );
}
