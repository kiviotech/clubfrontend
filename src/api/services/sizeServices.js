import {
    getSizes,
    getSizeById,
    createSize,
    updateSize,
    deleteSize,
} from "../repositories/sizeRepository";

// Fetch all sizes
export const fetchSizes = async () => {
    try {
        const response = await getSizes();
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch a specific size by ID
export const fetchSizeById = async (id) => {
    try {
        const response = await getSizeById(id);
        return response.data;
    } catch (error) {

        throw error;
    }
};

// Create a new size
export const createSizeService = async (data) => {
    try {
        const response = await createSize(data);
        return response.data;
    } catch (error) {

        throw error;
    }
};

// Update an existing size by ID
export const updateSizeById = async (id, data) => {
    try {
        const response = await updateSize(id, { data });
        return response.data;
    } catch (error) {

        throw error;
    }
};

// Delete a size by ID
export const deleteSizeById = async (id) => {
    try {
        const response = await deleteSize(id);
        return response.data;
    } catch (error) {

        throw error;
    }
};
