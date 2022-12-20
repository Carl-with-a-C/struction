import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const uploader = new Uploader({
  // Get production API keys from Upload.io
  apiKey: "free",
});

const UploadBtn = () => {
  return (
    <UploadButton
      uploader={uploader}
      options={{ multi: true }}
      onComplete={(files) => console.log(files)}
    >
      {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
    </UploadButton>
  );
};

export default UploadBtn;
