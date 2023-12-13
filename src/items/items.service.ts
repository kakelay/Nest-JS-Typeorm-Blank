import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { CreateCommentDto } from './dto/create-commments.dto';
import { Comment } from './entities/comment.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });
    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );
    const item = new Item({
      ...createItemDto,
      commnnets: [],
      tags,
      listing,
    });
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, commnnets: true, tags: true },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id });
    item.public = updateItemDto.public;
    const comments = updateItemDto.comments.map(
      (CreateCommentDto) => new Comment(CreateCommentDto),
    );
    item.commnnets = comments;
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    await this.itemsRepository.delete(id);
  }
}
