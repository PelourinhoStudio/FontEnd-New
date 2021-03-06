import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { api } from "../../services/api";
import { parseCookies } from "nookies";


export function FavoriteButton({ id }: any) {

  const [isFavorite, setisFavorite] = useState(false)

  useEffect(() => {
    const { "studio.token": token }: any = parseCookies()

    api.get("/me/images/favorites", { headers: { "x-access-token": token } })
      .then(
        res => {
          res.data.flat()[0]?.favorites.forEach((image: any) => {
            if (image._id == id) {
              setisFavorite(true)
            }
          });
        }
      )
  })

  async function handleFavorite() {
    const { "studio.token": token }: any = parseCookies()

    await api.put("/me/images/favorites/" + id, {}, {
      headers: {
        "x-access-token": token
      }
    })
      .then(res => {
        setisFavorite(!isFavorite)
      }).catch(err => console.log(err))
  }

  return (
    <IconButton aria-label="favorites" bgColor="#14387B" onClick={handleFavorite}>
      {
        isFavorite ? (
          <AiFillStar color="#FFF" />
        ) : (
          <AiOutlineStar color="#FFF" />
        )
      }
    </IconButton>
  )
}