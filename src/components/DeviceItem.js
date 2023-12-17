import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device, nonBuyable, onRemove}) => {
    const history = useHistory()

    return (
        <Col md={3} className={"mt-3"}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"} onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`, {nonBuyable})}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
            {onRemove ? <Button className="btn-danger" onClick={() => onRemove(device.id)}>Убрать из корзины</Button> : <></>}
        </Col>
    );
};

export default DeviceItem;
