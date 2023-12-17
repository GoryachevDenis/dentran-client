import React, { useContext, useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import DeviceItem from '../components/DeviceItem';
import { Context } from '..';
import { fetchBasket, removeDeviceFromBasket } from '../http/deviceAPI';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { SHOP_ROUTE } from '../utils/consts';

const Basket = () => {
    const {device, user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    
    useEffect(() => {
        if(user.isAuth) { 
            fetchBasket(user.user.id).then(data => {device.setBasket(data); setLoading(false)});
        }
    }, [])

    const removeFromBasket = (deviceId) => {
        removeDeviceFromBasket(deviceId, user.user.id);
        device.setBasket(device.basket.filter(device => device.id !== deviceId));
        history.push(SHOP_ROUTE);
    }

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <div>
            <h1>Моя корзина</h1>
        <Row className="d-flex">
            {device.basket.map(device =>
                <DeviceItem key={device.id} device={device} nonBuyable = {true} onRemove = {removeFromBasket}/>
            )}
        </Row>
        </div>
    );
};

export default Basket;
