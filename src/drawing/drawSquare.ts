import { drawRectangle } from "./drawRectangle"

export const drawSquare = async (width: number) => {
  return drawRectangle(width, width)
}