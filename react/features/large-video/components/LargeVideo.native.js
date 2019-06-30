// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { ColorSchemeRegistry } from '../../base/color-scheme';
import { LoaderText } from '../../base/util';
import { Audio, MEDIA_TYPE } from '../../base/media';
import { ParticipantView } from '../../base/participants';
import { connect } from '../../base/redux';
import { DimensionsDetector } from '../../base/responsive-ui';
import { StyleType } from '../../base/styles';
import { getSdkBundlePath } from '../../app';

import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  DeviceEventEmitter,
} from 'react-native';

import FastImage, {
    type CacheControls,
    type Priorities
} from 'react-native-fast-image';

import {
  BallIndicator
} from 'react-native-indicators';

import { AVATAR_SIZE } from './styles';

/**
 * The type of the React {@link Component} props of {@link LargeVideo}.
 */
type Props = {

    /**
     * The ID of the participant (to be) depicted by LargeVideo.
     *
     * @private
     */
    _participantId: string,

    _avatarUrl: string,

    _participantsCount: Integer,

    _avatarFullName: string,

    /**
     * The color-schemed stylesheet of the feature.
     */
    _styles: StyleType,

    /**
     * Callback to invoke when the {@code LargeVideo} is clicked/pressed.
     */
    onClick: Function,
};

/**
 * The type of the React {@link Component} state of {@link LargeVideo}.
 */
type State = {

    /**
     * Size for the Avatar. It will be dynamically adjusted based on the
     * available size.
     */
    avatarSize: number,

    /**
     * Whether the connectivity indicator will be shown or not. It will be true
     * by default, but it may be turned off if there is not enough space.
     */
    useConnectivityInfoLabel: boolean,

    _isConnectionEstablished: boolean
};

const Emitter = Platform.select({
  ios: new NativeEventEmitter(NativeModules.CallControllerModule),
  android: DeviceEventEmitter,
});


const DEFAULT_STATE = {
    avatarSize: AVATAR_SIZE,
    _isConnectionEstablished: false,
    useConnectivityInfoLabel: true
};


/**
 * Implements a React {@link Component} which represents the large video (a.k.a.
 * the conference participant who is on the local stage) on mobile/React Native.
 *
 * @extends Component
 */
class LargeVideo extends Component<Props, State> {
    state = {
        ...DEFAULT_STATE
    };

    _audioConnectionElement = null;
    _audioRingingElement = null;

    /** Initializes a new {@code LargeVideo} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onDimensionsChanged = this._onDimensionsChanged.bind(this);
        this.onConnectionEstablished = this.onConnectionEstablished.bind(this);
        this._audioConnectionElementReady = this._audioConnectionElementReady.bind(this);
        this._audioRingingElementReady = this._audioRingingElementReady.bind(this);
    }

    _onDimensionsChanged: (width: number, height: number) => void;

    /**
     * Handle this component's dimension changes. In case we deem it's too
     * small, the connectivity indicator won't be rendered and the avatar
     * will occupy the entirety of the available screen state.
     *
     * @param {number} width - The component's current width.
     * @param {number} height - The component's current height.
     * @private
     * @returns {void}
     */
    _onDimensionsChanged(width: number, height: number) {
        // Get the size, rounded to the nearest even number.
        const size = 2 * Math.round(Math.min(height, width) / 2);
        let nextState = DEFAULT_STATE;
        this.setState(nextState);
    }

    _audioConnectionElementReady(element: Object) {
        if(element){
            if (!this.state._isConnectionEstablished) {
                element.play()
            }
            this._audioConnectionElement = element;
        }
    }

    _audioRingingElementReady(element: Object) {
        if(element){
            this._audioRingingElement = element;
            if (this.state._isConnectionEstablished) {
                element.play();
            }
        }
    }

    componentWillMount() {
        Emitter.addListener("connection.established",
            this.onConnectionEstablished);
    }

    

    onConnectionEstablished(e) {
        this._audioConnectionElement.stop();
        if(this._audioRingingElement) {
            this._audioRingingElement.play();
        }
        this.setState({_isConnectionEstablished: true});
    }

    /**W
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            avatarSize,
            useConnectivityInfoLabel,
            _isConnectionEstablished
        } = this.state;
        const {
            _participantId,
            _participantsCount,
            _avatarUrl,
            _styles,
            onClick
        } = this.props;


        return (
            <DimensionsDetector
                onDimensionsChanged = { this._onDimensionsChanged }>
                {
                    _participantsCount == 1 ?
                    <View
                        style = { _styles.largeVideo }>
                        <FastImage
                             resizeMode = 'contain'
                             style = { _styles.largeVideo }
                             source={{
                                 uri: _avatarUrl,
                                 priority: FastImage.priority.normal,
                             }} />
                        <View style = { _styles.connectionBoxStyle }>
                            <Audio
                                setRef = { this._audioRingingElementReady }
                                loop = { true }
                                src = {Platform.OS == 'ios' ? getSdkBundlePath() + '/outgoingRinging.wav' : 'asset:/sounds/outgoingRinging.wav' } />
                            <Audio
                                setRef = { this._audioConnectionElementReady }
                                loop = { true }
                                src = {Platform.OS == 'ios' ? getSdkBundlePath() + '/outgoingStart.wav' : 'asset:/sounds/outgoingStart.wav' } />

                            <Text
                                style = { _styles.avatarNameTextStyle }>
                                { this.props._avatarFullName }
                            </Text>
                            <LoaderText
                                textStyle = { _styles.connectionTextStyle }
                                content = { _isConnectionEstablished ? "Набор номера" : "Установка соединения" }/>
                        </View>
                    </View>
                     :
                    <ParticipantView
                        avatarSize = { avatarSize }
                        onPress = { onClick }
                        participantId = { _participantId }
                        style = { _styles.largeVideo }
                        testHintId = 'org.jitsi.meet.LargeVideo'
                        useConnectivityInfoLabel = { useConnectivityInfoLabel }
                        zOrder = { 0 }
                        zoomEnabled = { true } />
                }
            </DimensionsDetector>
        );
    }
}

/**
 * Maps (parts of) the Redux state to the associated LargeVideo's props.
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {{
 *     _participantId: string,
 *     _styles: StyleType
 * }}
 */
function _mapStateToProps(state) {
    const props = state['features/base/app'].app.props;
    return {
        _participantId: state['features/large-video'].participantId,
        _participantsCount: state['features/base/participants'].length,
        _avatarUrl: props.avatarUrl,
        _avatarFullName: props.avatarFullName,
        _styles: ColorSchemeRegistry.get(state, 'LargeVideo')
    };
}

export default connect(_mapStateToProps)(LargeVideo);
