import { Label } from "@/components/ui/label";
import { PhotoFieldsFragment } from "@/gql/graphql";
import { getImageUrl } from "@/utils/utils";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImageUploadForm } from "./ImageUpload";
import { ModalDrawer } from "./ModalDrawer";

interface ImagePickerProps {
  value: PhotoFieldsFragment[];
  setValue: (images: PhotoFieldsFragment[]) => void;
}

export function ImagePicker({ value, setValue }: ImagePickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  let primaryPhoto = value?.find((photo) => photo.isPrimary);
  if (!primaryPhoto && value?.length > 0) {
    primaryPhoto = value[0];
  }

  console.log(value);
  return (
    <div className="grid gap-2">
      <Label>Photos</Label>
      <div className="bg-white overflow-hidden rounded-md">
        <Image
          alt="Product image"
          className="aspect-square w-full object-cover"
          height="300"
          src={
            primaryPhoto ? getImageUrl(primaryPhoto.url) : "/placeholder.jpg"
          }
          width="300"
        />
        <div className="grid grid-cols-3 gap-2 px-4 py-4">
          {value
            ?.filter((photo) => photo.id !== primaryPhoto?.id)
            .map((photo) => {
              console.log("filtered photo", photo);
              return (
                <Image
                  key={photo.id}
                  alt="Recipe Image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="84"
                  src={getImageUrl(photo.url)}
                  width="84"
                />
              );
            })}

          <ModalDrawer
            title="Upload photo"
            open={open}
            setOpen={setOpen}
            content={
              <ImageUploadForm
                onUploadedPhoto={(photo) => {
                  console.log("On uploaded photo", photo);
                  setValue([...value, photo]);
                }}
              />
            }
            trigger={
              <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </button>
            }
          ></ModalDrawer>
        </div>
      </div>
    </div>
  );
}
