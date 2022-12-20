import { Carousel } from "react-carousel-minimal";

const Gallery = () => {
  const data = [
    {
      image:
        "https://img.hunkercdn.com/1260x/cme-data/getty%2Fae3bf7877cc443838533c09b3254b39b.jpg?type=webp",
      caption: "Copper Pipes",
    },
    {
      image:
        "https://www.moneypit.com/wp-content/uploads/2009/02/AdobeStock_2918501-1200x900.jpeg",
      caption: "2nd angle",
    },
    {
      image:
        "https://www.ocregister.com/wp-content/uploads/migration/mq5/mq5eu8-b781129572z.120130718130552000gta1esbk4.1.jpg?w=780",
      caption: "Pinhole leak",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  return (
    <section className="Gallery">
      <main style={{ textAlign: "center", padding: "0 20px" }}>
        <h2>Project Pin2 Images</h2>
        <p>There is a big crack in this pipe</p>

        <Carousel
          data={data}
          time={2000}
          width="850px"
          height="500px"
          captionStyle={captionStyle}
          radius="10px"
          slideNumber={true}
          slideNumberStyle={slideNumberStyle}
          captionPosition="bottom"
          automatic={false}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          thumbnails={true}
          thumbnailWidth="300px"
          style={{
            textAlign: "center",
            maxWidth: "850px",
            maxHeight: "500px",
            margin: "40px auto",
          }}
        />
      </main>
    </section>
  );
};

export default Gallery;
