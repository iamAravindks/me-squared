import axios from "axios";


export const uploadImg = async (filename) => {
  const formData = new FormData();
  formData.append("file", filename);
  formData.append("upload_preset", "edlblbdi");
  console.log(filename);
  const res = await axios.post(
    ` https://api.cloudinary.com/v1_1/dlgosw3g3/image/upload`,
    formData
  );
  return  res.data.public_id;
};

function hashCode(str) {
  // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

export function stringAvatar(name) {
  // return {
  //   sx: {
  //     backgroundColor: `#${intToRGB(hashCode(name))}`,
  //   },
  //   children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  // };
  return `#${intToRGB(hashCode(name))}`
}

