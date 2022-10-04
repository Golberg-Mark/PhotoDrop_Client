import heic2any from 'heic2any';

const heicConverter = async (file: File) => {
  const blob = new Blob([file]);
  const fileName = file.name.replace(/\.[^/.]+$/, "");
  const output = await heic2any({ blob, toType: 'image/jpeg' }).then(result => result as Blob);

  return URL.createObjectURL(new File([output], `${fileName}.jpeg`));
};

export default heicConverter;
