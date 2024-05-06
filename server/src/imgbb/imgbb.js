import { imgbbUploader } from "imgbb-uploader"; 

function imgbbUpload(image) {
    const options = {
        apiKey: '4b5afd5caf4c66ab6f10a723d2e48cbe', // MANDATORY
      
        base64string:
          image,
        // OPTIONAL: pass base64-encoded image (max 32Mb)
    };
      
    return imgbbUploader(options)
        .then((response) => response)
        .catch((error) => console.error(error));
}

export default {
    imgbbUpload
};
