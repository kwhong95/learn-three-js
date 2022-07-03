import React, { useState, useEffect, useRef } from 'react'
import { useControls } from 'leva'
import { useSprings, animated } from '@react-spring/three'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'

import { useStore } from 'components/Card/Store'
import {
  cardMovementSpringConf,
  cardSpringConf,
  defaultCardCount,
  focusCardLayout,
} from 'components/Card/config'
import { DragRef, MouseRef } from 'interfaces'
import {
  cardsLayout,
  dragTilt,
  hoverTilt,
  nthDigit,
} from 'components/Card/utils'
import SuspendedCard from 'components/Card'
import Table from 'components/Card/Table'

const Scene = () => {
  const { cards, setCards, focus, flip, setFocus } = useStore()
  const [hover, setHover] = useState<boolean[]>(Array(cards.length))

  const { cardCount } = useControls({
    cardCount: {
      value: defaultCardCount,
      step: 1,
      min: 1,
      max: 10,
    },
  })

  useEffect(() => setCards(cardCount), [cardCount, setCards])

  useEffect(() => setHover(Array(cards.length)), [cards])

  const clock = useRef({
    tick: 0,
    lastTick: 0,
    tps: 30,
    elapsed: 0,
    prevElapsed: 0,
    animOffset: 0,
  })

  const scene = useRef<THREE.Scene>()
  const mouse = useRef<MouseRef>({
    hoverPosition: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    object: undefined,
  })
  const drag = useRef<DragRef>({
    x: 0,
    y: 0,
    vX: 0,
    vY: 0,
    dX: 0,
    dY: 0,
    object: undefined,
    dragging: false,
    dragged: false,
  })

  const [{ tps, debugOnFrame }, setConf] = useControls(() => ({
    tps: clock.current.tps,
    debugOnFrame: false,
  }))

  const [springs, springApi] = useSprings(cards.length, (i) => {
    if (i === focus) return focusCardLayout
    else return cardsLayout(i, focus, cards, hover, mouse.current)
  })

  useFrame((state) => {
    if (!scene.current) scene.current = state.scene

    const t = state.clock.getElapsedTime()
    const c = clock.current
    c.prevElapsed = c.elapsed
    c.elapsed = t
    c.tps = tps

    mouse.current.position.x = state.mouse.x
    mouse.current.position.y = state.mouse.y

    if (t - c.lastTick > c.tps) {
      c.lastTick = t
      c.tick++
    }

    if (!(c.elapsed - c.lastTick >= 1 / c.lastTick)) return

    if (drag.current.dragging) {
      springApi.start((i) => {
        if (i === drag.current.i) {
          return {
            position: [
              (state.mouse.x * state.viewport.width) / 3,
              (state.mouse.y * state.viewport.height) / 3,
              1,
            ],
            rotation: dragTilt([0, 0, 0], drag.current),
            config: cardMovementSpringConf,
          }
        }
      })
    } else if (hover[focus]) {
      springApi.start((i) => {
        if (i === focus) {
          return {
            config: cardSpringConf,
            rotation: hoverTilt([0, 0, 0], mouse.current),
            scale: [0.85, 0.85, 0.85],
          }
        } else {
          return cardsLayout(i, focus, cards, hover, mouse.current)
        }
      })
    }

    if (focus === drag.current.i || hover[focus]) {
      c.animOffset += c.elapsed - c.prevElapsed
    } else {
      const speed = 0.33
      const cycle = Math.sin((c.elapsed - c.animOffset) * speed)

      if (c.elapsed > 5 && cycle > 0 && nthDigit(0, cycle) === 9) {
        const prevCycle = Math.sin((c.prevElapsed - c.animOffset) * speed)
        if (nthDigit(1, cycle) === 1 && nthDigit(1, prevCycle) === 0) {
          flip(focus)
        }
      }

      springApi.start((i) => {
        if (i !== focus) return
        return Object.assign({}, focusCardLayout, {
          position: [
            cycle * 1,
            focusCardLayout.position[1] +
              Math.sin(clock.current.elapsed * 2) * 0.025,
            focusCardLayout.position[2] + Math.abs(cycle * 0.25),
          ],
          rotation: [0, cycle * -Math.PI * 0.05, 0],
          config: cardSpringConf,
        })
      })
    }

    if (!drag.current.dragging) {
      springApi.start((i) => {
        if (i === focus) return
        if (drag.current.dragging && drag.current.i === i) return
        return cardsLayout(i, focus, cards, hover, mouse.current)
      })
    }

    if (debugOnFrame) {
      setConf({ debugOnFrame: false })
      debugger
    }
  })

  const bindGesture = useGesture(
    {
      onDrag: ({
        args: [i],
        velocity: [vX, vY],
        direction: [dX, dY],
        event,
      }) => {
        const e = event as unknown as ThreeEvent<MouseEvent>
        event.stopPropagation()

        drag.current.x = e.point.x
        drag.current.y = e.point.y
        drag.current.vX = vX
        drag.current.vY = vY
        drag.current.dX = dX
        drag.current.dY = dY
      },

      onDragStart({ args: [i] }) {
        drag.current.i = i
        drag.current.dragging = true
        drag.current.dragged = true
      },

      onDragEnd({ args: [i] }) {
        if (drag.current.i && mouse.current.position.y > -0.3)
          setFocus(drag.current.i)
        drag.current.dragging = false
        drag.current.i = undefined
      },

      onMove({ event }) {
        const e = event as unknown as ThreeEvent<MouseEvent>
        mouse.current.hoverPosition.x = e.point.x
        mouse.current.hoverPosition.y = e.point.y
        mouse.current.object = e.eventObject
      },
    },

    {
      drag: {
        threshold: [10, 10],
      },
    },
  )

  const bindReactGestures = (i: number) => ({
    onClick: (e: MouseEvent) => {
      e.stopPropagation()

      if (drag.current.dragged) {
        drag.current.dragged = false
        return
      }

      if (focus === i) {
        flip(focus)
      } else {
        setFocus(i)
      }

      setHover(hover.map((x) => false))
    },

    onPointerOver: (e: MouseEvent) => {
      e.stopPropagation()
      const n = [...hover.map((x) => false)]
      n.splice(i, 1, true)
      setHover(n)
    },

    onPointerOut: (e: MouseEvent) => {
      e.stopPropagation()
      const n = [...hover]
      n.splice(i, 1, false)
      setHover(n)
    },
  })

  return (
    <group name="prview">
      <group name="preview-cards" position={[0, 0, 0.1]}>
        {cards.map((card: any, i: number) => {
          const springProps = springs[i]

          return (
            <animated.group
              {...(bindGesture(i) as any)}
              {...(bindReactGestures(i) as any)}
              key={`card${i}`}
              name={`card${i}`}
            >
              <SuspendedCard
                {...springProps}
                flip={cards[i].flip}
                lift={cards[i].lift}
              />
            </animated.group>
          )
        })}
      </group>
      <Table position={[0, 0, 0]} receiveShadow />
      <directionalLight
        intensity={0.25}
        position={[0, 1, 3]}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-camera-far={10}
        shadow-camera-near={0}
        shadow-camera-bottom={-5}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.75} />
    </group>
  )
}

export default Scene
