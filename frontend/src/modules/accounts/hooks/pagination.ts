import { useMemo, useState } from "react";
import { paginationColDefsInitialState } from "../constants";

export const usePagination = () => {

    const [colDefs] = useState<any[]>(paginationColDefsInitialState);

    const defaultColDef = useMemo(() => {
        return {
            filter: "agTextColumnFilter",
            floatingFilter: true,
        };
    }, []);

    return { defaultColDef, colDefs };
}