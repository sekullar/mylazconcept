import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const CloudinaryImage = ({ imageName, width = 500, height = 500 }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dysmzoorv' 
    }
  });

  const img = cld
    .image(imageName)
    .format('auto')
    .quality('auto')
    .resize(
      auto()
        .gravity(autoGravity())
        .width(width)
        .height(height)
    );

  return <AdvancedImage cldImg={img} />;
};

export default CloudinaryImage;
