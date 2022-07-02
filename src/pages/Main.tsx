import { Column, Container, MainHeading, Section } from 'styles'
import { ThreeCanvas } from 'components'

const Main = () => {
  return (
    <Container>
      <ThreeCanvas />
      <Section inverse height="100vh" position="relative">
        <Column justify="center" align="center" height="100%">
          <MainHeading inverse>Learn ThreeJS with React</MainHeading>
        </Column>
      </Section>
    </Container>
  )
}

export default Main
