import { StyleSheet } from 'react-native';

import { ColorSchemeRegistry, schemeColor } from '../../base/color-scheme';

/**
 * Size for the Avatar.
 */
export const AVATAR_SIZE = 200;

/**
 * Color schemed styles for the @{LargeVideo} component.
 */
ColorSchemeRegistry.register('LargeVideo', {

    /**
     * Large video container style.
     */
    largeVideo: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'stretch',
        backgroundColor: schemeColor('background'),
        flex: 1,
        justifyContent: 'center'
    },

    connectionBoxStyle: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: '100%'
    },

    avatarNameTextStyle: {
        color: 'white',
        width: '100%',
        textAlign: 'center',
        fontSize: 16
    },

    connectionTextStyle: {
        color: 'white',
        marginTop: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 14
    }
});
