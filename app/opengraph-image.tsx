import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A1628",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "#EAEFF3",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "#2BBFA0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "#0A0A0A",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#FFFFFF",
            fontSize: 64,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Emergency Eye Care Directory
        </div>
        <div
          style={{
            display: "flex",
            color: "#93A5C4",
            fontSize: 32,
            fontWeight: 500,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          UK eye casualty and emergency ophthalmology services
        </div>
      </div>
    ),
    { ...size }
  );
}
