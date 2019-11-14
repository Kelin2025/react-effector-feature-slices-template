import * as React from "react";
import styled from "styled-components";

type BoxT = React.FunctionComponent<{
  align?: "start" | "center" | "end";
  inline?: boolean;
  vertical?: boolean;
  width?: number | string;
  cols?: number | string | number[] | string[];
  rows?: number | string | number[] | string[];
  gap?: number | string;
  justify?: "start" | "center" | "end" | "space-between";
  padding?: number | string;
  className?: string;
}>;

const align = props => props.align || "center";

const display = props => (props.inline ? "inline-grid" : "grid");

const flow = props => props.flow || "initial";

const width = props => props.width || "initial";

const cols = props =>
  props.cols
    ? Array.isArray(props.cols)
      ? props.cols.join(" ")
      : typeof props.cols === "number"
      ? `repeat(${props.cols}, 1fr)`
      : props.cols
    : `auto`;

const rows = props =>
  props.rows
    ? Array.isArray(props.rows)
      ? props.rows.join(" ")
      : `repeat(${props.rows}, 1fr)`
    : `auto`;

const gap = props =>
  "gap" in props
    ? typeof props.gap === "string"
      ? props.gap
      : `${props.gap}px`
    : `10px`;

const justify = props => props.justify || "start";

const padding = props =>
  "padding" in props
    ? typeof props.padding === "string"
      ? props.padding
      : `${props.padding}px`
    : `0px`;

const BoxView: BoxT = React.forwardRef(
  ({ tag = "div", className, children, ...props }, ref) => {
    const Tag = tag;

    return (
      <Tag ref={ref} className={className} {...props}>
        {children}
      </Tag>
    );
  }
);

export const Box = styled(BoxView)`
  width: ${width};
  align-items: ${align};
  display: ${display};
  grid-auto-flow: ${flow};
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};
  grid-gap: ${gap};
  justify-content: ${justify};
  padding: ${padding};
`;
