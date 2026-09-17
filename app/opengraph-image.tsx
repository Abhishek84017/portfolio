import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#F7F5F0",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(222,204,172,0.7) 0%, transparent 45%), radial-gradient(circle at 10% 100%, rgba(222,204,172,0.4) 0%, transparent 40%)",
          color: "#141413",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#141413",
              color: "#F7F5F0",
              fontStyle: "italic",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 28, color: "#66625B", letterSpacing: 4, textTransform: "uppercase" }}>
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, fontFamily: "serif", lineHeight: 1.05, letterSpacing: -2, display: "flex", flexWrap: "wrap" }}>
            <span>{profile.headline.lead}&nbsp;</span>
            <span
              style={{
                fontStyle: "italic",
                color: "#7A5C32",
              }}
            >
              {profile.headline.highlight}
            </span>
          </div>
          <div style={{ fontSize: 30, color: "#66625B" }}>
            {`${profile.name} · 4+ years · 6+ production apps · HIPAA-aware healthcare`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
