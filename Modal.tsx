import React from 'react';
import {StyleSheet, Button, Animated} from 'react-native';

import {PanGestureHandler} from 'react-native-gesture-handler';

export interface IParam {
    setParam: (param: IModalAction) => void;
}

export interface IModalAction {
    openModal: () => void;
    closeModal: () => void;
}

let closed = true;

const Modal = (param: IParam) => {
    const {setParam} = param;
    const animation = new Animated.Value(1);

    setParam({openModal, closeModal});

    function openModal() {
        Animated.spring(animation, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
        }).start();
        closed = false;
    }

    function closeModal() {
        Animated.spring(animation, {
            toValue: 1,
            friction: 7,
            useNativeDriver: true,
        }).start();
        closed = true;
    }

    const positionY = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 600],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    return (
        <PanGestureHandler
            onGestureEvent={(evt) => {
                let {nativeEvent} = evt;
                if (
                    nativeEvent.absoluteY > 150 &&
                    nativeEvent.velocityY > 2400
                ) {
                    if (!closed) {
                        console.log('close');
                        closed = true;
                        closeModal();
                    }
                }
            }}>
            <Animated.View style={[styles.root, positionY]}>
                <Button title="Close Modal" onPress={closeModal} />
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#88cc00',
        height: 600,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
});

export default Modal;
