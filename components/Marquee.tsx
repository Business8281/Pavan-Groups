"use client";

const items = [
  "Granite", "·", "Limestone", "·", "Slate", "·", "Cobbles",
  "·", "Quartzite", "·", "Sandstone", "·", "Basalt", "·",
  "Granite", "·", "Limestone", "·", "Slate", "·", "Cobbles",
  "·", "Quartzite", "·", "Sandstone", "·", "Basalt", "·",
];

export default function Marquee() {
  return (
    <div className="border-y overflow-hidden py-3.5" style={{ borderColor: "rgba(0,0,0,0.08)", background: "#f2ece2" }}>
      <div className="marquee-track flex whitespace-nowrap gap-8">
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-[10px] tracking-[0.3em] uppercase flex-none font-medium ${item === "·" ? "text-[#c85a32]/60" : "text-ink/40"}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
