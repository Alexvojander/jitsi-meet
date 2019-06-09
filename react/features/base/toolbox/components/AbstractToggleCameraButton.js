// @flow

import AbstractButton from './AbstractButton';
import type { Props } from './AbstractButton';

/**
 * An abstract implementation of a button for toggling audio mute.
 */
export default class AbstractToggleCameraButton<P: Props, S: *>
    extends AbstractButton<P, S> {

    iconName = 'icon-microphone';
    toggledIconName = 'icon-mic-disabled toggled';


}
