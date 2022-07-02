import styled from '@emotion/styled'

export const FullWidth = 1300
export const WidthPadding = 50

export const Container = styled.div`
  width: 100%;
  max-width: ${FullWidth}px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 ${WidthPadding}px;
  @media screen and (max-width: 960px) {
    padding: 0 30px;
  }
`
interface IMainHeading {
  inverse?: boolean
}

export const MainHeading = styled.h1<IMainHeading>`
  font-size: clamp(2.3rem, 6vw, 4.5rem);
  margin-bottom: 2rem;
  color: ${({ inverse }) => (inverse ? '#000' : '#fff')};
  width: 100%;
  letter-spacing: 4px;
  text-align: center;
`

interface IHeading {
  margin?: string
  mb?: string
  mt?: string
  inverse?: boolean
  width?: string
}

export const Heading = styled.h2<IHeading>`
  font-size: clamp(1.3rem, 13vw, 3.1rem);
  margin: ${({ margin }) => (margin ? margin : '')};
  margin-bottom: ${({ mb }) => (mb ? mb : '')};
  margin-top: ${({ mt }) => (mt ? mt : '')};
  color: ${({ inverse }) => (inverse ? '#000' : '#fff')};
  letter-spacing: 0.4rem;
  line-height: 1.06;
  text-align: center;
  width: ${({ width }) => (width ? width : '100%')};
`

interface ITextWrapper {
  size?: string
  weight?: string
  spacing?: string
  padding?: string
  margin?: string
  mb?: string
  mt?: string
}

export const TextWrapper = styled.span<ITextWrapper>`
  color: ${({ color }) => (color ? color : '')};
  font-size: ${({ size }) => (size ? size : '')};
  font-weight: ${({ weight }) => (weight ? weight : '')};
  letter-spacing: ${({ spacing }) => (spacing ? spacing : '')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  margin-bottom: ${({ mb }) => (mb ? mb : '')};
  margin-top: ${({ mt }) => (mt ? mt : '')};
`

interface ISection {
  padding?: string
  margin?: string
  inverse?: boolean
  position?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  height?: string
  maxHeight?: string
  minHeight?: string
  smPadding?: string
}

export const Section = styled.section<ISection>`
  padding: ${({ padding }) => (padding ? padding : '140px 0')};
  margin: ${({ margin }) => (margin ? margin : '')};
  background: ${({ inverse }) => (inverse ? 'white' : '#000')};
  position: ${({ position }) => (position ? position : '')};
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
  @media screen and (max-width: 768px) {
    padding: ${({ smPadding }) => (smPadding ? smPadding : '70px 0')};
  }
`

interface IFlexProps {
  justify?: string
  align?: string
  gap?: string
  padding?: string
  margin?: string
  position?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  height?: string
  maxHeight?: string
  minHeight?: string
  wrap?: string
}

export const Row = styled.div<IFlexProps>`
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : '')};
  align-items: ${({ align }) => (align ? align : '')};
  gap: ${({ gap }) => (gap ? gap : '')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  position: ${({ position }) => (position ? position : '')};
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : '')};
`

export const Column = styled.div<IFlexProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => (justify ? justify : '')};
  align-items: ${({ align }) => (align ? align : '')};
  gap: ${({ gap }) => (gap ? gap : '')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  position: ${({ position }) => (position ? position : '')};
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
`
