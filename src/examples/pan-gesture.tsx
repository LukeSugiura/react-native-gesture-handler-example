import React, {useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const {width} = Dimensions.get('screen');

const {add, cond, eq, event, set, Value} = Animated;

export function PanGestureExample() {
  const dragX = useRef(new Value(0)).current;
  const dragY = useRef(new Value(0)).current;
  const offsetX = useRef(new Value((width - BOX_SIZE) / 2)).current;
  const offsetY = useRef(new Value(240)).current;
  const gestureState = useRef(new Value(-1)).current;
  const onGestureEvent = useRef(
    event([
      {
        nativeEvent: {
          translationX: dragX,
          translationY: dragY,
          state: gestureState,
        },
      },
    ]),
  ).current;

  const addX = useRef(add(offsetX, dragX)).current;
  const addY = useRef(add(offsetY, dragY)).current;

  const transX = useRef(
    cond(eq(gestureState, State.ACTIVE), addX, set(offsetX, addX)),
  ).current;
  const transY = useRef(
    cond(eq(gestureState, State.ACTIVE), addY, set(offsetY, addY)),
  ).current;

  return (
    <StyledPanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: transX,
              },
              {
                translateY: transY,
              },
            ],
          },
        ]}
      />
    </StyledPanGestureHandler>
  );
}

const StyledPanGestureHandler = styled(PanGestureHandler)`
  flex: 1;
`;

const BOX_SIZE = 100;

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    height: BOX_SIZE,
    width: BOX_SIZE,
    backgroundColor: 'white',
    borderRadius: 16,
  },
});
