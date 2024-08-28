import { redirect, useLoaderData } from "react-router-dom"
import fetchPrinterData from "../../../services/fetchPrinters";
import LogoutButton from "../../../components/ui/LogOutButton";

interface Printer {
    id: string;
    name: string;
}

interface LoaderData {
    printerData: Printer;
}

export const printerLoader = async ({ params }: any): Promise<LoaderData | Response> => {
    try {
        const printerData = await fetchPrinterData(params.printer);
        return { printerData };
    } catch (error) {
        return redirect('/dashboard/printers');
    }
};

const PrinterDetailPage = () => {
    const { printerData } = useLoaderData() as LoaderData;

    return (
        <div className="p-5">
            <h1><b>Printer Detail Page</b></h1>
            <h2>Id: {printerData.id}</h2>
            <h2>Name: {printerData.name}</h2>
            <hr />
            <LogoutButton />
        </div>
    )
}

export default PrinterDetailPage
