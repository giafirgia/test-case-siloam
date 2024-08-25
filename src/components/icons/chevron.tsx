import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useMemo } from 'react'

interface IconsProps {
    icon: 'right' | 'left' | 'top' | 'bottom'
}

export const IconChevron = ({ icon }: IconsProps) => {
    const iconsSwitch = useMemo(() => {
        switch(icon) {
            case 'right':
                return faChevronRight;
            case 'left':
                return faChevronLeft;
            case 'top':
                return faChevronUp;
            case 'bottom':
                return faChevronDown;
            
            default: 
                return faChevronRight;
        }
    }, [icon])

    return (
        <FontAwesomeIcon icon={iconsSwitch} />
    )
}