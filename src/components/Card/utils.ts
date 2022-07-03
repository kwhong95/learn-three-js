import * as THREE from 'three'
import { DragRef, MouseRef } from 'interfaces'
import { CardType } from './type'
import { cardMovementSpringConf } from './config'

export const nthDigit = (ntn: number, number: number) =>
  Number(number.toString().split('.')[1][ntn])

export const hoverTilt = (
  baseRotation: [number, number, number],
  mouse: MouseRef,
) => {
  if (!mouse.object) return baseRotation

  let bbox = new THREE.Box3().setFromObject(mouse.object)

  const mX =
    mouse.hoverPosition.x >= 0
      ? mouse.hoverPosition.x / bbox.max.x
      : -mouse.hoverPosition.x / bbox.min.x
  const mY =
    mouse.hoverPosition.y >= 0
      ? mouse.hoverPosition.y / bbox.max.y
      : -mouse.hoverPosition.y / bbox.min.y

  return [
    baseRotation[0] + mY * THREE.MathUtils.degToRad(5),
    baseRotation[1] + -mX * THREE.MathUtils.degToRad(10),
    baseRotation[2],
    'ZXY',
  ]
}

export const dragTilt = (
  baseRotation: [number, number, number],
  drag: DragRef,
  factor = 1,
  rangeFactor = 1,
) => {
  const { vX, vY, dX, dY } = drag
  return [
    THREE.MathUtils.clamp(
      baseRotation[0] + vY * dY * factor,
      -0.25 * rangeFactor,
      0.25 * rangeFactor,
    ),
    THREE.MathUtils.clamp(
      baseRotation[1] + vX * dX * factor,
      -0.25 * rangeFactor,
      0.25 * rangeFactor,
    ),
    baseRotation[2],
  ]
}

export const cardsLayout = (
  i: number,
  focus: number,
  cards: CardType[],
  hover: boolean[],
  mouse: MouseRef,
) => {
  const num = cards.length - 1
  const height = num * 0.05
  const width = num * 0.6
  const tilt = num * 0.005
  const j = i > focus ? i - 1 : i
  const phase = num === 1 ? 0 : j / (num - 1) - 0.5
  return {
    scale: [0.4, 0.4, 0.4],
    position: [
      phase * width,
      -2.25 - Math.abs(phase * height) + (hover[i] ? 0.1 : 0),
      phase * 0.01 + (hover[i] ? 0.2 : 0),
    ],
    rotation: hover[i]
      ? hoverTilt([0, 0, -phase * Math.PI * tilt], mouse)
      : [0, 0, -phase * Math.PI * tilt],
    config: cardMovementSpringConf,
  }
}
