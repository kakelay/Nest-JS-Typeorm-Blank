import { CreateListingDto } from "./creat-listing.dto";

export class CreateItemDto {
    name: string;
    public: boolean;
    listing:CreateListingDto

}
