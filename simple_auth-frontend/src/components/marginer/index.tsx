import styled from "styled-components";

interface MarginProps {
  margin: string | number;
}

const HorizontalMargin = styled.span<MarginProps>`
  display: flex;
  width: ${({ margin }) =>
      typeof margin === "string" ? margin : `${margin}px`};
`;

const VerticalMargin = styled.span<MarginProps>`
  display: flex;
  height: ${({ margin }) =>
      typeof margin === "string" ? margin : `${margin}px`};
`;

interface MarginerProps {
  direction?: "horizontal" | "vertical";
  margin: string | number;
}

const Marginer: React.FC<MarginerProps> = (props) => {
  const { direction = "horizontal" } = props;

  if (direction === "horizontal") {
    return <HorizontalMargin {...props} />;
  } else {
    return <VerticalMargin {...props} />;
  }
};

Marginer.defaultProps = {
  direction: "horizontal",
};

export { Marginer };