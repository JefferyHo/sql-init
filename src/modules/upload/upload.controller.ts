import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { diskStorage } from 'multer';
import * as path from 'path';

export const fileStorage = diskStorage({
  destination: path.join(__dirname, '../../../../uploads'),
  // 自定义上传的文件名字
  filename: (req, file, cb) => {
    const singFileArray = file.originalname.split('.');
    const fileExtension = singFileArray[singFileArray.length - 1]; // 文件后缀名
    const newFilename = `${singFileArray[0]}_${Date.now()}.${fileExtension}`;
    cb(null, newFilename);
  },
});

@Controller('upload')
export class UploadController {
  @Post('pic')
  @UseInterceptors(
    FileInterceptor('pic', {
      dest: 'uploads',
      storage: fileStorage,
      limits: {
        fileSize: 1024 * 1024 * 2,
      },
      fileFilter(req, file, cb) {
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.jpeg'].includes(extname)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('只支持png/jpg/jpeg上传'), false);
        }
      },
    }),
  )
  uploadPic(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const baseServerUrl = `${req.protocol}://${req.get('host')}`;
    return `${baseServerUrl}/uploads/${file.filename}`;
  }
}
