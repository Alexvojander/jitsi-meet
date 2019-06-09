// @flow

/* eslint-disable */
import { translate } from '../../base/i18n';
import { connect } from '../../base/redux';
import type { AbstractButtonProps } from '../../base/toolbox';
import { toggleCameraFacingMode } from '../../base/media';
import AbstractToggleCameraButton from '../../base/toolbox/components/AbstractToggleCameraButton';


/**
 * The type of the React {@code Component} props of {@link AudioMuteButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
}

/**
 * Component that renders a toolbar button for toggling audio mute.
 *
 * @extends AbstractToggleCameraButton
 */
class ToggleCameraButton extends AbstractToggleCameraButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.toggleCamera';
    iconName = 'icon-switch-camera';
    label = 'toolbar.toggleCamera';

    /**
     * Initializes a new {@code AudioMuteButton} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);
    }

        /**
     * Handles clicking / pressing the button, and toggles the audio mute state
     * accordingly.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(toggleCameraFacingMode());
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code AudioMuteButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _chatMode: boolean
 * }}
 */
function _mapStateToProps(): Object {

    return {
        
    };
}

export default translate(connect(_mapStateToProps)(ToggleCameraButton));
