import * as React from "react"
import { styled } from "linaria/react"

type BoxT = React.FunctionComponent<{
  align?: "start" | "center" | "end"
  inline?: boolean
  vertical?: boolean
  cols?: number | string | number[] | string[]
  rows?: number | string | number[] | string[]
  gap?: number | string
  justify?: "start" | "center" | "end" | "space-between"
  padding?: number | string
  className?: string
}>

const align = props => props.align || "center"

const display = props => (props.inline ? "inline-grid" : "grid")

const flow = props => props.flow || "initial"

const cols = props =>
  props.cols
    ? Array.isArray(props.cols)
      ? props.cols.join(" ")
      : `repeat(${props.cols}, 1fr)`
    : `auto`

const rows = props =>
  props.rows
    ? Array.isArray(props.rows)
      ? props.rows.join(" ")
      : `repeat(${props.rows}, 1fr)`
    : `auto`

const gap = props =>
  "gap" in props
    ? typeof props.gap === "string"
      ? props.gap
      : `${props.gap}px`
    : `10px`

const justify = props => props.justify || "start"

const padding = props =>
  "padding" in props
    ? typeof props.padding === "string"
      ? props.padding
      : `${props.padding}px`
    : `0px`

export const Box: BoxT = styled.div`
  align-items: ${align};
  display: ${display};
  grid-auto-flow: ${flow};
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};
  grid-gap: ${gap};
  justify-content: ${justify};
  padding: ${padding};
`
