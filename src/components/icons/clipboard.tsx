import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste } from '@fortawesome/free-solid-svg-icons'
import { IconProps } from './globals/icon-props'

interface ClipboardProps extends IconProps {}

export const IconClipboard = () => {
    return (
        <FontAwesomeIcon icon={faPaste} />
    )
}