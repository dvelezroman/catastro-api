import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';

class UploadImageDto {
  @ApiProperty({
    description: 'Folder name within the S3 bucket (optional)',
    example: 'catastro/restaurants',
    required: false,
  })
  subfolder?: string;
}

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Upload an image to S3',
    description:
      'Uploads an image file to AWS S3 bucket and returns the public URL. Supports JPEG, PNG, GIF, and WebP formats with a maximum file size of 5MB.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload with optional subfolder',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file (JPEG, PNG, GIF, WebP) - Max size: 5MB',
        },
        subfolder: {
          type: 'string',
          description: 'Folder name within the S3 bucket (optional)',
          example: 'catastro/restaurants',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
          description: 'The public URL of the uploaded image',
          example:
            'https://recipes-manabi-images.s3.us-east-1.amazonaws.com/catastro/restaurants/uuid-filename.jpg',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request - invalid file or validation failed',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'string',
          examples: {
            noFile: {
              summary: 'No file provided',
              value: 'No file provided',
            },
            invalidType: {
              summary: 'Invalid file type',
              value:
                'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.',
            },
            fileTooLarge: {
              summary: 'File too large',
              value: 'File size too large. Maximum size is 5MB.',
            },
            uploadFailed: {
              summary: 'Upload failed',
              value: 'Failed to upload image: [error details]',
            },
          },
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description:
      'Internal server error - S3 service unavailable or configuration issues',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 500,
        },
        message: {
          type: 'string',
          example: 'Internal server error',
        },
        error: {
          type: 'string',
          example: 'Internal Server Error',
        },
      },
    },
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadImageDto,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const url = await this.uploadService.uploadImage(file, uploadDto.subfolder);

    return {
      url,
    };
  }
}
