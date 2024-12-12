import React, { useEffect, useState } from 'react';
import BackupGoogleDrive from "./BackupGoogleDrive"
import toast from 'react-hot-toast';
import axios from 'axios';

const ImageUploader = ({mainTriggerProps}) => {
  const [image, setImage] = useState(null); 
  const [imageUrl, setImageUrl] = useState(''); 
  const [value,setValue] = useState(0);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if(mainTriggerProps == 1){
      handleUpload();
    }
  }, [mainTriggerProps])

  const handleUpload = async () => {
    toast.loading("Fotoğraf buluta yedekleniyor...")
    if (!image || image == null) {
       toast.error("Lütfen bir resim seçin")
      return;
    }

    const formData = new FormData(); 
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default'); 

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dysmzoorv/image/upload',
        formData
      );
      console.log(response.data);
      setValue(1)
      setImageUrl(response.data.secure_url); 
      toast.dismiss();
      toast.success("Fotoğraf başarıyla yüklendi")
    } catch (error) {
      toast.error("Fotoğraf yüklenirken hata oluştu, lütfen sayfayı kapatmayın, değiştirmeyin ve geliştirici ile iletişime geçin")
      console.error('Resim yükleme hatası:', error);
    }
  };


  return (
    <div className='flex flex-col items-end'>
      <div className='flex flex-col'>
          <input type="file" className='bg-sky-500 hover:bg-sky-600 transition-all duration-300 px-4 py-2 rounded-lg  text-white' onChange={handleImageChange} />
      </div>

      {imageUrl && (
        <div className='flex flex-col items-center my-4'>
          <h2>Yüklenen Resim:</h2>
          <img src={imageUrl} alt="Uploaded" className='rounded-lg' style={{ width: '300px' }} />
        </div>
      )}
      <BackupGoogleDrive  fileProps={image} triggerValue={value}/>
    </div>
  );
};

export default ImageUploader;

