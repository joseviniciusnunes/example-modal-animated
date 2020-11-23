import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

import Modal, {IModalAction} from './Modal';

let modalAction: IModalAction = {
    openModal: () => {},
    closeModal: () => {},
};

const App = () => {
    function setParam(param: IModalAction) {
        modalAction = param;
    }

    return (
        <>
            <View style={styles.root}>
                <Button
                    title="Open Modal"
                    onPress={() => {
                        modalAction.openModal();
                    }}
                />
            </View>
            <Modal setParam={setParam} />
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#dbdbdb',
    },
});

export default App;
