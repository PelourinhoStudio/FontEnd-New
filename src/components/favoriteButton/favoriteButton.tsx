import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'


export function FavoriteButton() {

  const [isFavorite, setisFavorite] = useState(false)
  useEffect(() => {
    setisFavorite(false)
  }, [isFavorite])

  return (
    <IconButton aria-label="favorites" bgColor="#14387B">
      {
        isFavorite ? (
          <AiFillHeart color="#FFF" />
        ) : (
          <AiOutlineHeart color="#FFF" />
        )
      }
    </IconButton>
  )
}