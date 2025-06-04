import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { Request } from 'express';
import { ApiNoContentResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { PostLikeDto } from './_utils/dto/request/post-like.dto';
import { UserDocument } from 'src/users/users.schema';
import { Protect } from 'src/auth/_utils/decorator/protect.decorator';
import { ConnectedUser } from 'src/users/_utils/decorator/connecter-user.decorator';
import { AddLikeDto } from './_utils/dto/request/add-like-dto';





@ApiTags('Likes')
@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
  ) { }


  @Get(':likeId')
  @ApiOperation({ summary: "Get 1 Like" })
  getLike(@Param('likeId') likeId: string) {
    return this.likeService.getLikeFromId(likeId);
  }

  @Protect()
  @Get()
  @ApiOperation({ summary: 'Count all likes for each mangaId on the page' })
  getAllLikes(
    @ConnectedUser() user: UserDocument,
    @Query('mangaIdString') mangaIdString: string
  ) {
    const ids = mangaIdString.split(',').map(id => id.trim());
    return this.likeService.getLikes(user.recoveryToken!, ids);
  }



  @Protect()
  @Post(':mangaId/like')
  @ApiParam({ type: 'number', name: 'mangaId' })
  @ApiOperation({ summary: 'Like this manga.' })
  @ApiNoContentResponse({ description: 'Like added.' })
  addLike(
    @ConnectedUser() user: UserDocument, 
    @Param('mangaId') mangaId: number, 
  ) {
    return this.likeService.addLike(user, mangaId);
  }


  @Protect()
  @Post(':mangaId/unlike')
  @ApiOperation({ summary: 'Remove like from this manga.' })
  @ApiNoContentResponse({ description: 'Like removed.' })
  removeLikeGiac(
    @ConnectedUser() user: UserDocument, 
    @Param('mangaId') mangaId: number
  ) {
    // user comes from the token
    return this.likeService.removeLikeGiac(user, mangaId);
  }


  @Protect()
  @Delete(':mangaId/unlike')
  @ApiParam({ type: 'string', name: 'mangaId' })
  @ApiOperation({ summary: 'Delete like from this manga.' })
  @ApiNoContentResponse({ description: 'Like deleted.' })
  deleteLike(
    @ConnectedUser() user: UserDocument, 
    @Param('mangaId') mangaId: number
  ) {
    return this.likeService.deleteLikeGiac(user, mangaId);
  }

}
