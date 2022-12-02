import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

// <BASE_URL>/api/og?title=Day%201&description=I%20had%20to%20use%20a%20Tries%20tree%20to%20figure%20out%20which%20search%20would%20corrolate%20most&full_name=CakeCrusher%2Ftech-int-prep

const font = fetch(
  new URL("../../assets/SourceCodePro-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
  const fontData = await font;
  const { searchParams } = new URL(req.url);

  const title = decodeURIComponent(searchParams.get("title"));
  const description = decodeURIComponent(searchParams.get("description"));
  const full_name = decodeURIComponent(searchParams.get("full_name"));

  // generate random number between 0 and 1
  const isTop = Math.round(Math.random());
  // generate random number between 0 and 2
  const xPos = Math.floor(Math.random() * 3);

  // const title = "Image 1";
  // const image = "https://placekitten.com/200/300";
  // const width_ = 1000;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          padding: "15px",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f0f23",
          color: "#cccccc",
        }}
      >
        {/* Body */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              width: "100%",
              opacity: isTop ? 1 : 0,
              justifyContent:
                xPos === 0 ? "flex-start" : xPos === 1 ? "center" : "flex-end",
            }}
          >
            <img
              style={{
                width: "30px",
                width: "30px",
              }}
              src="https://adventofcode.com/favicon.png"
              alt="logo"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* AoC branding */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h1
                style={{
                  textDecoration: "none",
                  color: "#00cc00",
                  fontSize: "60",
                }}
              >
                Advent of Code
              </h1>
            </div>
            {/* Repo */}
            <div style={{ display: "flex" }}>
              <p style={{ fontSize: "35", color: "#009900" }}>
                {"[" + full_name + "]"}
              </p>
            </div>
          </div>
          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "40px",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                fontSize: "50",
              }}
            >
              {"--- " + title + " ---"}
            </h2>
            <p
              style={{
                fontSize: "35",
              }}
            >
              {description}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            opacity: isTop ? 0 : 1,
            justifyContent:
              xPos === 0 ? "flex-start" : xPos === 1 ? "center" : "flex-end",
          }}
        >
          <img
            style={{
              width: "30px",
              width: "30px",
            }}
            src="https://adventofcode.com/favicon.png"
            alt="logo"
          />
        </div>
      </div>
    ),
    {
      // width: parseInt(width_),
      // height: parseInt(width_) == 500 ? 1000 : 500,
      fonts: [
        {
          name: "Source Code Pro",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
