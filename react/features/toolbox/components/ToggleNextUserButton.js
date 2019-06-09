// @flow
/* eslint-disable */

import { translate } from '../../base/i18n';
import { connect } from '../../base/redux';
import { AbstractButton } from '../../base/toolbox';
import type { AbstractButtonProps } from '../../base/toolbox';
import { toggleNextUser } from '../../base/media';

declare var APP: Object;

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
 * @extends AbstractButton
 */
class ToggleNextUserButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.toggleCamera';
    iconName = 'icon-navigate-next';
    label = 'toolbar.navigateNext';

    /**
     * Handles clicking / pressing the button, and toggles the audio mute state
     * accordingly.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(toggleNextUser());
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code AudioMuteButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     
 * }}
 */
function _mapStateToProps(state): Object {
    
    return {};
}

export default translate(connect(_mapStateToProps)(ToggleNextUserButton));
