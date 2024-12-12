import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleIcon from "../images/google-icon-logo-svgrepo-com.svg"
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';

const CLIENT_ID = "926967202086-bd20ef0jq9nqqlgqfpnksek52s08thmt.apps.googleusercontent.com";
const API_KEY = "AIzaSyD78NqVkA58j6GkFuPgp1SH3RFBVpegjjw";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

const GoogleDriveUploader = ({ triggerValue, fileProps }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [accessKey,setAccessKey] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["googleDriveAccessKey"]);

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  useEffect(() => {
    setFile(fileProps)
  }, [fileProps])

  useEffect(() => {
      if(triggerValue != 0){
        uploadFileToDrive();
      }
  }, [triggerValue])

  const initClient = () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES,
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);
      setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
    }).catch(error => {
      console.error("Google API hatası:", error);
    });
  };

  const handleAuthClick = () => { 
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      gapi.auth2.getAuthInstance().signIn().then(user => {
      console.log("User signed in:", user);
      setAccessKey(user.xc.access_token)
      setCookie("googleDriveAccessKey",user.xc.access_token, {path: "/", expires: oneYearFromNow})
      setIsSignedIn(true);
    }).catch(error => {
      console.error("Giriş hatası:", error);
    });
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsSignedIn(false);
      console.log("User signed out");
      removeCookie("googleDriveAccessKey", {path: "/"});
    });
  };

  const uploadFileToDrive = async () => {
    if (!file) {
      alert("Lütfen bir dosya seçin.");
      return;
    }
    
    toast.loading("Google Drive'a yedekleniyor...")
    const metadata = {
      name: file.name,  
      mimeType: file.type,  
    };
  
    const formData = new FormData();
    formData.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    formData.append("file", file);  
  
    try {
      const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + cookies.googleDriveAccessKey
          },
          body: formData,  
        }
      );
      const data = await response.json();
      toast.dismiss();
      if (response.ok) {
        console.log("Dosya başarıyla yüklendi:", data);
        toast.success("Google Drive'a yedeklendi")
      } else {
        console.error("Yükleme hatası:", data.error);
        toast.error("Google Drive'a yedeklenirken bir hata oluştu. Lütfen sayfayı kapatmayın ve geliştirici ile iletişime geçin")
      }
    } catch (error) {
      console.error("Yükleme hatası:", error);
      toast.error("Dosya Google Drive'a yedeklenirken hata oluştu. Lütfen sayfayı kapatmayın ve geliştirici ile iletişime geçin")
    }
  };
  
  
  

  return (
    <div className='mt-12 '>
      {!isSignedIn ? (
        
        <div className='flex items-center p-2 rounded-lg border cursor-pointer' onClick={handleAuthClick} >
            <img src={GoogleIcon} className='w-[35px]' alt="" />
            <button className='ms-4'>Google Hesabınızla giriş yapın</button>
        </div>
      ) : (
        <div className='flex flex-col me-4'>
          {/* <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            accept="image/*, .pdf, .txt, .doc, .docx, .pptx" 
          /> */}
          <p>Yukarıdaki kısımdan <br /> fotoğrafı yüklediğinize otomatik <br /> olarak fotoğraf yedeklenecektir.</p>
          {/* <button onClick={uploadFileToDrive}>Dosya Yükle</button> */}
          <button onClick={handleSignOut} className='bg-red-500 hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded-lg text-white inter-500 mt-4'>Çıkış Yap</button>
        </div>
      )}
    </div>
  );
};

export default GoogleDriveUploader;
