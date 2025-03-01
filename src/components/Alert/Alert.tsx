import {useEffect, useState} from "react";
import "./Alert.css"

interface AlertProps {
    message: string;
}

export const Alert =(props:AlertProps)=>{
    const [visible, setVisible] = useState(true);

    const onClose=()=>{
        setVisible(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [props.message]);

    if (!visible) return null;

    return (
        <div className={"alert-container"}>
            <span>{props.message}</span>
            <button data-testid={"close-modal"} className={"close-button"} onClick={onClose}>X</button>
        </div>
    );
}
