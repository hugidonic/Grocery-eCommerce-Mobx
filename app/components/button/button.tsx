import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets, SHADOW } from "./button.presets"
import { ButtonProps } from "./button.props"

/**
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    shadow,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const shadowStyle = shadow && SHADOW 
  const viewStyles = [viewStyle, styleOverride, shadowStyle ]
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text text={text} style={textStyles} />

  return (
    <TouchableOpacity activeOpacity={.7} style={viewStyles} {...rest}>
      {content}
    </TouchableOpacity>
  )
}