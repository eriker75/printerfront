import { BASE_URL } from "../utils/axios";

const fetchPrinterData = async (printerId: string) => {
    try {
        const response = await fetch(`${BASE_URL}/printers/${printerId}`);
        if (!response.ok) {
            throw new Error('Printer not found');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export default fetchPrinterData;
