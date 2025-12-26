export default function GradientSection() {
  return (
    <div className="w-full relative bg-white">
      {/* Main gradient container */}
      <div
        className="w-full h-32 md:h-40 lg:h-48 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(251, 176, 64, 0.3) 20%, #FBB040 40%, #F15A29 70%, #1A1A1A 100%)",
          opacity: 1,
        }}
      >
        {/* Blur overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(251, 176, 64, 0.2) 20%, rgba(251, 176, 64, 0.6) 40%, rgba(241, 90, 41, 0.8) 70%, #000000 100%)",
            filter: "blur(19.85px)",
            opacity: 0.8,
          }}
        />
      </div>
    </div>
  );
}
