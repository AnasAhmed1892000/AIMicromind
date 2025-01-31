import { baseUrl } from "@/network";
import React, { useState, useEffect } from "react";
import { Image, View, ActivityIndicator } from "react-native";

const AdjustableImage = ({
  item,
}: {
  item: {
    type: string;
    _id: string;
    chat: string;
    sender: string;
    text: string;
    file: string;
    starred: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);

  const imageUrl =
    item.sender === "user" ? `${baseUrl}${item.file}` : item.file;

  useEffect(() => {
    if (imageUrl) {
      Image.getSize(
        imageUrl,
        (width, height) => {
          const maxWidth = 300; // Max width constraint
          const scaleFactor = maxWidth / width;
          const adjustedHeight = height * scaleFactor;

          setImageSize({ width: maxWidth, height: adjustedHeight });
          setLoading(false);
        },
        (error) => {
          console.log("Image loading error:", error);
          setLoading(false);
        }
      );
    }
  }, [imageUrl]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color="gray" />
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: imageSize.width,
            height: imageSize.height,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default AdjustableImage;
