import { NextRequest, NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dqsxrpsaf', 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET 
});

export async function POST(req:NextRequest)  {
    const { path} = await req.json()

    if(!path) {
        return NextResponse.json(
            {message: 'Image path is required'}, 
            {status: 400}
        )
    }

    try {
        const options = {
            use_filename: true,
            uinque_filename: false,
            overwrite: true,
            transformation: [{width: 1000, height: 752, crop: 'scale'}]
        }
        const result = await cloudinary.uploader.upload(path, options)
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        console.log('Image upload error:- ',error);
        return NextResponse.json(error, {status: 500})
    }
}