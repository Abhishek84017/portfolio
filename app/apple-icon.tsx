import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141413",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            fontStyle: "italic",
            fontFamily: "serif",
            letterSpacing: -4,
            color: "#F7F5F0",
          }}
        >
          AP
        </div>
      </div>
    ),
    size,
  );
}
