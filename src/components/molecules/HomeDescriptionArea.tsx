import { FC } from 'react';
import styled from 'styled-components';

/** component */
import { FirstHeadingText } from 'src/components/atoms';

type Props = {
  title: string;
  description: string;
};

const HomeDescriptionArea: FC<Props> = (props) => (
  <Container>
    <TitleArea>{props.title}</TitleArea>
    <Description>{props.description}</Description>
  </Container>
);

const Container = styled.div`
  margin-bottom: 40px;
`;

const TitleArea = styled(FirstHeadingText)`
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 24px;
`;

export default HomeDescriptionArea;
