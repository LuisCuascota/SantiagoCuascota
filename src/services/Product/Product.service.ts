import {Product} from "../../shared/Interfaces/Product.interfaces.ts";
import axios from "axios";
import {environment} from "../../environment/environment.ts";

const API_URL = environment.api_url;

interface IGetProducts {
    data: Product[]
}

export const getProducts = async (): Promise<IGetProducts> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const postProduct = async (data: Product): Promise<IGetProducts> => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const putProduct = async (data: Omit<Product,"id">, id:string): Promise<IGetProducts> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id:string): Promise<IGetProducts> => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const checkProduct = async (id:string): Promise<boolean> => {
    const response = await axios.get(`${API_URL}/verification/${id}`);
    return response.data;
};
