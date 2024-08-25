import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { IconProps } from './globals/icon-props'

interface EyeProps extends IconProps {}

export const IconEye = ({ button = false, onclick, classname }: EyeProps) => {
    return (
        <FontAwesomeIcon icon={faEye} cursor={button ? 'pointer' : ''} onClick={onclick} className={classname} />
    )
}