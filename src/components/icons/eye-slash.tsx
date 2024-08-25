import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { IconProps } from './globals/icon-props'

interface EyeProps extends IconProps {}

export const IconEyeSlash = ({ button = false, onclick, classname }: EyeProps) => {
    return (
        <FontAwesomeIcon icon={faEyeSlash} cursor={button ? 'pointer' : ''} onClick={onclick} className={classname} />
    )
}