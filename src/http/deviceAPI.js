import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const fetchBasket = async (basketId) => {
    try{
        const { data } = await $host.get('api/device/basket', {params: {basketId}});        
        return data;
    }
    catch(e){
        console.log(e);
    }
}

export const putDeviceInBasket = async (deviceId, basketId) => {
    try{
        await $host.post('api/device/basket', {deviceId, basketId});        
        return "OK";
    }
    catch(e){
        if(e.response.status == 404) return "Этот товар уже находится в вашей корзине";
        return e.message
    }
}

export const removeDeviceFromBasket = async (deviceId, basketId) => await $host.delete('api/device/basket', {params: {deviceId, basketId}});

