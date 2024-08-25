import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { IconProps } from './globals/icon-props'

interface PenToSquareProps extends IconProps {}

export const IconPenToSquare = ({ color, button = false, onclick }: PenToSquareProps) => {
    return (
        <FontAwesomeIcon icon={faPenToSquare} color={color} cursor={button ? 'pointer' : ''} onClick={onclick} />
    )
}